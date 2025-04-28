import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { IconButton, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icons from '@/utils/libs/constants/Icons'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'




const ForgetPassword = () => {

  const navigation = useNavigation()
  const [phone, setPhone] = useState('')
  return (
    <SafeAreaView className='px-4 bg-white flex-1'>
      <TouchableOpacity activeOpacity={.90} onPress={() => navigation.goBack()}
      className='my-6 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full'>
        <Image className='w-8 h-8 object-cover'source={Icons.leftIcon}/>
      </TouchableOpacity>
      <Text className='text-2xl font-semibold '>Forget Password</Text>
      <Text className='text-base pt-2 text-gray-600'>Please enter your phone # to reset the password</Text>
      <View className='pt-1'>
        <View className=''>
          <Text className='text-base font-semibold my-3'>Phone #</Text>
          <CustomInput
            onChange={setPhone}
            placeholder={'Enter your phone #'}
            value={phone}
            icon={Icons.phone}
          />
        </View>
        <View className='mt-8'>
          <CustomButton label='Reset Password' link='new-password' />
        </View>
      </View>
      
    </SafeAreaView>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({})