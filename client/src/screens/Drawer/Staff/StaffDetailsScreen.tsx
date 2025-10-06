'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/Doctor/Button';
import Card from '../../../components/Doctor/Card';
import Header from '../../../components/Header';
import axios from 'axios';
import { BASE_URL } from '../../../api/api';
import type { RootStackParamList } from './StaffScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '../../../utils/libs/constants/Icons';
import CustomSecondaryButton from '../../../components/CustomSecondaryButton';

type StaffDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'StaffDetails'
>;
type StaffDetailsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const StaffDetailsScreen = () => {
  const navigation = useNavigation<StaffDetailsScreenNavigationProp>();
  const route = useRoute<StaffDetailsScreenRouteProp>();
  const { staffId } = route.params;

  const [staffDetails, setStaffDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const getStaffDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/staff/get-staff/${staffId}`,
        {
          withCredentials: true,
        },
      );

      if (response.data && response.data.staff) {
        setStaffDetails(response.data.staff);
      } else {
        console.error('Unexpected API response format:', response.data);
        Alert.alert('Error', 'Received unexpected data format from server.');
      }
    } catch (error: any) {
      console.error(
        'Failed to fetch staff details:',
        error?.response?.data?.message || error.message,
      );
      Alert.alert(
        'Error',
        'Could not load staff details. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
  useCallback(() => {
    getStaffDetails(); 
  }, [staffId])
);

  const handleEdit = () => {
    navigation.navigate('EditStaff', { staffId });
  };

const handleDelete = async () => {
  try {
    setLoading(true);
    await axios.delete(`${BASE_URL}/staff/delete-staff/${staffId}`, {
      withCredentials: true,
    });

    navigation.goBack();
  } catch (error: any) {
    console.error(
      "Failed to delete staff:",
      error?.response?.data?.message || error.message
    );
  } finally {
    setLoading(false);
  }
};



  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 items-center justify-center">
        <Text className="text-gray-500 text-base">
          Loading staff details...
        </Text>
      </View>
    );
  }

  if (!staffDetails) {
    return (
      <View className="flex-1 bg-gray-100 items-center justify-center p-4">
        <Text className="text-gray-500 text-base mb-4">
          Staff member not found
        </Text>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          variant="primary"
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Staff Details" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView
          className="px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
       
            <Card>
              <View className="items-center p-4">
                {staffDetails.profileImage ? (
                  <Image
                    source={{ uri: staffDetails.profileImage }}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                ) : (
                  <View className="w-24 h-24 rounded-full bg-cyan-50 items-center justify-center mb-4">
                    <Text className="text-4xl font-bold text-cyan-600">
                      {staffDetails.name.charAt(0)}
                    </Text>
                  </View>
                )}
                <Text className="text-2xl font-bold text-gray-800 mb-2">
                  {staffDetails.name}
                </Text>
                <Text className="text-base text-cyan-600 font-medium mb-2">
                  {staffDetails.role}
                </Text>

                   <View className='mx-auto w-3/5'>
                   <CustomSecondaryButton label='Edit Profile' onPress={handleEdit} icon={Icons.editPencil} iconPosition='right' className='bg-secondary flex-row items-center justify-center shadow-xl mx-auto rounded-full py-3 px-4 text-center'/>
                   </View>
                   

              </View>
            </Card>
<View className="space-y-5">
      {/* Personal Info */}
      <Card className="p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
        <Text className="text-lg font-bold text-gray-900 mb-4">
          Personal Information
        </Text>

        <View className="border-b border-gray-200 pb-3 mb-3 flex-row items-center">
          <Ionicons name="person-circle-outline" size={20} color="#0891b2" />
          <Text className="ml-3 text-base text-gray-700 ">{staffDetails.name}</Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="briefcase-outline" size={20} color="#0891b2" />
          <Text className="ml-3 text-base text-gray-700">
            {staffDetails.role || "No role assigned"}
          </Text>
        </View>
      </Card>

      <Card className="p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
        <Text className="text-lg font-bold text-gray-900 mb-4">
          Contact Information
        </Text>

        <View className="border-b border-gray-200 pb-3 mb-3 flex-row items-center">
          <Ionicons name="mail-outline" size={20} color="#0891b2" />
          <Text className="ml-3 text-base text-gray-700">{staffDetails.email}</Text>
        </View>

        <View className="border-b border-gray-200 pb-3 mb-3 flex-row items-center">
          <Ionicons name="call-outline" size={20} color="#0891b2" />
          <Text className="ml-3 text-base text-gray-700">{staffDetails.phone}</Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={20} color="#0891b2" />
          <Text className="ml-3 text-base text-gray-700">
            {staffDetails.address || "No address provided"}
          </Text>
        </View>
      </Card>

      {/* Professional Info */}
      <Card className="p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
        <Text className="text-lg font-bold text-gray-900 mb-4">
          Professional Information
        </Text>

        <View>
          <Text className="text-base font-semibold text-gray-600 mb-2">Bio</Text>
          <Text className="text-base text-gray-700 leading-6">
            {staffDetails.bio || "No bio provided"}
          </Text>
        </View>
      </Card>
    </View>
           
            
          
        </ScrollView>
         <View  className="py-2 mx-auto w-full">
         {/* <TouchableOpacity
          
             onPress={handleDelete}
                     activeOpacity={.90}
                     className='bg-red-600 flex-row items-center justify-center shadow-xl mx-auto rounded-full py-3 px-4 w-4/5'
                    
                   >
                     <View className="flex-row items-center gap-2 justify-center">
                       <Image tintColor={"white"} source={Icons.deleteIcon} className="w-5 h-5 " />
                       <Text className="text-white text-xl text-center font-semibold ml-2">
                         Delete Profile
                       </Text>
                     </View>
                   </TouchableOpacity> */}
                   <CustomSecondaryButton onPress={handleDelete} className='bg-red-600 flex-row items-center justify-center shadow-xl mx-auto rounded-full py-3 px-4 w-4/5 text-center' icon={Icons.deleteIcon} label='Delete' />
                   </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StaffDetailsScreen;
