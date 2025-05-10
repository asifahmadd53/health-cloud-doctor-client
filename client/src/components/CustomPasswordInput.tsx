"use client"

import { StyleSheet, Image, View } from "react-native"
import { useState } from "react"
import { TextInput, HelperText } from "react-native-paper"
import Icons from "../utils/libs/constants/Icons"

interface CustomPasswordInputProps {
  placeholder: string
  value: string
  onChange: (text: string) => void
  error?: string
}

const CustomPasswordInput = ({ placeholder, value, onChange, error }: CustomPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        mode="outlined"
        outlineColor={"lightgray"} // Keeping original lightgray
        activeOutlineColor={ "gray"} // Keeping original gray
        secureTextEntry={!showPassword}
        placeholderTextColor="gray"
        left={<TextInput.Icon icon={() => <Image source={Icons.locker} style={styles.iconStyle} />} />}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye" : "eye-off"} // Using built-in icons as in original
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        style={styles.input}
        theme={{
          roundness: 12,
          colors: {
            placeholder: "#a9a9a9", // Matching CustomInput
            text: "#000", // Matching CustomInput
            error: "#ef4444",
          },
        }}
        error={!!error}
      />
      {/* {error ? (
        <HelperText type="error" visible={!!error} style={styles.errorText}>
          {error}
        </HelperText>
      ) : null} */}
    </View>
  )
}

export default CustomPasswordInput

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    fontSize: 16,
  },
  iconStyle: {
    width: 30, // Keeping original size
    height: 30, // Keeping original size
    resizeMode: "contain",
  },
  errorText: {
    marginTop: -4,
    marginBottom: 4,
    fontSize: 12,
  },
})
