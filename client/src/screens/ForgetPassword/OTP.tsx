"use client"

import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native"
import { useRef, useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import CustomButton from "../../components/CustomButton"
import { API_URL } from "../../utils/libs/constants/api/api"
import axios from "axios"
import { TextInput } from "react-native"

const OTP = () => {
  const navigation = useNavigation()
  const route = useRoute()
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

  // Handle paste (for accessibility)
  const handlePaste = (text: string) => {
    // Extract only numbers and limit to 4 digits
    const pastedData = text.replace(/[^0-9]/g, "").slice(0, 4)

    if (pastedData.length === 4) {
      const newOtp = pastedData.split("")
      setOtp(newOtp)

      // Focus the last input
      inputRefs[3].current?.focus()
    }
  }

  // Verify OTP
  const verifyOtp = async () => {
    const otpValue = otp.join("");
  
    if (otpValue.length !== 4) {
      Alert.alert("Error", "Please enter the complete 4-digit code");
      return;
    }
  
    setIsLoading(true);
  
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
        }
      );
  
      if (response.status === 200) {
        setIsLoading(false);
        navigation.navigate("NewPassword" as never);
      } else {
        setIsLoading(false);
        Alert.alert("Error", "Verification failed. Please try again.");
      }
    } catch (error: any) {
      console.log("Error verifying code:", error?.response?.data);
      Alert.alert("Verification Failed", error.response?.data?.message || "Please try again");
    }
  };
  
  // Resend OTP
  const resendOtp = async () => {
    if (!canResend) return
    try{
      const response = await axios.patch(`${API_URL}/api/auth/send-verification-code`,{
        email
      },{
        headers:{
          "Content-Type":'application/json'
        }
      })
      if(response.status === 200){
        setTimeLeft(60)
        setCanResend(false)
        Alert.alert("Success", "A new code has been sent to your email")
      }
    } catch (error) {
      setError("An error occurred while sending the reset code")
    }finally{
      setIsLoading(false)
    }
    
    setTimeLeft(60)
    setCanResend(false)

    // Show confirmation
    Alert.alert("Success", "A new code has been sent to your email")
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
              mode="outlined"
              activeOutlineColor="#0891b2"
              outlineColor="#e5e7eb"
              textAlign="center"
              textContentType="oneTimeCode" // For iOS autofill
              
            />
          ))}
        </View>

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
  },
})
