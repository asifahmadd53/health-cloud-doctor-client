import { View, Text, Image, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Icons from '@/utils/libs/constants/Icons';
import Images from '@/utils/libs/constants/Images';


const SignUpComplete = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-white min-h-full px-4">
      <TouchableOpacity activeOpacity={.90} onPress={() => navigation.goBack()}
                      className='my-6 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full'>
                        <Image className='w-8 h-8 object-cover'source={Icons.leftIcon}/>
                      </TouchableOpacity>
      <View style={{ width: 300, height: 300 }} className="mx-auto mt-10">
        <View>
          <Text className="text-3xl font-semibold text-center">Sign up complete</Text>
        </View>
        <Image
          className={`object-cover ${Platform.OS === 'web' ? 'w-[300px] h-[200px]' : 'w-full h-full'}`}
          source={Images.signUpComplete}
        />
      </View>
      
      <View>
        <Text className="text-base font-medium text-center pt-10 px-4">
          Your account is under review and will be approved within 3 days via email/phone. Thank you for your patience.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpComplete;
