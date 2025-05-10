"use client"

import { Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, Alert } from "react-native"
import { useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import CustomPasswordInput from "../../components/CustomPasswordInput"
import ReactNativeModal from "react-native-modal"
import CustomButton from "../../components/CustomButton"
import CustomSecondaryButton from "../../components/CustomSecondaryButton"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import axios from "axios"
import { API_URL } from "../../utils/libs/constants/api/api"

const NewPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" })
  const [passwordStrength, setPasswordStrength] = useState(0)

  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const resetToken = route.params?.resetToken

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    // Length check
    if (password.length >= 8) strength += 0.25
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 0.25
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 0.25
    // Contains number or special char
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 0.25

    setPasswordStrength(strength)
  }, [password])

  // Get password strength label
  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "No password"
    if (passwordStrength <= 0.25) return "Weak"
    if (passwordStrength <= 0.5) return "Fair"
    if (passwordStrength <= 0.75) return "Good"
    return "Strong"
  }

  // Get password strength color
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "#e5e7eb"
    if (passwordStrength <= 0.25) return "#ef4444"
    if (passwordStrength <= 0.5) return "#f59e0b"
    if (passwordStrength <= 0.75) return "#10b981"
    return "#10b981"
  }

  // Validate passwords
  const validatePasswords = () => {
    const newErrors = { password: "", confirmPassword: "" }
    let isValid = true

    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    } else if (passwordStrength < 0.5) {
      newErrors.password = "Password is too weak"
      isValid = false
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle update password
  const handleUpdatePassword = async () => {
    if (!validatePasswords()) {
      return
    }

    if (!resetToken) {
      Alert.alert("Error", "Reset token is missing. Please try again.")
      navigation.navigate("forget-password")
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.put(
        `${API_URL}/api/auth/reset-password`,
        {
          newPassword: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${resetToken}`,
          },
        },
      )

      if (response.status === 200) {
        setIsLoading(false)
        setShowModal(true)
      }
    } catch (error: any) {
      setIsLoading(false)
      Alert.alert("Error", error.response?.data?.message || "Password update failed. Please try again.")
    }
  }

  // Handle continue after success
  const handleContinue = () => {
    setShowModal(false)
    // Navigate to login screen
    navigation.navigate("sign-in")
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <SafeAreaView className="px-5 bg-white flex-1">
        {/* Header */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          className="my-6 w-12 h-12 items-center justify-center bg-[#F5F5F5] rounded-full"
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        {/* Title and description */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">Set New Password</Text>
          <Text className="text-base mt-2 text-gray-600">Create a strong password that you haven't used before</Text>
        </View>

        {/* Password Form */}
        <View className="gap-4">
          {/* Password Field */}
          <View>
            <Text className="text-base font-semibold mb-2 text-gray-700">New Password</Text>
            <CustomPasswordInput
              placeholder="Enter new password"
              value={password}
              onChange={(text) => {
                setPassword(text)
                if (errors.password) setErrors({ ...errors, password: "" })
              }}
              error={errors.password}
            />

            {/* Password strength indicator */}
            {password ? (
              <View className="mt-2">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-xs text-gray-500">Password Strength</Text>
                  <Text className="text-xs font-medium" style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthLabel()}
                  </Text>
                </View>
                <View className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <View
                    className="h-full"
                    style={{
                      width: `${passwordStrength * 100}%`,
                      backgroundColor: getPasswordStrengthColor(),
                    }}
                  />
                </View>
              </View>
            ) : null}

            {/* Password requirements */}
            <View className="mt-2">
              <Text className="text-xs text-gray-500 mb-1">Password must contain:</Text>
              <View className="flex-row items-center">
                <MaterialIcons
                  name={password.length >= 8 ? "check-circle" : "cancel"}
                  size={12}
                  color={password.length >= 8 ? "#10b981" : "#9ca3af"}
                />
                <Text className="text-xs ml-1 text-gray-500">At least 8 characters</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons
                  name={/[A-Z]/.test(password) ? "check-circle" : "cancel"}
                  size={12}
                  color={/[A-Z]/.test(password) ? "#10b981" : "#9ca3af"}
                />
                <Text className="text-xs ml-1 text-gray-500">At least 1 uppercase letter</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons
                  name={/[0-9]/.test(password) ? "check-circle" : "cancel"}
                  size={12}
                  color={/[0-9]/.test(password) ? "#10b981" : "#9ca3af"}
                />
                <Text className="text-xs ml-1 text-gray-500">At least 1 number</Text>
              </View>
            </View>
          </View>

          {/* Confirm Password Field */}
          <View className="mt-4">
            <Text className="text-base font-semibold mb-2 text-gray-700">Confirm Password</Text>
            <CustomPasswordInput
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(text) => {
                setConfirmPassword(text)
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" })
              }}
              error={errors.confirmPassword}
            />

            {/* Password match indicator */}
            {password && confirmPassword && (
              <View className="flex-row items-center mt-1">
                <MaterialIcons
                  name={password === confirmPassword ? "check-circle" : "error"}
                  size={14}
                  color={password === confirmPassword ? "#10b981" : "#ef4444"}
                />
                <Text
                  className="text-xs ml-1"
                  style={{
                    color: password === confirmPassword ? "#10b981" : "#ef4444",
                  }}
                >
                  {password === confirmPassword ? "Passwords match" : "Passwords don't match"}
                </Text>
              </View>
            )}
          </View>

          {/* Update Button */}
          <View className="mt-8">
            <CustomButton
              label="Update Password"
              onPress={handleUpdatePassword}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>

        {/* Success Modal */}
        <ReactNativeModal
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropTransitionOutTiming={0}
        >
          <View className="bg-white items-center rounded-2xl py-10 px-5">
            <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-4">
              <MaterialIcons name="check-circle" size={50} color="#10b981" />
            </View>
            <Text className="text-xl font-bold text-gray-800 mb-2">Success!</Text>
            <Text className="text-gray-600 text-center mb-6">
              Your password has been reset successfully. You can now log in with your new password.
            </Text>
            <View className="w-full">
              <CustomSecondaryButton label="Continue to Login" onPress={handleContinue} />
            </View>
          </View>
        </ReactNativeModal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default NewPassword
