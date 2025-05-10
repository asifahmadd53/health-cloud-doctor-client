import { View, Text, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import '../gesture-handler.native';
import AppLayout from './navigation';
import { Toaster } from 'burnt/web';

const RootLayout = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <NavigationContainer>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#000",       // Black background
              color: "#fff",            // White text
              borderRadius: "12px",
              fontSize: 14,
              padding: "12px 16px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            },
            
          }}
        />
        <AppLayout />
      </NavigationContainer>
    </>
  );
};

export default RootLayout;
