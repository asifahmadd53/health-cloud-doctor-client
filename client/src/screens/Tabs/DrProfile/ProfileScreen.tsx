import {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  TextInput as RNTextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PhotoUpload from '../../../components/Doctor/PhotoUpload';
import FormInput from '../../../components/Doctor/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../api/api';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import Icons from '../../../utils/libs/constants/Icons';
import Header from '../../../components/Header';
import { Controller, useForm } from 'react-hook-form';
import { showToast } from '../../../utils/toastUtils';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {

  const [loading, setLoading] = useState(false);

 type ProfileFormValues = {
  name: string;
  specialty: string;
  years: string;
  certifications: string;
  professionalBio: string;
  email: string;
  phoneNumber: string;
  clinicAddress: string;
  profileImage?: string;
};

  const navigation = useNavigation();

const { control, handleSubmit, setValue, reset,watch, formState: { errors } } = useForm<ProfileFormValues>({
  defaultValues: {
    name: '',
    specialty: '',
    years: '',
    certifications: '',
    professionalBio: '',
    email: '',
    phoneNumber: '',
    clinicAddress: '',
    profileImage: '',
  }
});

const nameValue = watch("name");
const specialtyValue = watch("specialty");

  const handleImageSelected = () => {
  launchImageLibrary(
    { mediaType: 'photo', quality: 0.8, maxHeight: 2000, maxWidth: 2000 },
    response => {
      if (!response.didCancel && !response.errorCode && response.assets?.[0]) {
        const selectedImage = response.assets[0];
        setValue('profileImage', selectedImage.uri); // react-hook-form
      } else if (response.errorCode) {
        console.log('Gallery Error: ', response.errorMessage);
      }
    }
  );
};


  


const onSubmit = async (values: ProfileFormValues) => {
  try {
    setLoading(true);
    
    const storedToken = await AsyncStorage.getItem('token')
    if (!storedToken) {
      showToast('error', 'User not found. Please login again.');
      return;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'profileImage' && value?.startsWith('file://')) {
        formData.append(key, { uri: value, type: 'image/jpeg', name: 'profile.jpg' } as any);
      } else {
        formData.append(key, value as string);
      }
    });
  
    const response = await axios.patch(`${BASE_URL}/doctors/update-doctor`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${storedToken}`,
      },
    });


  if (response?.data?.success) {
      showToast('success', 'Profile updated successfully!');
    } else {
      showToast('error', response?.data?.message || 'Failed to update profile');
    }

  } catch (error: any) {
    showToast('error', 'Something went wrong while updating profile');
  }finally{
    setLoading(false);
  }
};

  const navigateToSchedule = () => {
    navigation.navigate('ScheduleScreen' as never);
  };

useEffect(() => {
  const getDoctor = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      const doctorId = parsedUser._id;

      const response = await axios.get(`${BASE_URL}/doctors/get-doctor/${doctorId}`);
      if (!response.data.success) return;

      const { doctor, profile } = response.data;

      const formValues = {
        name: doctor.name,
        email: doctor.email,
        phoneNumber: doctor.phoneNumber,
        profileImage: profile?.profileImage || '',
        specialty: profile?.specialty || '',
        years: profile?.years || '',
        certifications: profile?.certifications || '',
        professionalBio: profile?.professionalBio || '',
        clinicAddress: profile?.clinicAddress || '',
      };

      reset(formValues);
    } catch (err) {
      console.log('Error fetching doctor', err);
    }
  };

  getDoctor();
}, [reset]);



  return (
     <SafeAreaView className="flex-1 bg-white">
      <Header title="Doctor Profile" />
      <KeyboardAvoidingView
  className="flex-1"
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
>
        <ScrollView
          className="px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
        <View className="bg-white pt-6 pb-10">
          <View className="px-8">
            <View className="items-center">
             <View className="mb-3">
  <Pressable
            onPress={handleImageSelected}
            className="w-24 h-24 rounded-full items-center justify-center bg-slate-100 border border-slate-200 shadow-lg overflow-hidden"
          >
            <Controller
              control={control}
              name="profileImage"
              render={({ field: { value } }) => (
                value ? <Image source={{ uri: value }} className="w-full h-full rounded-full" /> :
                  <Image source={Icons.profileIcon} className="w-24 h-24" resizeMode="contain" />
              )}
            />
          </Pressable>
                <Pressable onPress={handleImageSelected} className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full items-center justify-center shadow-lg">
                  <Image  source={Icons.camera} className='w-4 h-4' tintColor={"white"}/>
                  
                </Pressable>
</View>

             <Text
  ellipsizeMode="tail"
  numberOfLines={1}
  className="text-2xl font-bold text-slate-900 mb-2 tracking-normal">
  {nameValue || "Your Name"}
</Text>

<View className="bg-slate-100 px-4 py-2 rounded-full mb-8">
  <Text
    ellipsizeMode="tail"
    numberOfLines={1}
    className="text-base font-semibold text-slate-600">
    {specialtyValue || "Medical Specialist"}
  </Text>
</View>
              <View className="w-full max-w-sm">
                <TouchableOpacity
                activeOpacity={.90}
                  onPress={navigateToSchedule}
                  className="bg-primary py-3 px-6 rounded-2xl flex-row items-center justify-center shadow-lg">
                  <MaterialIcons name="schedule" size={20} color="white" />
                  <Text className="text-white text-base font-semibold ml-2">
                    Manage Schedule
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="px-1 mt-6">
          {/* Professional Information */}
          <View className="mb-8">
            <View className="mb-5">
              <Text className="text-xl font-bold text-slate-900 mb-1">
                Professional Information
              </Text>
              <Text className="text-sm text-slate-500">
                Manage your professional credentials and experience
              </Text>
            </View>

            <View className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
              <View className="space-y-6 p-1">
                <View>
                  <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { value, onChange } }) => (
              <FormInput
                label="Full Name"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
              />
            )}
          />
                </View>

                <View className="flex-row space-x-4">
                  <View className="flex-1 mr-2">
                       <Controller
            control={control}
            name="specialty"
            render={({ field: { value, onChange } }) => (
              <FormInput label="Specialty" value={value} onChangeText={onChange} />
            )}
          />

                  </View>
                  <View className="w-32">
                   
                     <Controller
            control={control}
            name="years"
            render={({ field: { value, onChange } }) => (
              <FormInput
                      label="Years"
                      value={value}
                      onChangeText={onChange}
                      placeholder="Unknown"
                      keyboardType="numeric"
                      className="text-base text-slate-900 font-medium"
                      placeholderTextColor="#94a3b8"
                    />
            )}
          />
                  </View>
                </View>

                <View>
                
                   <Controller
            control={control}
            name="certifications"
            render={({ field: { value, onChange } }) => (
               <FormInput
                    label="Certifications"
                    placeholder="No Certifications"
                    value={value}
                    onChangeText={onChange}
                    multiline
                    numberOfLines={4}
                    className="text-base text-slate-900 font-medium min-h-20 "
                    placeholderTextColor="#94a3b8"
                  />
            )}
          />
                      
                </View>

                <View>
                 
                  <Controller
            control={control}
            name="professionalBio"
            render={({ field: { value, onChange } }) => (
               <FormInput
                    label="Professional Bio"
                    value={value}
                    placeholder="No Professional Bio"
                    onChangeText={onChange}
                    multiline
                    numberOfLines={4}
                    className="text-base text-slate-900 font-medium"
                    placeholderTextColor="#94a3b8"
                  />
            )}
          />
                </View>
              </View>
            </View>
          </View>

          {/* Contact Information */}
          <View className="mb-8 ">
            <View className="mb-5">
              <Text className="text-xl font-bold text-slate-900 mb-1">
                Contact Information
              </Text>
              <Text className="text-sm text-slate-500">
                Update your contact details and clinic information
              </Text>
            </View>

            <View className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
              <View className="space-y-7 p-1">
                {/* Email */}
                <View>
                  <View className="flex-row items-center mb-3"></View>

                  
                    <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
             <FormInput
                    value={value}
                    onChangeText={onChange}
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="text-base text-slate-900 font-medium"
                    placeholderTextColor="#94a3b8"
                  />
            )}
          />
                </View>

                {/* Phone */}
                <View>
                 
                  <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { value, onChange } }) => (
              <FormInput
                    label="Phone Number"
                    onChangeText={onChange}
                    value={value}
                    keyboardType="phone-pad"
                    className="text-base text-slate-900 font-medium"
                    placeholderTextColor="#94a3b8"
                  />
            )}
          />
                </View>

                {/* Address */}
                <View>
                 
                   <Controller
            control={control}
            name="clinicAddress"
            render={({ field: { value, onChange } }) => (
              <FormInput
                    label="Clinic Address"
                    value={value}
                    placeholder="No Clinic Address"
                    onChangeText={onChange}
                    multiline
                    numberOfLines={4}
                    className="text-base text-slate-900 font-medium"
                    placeholderTextColor="#94a3b8"
                  />
            )}
          />
                </View>
              </View>
            </View>
          </View>

          {/* Security & Privacy */}

          {/* Save Changes */}
          <View className="mb-5">
            <TouchableOpacity
  activeOpacity={0.9}
  onPress={handleSubmit(onSubmit)}
  className="bg-primary py-3 px-6 rounded-2xl flex-row items-center justify-center shadow-xl"
  disabled={loading} // disable button while loading
>
  {loading ? (
    <ActivityIndicator  color="white" className="mr-2 w-8 h-8" />
  ) : (
    <Image className='w-8 h-8 mr-2' source={Icons.saveIcon} tintColor={"white"}/>
  )}
  <Text className="text-white text-base font-bold">
    Save All Changes
  </Text>
</TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
