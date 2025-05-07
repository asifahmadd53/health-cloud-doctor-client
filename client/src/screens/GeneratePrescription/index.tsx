import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox, Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import CustomSimpleInput from '../../components/CustomSimpleInput';
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

  const toggleCheckbox = (key: string) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
       <Header title='Prescription'/>

      <ScrollView 
      className='pt-5'
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 20,paddingTop:20 }}
      >


        <FormInput
          label="Presenting Complaints"
          placeholder="Cough etc"
          onChangeText={setComplaints}
          value={complaints}
        />
        <FormInput
          label="HOPI (Optional)"
          placeholder="Additional Medical History Details"
          onChangeText={setHopi}
          value={hopi}
        />

        {/* Past Medical History */}
        <Text className="text-base font-semibold text-gray-800 mt-2 mb-3">
          Past Medical History (Optional)
        </Text>
        <View className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex-row flex-wrap w-[99%] mx-auto items-center justify-evenly">
          {[
            { key: 'dm', label: 'DM' },
            { key: 'htn', label: 'HTN' },
            { key: 'hepb', label: 'HB' },
            { key: 'hepc', label: 'HC' },
            { key: 'ihd', label: 'IHD' },
            { key: 'smoker', label: 'Smoker' },
          ].map((item) => (
            <Pressable
              key={item.key}
              onPress={() => toggleCheckbox(item.key)}
              className="flex-row items-center py-2 w-[30%]"
            >
             <View className='transform scale-110'>
               <Checkbox
               
               color="#2895cb"
               uncheckedColor="#2895cb"
               status={selected[item.key] ? 'checked' : 'unchecked'}
             /></View>
              <Text className="ml-2 text-gray-900">{item.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Diagnosis & Tests */}
        <Text className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          Diagnosis & Tests
        </Text>
        <FormInput
          label="Diagnosis (Optional)"
          placeholder="Eg. Viral Infection"
          onChangeText={setDiagnosis}
          value={diagnosis}
        />
        <FormInput
          label="Labs (Optional)"
          placeholder="Eg. CBC, CRP"
          onChangeText={setLabs}
          value={labs}
        />
        <FormInput
          label="Radiology (Optional)"
          placeholder="Eg. X-Ray CT Scan"
          onChangeText={setRadiology}
          value={radiology}
        />
      <View className="w-full bg-white border-gray-300 items-end mt-4">
        <Button
          icon="chevron-right"
          mode="outlined"
          textColor='#2895cb'
          onPress={() => navigation.navigate('DrugSheet')}
          className="rounded-lg w-32"
          contentStyle={{flexDirection:'row-reverse'}}
          labelStyle={{ fontSize: 17 }}
        >
          Next
        </Button>
      </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default GeneratePrescription;
