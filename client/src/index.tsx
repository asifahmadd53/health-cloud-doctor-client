import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import '../gesture-handler.native';

const RootLayout = () => {
  return (
   <>
   <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
    <NavigationContainer>
    <Text className='text-3xl bg-red-700'>Hello, World!</Text>
    </NavigationContainer>
   </>
  )
}

export default RootLayout