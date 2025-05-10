"use client"

import { StyleSheet, Image, View, type ImageSourcePropType } from "react-native"
import { TextInput, HelperText } from "react-native-paper"
import type { TextInputProps } from "react-native-paper"

interface CustomInputProps extends Omit<TextInputProps, "theme" | "left" | "right" | "onChange"> {
  placeholder: string
  icon: ImageSourcePropType
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
  placeholder,
  icon,
  value,
  onChange,
  error,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "sentences",
  ...rest
}: CustomInputProps) => {
  return (
    <View>
      <TextInput
        onChangeText={onChange}
        keyboardAppearance="dark" // Keeping original dark keyboard
        placeholder={placeholder}
        value={value}
        mode="outlined"
        outlineColor={ "#e5e5e5"} // Lighter gray for default state
        activeOutlineColor={"#9ca3af"} // Darker gray for active state
        left={<TextInput.Icon icon={() => <Image source={icon} style={styles.iconStyle} />} />}
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        cursorColor="black"
        placeholderTextColor="gray"
        theme={{
          roundness: 12,
          colors: {
           
            text: "#000", // Keeping original black text
            error: "#ef4444",
          },
        }}
        error={!!error}
        {...rest}
      />
      {/* {error ? (
        <HelperText type="error" visible={!!error} style={styles.errorText}>
          {error}
        </HelperText>
      ) : null} */}
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  errorText: {
    marginTop: -4,
    marginBottom: 4,
    fontSize: 12,
  },
})
