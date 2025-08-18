import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput as RNTextInput,
  Platform,
  Keyboard,
  LayoutAnimation,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';

import PatientText from '../../components/PatientText';
import Icons from '../../utils/libs/constants/Icons';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import CustomSecondaryButton from '../../components/CustomSecondaryButton';

const PatientDetails = () => {
  const navigation = useNavigation<any>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<RNTextInput[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const patientName = 'Muhammad Hassan';
  const patientAge = 18;
  const patientGender = 'Male';
  const patientPhone = '5843757345';
  const patientCNIC = '52735092735-3';
  const patientEmail = 'hassan@email.com';
  const patientImage = null;
  const patientHasRecord = false;
  const paymentMethod = 'Online';
  const paymentStatus = 'Paid';

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', e => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setKeyboardHeight(0);
    });
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) inputRefs.current[index + 1]?.focus();
    if (!text && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const openSheet = () => {
    bottomSheetRef.current?.expand();
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // adjust if you have a header
    >
      <SafeAreaView className="flex-1 bg-gray-100">
        <Header title="Patient Profile" />

        <ScrollView contentContainerStyle={{padding: 20, paddingBottom: 40}}>
          {/* Patient Avatar */}
          <View className="items-center mb-6">
            {patientImage ? (
              <Image
                source={patientImage}
                className="w-28 h-28 rounded-full mb-4"
              />
            ) : (
              <View className="w-28 h-28 bg-blue-400 rounded-full items-center justify-center mb-4">
                <Text className="text-4xl font-bold text-white">
                  {getInitial(patientName)}
                </Text>
              </View>
            )}
            <Text className="text-2xl font-bold text-gray-900">
              {patientName}
            </Text>
            <Text className="text-gray-500">
              {patientGender}, {patientAge} Years
            </Text>
          </View>

          {/* Patient Info */}
          <View className="bg-white rounded-3xl p-6 shadow-md mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Patient Information
            </Text>
            <PatientText label="Phone:" item={patientPhone} />
            <PatientText label="CNIC:" item={patientCNIC} />
            <PatientText label="Email:" item={patientEmail} />
          </View>

          {/* Payment & Records */}
          <View className="bg-white rounded-3xl p-6 shadow-md mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Payment & Records
            </Text>
            <View className="flex-row items-center justify-between mb-4 bg-green-50 p-4 rounded-xl">
              <View className="flex-row items-center gap-3">
                <Image source={Icons.paymentdone} className="w-8 h-8" />
                <Text className="text-lg font-semibold text-green-700">
                  {paymentMethod} Payment
                </Text>
              </View>
              <Text className="text-green-700 font-semibold">
                {paymentStatus}
              </Text>
            </View>
            {patientHasRecord ? (
              <TouchableOpacity
                className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl"
                onPress={() => navigation.navigate('previouseData')}>
                <View className="flex-row items-center gap-3">
                  <Image source={Icons.historynot} className="w-6 h-6" />
                  <Text className="text-lg font-semibold text-gray-700">
                    View Previous Record
                  </Text>
                </View>
                <Text className="text-primary font-semibold">Open</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                className="bg-primary py-3 rounded-xl flex-row items-center justify-center mt-3"
                onPress={openSheet}>
                <Text className="text-white text-lg font-semibold">
                  Send OTP to Patient
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <View className="py-3 bg-white">
          <CustomButton
            label="Generate Prescription"
            link="prescriptionLayout"
          />
        </View>

        {/* BottomSheet */}
        
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['50%']}
          enablePanDownToClose
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          backdropComponent={(props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.5} // control the dim effect
    />
          )}
          >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 20,
              paddingBottom: keyboardHeight ? 40 : 10,
            }}>
            <Text className="text-xl font-semibold text-gray-800 text-center mb-2">
              Enter OTP
            </Text>
            <Text className="text-gray-500 text-center mb-6">
              A 4-digit OTP was sent to the patient. Please enter it below.
            </Text>

            <View className="flex-row justify-center gap-4 mb-6">
              {otp.map((value, index) => (
                <RNTextInput
                  key={index}
                  ref={el => (inputRefs.current[index] = el!)}
                  value={value}
                  onChangeText={text => handleOtpChange(text, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#f3f4f6',
                    textAlign: 'center',
                    borderRadius: 12,
                    fontSize: 22,
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                  }}
                />
              ))}
            </View>

            <CustomSecondaryButton
              label="Proceed"
              onPress={() => {
                bottomSheetRef.current?.close();
                navigation.navigate('previouseData');
              }}
            />
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PatientDetails;
