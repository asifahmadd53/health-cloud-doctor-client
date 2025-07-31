import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/Tabs/DrProfile/ProfileScreen';
import ScheduleScreen from '../../screens/Tabs/DrProfile/ScheduleScreen';

const DrProfileLayout = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="DrProfile" component={ProfileScreen} />
        <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
    </Stack.Navigator>
  )
}

export default DrProfileLayout

const styles = StyleSheet.create({})