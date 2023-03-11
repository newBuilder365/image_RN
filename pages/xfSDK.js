import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'

export default class XfSDK extends Component {
  render() {
    return (
      <View>
        <Text>XfSDK</Text>
        <Image style={{
          width: 80,
          height: 80,
          resizeMode: 'contain'
        }}
          source={{
            uri: 'http://10.0.2.2:9998/uploads/image-1678282190806.png'
          }}
        />
      </View>
    )
  }
}