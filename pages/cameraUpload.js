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

  uploadImage = (uri) => {
    RNFetchBlob.fetch(
      'POST',
      'https://your-server-url.com/upload-image',
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'photo',
          filename: 'photo.jpg',
          data: RNFetchBlob.wrap(uri),
        },
      ]
    )
      .then((res) => res.json())
      .then((response) => {
        console.log('Upload Success:', response);
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
      debugger;
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // uploadImage(response.uri);
        console.log('response', response)
      }
    });
  };


  render() {
    return (
      <View style={styles.container}>
        <Button title='拍照' onPress={this.requestCameraPermission} />
      </View>
    )
  }
}