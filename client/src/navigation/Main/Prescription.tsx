import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrugSheet from './DrugSheet';
import GeneratePrescription from './GeneratePrescription';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const PrescriptionLayout = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GeneratePrescription" component={GeneratePrescription} 
      options={({ navigation }) => ({
        headerShadowVisible: false,
        headerTitle: 'Generate Prescription',
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
      <Stack.Screen name="DrugSheet" component={DrugSheet}
      options={({ navigation }) => ({
        headerShadowVisible: false,
        headerTitle: 'Prescription',
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
  );
};

export default PrescriptionLayout;
