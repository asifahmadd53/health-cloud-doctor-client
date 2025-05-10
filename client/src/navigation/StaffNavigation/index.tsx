import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffScreen from '../../screens/Drawer/Staff/StaffScreen';
import AddStaffScreen from '../../screens/Drawer/Staff/AddStaffScreen';
import EditStaffScreen from '../../screens/Drawer/Staff/EditStaffScreen';
import StaffDetailsScreen from '../../screens/Drawer/Staff/StaffDetailsScreen';
import NewAppointmentScreen from '../../screens/Staff/NewAppointmentScreen';
import AppointmentDetailsScreen from '../../screens/Staff/AppointmentDetailsScreen';
import EditAppointmentScreen from '../../screens/Staff/EditAppointmentScreen';
import AppointmentListScreen from '../../screens/Staff/AppointmentListScreen';

const StaffLayout = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Staff" component={StaffScreen} />
        <Stack.Screen name="AddStaff" component={AddStaffScreen} />
        <Stack.Screen name="EditStaff" component={EditStaffScreen} />
        <Stack.Screen name='StaffDetails' component={StaffDetailsScreen} />
{/* Appointment */}
        <Stack.Screen name='NewAppointmentScreen' component={NewAppointmentScreen} />
        <Stack.Screen name='AppointmentDetails' component={AppointmentDetailsScreen} />
        <Stack.Screen name='EditAppointment' component={EditAppointmentScreen} />
        <Stack.Screen name='AppointmentList' component={AppointmentListScreen} />
    </Stack.Navigator>
  )
}

export default StaffLayout
