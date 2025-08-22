import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { CheckBox } from '@rneui/themed';
import Header from '../../components/Header';
import FormInput from '../../components/Doctor/FormInput';

const GeneratePrescription = () => {

  const [selected, setSelected] = useState({
    dm: false,
    htn: false,
    hepb: false,
    hepc: false,
    ihd: false,
    smoker: false,
  });

  const [complaints, setComplaints] = useState('');
  const [hopi, setHopi] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [labs, setLabs] = useState('');
  const [radiology, setRadiology] = useState('');
  const navigation = useNavigation<any>()
  type SelectedKeys = keyof typeof selected;

const toggleCheckbox = (key: SelectedKeys) => {
  setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
};


  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Prescription" />
     <KeyboardAvoidingView
  className="flex-1"
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
>
         <ScrollView
          className="px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View className="bg-white rounded-lg p-4 shadow-sm">
            {/* Section: Presenting Complaints */}
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Presenting Complaints
            </Text>
            <FormInput
              label="Complaints"
              placeholder="Cough, Fever, etc."
              value={complaints}
              onChangeText={setComplaints}
            />
            <FormInput
              label="HOPI (Optional)"
              placeholder="Additional medical history details"
              value={hopi}
              onChangeText={setHopi}
            />

            {/* Divider */}
            <View className="h-px bg-gray-200 my-6" />

            {/* Section: Past Medical History */}
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Past Medical History (Optional)
            </Text>
            <View className="flex-row flex-wrap justify-between mb-6">
              {[
                {key: 'dm', label: 'DM'},
                {key: 'htn', label: 'HTN'},
                {key: 'hepb', label: 'HB'},
                {key: 'hepc', label: 'HC'},
                {key: 'ihd', label: 'IHD'},
                {key: 'smoker', label: 'Smoker'},
              ].map(item => (
                <Pressable
                  key={item.key}
                  onPress={() => toggleCheckbox(item.key)}
                  className="flex-row items-center mb-5  w-[32%]">
                  <CheckBox
                    title={item.label}
                    checked={selected[item.key]}
                    onPress={() => toggleCheckbox(item.key)}
                    checkedColor="#2895cb"
                    uncheckedColor="#2895cb"
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      padding: 0,
                      margin: 0,
                      marginRight: 8,
                    }}
                    textStyle={{color: '#1f2937'}}
                  />
                </Pressable>
              ))}
            </View>

            {/* Divider */}
            <View className="h-px bg-gray-200 my-6" />

            {/* Section: Diagnosis & Tests */}
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Diagnosis & Tests
            </Text>
            <FormInput
              label="Diagnosis (Optional)"
              placeholder="Viral Infection, etc."
              value={diagnosis}
              onChangeText={setDiagnosis}
            />
            <FormInput
              label="Labs (Optional)"
              placeholder="CBC, CRP, etc."
              value={labs}
              onChangeText={setLabs}
            />
            <FormInput
              label="Radiology (Optional)"
              placeholder="X-Ray, CT Scan, etc."
              value={radiology}
              onChangeText={setRadiology}
            />

          </View>
        </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-2 flex-row justify-end">
  <Pressable 
    onPress={() => navigation.navigate("DrugSheet")} 
    className="bg-secondary px-10 py-2 rounded-full"
  >
    <Text className="text-white text-lg font-semibold">Next</Text>
  </Pressable>
</View>



    </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

export default GeneratePrescription;
