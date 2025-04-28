import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'

const OTP = ({navigation}:any) => {
  return (
    <SafeAreaView className='px-4'>
      <Text className='text-2xl pt-10'>Check Your SMS</Text>
      <Text className='text-base mt-5'>We sent a OTP to 03223983
      enter 5 digit code that mentioned in the email</Text>
      <View className="flex-row gap-4 justify-center items-center mt-5">
  {[...Array(4)].map((_, index) => (
    <TextInput
    activeUnderlineColor="#5aa9e6"
    underlineColor=""
      key={index}
      style={{width:50,height:50, fontSize: 20,backgroundColor: '#F5F5F5' }}
      className=" border-gray-300 rounded-md items-center justify-center"
      keyboardType="numeric"
      maxLength={1}
    />
  ))}
</View>
<Pressable
                  className="bg-[#5aa9e6] w-80 max-w-96 mx-auto mt-8 rounded-2xl"
                  accessible
                  accessibilityLabel="Login"
                >
                  <Text onPress={()=>navigation.navigate('') } className="text-white text-xl text-center py-3 font-semibold">
                    Reset Password
                  </Text>
                </Pressable>
    </SafeAreaView>
  )
}

export default OTP

const styles = StyleSheet.create({})