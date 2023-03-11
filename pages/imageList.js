import { Text, View, StyleSheet, Dimensions, Image, SafeAreaView, Button } from 'react-native'
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
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default class ImageList extends Component {

  state = {
    imageList: []
  }

  componentDidMount = () => {
    this.getImages()
  }

  getImages = () => {
    fetch('http://10.0.2.2:9998/images')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ imageList: data.images_rn || [] })
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { imageList } = this.state;
    return (
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