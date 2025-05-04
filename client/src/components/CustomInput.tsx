import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

interface CustomInputProps {
  placeholder: string;
  icon: any;
  value: string;
  onChange: (text: string) => void;
}

const CustomInput = ({ placeholder, icon, value, onChange }:CustomInputProps) => {
  return (
    <TextInput
      onChangeText={onChange}
      keyboardAppearance="dark"
      placeholder={placeholder}
      value={value}
      mode="outlined"
      outlineColor="lightgray"
      left={<TextInput.Icon icon={() => <Image source={icon} style={{ width: 20, height:20 }} />} />}
      activeOutlineColor={"#a5a5a5"}
      placeholderTextColor={'#393d3f'}
      style={{ backgroundColor: "white" }}
      theme={{
        roundness: 12,
      }}
    />
  )
}

export default CustomInput

const styles = StyleSheet.create({})



 

