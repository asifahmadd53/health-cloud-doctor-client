import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface PatientTextProps {
  label: string;
  item: string | number;
}

const PatientText = ({label,item}:PatientTextProps) => {
  return (
    <View className='flex-row gap-4'>
          <Text className='text-lg md:text-2xl font-semibold'>{label}</Text>
          <Text className='text-base md:text-2xl'>{item}</Text>
    </View>
  )
}

export default PatientText

const styles = StyleSheet.create({})