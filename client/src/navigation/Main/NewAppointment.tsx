import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NewAppointment } from '../../screens';
import Icon from 'react-native-vector-icons/MaterialIcons';



const NewAppoinmentLayout = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name='newAppointment' component={NewAppointment}
     options={{
        headerShown: false}}
      
      />
    </Stack.Navigator>
  )
}

export default NewAppoinmentLayout

