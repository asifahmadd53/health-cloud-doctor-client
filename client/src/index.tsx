import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import '../gesture-handler.native';
import AppLayout from './navigation';

const RootLayout = () => {
  return (
   <>
   <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
    <NavigationContainer>
    <AppLayout/>
    </NavigationContainer>
   </>
  )
}

export default RootLayout