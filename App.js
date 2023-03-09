import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function App() {
  return (
    <View>
      <Text style={[styles.h2]}>aaa</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  h2: {
    fontSize: 30,
    color: 'skyblue',
    fontWeight: 'bold'
  }
})