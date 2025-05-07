import { ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import CustomSimpleInput from '../../components/CustomSimpleInput';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import FormInput from '../../components/Doctor/FormInput';


const NewAppointment = () => {
  const [name, setName] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online' | null>(null);
  const [age, setAge] = useState('');

  return (
    <SafeAreaView className='px-5 py-5 flex-1 bg-white'>
      <Header title=''/>
      <Text className='text-2xl font-bold text-gray-800 text-center mb-6 mt-6'>New Appointment</Text>

      <ScrollView>
      <View className='bg-white rounded-2xl p-5 shadow-md border border-gray-200'>
        {/* Patient Details */}
        <FormInput value={name} onChangeText={(value) => setName(value)} placeholder="Enter patient name" label="Patient Name" />
        <FormInput value={CNIC} onChangeText={(value) => setCNIC(value)} placeholder="Enter patient CNIC #" label="Patient CNIC #" />
        <FormInput value={mobile} onChangeText={(value) => setMobile(value)} placeholder="Enter patient Mobile #" label="Mobile #" />
        <FormInput value={age} onChangeText={(value) => setAge(value)} placeholder="Enter patient age" label="Age" />

        {/* Gender Selection */}
        <Text className='mt-4 mb-2 font-semibold text-lg text-gray-700'>Gender</Text>
        <View className='flex-row space-x-4 items-center'>
          <RadioButton
          color='#2895cb'
          value='male'
            status={gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('male')}
          />
          <Text onPress={()=> setGender('male')}>Male</Text>

          <RadioButton
          value='female'
          color='#2895cb'
            status={gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('female')}
          />
          <Text onPress={()=> setGender('female')}>Female</Text>
        </View>
        {/* Payment Method Selection */}
        <Text className='mt-4 mb-2 font-semibold text-lg text-gray-700'>Payment Method</Text>
        <View className='flex-row space-x-4 items-center'>
          <RadioButton
          value='cash'
          color='#32c75f'
            status={paymentMethod === 'cash' ? 'checked' : 'unchecked'}
            onPress={() => setPaymentMethod('cash')}
          />
          <Text onPress={()=> setPaymentMethod('cash')}>Cash</Text>

          <RadioButton
          color='#32c75f'
          value='online'
            status={paymentMethod === 'online' ? 'checked' : 'unchecked'}
            onPress={() => setPaymentMethod('online')}
          />
          <Text onPress={()=> setPaymentMethod('online')}>Online</Text>
        </View>

        <View className='mt-7'>
          <CustomButton label='Proceed'/>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewAppointment;
