import { Text, ActivityIndicator, View, TouchableOpacity } from "react-native"
import { useCallback } from "react"
import { useNavigation } from "@react-navigation/native"

interface ButtonProps {
  link?: string
  label: string
  onPress?: () => void
  loading?: boolean
  disabled?: boolean
}

const CustomButton = ({ link, label, onPress, loading = false, disabled = false }: ButtonProps) => {
  const navigation = useNavigation()

  // Memoize the function to avoid unnecessary re-renders
  const handlePress = useCallback(() => {
    if (loading || disabled) return

    if (link) {
      navigation.navigate(link as never) // Fix TypeScript warning
    } else if (onPress) {
      onPress()
    }
  }, [link, onPress, navigation, loading, disabled])

  return (
    <TouchableOpacity
      activeOpacity={1}
      className={`bg-secondary w-[70%] mx-auto rounded-full py-3 md:py-5 ${loading || disabled ? "opacity-90" : ""}`}
      onPress={handlePress}
      accessible={true}
      accessibilityLabel={loading ? "Loading" : label}
      accessibilityState={{ disabled: loading || disabled }}
      disabled={loading || disabled}
    >
      <View className="flex-row justify-center items-center">
        {loading ? (
          <>
            <ActivityIndicator className="py-1" color="#ffffff" size="small" />

            {/* <Text className="text-white text-xl text-center font-semibold ml-2">Loading...</Text> */}
          </>
        ) : (
          <Text className="text-white text-lg text-center font-semibold">{label}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton
