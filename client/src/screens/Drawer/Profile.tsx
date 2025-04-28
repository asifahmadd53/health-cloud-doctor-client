import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import Icons from '@/utils/libs/constants/Icons';
import Images from '@/utils/libs/constants/Images';
import CustomInput from '@/components/CustomInput';
import CustomPasswordInput from '@/components/CustomPasswordInput';
import CustomButton from '@/components/CustomButton';
import CustomSecondaryButton from '@/components/CustomSecondaryButton';


const Profile = () => {
  const navigation = useNavigation();


  const [fullName, setFullName] = useState('M. Ali');
  const [email, setEmail] = useState('ali@gmail.com');
  const [phone, setPhone] = useState('040324034');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // const pmdcimg = require('../../assets/icons/pmdcimg.png');

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     await ImagePicker.requestCameraPermissionsAsync();
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   };

  //   requestPermissions();
  // }, []);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: 'images',
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });
  
  //   if (!result.canceled && result.assets[0].uri) {
  //     setImage(result.assets[0].uri);
  //   }
  // };
  

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    className='flex-1 bg-white'>
        <KeyboardAvoidingView>
      <SafeAreaView className="px-5">
        <View className="flex-row items-center">
           <TouchableOpacity activeOpacity={.90} onPress={() => navigation.goBack()}
                          className='mt-6 mb-2 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full'>
                            <Image className='w-8 h-8 object-cover'source={Icons.leftIcon}/>
                          </TouchableOpacity>
        </View>
        <View>
          <View className="items-center">
            <Image resizeMode='contain' className="w-44 h-44" source={Images.doctor} />
            <Text className="text-lg font-semibold my-2">{fullName}</Text>
          </View>
          <View className="gap-5">
            <CustomInput
              placeholder="Update Full name"
              value={fullName}
              onChange={setFullName}
              icon={Icons.user}
            />
            <CustomInput
              placeholder="Update Email"
              value={email}
              onChange={setEmail}
              icon={Icons.email}
            />
            <CustomInput
              placeholder="Update Phone #"
              value={phone}
              onChange={setPhone}
              icon={Icons.phone}
            />
            <CustomPasswordInput
              placeholder="Update Password"
              value={password}
              onChange={setPassword}
            />
            <CustomPasswordInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
             
            />
          </View>

          <View>
            <Text className="text-base mt-8 ml-8">Update PMDC scan copy</Text>
            <View className="w-28 h-28 md:w-32 md:h-32 my-6 mx-auto mt-8">
              {/* <Pressable onPress={pickImage}>
                <Image
                  className="object-cover w-full h-full rounded-lg"
                  source={image ? { uri: image } : Images.addImage}
                />
              </Pressable> */}
            </View>
          </View>
         <View className='mb-8'>
         <CustomButton onPress={()=> setModalVisible(!modalVisible)} label={'Update Profile'} link={''}/>
         </View>
         <ReactNativeModal
         isVisible={modalVisible}
         >
          <View className='bg-white items-center py-8 rounded-2xl'>
            <Image className='w-40 h-40' resizeMode='contain' source={Images.doctor}/>
            <Text className='text-lg font-semibold mt-8 mb-4'>PRROFILE UPDATED</Text>
            <CustomSecondaryButton label={'View Now'} onPress={()=> setModalVisible(!modalVisible)} />
          </View>
         </ReactNativeModal>
        </View>
      </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Profile;
