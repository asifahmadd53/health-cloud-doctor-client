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
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner-native';
interface SignUpProps {
  navigation: any;
}

const SignUp = ({navigation}: SignUpProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  type FormValues = {
  name: string;
  pmdcNumber: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
 pmdcCopy: {
    uri: string;
    type?: string;
    fileName?: string;
  } | null;
  checked: boolean;
};


  const {control,handleSubmit,setError,clearErrors, watch,setValue,reset,formState:{errors}} =  useForm<FormValues>({defaultValues:
    {
    name: '',
    pmdcNumber: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    pmdcCopy: null,
    checked: false,
    }
  })

  const password = watch('password')
  const confirmPassword = watch("confirmPassword")
  const pmdcCopy = watch("pmdcCopy");
  const checked = watch("checked");
  useEffect(()=>{
    if(!password){
      setPasswordStrength(0)
      return;
    }
     let strength = 0
  if(password.length >= 8 ) strength += 0.25
  if(/[A-Z]/.test(password)) strength += 0.25
  if (/[a-z]/.test(password)) strength += 0.25;
  if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 0.25; 

  setPasswordStrength(strength)

  },[password])

 


const validatePasswords = () => {
  let isValid = true;

  clearErrors(["password", "confirmPassword"]);

  if (!password) {
    setError("password", { type: "manual", message: "Password is required" });
    isValid = false;
  } else if (password.length < 8) {
    setError("password", { type: "manual", message: "Password must be at least 8 characters" });
    isValid = false;
  } else if (passwordStrength < 0.5) {
    setError("password", { type: "manual", message: "Password is too weak" });
    isValid = false;
  }

  if (!confirmPassword) {
    setError("confirmPassword", { type: "manual", message: "Please confirm your password" });
    isValid = false;
  } else if (password !== confirmPassword) {
    setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
    isValid = false;
  }

  return isValid;
};
  const handleSignUp = async (values:any) => {
    if(isLoading) return;
    if(!validatePasswords()) return

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('pmdcNumber', values.pmdcNumber);
    formData.append('email', values.email);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('password', values.password);

     if (values.pmdcCopy) {
    formData.append("pmdcCopy", {
      uri: values.pmdcCopy.uri,
      name: values.pmdcCopy.fileName || "pmdc.jpg",
      type: values.pmdcCopy.type || "image/jpeg",
    } as any);
  }

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
        reset()
        navigation.navigate('sign-up-completed');
      }
      
    } catch (error: any) {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 409) {
      setError("email", {
        type: "manual",
        message: data.message || "User already exists.",
      });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
} finally {
      setIsLoading(false);
    }
  };

  
  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return 'No password';
    if (passwordStrength <= 0.25) return 'Weak';
    if (passwordStrength <= 0.5) return 'Fair';
    if (passwordStrength <= 0.75) return 'Good';
    return 'Strong';
  };

  
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return '#e5e7eb';
    if (passwordStrength <= 0.25) return '#ef4444';
    if (passwordStrength <= 0.5) return '#f59e0b';
    if (passwordStrength <= 0.75) return '#10b981';
    return '#10b981';
  };

 

const openCamera = () => {
  launchCamera(
    { mediaType: 'photo', quality: 0.8, maxHeight: 2000, maxWidth: 2000 },
    response => {
      if (response.assets?.[0]) {
        const asset = response.assets[0];
        setValue("pmdcCopy", {
          uri: asset.uri!,
          type: asset.type,
          fileName: asset.fileName,
        });
        bottomSheetRef.current?.close();
      }
    },
  );
};

