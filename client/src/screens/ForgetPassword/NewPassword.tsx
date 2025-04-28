import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icons from '@/utils/libs/constants/Icons'
import CustomPasswordInput from '@/components/CustomPasswordInput'
import CustomButton from '@/components/CustomButton'
import ReactNativeModal from 'react-native-modal'
import Images from '@/utils/libs/constants/Images'
import CustomSecondaryButton from '@/components/CustomSecondaryButton'



const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)

  return (
    <SafeAreaView className='px-4 min-h-screen bg-white'>
      <TouchableOpacity activeOpacity={.90} onPress={() => navigation.goBack()}
          className='my-6 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full'>
            <Image className='w-8 h-8 object-cover'source={Icons.leftIcon}/>
          </TouchableOpacity>
      <Text className='text-2xl  font-semibold'>Set a new passswrod</Text>
      <Text className='text-base mt-4'>Create a new password. Ensure it differs from
        previous ones for security</Text>
      <View className='gap-4 mt-5'>
        <CustomPasswordInput placeholder={'Password'} value={password} onChange={setPassword} />

        <CustomPasswordInput placeholder={'Confirm Password'} value={confirmPassword} onChange={setConfirmPassword} />


        <View className='mt-6'>
          <CustomButton label='Update Password' onPress={() => setShowModal(!showModal)} />
        </View>
        <ReactNativeModal
        onBackdropPress={()=>setShowModal(!showModal) }
          isVisible={showModal}>
          <View className='bg-white items-center rounded-2xl py-10'>
            <Image className='w-40 h-40' source={Images.shield} />
            <Text className='text-gray-500 mt-8'>Your Password has been reset</Text>
            <View className='mt-5 w-full my-5'>
              <CustomSecondaryButton label='Continue' onPress={()=> setShowModal(!showModal)} />
            </View>
          </View>
        </ReactNativeModal>
      </View>
    </SafeAreaView>
  )
}

export default NewPassword

const styles = StyleSheet.create({})