import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { PatientDetails, PreviouseData } from '../../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const PateintDetailsLayout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="patientDetails"
        component={PatientDetails}
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerTitle: 'Bio Data',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            >
              {/* Add an icon or text here, e.g., <Text>Back</Text> */}
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
