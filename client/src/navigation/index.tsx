import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLayout from './AuthNavigation';
import DrawerLayout from './DrawerNavigation';
import TabLayout from './TabNavigation';
import PrescriptionLayout from './Main/Prescription';
import NewAppoinmentLayout from './Main/NewAppointment';
import PateintDetailsLayout from './Main/PateintDetails';


const AppLayout = () => {

    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" component={AuthLayout} />
      <Stack.Screen name="drawer" component={DrawerLayout} />
      <Stack.Screen name="tabs" component={TabLayout} />
      <Stack.Screen name="patientDetailsLayout" component={PateintDetailsLayout} />
      <Stack.Screen name="prescriptionLayout" component={PrescriptionLayout} />
      <Stack.Screen name="newAppointmentLayout" component={NewAppoinmentLayout} />
    </Stack.Navigator>
  )
}

export default AppLayout

const styles = StyleSheet.create({})