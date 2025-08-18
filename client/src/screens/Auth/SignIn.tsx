'use client';

import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import {BASE_URL} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../utils/libs/constants/Images';

const SignIn = () => {
  const [pmdcNumber, setPmdc] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({pmdcNumber: '', password: ''});
  const navigation = useNavigation<any>();
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    if (!pmdcNumber) {
      setLoading(false);
      setErrors({...errors, pmdcNumber: 'Please enter your PMDC number'});
      return;
    }
    if (!password) {
      setLoading(false);
      setErrors({...errors, password: 'Please Enter your password'});
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {pmdcNumber, password},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      const data = response.data;
      if (!data.user.isApproved) {
        setLoading(false);
        // Burnt.toast({
        //   title: "Your account is not approved",
        //   preset: "error",
        // })
      }
      if (data.user.isApproved) {
        setLoading(true);
        setTimeout(() => {}, 3000);
        await AsyncStorage.multiSet([
          ['user', JSON.stringify(data.user)],
          ['token', data.token],
        ]);
        // const storedUser = await AsyncStorage.getItem('user')
        // const storedToken = await AsyncStorage.getItem('token')
        navigation.navigate('drawer');
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
      setErrors({...errors, password: 'Invalid PMDC number or password'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white px-6">
      <ScrollView className="flex-grow min-h-full pb-5">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View className="pt-20">
            <Image
              source={Images.logo}
              className="w-16 h-16 mb-2"
              resizeMode="contain"
            />
            <Text className="text-3xl font-semibold text-left text-black">
              Welcome Back!
            </Text>
            <Text className="text-left text-gray-500 text-base mt-2 leading-5">
              Elevate your practice efficiency and foster meaningful patient
              relationships with unparalleled ease.
            </Text>
          </View>
          <View className="mt-16 w-[99%] flex flex-col mx-auto">
            <CustomInput
              label={'Enter your PMDC #'}
              keyboardType="numeric"
              placeholder={'PMDC #'}
              icon="checkmark-outline"
              value={pmdcNumber}
              onChange={text => {
                setPmdc(text);
                if (errors.pmdcNumber) setErrors({...errors, pmdcNumber: ''});
              }}
              error={errors.pmdcNumber}
            />
            <View className="">
              <CustomPasswordInput
                label={'Enter your Password'}
                placeholder={'Password'}
                value={password}
                onChange={text => {
                  setPassword(text);
                  if (errors.password) setErrors({...errors, password: ''});
                }}
                error={errors.password}
              />
            </View>
            <View className="items-end -mt-1">
              <Text
                onPress={() => navigation.navigate('forget-password')}
                className="text-secondary text-base font-medium">
                Forgot Password?
              </Text>
            </View>
          </View>
          <View className="mt-6">
            <CustomButton
              loading={isLoading}
              label="Login"
              // onPress={handleLogin}
              onPress={() => navigation.navigate("drawer")}
            />
          </View>
          <View className="mx-auto mt-8 items-center gap-5">
            <Text className="text-[#253237] text-base font-medium">
              Don't have an account?
              <Text
                onPress={() => navigation.navigate('sign-up')}
                className="text-secondary underline">
                {' '}
                Join us{' '}
              </Text>
            </Text>
          </View>
          <View className="flex-row items-center mt-16 mb-6 w-[90%] mx-auto">
  <View className="flex-1 h-[1px] bg-gray-300" />
  <Text className="mx-3 text-gray-500">or</Text>
  <View className="flex-1 h-[1px] bg-gray-300" />
</View>
          {/* Staff Login Button */}
         <Pressable
  onPress={() => navigation.navigate('staffLogin')}
  className="px-2 py-1 self-center">
  <Text className="text-secondary text-base underline font-medium">
    Login as Staff
  </Text>
</Pressable>


        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
