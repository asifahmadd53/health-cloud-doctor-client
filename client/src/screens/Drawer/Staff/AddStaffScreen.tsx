import {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Card from '../../../components/Doctor/Card';
import FormInput from '../../../components/Doctor/FormInput';
import axios from 'axios';
import {BASE_URL} from '../../../api/api';
import Icons from '../../../utils/libs/constants/Icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../../utils/toastUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';

export type RootStackParamList = {
  MainTabs: undefined;
  Schedule: undefined;
  AddStaff: undefined;
  EditStaff: {staffId: string};
  StaffDetails: {staffId: string};
};
type AddStaffScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

interface StaffForm {
  name: string;
  role: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  bio: string;
  profileImage: string | null;
}

const AddStaffScreen = () => {
  const navigation = useNavigation<AddStaffScreenNavigationProp>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: {errors},
  } = useForm<StaffForm>({
    defaultValues: {
      name: '',
      role: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      bio: '',
      profileImage: '',
    },
  });

  const handleImageSelected = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.8, maxHeight: 2000, maxWidth: 2000},
      response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.[0]
        ) {
          const selectedImage = response.assets[0];
          if (selectedImage.uri) {
            setValue('profileImage', selectedImage.uri);
          }
        } else if (response.errorCode) {
          console.log('Gallery Error: ', response.errorMessage);
        }
      },
    );
  };

  const onSubmit = async (values: StaffForm) => {
    try {
      setLoading(true);

      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        showToast('error', 'User not found. Please login again.');
        return;
      }

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'profileImage' && value?.startsWith('file://')) {
          formData.append(key, {
            uri: value,
            type: 'image/jpeg',
            name: 'profile.jpg',
          } as any);
        } else {
          formData.append(key, value as string);
        }
      });

      const response = await axios.post(
        `${BASE_URL}/staff/add-staff`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${storedToken}`,
          },
        },
      );

      if (response?.data?.success) {
        showToast('success', 'Profile updated successfully!');
      } else {
        showToast(
          'error',
          response?.data?.message || 'Failed to update profile',
        );
      }
    } catch (error: any) {
      showToast('error', 'Something went wrong while updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? "padding" :"height"}
      style={{flex:1}}
      >
        <Header title='Add Staff'/>
    <ScrollView
          className="px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
            <View className="items-center">
              <View className="mb-3">
                <Pressable
                  onPress={handleImageSelected}
                  className="w-24 h-24 rounded-full items-center justify-center bg-slate-100 border border-slate-200 shadow-lg overflow-hidden">
                  <Controller
                    control={control}
                    name="profileImage"
                    render={({field: {value}}) =>
                      value ? (
                        <Image
                          source={{uri: value}}
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <Image
                          source={Icons.profileIcon}
                          className="w-24 h-24"
                          resizeMode="contain"
                        />
                      )
                    }
                  />
                </Pressable>
                <Pressable
                  onPress={handleImageSelected}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full items-center justify-center shadow-lg">
                  <Image
                    source={Icons.camera}
                    className="w-4 h-4"
                    tintColor={'white'}
                  />
                </Pressable>
              </View>
            </View>

            <Controller
              control={control}
              name="name"
              rules={{required: 'Name is required'}}
              render={({field: {value, onChange}}) => (
                <FormInput
                  label="Full Name"
                  placeholder="Enter full name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="role"
              rules={{required: 'Role is required'}}
              render={({field: {value, onChange}}) => (
                <FormInput
                  label="Role"
                  placeholder="e.g. Nurse, Medical Assistant"
                  value={value}
                  onChangeText={onChange}
                  error={errors.role?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{required: 'Email is required'}}
              render={({field: {value, onChange}}) => (
                <FormInput
                  label="Email"
                  placeholder="example@email.com"
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={onChange}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{required: 'Password is required'}}
              render={({field: {value, onChange}}) => (
                <FormInput
                  label="Password"
                  placeholder="Enter password"
                  value={value}
                  autoCapitalize="none"
                  secureTextEntry
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              rules={{required: 'Phone is required'}}
              render={({field: {value, onChange}}) => (
                <FormInput
                  label="Phone Number"
                  value={value}
                  placeholder="(555) 123-4567"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({field: {value, onChange}}) => (
                <FormInput
                  label="Address"
                  value={value}
                  placeholder="Enter address"
                  onChangeText={onChange}
                  multiline
                  numberOfLines={2}
                  error={errors.address?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="bio"
              render={({field: {value, onChange}}) => (
                <FormInput
                  label="Bio"
                  value={value}
                  placeholder="Brief description or notes"
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                  error={errors.bio?.message}
                />
              )}
            />

            <View className="mb-5">
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleSubmit(onSubmit)}
                className="bg-primary py-3 px-6 rounded-2xl flex-row items-center justify-center shadow-xl"
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator className="w-8 h-8 mr-2" color="white" style={{marginRight: 8}} />
                ) : (
                  <Image
                    className="w-8 h-8 mr-2"
                    source={Icons.saveIcon}
                    tintColor="white"
                  />
                )}
                <Text className="text-white text-base font-bold">
                  Save All Changes
                </Text>
              </TouchableOpacity>
            </View>
          
        
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddStaffScreen;
