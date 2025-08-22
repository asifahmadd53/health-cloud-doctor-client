import { Text, View } from "react-native"
import { Input } from "@rneui/themed"
import type { TextInputProps } from "react-native-paper"
import { useState } from "react"
import Icon from "react-native-vector-icons/Ionicons"

export interface CustomInputProps
  extends Omit<TextInputProps, "theme" | "left" | "right" | "onChange"> {
  label?: string
  placeholder: string
  icon?: string
  iconStyle?: {
    size?: number
    color?: string
    focusColor?: string // ✅ New color on focus
    marginRight?: number
  }
  value: string
  onChange: (text: string) => void
  error?: string
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad"
    | "url"
    | "web-search"
  secureTextEntry?: boolean
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
}

const CustomInput = ({
  label,
  placeholder,
  icon,
  iconStyle = {
    size: 20,
    color: "gray",
    focusColor: "#2895cb",
    marginRight: 8,
  },
  value,
  onChange,
  error,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "sentences",
  ...rest
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
    {label ? (
  <Text className="text-base font-semibold text-gray-700 mb-2">
    {label}
  </Text>
) : null}
    <Input
      labelStyle={{
        fontSize: 14,
        fontWeight: "600", 
        marginBottom: 8,
        color: "black",
      }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      cursorColor="#2895cb"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      leftIcon={
        icon ? (
          <View style={{ marginRight: iconStyle.marginRight ?? 8 }}>
            <Icon
              name={icon}
              size={iconStyle.size ?? 20}
              color={isFocused ? iconStyle.focusColor : iconStyle.color}
            />
          </View>
        ) : undefined
      }
      inputContainerStyle={{
        borderRadius: 7,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: isFocused ? "#2895cb" : "#d1d5db",
        paddingHorizontal: 10,
        paddingVertical:0,
      }}
      inputStyle={{
        fontSize: 16,
        color: "black",
      }}
      containerStyle={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      }}
      errorMessage={error}
      placeholderTextColor="#9ca3af"
      {...rest}
    />
    </>
  )
}

export default CustomInput
