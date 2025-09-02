import { StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import '../gesture-handler.native'
import 'react-native-reanimated'
import AppLayout from './navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import { Toaster } from 'sonner-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RootLayout = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AutocompleteDropdownContextProvider>
            <AppLayout />
          </AutocompleteDropdownContextProvider>
        <Toaster
  position="top-center"
  offset={20}
  richColors
  // closeButton
  visibleToasts={1}
  duration={2000}
  toastOptions={{
    
    style: {
      borderRadius: 12,
      // backgroundColor: "#1E293B", 
      backgroundColor: "#2C415C", 
      paddingVertical: 14,
      paddingHorizontal: 18,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 4,
      minWidth: "92%",
      alignSelf: "center",
    },
    titleStyle: {
      fontSize: 15,
      fontWeight: "600",
      color: "#F8FAFC", // slate-50
      textAlign: "left",
      marginLeft: 6,
    },
    descriptionStyle: {
      fontSize: 13,
      color: "#CBD5E1", // slate-300
      textAlign: "left",
      marginLeft: 6,
    },
  }}
/>



        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default RootLayout
