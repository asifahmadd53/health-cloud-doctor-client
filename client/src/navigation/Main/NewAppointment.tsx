import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigatorContext } from 'expo-router/build/views/Navigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewAppointment from '.'
import { Ionicons } from '@expo/vector-icons'

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
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
      })}
      
      />
    </Stack.Navigator>
  )
}

export default NewAppoinmentLayout

