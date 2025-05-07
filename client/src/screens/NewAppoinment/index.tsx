import { ScrollView, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import FormInput from '../../components/Doctor/FormInput';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';

const NewAppointment = () => {
  const [name, setName] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online' | null>(null);
  const [age, setAge] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-5">
      <Header title="New Appointment" />


      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 mt-8">
          {/* Input Fields */}
          <FormInput value={name} onChangeText={setName} placeholder="Enter patient name" label="Patient Name" />
          <FormInput value={CNIC} onChangeText={setCNIC} placeholder="Enter CNIC number" label="CNIC #" />
          <FormInput value={mobile} onChangeText={setMobile} placeholder="Enter mobile number" label="Mobile #" />
          <FormInput value={age} keyboardType="numeric" onChangeText={setAge} placeholder="Enter age" label="Age" />

          {/* Gender Selection */}
          <Text className="mt-6 mb-2 font-semibold text-base text-gray-700">Gender</Text>
          <View className="flex-row space-x-6 items-center">
            {['male', 'female'].map((g) => (
              <Pressable
                key={g}
                onPress={() => setGender(g as 'male' | 'female')}
                className="flex-row items-center space-x-1"
              >
                <RadioButton
                  value={g}
                  color="#2895cb"
                  status={gender === g ? 'checked' : 'unchecked'}
                />
                <Text className="text-gray-700 capitalize">{g}</Text>
              </Pressable>
            ))}
          </View>

          {/* Payment Method */}
          <Text className="mt-6 mb-2 font-semibold text-base text-gray-700">Payment Method</Text>
          <View className="flex-row space-x-6 items-center">
            {['cash', 'online'].map((p) => (
              <Pressable
                key={p}
                onPress={() => setPaymentMethod(p as 'cash' | 'online')}
                className="flex-row items-center space-x-1"
              >
                <RadioButton
                  value={p}
                  color="#32c75f"
                  status={paymentMethod === p ? 'checked' : 'unchecked'}
                />
                <Text className="text-gray-700 capitalize">{p}</Text>
              </Pressable>
            ))}
          </View>

          {/* Submit Button */}
          <View className="mt-8">
            <CustomButton label="Proceed" link='patientDetailsLayout'/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewAppointment;
