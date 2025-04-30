import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { PatientDetails, PreviouseData } from '../../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-ionicons'

const Stack = createNativeStackNavigator();

const PateintDetailsLayout = () => {
  return (
    <Stack.Navigator>
     <Stack.Screen
  name="patientDetails"
  component={PatientDetails}
  options={({ navigation }) => ({
    headerShadowVisible: false,
    headerTitle: 'Patient Details',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 10 }}
      >
        <Icon ios="ios-add" android="md-add" />
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
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default PateintDetailsLayout;
