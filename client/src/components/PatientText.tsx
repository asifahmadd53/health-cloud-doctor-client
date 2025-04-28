import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PatientText = ({label,item}) => {
  return (
    <View className='flex-row gap-4'>
          <Text className='text-lg md:text-2xl font-semibold'>{label}</Text>
          <Text className='text-base md:text-2xl'>{item}</Text>
    </View>
  )
}

export default PatientText

const styles = StyleSheet.create({})