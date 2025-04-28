import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Icons from '../utils/libs/constants/Icons';

const CustomPasswordInput = ({ placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      mode="outlined"
      outlineColor="lightgray"
      activeOutlineColor="gray"
      secureTextEntry={!showPassword}
      left={<TextInput.Icon icon={() => <Image source={Icons.locker} style={{ width: 30, height: 30 }} />} />}
      right={
        <TextInput.Icon 
          icon={showPassword ? 'eye' : 'eye-off'} 
          onPress={() => setShowPassword(!showPassword)} 
        />
      }
      style={{ backgroundColor: 'white' }}
      theme={{ roundness: 12 }}
    />
  );
};

export default CustomPasswordInput;

const styles = StyleSheet.create({});
