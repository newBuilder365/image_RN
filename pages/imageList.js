import { View, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
})

export default class ImageList extends Component {

  state = {
    imageList: [],
    loading: false
  }

  componentDidMount = () => {
    this.props.navigation.navigate('cameraUpload', { getImages: this.getImages });
    this.getImages()
  }

  getImages = () => {
    this.setState({ loading: true })
    fetch('http://10.0.2.2:9998/images')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ imageList: data.images_rn || [] })
      })
      .catch(error => {
        console.error(error);
      }).finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const { imageList, loading } = this.state;
    return (
      loading ? <ActivityIndicator /> :
        <Swiper style={styles.wrapper} showsButtons={true}>
          {
            imageList.map(uri => (
              <View style={styles.slide1} key={uri} >
                <Image style={styles.image}
                  source={{ uri }}
                />
              </View>))
          }
        </Swiper>
    )
  }
}