import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NewAppointment } from '../../screens';



const NewAppoinmentLayout = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name='newAppointment' component={NewAppointment}
      options={({ navigation }) => ({
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={{ marginLeft: 10 }}
          >
          </TouchableOpacity>
        ),
      })}
      
      />
    </Stack.Navigator>
  )
}

export default NewAppoinmentLayout

