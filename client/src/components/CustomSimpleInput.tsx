import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const CustomSimpleInput = ({ label, placeholder, value, onChange }) => {
  return (
    <View className="mb-3">
      <Text className="text-base font-semibold mb-2">{label}</Text>
      <TextInput
        onChangeText={onChange}
        keyboardAppearance="dark"
        placeholder={placeholder}
        value={value}
        mode="outlined"
        outlineColor="lightgray"
        activeOutlineColor="gray"
        style={{ backgroundColor: 'white', fontSize: 14 }}
        theme={{
          roundness: 12,
          colors: { placeholder: 'gray' },
        }}
      />
    </View>
  );
};

export default CustomSimpleInput;
