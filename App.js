import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer, Alert } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageList from './pages/imageList'
import XfSDK from './pages/xfSDK'
import CameraUpload from './pages/cameraUpload'
const Tab = createBottomTabNavigator()
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen
            name='cameraUpload'
            options={{
              tabBarLabel: 'cameraUpload',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name='camera-outline' color={color} size={size} />
              ),
            }}
            component={CameraUpload}
          />
          <Tab.Screen
            name='imageList'
            options={{
              tabBarLabel: 'imageList',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name='images-outline' color={color} size={size} />
              ),
            }}
            component={ImageList}
          />
          <Tab.Screen
            name='xfSDK'
            component={XfSDK}
            options={{
              tabBarLabel: 'xfSDK',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name='mic-outline' color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}
