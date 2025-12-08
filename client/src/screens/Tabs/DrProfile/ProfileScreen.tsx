import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput as RNTextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FormInput from '../../../components/Doctor/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../api/api';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import Icons from '../../../utils/libs/constants/Icons';
import Header from '../../../components/Header';
import { Controller, useForm } from 'react-hook-form';
import { showToast } from '../../../utils/toastUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import FormSelectTrigger from '../../../components/FormSelectTrigger';

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [sheetTitle, setSheetTitle] = useState('');
  const [sheetData, setSheetData] = useState<string[]>([]);
  const [sheetField, setSheetField] = useState<'specialty' | 'city'>(
    'specialty',
  );
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  type ProfileFormValues = {
    name: string;
    specialty?: string;
    years?: string;
    consultationFee?: string;
    certifications?: string;
    professionalBio?: string;
    email: string;
    phoneNumber: string;
    clinicAddress?: string;
    city?: string;
    profileImage?: string;
  };

  const navigation = useNavigation();

  const { control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ProfileFormValues>({
    defaultValues: {
      name: '',
      specialty: '',
      years: '',
      consultationFee: '',
      certifications: '',
      professionalBio: '',
      email: '',
      phoneNumber: '',
      clinicAddress: '',
      profileImage: '',
      city: '',
    },
    mode: 'onSubmit',
  });

  const renderSingleItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setValue(sheetField, item); // overwrite
          bottomSheetRef.current?.close();
        }}
        className="flex-row items-center justify-between py-3 px-4">
        <Text className="text-base text-slate-800">{item}</Text>
        {watch(sheetField) === item && (
          <MaterialIcons name="check" size={20} color="#2895cb" />
        )}
      </TouchableOpacity>
    ),
    [sheetField, setValue, watch],
  );

  const SPECIALITIES = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Oncology',
    'Orthopedics',
    'Gastroenterology',
    'Urology',
    'Radiology',
    'General Practice',
    'Internal Medicine',
    'Family Medicine',
    'Endocrinology',
    'Pulmonology',
    'Nephrology',
    'Rheumatology',
    'Hematology',
    'Infectious Diseases',
    'Allergy & Immunology',
    'Ophthalmology',
    'Otolaryngology (ENT)',
    'Psychiatry',
    'Psychology',
    'Anesthesiology',
    'Emergency Medicine',
    'Critical Care Medicine',
    'Geriatrics',
    'Obstetrics & Gynecology',
    'Reproductive Medicine',
    'Plastic Surgery',
    'General Surgery',
    'Vascular Surgery',
    'Neurosurgery',
    'Pediatric Surgery',
    'Thoracic Surgery',
    'Dental Surgery',
    'Sports Medicine',
    'Physical Medicine & Rehabilitation',
    'Nutrition & Dietetics',
    'Pathology',
    'Radiation Oncology',
    'Pain Management',
    'Sleep Medicine',
    'Occupational Medicine',
    'Public Health',
    'Traditional Chinese Medicine',
    'Homeopathy',
  ];

  const CITIES = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Gujranwala',
    'Sialkot',
  ];

  const openPicker = useCallback(
    (field: 'specialty' | 'city', title: string) => {
      setSheetField(field);
      setSheetTitle(title);
      setSheetData(field === 'specialty' ? SPECIALITIES : CITIES);
      bottomSheetRef.current?.snapToIndex(0);
    },
    [],
  );

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const toggleItem = useCallback(
    (item: string) => {
      const rawValue = watch(sheetField);
      const safeValue = typeof rawValue === 'string' ? rawValue : '';
      const selected = safeValue ? safeValue.split(',').map(s => s.trim()) : [];
      const idx = selected.indexOf(item);

      if (idx > -1) selected.splice(idx, 1);
      else selected.push(item);

      setValue(sheetField, selected.join(', ')); // react-hook-form
    },
    [sheetField, setValue, watch],
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      const rawValue = watch(sheetField);
      const safeValue = typeof rawValue === 'string' ? rawValue : '';

      const selected = safeValue.split(',').map(s => s.trim());
      const isSelected = selected.includes(item);

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => toggleItem(item)}
          className="flex-row items-center justify-between py-3 px-4">
          <Text className="text-base text-slate-800">{item}</Text>
          {isSelected && (
            <MaterialIcons name="check" size={20} color="#2895cb" />
          )}
        </TouchableOpacity>
      );
    },
    [sheetField, watch, toggleItem],
  );

  const nameValue = watch('name');
  const specialtyValue = watch('specialty');

  const handleImageSelected = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8, maxHeight: 2000, maxWidth: 2000 },
      response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.[0]
        ) {
          const selectedImage = response.assets[0];
          setValue('profileImage', selectedImage.uri); // react-hook-form
        } else if (response.errorCode) {
          console.log('Gallery Error: ', response.errorMessage);
        }
      },
    );
  };

  const onSubmit = async (values: ProfileFormValues) => { 
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

      const response = await axios.patch(
        `${BASE_URL}/doctors/update-doctor`,
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
      console.log('🔥 AXIOS ERROR:', error.response?.data || error.message);
      showToast('error', 'Something went wrong while updating profile');
    } finally {
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

        const response = await axios.get(
          `${BASE_URL}/doctors/get-doctor/${doctorId}`,
        );
        if (!response.data.success) return;

        const { doctor, profile } = response.data;

        const formValues = {
          name: doctor.name,
          email: doctor.email,
          phoneNumber: doctor.phoneNumber,
          profileImage: profile?.profileImage || '',
          specialty: profile?.specialty || '',  
          years: profile?.years || '',
          consultationFee: profile?.consultationFee || '',
          certifications: profile?.certifications || '',
          professionalBio: profile?.professionalBio || '',
          clinicAddress: profile?.clinicAddress || '',
          city: profile?.city || '',  
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView
          className="px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="bg-white pt-6 pb-10">
            <View className="px-8">
              <View className="items-center">
                <View className="mb-3">
                  <Pressable
                    onPress={handleImageSelected}
                    className="w-24 h-24 rounded-full items-center justify-center bg-slate-100 border border-slate-200 shadow-lg overflow-hidden">
                    <Controller
                      control={control}
                      name="profileImage"
                      render={({ field: { value } }) =>
                        value ? (
                          <Image
                            source={{ uri: value }}
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

                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  className="text-2xl font-bold text-slate-900 mb-2 tracking-normal">
                  {nameValue || 'Your Name'}
                </Text>

                <View className="bg-slate-100 px-4 py-2 rounded-full mb-8">
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    className="text-base font-semibold text-slate-600">
                    {specialtyValue || 'Medical Specialist'}
                  </Text>
                </View>
                <View className="w-full max-w-sm">
                  <TouchableOpacity
                    activeOpacity={0.9}
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
                      rules={{ required: 'Full Name is required' }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <FormInput
                          label="Full Name"
                          value={value}
                          onChangeText={onChange}
                          error={error?.message}
                        />
                      )}
                    />
                  </View>

                  <View className="flex-row space-x-4">
                    <View className="flex-1 mr-2">
                      <Controller
                        control={control}
                        name="specialty"
                        rules={{ required: 'Specialty is required' }}
                        render={({ field: { value }, fieldState: { error } }) => (
                          <FormSelectTrigger
                            label="Specialty"
                            value={value}
                            placeholder="Select Specialties"
                            onPress={() => openPicker('specialty', 'Select Specialties')}
                            error={error?.message}
                          />
                        )}
                      />
                    </View>
                    <View className="flex-[0.50]">
                      <Controller
                        control={control}
                        name="years"
                        rules={{ required: 'Years of experience is required' }}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                          <FormInput
                            label="Years"
                            value={value}
                            onChangeText={onChange}
                            placeholder="e.g., 5"
                            keyboardType="numeric"
                            error={error?.message}
                          />
                        )}
                      />
                    </View>
                  </View>

                  <View>
                    <Controller
                      control={control}
                      name="consultationFee"
                      rules={{ required: 'Consultation Fee is required' }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <FormInput
                          label="Consultation Fee in PKR"
                          value={value}
                          onChangeText={onChange}
                          placeholder="Enter Fee"
                          keyboardType="numeric"
                          error={error?.message}
                        />
                      )}
                    />
                  </View>

                  <View>
                    <Controller
                      control={control}
                      name="certifications"
                      rules={{ required: 'Certifications are required' }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <FormInput
                          label="Certifications"
                          placeholder="Add your certifications"
                          value={value}
                          onChangeText={onChange}
                          multiline
                          numberOfLines={4}
                          error={error?.message}
                        />
                      )}
                    />
                  </View>

                  <View>
                    <Controller
                      control={control}
                      name="professionalBio"
                      rules={{ required: 'Professional Bio is required' }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <FormInput
                          label="Professional Bio"
                          placeholder="Add your professional summary"
                          value={value}
                          onChangeText={onChange}
                          multiline
                          numberOfLines={4}
                          error={error?.message}
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
                      rules={{
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: 'Enter a valid email address',
                        },
                      }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <FormInput
                          label="Email"
                          value={value}
                          onChangeText={onChange}
                          placeholder="Enter your email"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          error={error?.message}
                        />
                      )}
                    />

                  </View>

                  <View>
                    <Controller
                      control={control}
                      name="phoneNumber"
                      rules={{
                        required: 'Phone Number is required',
                        minLength: { value: 10, message: 'Enter a valid phone number' },
                      }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <FormInput
                          label="Phone Number"
                          value={value}
                          onChangeText={onChange}
                          placeholder="Enter your phone number"
                          keyboardType="phone-pad"
                          error={error?.message}
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

                  <Controller
                    control={control}
                    name="city"
                    rules={{ required: 'City is required' }}
                    render={({ field: { value }, fieldState: { error } }) => (
                      <FormSelectTrigger
                        label="City"
                        value={value}
                        placeholder="Select City"
                        onPress={() => openPicker('city', 'Select City')}
                        error={error?.message}
                      />
                    )}
                  />
                </View>
              </View>
            </View>

            {/* Save Changes */}
            <View className="mb-5">
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleSubmit(onSubmit)}
                className="bg-primary py-3 px-6 rounded-2xl flex-row items-center justify-center shadow-xl"
                disabled={loading} // disable button while loading
              >
                {loading ? (
                  <ActivityIndicator color="white" className="mr-2 w-8 h-8" />
                ) : (
                  <Image
                    className="w-8 h-8 mr-2"
                    source={Icons.saveIcon}
                    tintColor={'white'}
                  />
                )}
                <Text className="text-white text-base font-bold">
                  Save All Changes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        
      </KeyboardAvoidingView>
      <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={['95%']}
          enablePanDownToClose
          onClose={closeSheet}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: 'white' }}>
          <BottomSheetScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
            <Text className="text-xl font-bold text-center mb-4">
              {sheetTitle}
            </Text>

            <BottomSheetFlatList
              data={sheetData}
              keyExtractor={item => item}
              renderItem={
                sheetField === 'specialty' ? renderItem : renderSingleItem
              }
              ItemSeparatorComponent={() => (
                <View className="h-px bg-slate-200" />
              )}
              scrollEnabled={false}
            />
          </BottomSheetScrollView>
        </BottomSheet>
    </SafeAreaView>
  );
};

export default ProfileScreen;
