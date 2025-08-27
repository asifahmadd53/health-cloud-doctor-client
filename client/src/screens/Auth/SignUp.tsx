import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import CustomButton from '../../components/CustomButton';
import Images from '../../utils/libs/constants/Images';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Header from '../../components/Header';
import {BASE_URL} from '../../api/api';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Icons from '../../utils/libs/constants/Icons';
import {CheckBox} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface SignUpProps {
  navigation: any;
}

const SignUp = ({navigation}: SignUpProps) => {
  const [name, setName] = useState('');
  const [pmdcNumber, setPmdc] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [pmdcCopy, setPmdcCopy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [errors, setErrors] = useState({
    name: '',
    pmdcNumber: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    pmdcCopy: '',
    checked: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSignUp = async () => {
    if (isLoading) {
      return;
    }

    const newErrors = {
      name: '',
      pmdcNumber: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      pmdcCopy: '',
      checked: '',
    };

    let isValid = true;

    if (!name.trim()) {
    newErrors.name = 'Full name is required';
    isValid = false;
  }

  if (!pmdcNumber.trim()) {
    newErrors.pmdcNumber = 'PMDC number is required';
    isValid = false;
  }

  if (!email.trim()) {
    newErrors.email = 'Email is required';
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
  }

  if (!phoneNumber.trim()) {
    newErrors.phoneNumber = 'Phone number is required';
    isValid = false;
  }

  if (!password) {
    newErrors.password = 'Password is required';
    isValid = false;
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = 'Confirm password is required';
    isValid = false;
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }

  if (!pmdcCopy) {
    newErrors.pmdcCopy = 'Please upload your PMDC certificate';
    isValid = false;
  }

  if (!checked) {
    newErrors.checked = 'You must agree to the terms and conditions';
    isValid = false;
  }

  setErrors(newErrors);

  if (!isValid) return;


    const formData = new FormData();
    formData.append('name', name);
    formData.append('pmdcNumber', pmdcNumber);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);

    formData.append('pmdcCopy', {
      uri: pmdcCopy.uri,
      name: pmdcCopy.fileName || 'pmdc.jpg',
      type: pmdcCopy.type || 'image/jpeg',
    } as any);

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      const data = response.data;

      if (data.success) {
        setTimeout(() => {}, 1000);
        navigation.navigate('sign-up-completed');
        setName('');
        setPmdc('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        setPmdcCopy(null);
        setChecked(false);
      } else {
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Somethidng went wrong',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength += 0.25;

    if (/[A-Z]/.test(password)) strength += 0.25;

    if (/[a-z]/.test(password)) strength += 0.25;

    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 0.25;

    setPasswordStrength(strength);
  }, [password]);

  // Get password strength label
  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return 'No password';
    if (passwordStrength <= 0.25) return 'Weak';
    if (passwordStrength <= 0.5) return 'Fair';
    if (passwordStrength <= 0.75) return 'Good';
    return 'Strong';
  };

  // Get password strength color
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return '#e5e7eb';
    if (passwordStrength <= 0.25) return '#ef4444';
    if (passwordStrength <= 0.5) return '#f59e0b';
    if (passwordStrength <= 0.75) return '#10b981';
    return '#10b981';
  };

  // Validate passwords
  const validatePasswords = () => {
    const newErrors = {password: '', confirmPassword: ''};
    let isValid = true;

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (passwordStrength < 0.5) {
      newErrors.password = 'Password is too weak';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const isFormValid =
  name.trim() &&
  pmdcNumber.trim() &&
  email.trim() &&
  phoneNumber.trim() &&
  password &&
  confirmPassword &&
  password === confirmPassword &&
  pmdcCopy &&
  checked;

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.[0]
        ) {
          setPmdcCopy(response.assets[0]); // keep full object
          bottomSheetRef.current?.close();
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        }
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.[0]
        ) {
          setPmdcCopy(response.assets[0]);
          bottomSheetRef.current?.close();
        } else if (response.errorCode) {
          console.log('Gallery Error: ', response.errorMessage);
        }
      },
    );
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <Header title="Sign Up" />
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
          <ScrollView
            className="px-6 pt-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40}}>
            <View className="mb-8 mt-4">
              <Image
                source={Images.logo} // your logo image
                className="w-16 h-16 mb-2"
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold text-left text-gray-900 mb-2">
                Join Our Platform
              </Text>

              <Text className="text-left text-gray-600 text-sm leading-6">
                Elevate your practice efficiency and foster meaningful patient
                relationships with unparalleled ease.
              </Text>
            </View>

            {/* Form Section */}
            <View className="">
              <CustomInput
                label="Full Name"
                keyboardType="default"
                placeholder="Enter your full name"
                value={name}
                error={errors.name}
                icon="person-outline"
                onChange={setName}
                
              />

              <CustomInput
                label="PMDC Number"
                keyboardType="numeric"
                placeholder="Enter your PMDC number"
                value={pmdcNumber}
                icon="checkmark-outline"
                onChange={setPmdc}
                error={errors.pmdcNumber}
              />

              <CustomInput
                label="Email Address"
                keyboardType="email-address"
                placeholder="Enter your email address"
                value={email}
                icon={'mail-outline'}
                onChange={setEmail}
                autoCapitalize="none"
                error={errors.email}
              />

              <CustomInput
                label="Phone Number"
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
                value={phoneNumber}
                icon={'call-outline'}
                onChange={setPhoneNumber}
                error={errors.phoneNumber}
              />
              <View className="mb-4">
                <CustomPasswordInput
                  label="Password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={setPassword}
                  error={errors.password}
                />
                {password ? (
                  <View className="-mt-4">
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-xs text-gray-500">
                        Password Strength
                      </Text>
                      <Text
                        className="text-xs font-medium"
                        style={{color: getPasswordStrengthColor()}}>
                        {getPasswordStrengthLabel()}
                      </Text>
                    </View>
                    <View className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <View
                        className="h-full"
                        style={{
                          width: `${passwordStrength * 100}%`,
                          backgroundColor: getPasswordStrengthColor(),
                        }}
                      />
                    </View>
                  </View>
                ) : null}

                <Text className="text-xs text-gray-500 mb-1">
                  Password must contain:
                </Text>
                <View className="flex-row items-center">
                  <MaterialIcons
                    name={password.length >= 8 ? 'check-circle' : 'cancel'}
                    size={12}
                    color={password.length >= 8 ? '#10b981' : '#9ca3af'}
                  />
                  <Text className="text-xs ml-1 text-gray-500">
                    At least 8 characters
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <MaterialIcons
                    name={/[A-Z]/.test(password) ? 'check-circle' : 'cancel'}
                    size={12}
                    color={/[A-Z]/.test(password) ? '#10b981' : '#9ca3af'}
                  />
                  <Text className="text-xs ml-1 text-gray-500">
                    At least 1 uppercase letter
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <MaterialIcons
                    name={/[0-9]/.test(password) ? 'check-circle' : 'cancel'}
                    size={12}
                    color={/[0-9]/.test(password) ? '#10b981' : '#9ca3af'}
                  />
                  <Text className="text-xs ml-1 text-gray-500">
                    At least 1 number
                  </Text>
                </View>
              </View>

              <CustomPasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                error={errors.confirmPassword}
              />
            </View>
            {/* PMDC Upload Section */}
            <View className="mt-6">
              <Text className="text-base font-medium text-gray-900 mb-3">
                Upload PMDC Certificate
              </Text>
              <Text className="text-sm text-gray-600">
                Please upload a clear photo of your PMDC certificate
              </Text>
                
              <View className="items-center my-8">
                <Pressable
                  onPress={() => bottomSheetRef.current?.expand()}
                  className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl items-center justify-center bg-gray-50">
                  {pmdcCopy ? (
                    <Image
                      className="w-full h-full rounded-xl"
                      source={{uri: pmdcCopy.uri}}
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="items-center">
                      <Image
                        className="w-12 h-12 mb-2 opacity-60"
                        source={Images.addImage}
                      />
                      <Text className="text-gray-500 text-sm font-medium">
                        Tap to upload
                      </Text>
                    </View>
                  )}
                </Pressable>
              <Text className='text-xs text-[#ef4444] pt-2'>{errors.pmdcCopy}</Text>
              </View>
            </View>

            {/* Terms and Conditions */}
            <Pressable
              onPress={() => setChecked(!checked)}
              className="flex-row items-center px-2">
              <CheckBox
              
                checked={checked}
                onPress={() => setChecked(!checked)} // toggle function
                checkedColor="#2895cb"
                uncheckedColor="#9CA3AF"
                size={20}
                containerStyle={{
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'transparent',
                }}
              />
              <Text className="flex-1 text-gray-700 text-sm leading-5 ">
                I agree to the{' '}
                <Text className="text-[#2895cb] font-medium">
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text className="text-[#2895cb] font-medium">
                  Privacy Policy
                </Text>
              </Text>
            </Pressable>

            <View className="mt-8">
              <CustomButton
                disabled={isLoading || !isFormValid}
                loading={isLoading}
                label="Create Account"
                onPress={handleSignUp}
              />
            </View>

            {/* Login Link */}
            <View className="mt-6 mb-4">
              <Text className="text-center text-gray-600">
                Already have an account?{' '}
                <Text
                  className="text-[#2895cb] font-medium"
                  onPress={() => navigation.navigate('login')}>
                  Sign In
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['20%']}
          index={-1}
          enablePanDownToClose // allow swipe down to fully close
          onChange={handleSheetChanges}>
          <BottomSheetView style={{flex: 1, padding: 10}}>
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center py-4 px-4 rounded-xl"
              onPress={openCamera}>
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4">
                <Image className="w-6 h-6" source={Icons.camera} />
              </View>
              <Text className="text-gray-900 font-medium text-base">
                Take Photo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center py-4 px-4 rounded-xl "
              onPress={openGallery}>
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
                <Image className="w-6 h-6" source={Icons.gallery} />
              </View>
              <Text className="text-gray-900 font-medium text-base">
                Choose from Gallery
              </Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
