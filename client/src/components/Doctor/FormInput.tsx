import type React from "react"
import { View, Text, TextInput } from "react-native"
import type { TextInputProps } from "react-native"


type FormInputProps = TextInputProps & {
  label: string
  error?: string
  className?: string
}


const FormInput: React.FC<FormInputProps> = ({ label, error, className, ...props }) => {
  return (
    <View className={`mb-4 ${className || ""}`}>
      <Text className="text-gray-700 font-medium mb-1.5">{label}</Text>
      <TextInput
        
        className={`border rounded-lg p-3 py-4 text-gray-800 ${
          error ? "border-red-500" : "border-gray-300"
        } ${props.multiline ? "min-h-[100px] text-top" : ""}`}
        placeholderTextColor="#9ca3af"
        selectionColor={'#111827'}
        {...props}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  )
}

export default FormInput
