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
import CustomButton from '../../../components/CustomButton';
import Header from '../../../components/Header';

const ProfileScreen = () => {
  type Profile = {
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
  const [profile, setProfile] = useState<Profile>({
    name: '',
    specialty: '',
    years: '',
    certifications: '',
    professionalBio: '',
    email: '',
    phoneNumber: '',
    clinicAddress: '',
    profileImage: '',
  });

  // State for password management
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    // Length check
    if (password.length >= 8) strength += 0.25;
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 0.25;
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 0.25;
    // Contains number or special char
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 0.25;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(passwordData.newPassword);

  // Handle profile field changes
  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({...prev, [field]: value}));
  };

  // Handle image selection
  // const handleImageSelected = (uri: string) => {
  //   setProfile((prev) => ({ ...prev, profileImage: uri }))
  // }

  const handleImageSelected = () => {
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
          const selectedImage = response.assets[0];
          setProfile(prev => ({
            ...prev,
            profileImage: selectedImage.uri, // save the URI for display
            fullObject: selectedImage, // optional, keep full object if needed
          }));
        } else if (response.errorCode) {
          console.log('Gallery Error: ', response.errorMessage);
        }
      },
    );
  };

  // Handle save profile
  const handleSave = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      const doctorId = parsedUser._id;

      const formData = new FormData();

      formData.append('name', profile.name);
      formData.append('specialty', profile.specialty);
      formData.append('years', profile.years);
      formData.append('certifications', profile.certifications);
      formData.append('professionalBio', profile.professionalBio);
      formData.append('email', profile.email);
      formData.append('phoneNumber', profile.phoneNumber);
      formData.append('clinicAddress', profile.clinicAddress);

      if (profile.profileImage && profile.profileImage.startsWith('file://')) {
        const image = {
          uri: profile.profileImage,
          type: 'image/jpeg', // or "image/png"
          name: 'profile.jpg',
        };
        formData.append('profileImage', image as any);
      }

      const response = await axios.patch(
        `${BASE_URL}/doctors/update-doctor/${doctorId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.success) {
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      Alert.alert('Error', 'Something went wrong while updating profile');
    }
  };

  // Handle password update
  const handleUpdatePassword = () => {
    // Validate passwords
    if (!passwordData.currentPassword) {
      Alert.alert('Error', 'Please enter your current password');
      return;
    }
    if (!passwordData.newPassword) {
      Alert.alert('Error', 'Please enter a new password');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert('Error', "New passwords don't match");
      return;
    }
    if (passwordStrength < 0.5) {
      Alert.alert(
        'Weak Password',
        'Your password is not strong enough. Please include uppercase, lowercase, numbers, and special characters.',
      );
      return;
    }

    // Success case
    Alert.alert('Success', 'Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // Navigate to schedule screen
  const navigateToSchedule = () => {
    navigation.navigate('ScheduleScreen' as never);
  };

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const doctorId = parsedUser._id;
          const response = await axios.get(
            `${BASE_URL}/doctors/get-doctor/${doctorId}`,
          );
          const data = response.data;
          setProfile(prev => ({
            ...prev,
            ...data.doctor, // assuming backend returns { doctor: {...} }
          }));
        }
      } catch (err) {
        console.log('Error fetching doctor');
      }
    };
    getDoctor();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
        <Header title='Profile'/>
      <ScrollView
        className="flex-1 px-5 bg-slate-50"
        showsVerticalScrollIndicator={false}>
        {/* Premium Header */}
        <View className="bg-white pt-6 pb-10">
          <View className="px-8">
            <View className="items-center">
             <View className="mb-3">
  <Pressable
                  onPress={handleImageSelected}
                  className="w-24 h-24 rounded-full items-center justify-center bg-slate-100 border border-slate-200 shadow-lg overflow-hidden"
                >
                  {profile.profileImage ? (
                    <Image
                      source={{ uri: profile.profileImage }}
                      className="w-full h-full rounded-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="items-center justify-center w-full h-full">
                      <Image source={Icons.profileIcon} className="w-[6.5rem] h-[6.5rem]" resizeMode="contain" />
                    </View>
                  )}
                </Pressable>
                <Pressable onPress={handleImageSelected} className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full items-center justify-center shadow-lg">
                  <Image  source={Icons.camera} className='w-4 h-4' tintColor={"white"}/>
                  
                </Pressable>
</View>

              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                className="text-2xl font-bold text-slate-900 mb-2 tracking-normal">
                {profile.name}
              </Text>
              <View className="bg-slate-100 px-4 py-2 rounded-full mb-8">
                <Text ellipsizeMode="tail" numberOfLines={1} className="text-base font-semibold text-slate-600">
                  {profile.specialty || "Medical Specialist"}
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
                {/* <CustomButton /> */}
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
                  <FormInput
                    label="Full Name"
                    value={profile.name}
                    onChangeText={value => handleChange('name', value)}
                  />
                </View>

                <View className="flex-row space-x-4">
                  <View className="flex-1 mr-2">
                    <FormInput
                      label="Specialty"
                      placeholder="No specialty provided"
                      value={profile.specialty}
                      onChangeText={value => handleChange('specialty', value)}
                    />
                  </View>
                  <View className="w-32">
                    <FormInput
                      label="Years"
                      value={profile.years}
                      onChangeText={value => handleChange('experience', value)}
                      placeholder="Unknown"
                      keyboardType="numeric"
                      className="text-base text-slate-900 font-medium"
                      placeholderTextColor="#94a3b8"
                    />
                  </View>
                </View>

                <View>
                  <FormInput
                    label="Certifications"
                    placeholder="No Certifications"
                    value={profile.certifications}
                    onChangeText={value =>
                      handleChange('certifications', value)
                    }
                    multiline
                    numberOfLines={4}
                    className="text-base text-slate-900 font-medium min-h-20 "
                    placeholderTextColor="#94a3b8"
                  />
                </View>

                <View>
                  <FormInput
                    label="Professional Bio"
                    value={profile.professionalBio}
                    placeholder="No Professional Bio"
                    onChangeText={value => handleChange('bio', value)}
                    multiline
                    numberOfLines={4}
                    className="text-base text-slate-900 font-medium"
                    placeholderTextColor="#94a3b8"
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

                  <FormInput
                    value={profile.email}
                    onChangeText={value => handleChange('email', value)}
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="text-base text-slate-900 font-medium"
                    placeholderTextColor="#94a3b8"
                  />
                </View>

                {/* Phone */}
                <View>
                  <FormInput
                    label="Phone Number"
                    onChangeText={value => handleChange('phoneNumber', value)}
                    value={profile.phoneNumber}
                    keyboardType="phone-pad"
                    className="text-base text-slate-900 font-medium"
                    placeholderTextColor="#94a3b8"
                  />
                </View>

                {/* Address */}
                <View>
                  <FormInput
                    label="Clinic Address"
                    value={profile.clinicAddress}
                    placeholder="No Clinic Address"
                    onChangeText={value => handleChange('clinicAddress', value)}
                    multiline
                    numberOfLines={4}
                    className="text-base text-slate-900 font-medium"
                    placeholderTextColor="#94a3b8"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Security & Privacy */}

          {/* Save Changes */}
          <View className="mb-5">
            <TouchableOpacity
            activeOpacity={.90}
              onPress={handleSave}
              className="bg-primary py-3 px-6 rounded-2xl flex-row items-center justify-center shadow-xl">
              {/* <MaterialIcons name="save" size={24} color="white" /> */}
              <Image className='w-8 h-8' source={Icons.saveIcon} tintColor={"white"}/>
              <Text className="text-white text-base font-bold ml-2">
                Save All Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
