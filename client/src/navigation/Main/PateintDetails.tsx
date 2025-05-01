import React from 'react';
import { PatientDetails, PreviouseData } from '../../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const PatientDetailsLayout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="patientDetails"
        component={PatientDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="previouseData"
        component={PreviouseData}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PatientDetailsLayout;
