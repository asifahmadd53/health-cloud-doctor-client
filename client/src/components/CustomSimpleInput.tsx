import React from 'react';
import { Text, View } from 'react-native';
import { TextInput, type TextInputProps } from 'react-native-paper';

interface CustomSimpleInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  numberOfLines?: number;
}

const CustomSimpleInput = ({
  label,
  placeholder,
  value,
  numberOfLines,
  onChange,
  ...rest
}: CustomSimpleInputProps) => {
  return (
    <View className="mb-3">
      <Text className="text-base font-semibold mb-2">{label}</Text>
      <TextInput
        onChangeText={onChange}
        keyboardAppearance="dark"
        placeholder={placeholder}
        multiline={!!numberOfLines && numberOfLines > 1}
        value={value}
        mode="outlined"
        outlineColor="lightgray"
        activeOutlineColor="transparent"
        style={{ backgroundColor: 'white', fontSize: 14 }}
        theme={{
          roundness: 12,
          colors: { placeholder: 'gray' },
        }}
        {...rest} // Pass additional props
      />
    </View>
  );
};

export default CustomSimpleInput;