const openGallery = () => {
  launchImageLibrary(
    { mediaType: 'photo', quality: 0.8, maxHeight: 2000, maxWidth: 2000 },
    response => {
      if (response.assets?.[0]) {
        const asset = response.assets[0];
        setValue("pmdcCopy", {
          uri: asset.uri!,
          type: asset.type,
          fileName: asset.fileName,
        });
        bottomSheetRef.current?.close();
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

         
            <View className="">
            

              <Controller
              control={control}
              name="name"
              rules={{
                required:"Name is required"
              }}
              render={({field:{onChange,value}})=>(
                 <CustomInput
                label="Full Name"
                keyboardType="default"
                placeholder="Enter your full name"
                value={value}
                error={errors.name?.message}
                icon="person-outline"
                onChangeText={onChange}
              /> 
              )}
              />
              
              <Controller
              control={control}
              name="pmdcNumber"
              rules={{
                required:"PMDC number is required"
              }}
              render={({field:{onChange,value}})=>(
               <CustomInput
                label="PMDC Number"
                placeholder="Enter your PMDC number"
                value={value}
                icon="checkmark-outline"
                onChangeText={onChange}
                error={errors.pmdcNumber?.message}
              />
              )}
              />

             

              <Controller
              control={control}
              name="email"
              rules={{
                required:"Email is required"
              }}
              render={({field:{onChange,value}})=>(
                <CustomInput
                label="Email Address"
                keyboardType="email-address"
                placeholder="Enter your email address"
                value={value}
                icon={'mail-outline'}
                onChangeText={onChange}
                autoCapitalize="none"
                error={errors.email?.message}
              />
              )}
              />

             
              <Controller
              control={control}
              name="phoneNumber"
              rules={{
                required:"Phone Number is required"
              }}
              render={({field:{onChange,value}})=>(
                 <CustomInput
                label="Phone Number"
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
                value={value}
                icon={'call-outline'}
                onChangeText={onChange}
                error={errors.phoneNumber?.message}
              />
              )}
              />
              <View className="mb-4">
                {/**/}

                <Controller
              control={control}
              name="password"
              rules={{
                required:"Password is required"
              }}
              render={({field:{onChange,value}})=>(
                 <CustomPasswordInput
                  label="Password"
                  placeholder="Create a strong password"
                  value={password}
                  onChangeText={onChange}
                  error={errors.password?.message}
                /> 
              )}
              />
                {password ? (
                  <View className="">
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

             
               <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required:"Confirm Password is required"
              }}
              render={({field:{onChange,value}})=>(
                  <CustomPasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
              />
              )}
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
                
              <View className="items-center my-6">
                <Pressable
                  onPress={() => bottomSheetRef.current?.expand()}
                  className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl items-center justify-center bg-gray-50">
                {pmdcCopy ? (
  <Image
    className="w-full h-full rounded-xl"
    source={{ uri: pmdcCopy.uri }}
    resizeMode="cover"
  />
) : (
  <View className="items-center">
    <Image className="w-12 h-12 mb-2 opacity-60" source={Images.addImage} />
    <Text className="text-gray-500 text-sm font-medium">Tap to upload</Text>
  </View>
)}
                </Pressable>
                 <Text className='text-sm text-[#ef4444] '>{errors.pmdcCopy?.message}</Text>
              </View>
            </View>

            
            <Pressable onPress={() => setValue("checked", !checked)} className="flex-row items-center ">
            <CheckBox
              checked={checked}
              onPress={() => setValue("checked", !checked)}
              checkedColor="#2895cb"
              uncheckedColor="#9CA3AF"
              size={20}
              containerStyle={{
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
              }}
            />
            <Text className="ml-2 text-gray-700 text-sm leading-5">
              I agree to the <Text className="text-[#2895cb] font-medium">Terms of Service</Text> and{' '}
              <Text className="text-[#2895cb] font-medium">Privacy Policy</Text>
            </Text>
          </Pressable>

            <View className="mt-8">
              <CustomButton
                loading={isLoading}
                label="Create Account"
                onPress={handleSubmit(handleSignUp)}
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
              onPress={()=>{
                openCamera()
                bottomSheetRef.current?.close()
              }}>
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
              onPress={()=>{
                openGallery()
                bottomSheetRef.current?.close()
              }}>
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
