import { View, Text, Image, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../utils/libs/constants/Images';
import Header from '../../components/Header';

const SignUpComplete = () => {
  return (
    <SafeAreaView className="bg-white min-h-full">
      <Header title='Sign up complete'/>
      <View style={{ width: 300, height: 300 }} className="mx-auto mt-10">
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
