import { StyleSheet, View, Pressable, Text } from "react-native"
import { useState } from "react"
import { Input } from "@rneui/themed"
import Icon from "react-native-vector-icons/Ionicons"

interface CustomPasswordInputProps {
  placeholder: string
  value: string
  onChange: (text: string) => void
  error?: string
  label?: string
}

const CustomPasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  ...rest
}: CustomPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={{ width: "100%" }}>
     
       {label ? (
  <Text className="text-base font-semibold text-gray-700 mb-2">
    {label}
  </Text>
) : null}

      <Input
        secureTextEntry={!showPassword}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        cursorColor="#2895cb"
        leftIcon={
          <Icon
            name="lock-closed-outline"
            size={20}
            color={isFocused ? "#2895cb" : "#6b7280"} // Tailwind gray-500
          />
        }
        rightIcon={
          <Pressable
            onPress={() => setShowPassword(prev => !prev)}
            hitSlop={10}
          >
            <Icon
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={isFocused ? "#2895cb" : "#6b7280"}
            />
          </Pressable>
        }
        inputContainerStyle={{
          borderRadius: 7,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: isFocused ? "#2895cb" : "#d1d5db",
          paddingHorizontal: 10,
          paddingVertical: 2,
        }}
        inputStyle={{
          fontSize: 16,
          color: "black",
        }}
        containerStyle={{
          paddingHorizontal: 0,
        }}
        errorMessage={error}
        placeholderTextColor="#9ca3af"
        {...rest}
      />
    </View>
  )
}

export default CustomPasswordInput
