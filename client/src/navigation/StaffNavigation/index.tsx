import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffScreen from '../../screens/Drawer/Staff/StaffScreen';
import AddStaffScreen from '../../screens/Drawer/Staff/AddStaffScreen';
import EditStaffScreen from '../../screens/Drawer/Staff/EditStaffScreen';
import StaffDetailsScreen from '../../screens/Drawer/Staff/StaffDetailsScreen';

const StaffLayout = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Staff" component={StaffScreen} />
        <Stack.Screen name="AddStaff" component={AddStaffScreen} />
        <Stack.Screen name="EditStaff" component={EditStaffScreen} />
        <Stack.Screen name='StaffDetails' component={StaffDetailsScreen} />
    </Stack.Navigator>
  )
}

export default StaffLayout
