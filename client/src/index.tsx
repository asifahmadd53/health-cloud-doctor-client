import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import '../gesture-handler.native';
import 'react-native-reanimated';
import AppLayout from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown'

const RootLayout = () => {
  return (
    <>
    
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AutocompleteDropdownContextProvider>
              <AppLayout />
       </AutocompleteDropdownContextProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </>
  );
};

export default RootLayout;
