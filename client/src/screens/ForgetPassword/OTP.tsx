"use client"

import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native"
import { useRef, useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { TextInput } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import CustomButton from "../../components/CustomButton"
import { API_URL } from "../../utils/libs/constants/api/api"
import axios from "axios"

const OTP = () => {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const email = route.params?.email || "your email"
  const [error, setError] = useState("")

  // Create refs for each input
  const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)]

  // State for OTP values
  const [otp, setOtp] = useState(["", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Timer for resend code
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timerId)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle OTP input change
  const handleOtpChange = (text: string, index: number) => {
    // If the user pastes all 4 digits
    if (text.length === 4 && /^[0-9]{4}$/.test(text)) {
      const newOtp = text.split("")
      setOtp(newOtp)
      inputRefs[3].current?.focus()
      return
    }

    // Otherwise process single digit input
    if (/^[0-9]?$/.test(text)) {
      const newOtp = [...otp]
      newOtp[index] = text
      setOtp(newOtp)

      if (text && index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  // Handle backspace key
  const handleKeyPress = (e: any, index: number) => {
    // Move to previous field on backspace if current field is empty
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  // Verify OTP
  const verifyOtp = async () => {
    const otpValue = otp.join("")

    if (otpValue.length !== 4) {
      Alert.alert("Error", "Please enter the complete 4-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await axios.patch(
        `${API_URL}/api/auth/verify-verification-code`,
        {
          email,
          verificationCode: otpValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.status === 200) {
        setIsLoading(false)
        // Store the reset token for the next step
        const resetToken = response.data.resetToken
        navigation.navigate("NewPassword", { resetToken })
      }
    } catch (error: any) {
      setIsLoading(false)
      setError(error.response?.data?.message || "Verification failed. Please try again.")
      Alert.alert("Error", error.response?.data?.message || "Verification failed. Please try again.")
    }
  }

  // Resend OTP
  const resendOtp = async () => {
    if (!canResend) return

    setIsLoading(true)
    setError("")

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
        setTimeLeft(60)
        setCanResend(false)
        Alert.alert("Success", "A new code has been sent to your email")
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to resend code. Please try again.")
      Alert.alert("Error", error.response?.data?.message || "Failed to resend code. Please try again.")
    } finally {
      setIsLoading(false)
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
          <Text className="text-2xl font-bold text-gray-800">Verification Code</Text>
          <Text className="text-base pt-2 text-gray-600">
            We've sent a 4-digit code to {email}. Enter the code below to verify.
          </Text>
        </View>

        {/* OTP Input Fields */}
        <View className="flex-row justify-between items-center mb-8">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              selectionColor="#0891b2"
              textAlign="center"
              textContentType="oneTimeCode" // For iOS autofill
            />
          ))}
        </View>

        {/* Error message */}
        {error ? <Text className="text-red-500 text-sm text-center mb-4">{error}</Text> : null}

        {/* Timer and Resend */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-gray-600">Didn't receive the code? </Text>
          {canResend ? (
            <TouchableOpacity onPress={resendOtp}>
              <Text className="text-cyan-600 font-medium">Resend Code</Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-gray-500">Resend in {formatTime(timeLeft)}</Text>
          )}
        </View>

        {/* Verify Button */}
        <CustomButton
          label="Verify & Continue"
          onPress={verifyOtp}
          loading={isLoading}
          disabled={isLoading || otp.join("").length !== 4}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default OTP

const styles = StyleSheet.create({
  otpInput: {
    width: 65,
    height: 65,
    fontSize: 24,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
})
