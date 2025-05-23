"use client"

import { Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, Alert } from "react-native"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import Icons from "../../utils/libs/constants/Icons"
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import axios from "axios"
import { API_URL } from "../../utils/libs/constants/api/api"

const ForgetPassword = () => {
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleResetPassword = async () => {
    // Clear previous errors
    setError("")

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Show loading state
    setIsLoading(true)

    try {
      const response = await axios.patch(
        `${API_URL}/api/auth/send-verification-code`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.status === 200) {
        setIsLoading(false)
        // Navigate to OTP screen
        navigation.navigate("otp", { email })
      }
    } catch (error: any) {
      setIsLoading(false)
      setError(error.response?.data?.message || "An error occurred while sending the reset code")
      console.error("Reset password error:", error)
    }
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
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800">Forgot Password</Text>
          <Text className="text-base pt-2 text-gray-600">
            Enter your email address and we'll send you a code to reset your password
          </Text>
        </View>

        {/* Form */}
        <View>
          <View>
            <Text className="text-base font-semibold mb-2 text-gray-700">Email Address</Text>
            <CustomInput
              onChange={(text) => {
                setEmail(text)
                setError("")
              }}
              placeholder="Enter your email address"
              value={email}
              icon={Icons.email}
              keyboardType="email-address"
              autoCapitalize="none"
              error={error}
            />
          </View>

          <View className="mt-8">
            <CustomButton
              label="Send Reset Code"
              onPress={handleResetPassword}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          {/* Help text */}
          <TouchableOpacity
            className="mt-6 items-center"
            onPress={() => Alert.alert("Help", "Contact support at support@healthcloud.com for assistance")}
          >
            <Text className="text-cyan-600 font-medium">Need help?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ForgetPassword
