import { View, Text, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import '../gesture-handler.native';
import AppLayout from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <NavigationContainer>
        <GestureHandlerRootView style={styles.container}>
        <AppLayout />
        </GestureHandlerRootView>
      </NavigationContainer>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default RootLayout;
