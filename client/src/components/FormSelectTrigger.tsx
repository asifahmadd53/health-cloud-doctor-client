import type React from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import type { TextInputProps } from 'react-native'

type Props = Omit<TextInputProps, 'editable' | 'onChangeText'> & {
    label?: string
    error?: string
    className?: string
    onPress?: () => void
}

const FormSelectTrigger: React.FC<Props> = ({
    label,
    error,
    className,
    onPress,
    value,
    placeholder,
    ...rest
}) => {
    return (
        <View className={`mb-4 ${className || ''}`}>
            {label ? (
                <Text className="text-gray-700 font-medium mb-1.5">{label}</Text>
            ) : null}

            <Pressable
                style={{ backgroundColor: 'white'}}
                onPress={onPress}
                className={`p-3 py-4 text-gray-800 justify-center border rounded-lg px-3 bg-white ${error ? 'border-red-500' : 'border-gray-300'
                    } bg-white`}
            >
                <Text
                    className={`text-gray-800 ${value ? 'text-gray-800' : 'text-gray-400'
                        }`}
                    style={{ fontSize: 14 }}
                    numberOfLines={1}
                >
                    {value || placeholder}
                </Text>
            </Pressable>

            {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
        </View>
    )
}

export default FormSelectTrigger