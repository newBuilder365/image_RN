import { Button, View, StyleSheet, PermissionsAndroid } from 'react-native'
import React, { Component } from 'react'
import { launchCamera } from 'react-native-image-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
})

export default class CameraUpload extends Component {

  uploadImage = (file) => {
    const formData = new FormData();
    formData.append('image', {
      uri: file.uri,
      type: file.type,
      name: file.fileName
    });
    fetch('http://10.0.2.2:9998/upload', {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => res.json())
      .then((response) => {
        console.log('Upload Success:', response);
        this.handleNavigate()
      })
      .catch((error) => {
        console.log('Upload Error:', error);
      });
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        this.openCamera()
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('response', response)
        const [file] = response.assets
        this.uploadImage(file)
      }
    });
  };

  handleNavigate = () => {
    const { navigation, route } = this.props
    const { params = {} } = route
    navigation.navigate('imageList');
    const { getImages } = params;
    getImages && getImages();

  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='拍照' onPress={this.requestCameraPermission} />
      </View>
    )
  }
}