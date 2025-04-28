import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { PatientDetails, PreviouseData } from '../../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const PateintDetailsLayout = () => {

  const Stack = createNativeStackNavigator();
  return (
    <>
     <Stack.Screen
          name="patientDetails"
          component={PatientDetails}
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerTitle: 'Bio Data',
            headerLeft: () => (
              <TouchableOpacity 
              activeOpacity={.95}
                onPress={() => navigation.goBack()} 
                style={{ marginLeft: 10 }}
              >
                {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="previouseData"
          component={PreviouseData}
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerTitle: 'Previous Data',
            headerLeft: () => (
              <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={{ marginLeft: 10 }}
              >
                {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
              </TouchableOpacity>
            ),
          })}
        />
    </>
   
  )
}

export default PateintDetailsLayout