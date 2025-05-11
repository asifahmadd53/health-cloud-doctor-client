import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Pressable,
  Animated,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { useState, useRef } from "react"
import CustomInput from "../../components/CustomInput"
import CustomPasswordInput from "../../components/CustomPasswordInput"
import Icons from "../../utils/libs/constants/Icons"
import axios from "axios"
import { API_URL } from "../../utils/libs/constants/api/api"
import CustomButton from "../../components/CustomButton"


const StaffLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation<any>()
  const [isLoading, setLoading] = useState(false)
  const fadeOut = useRef(new Animated.Value(0)).current

  const _fadeOut = fadeOut.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 0],
  })

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Please fill all the fields")
//       return
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(email)) {
//       Alert.alert("Please enter a valid email address")
//       return
//     }

//     try {
//       setLoading(true)
//       Animated.timing(fadeOut, {
//         toValue: 1,
//         duration: 250,
//         useNativeDriver: false,
//       }).start()

//       // Replace with your staff login API endpoint
//       const response = await axios.post(
//         `${API_URL}/api/auth/staff/login`,
//         {
//           email,
//           password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.data.success) {
//         navigation.navigate("drawer")
//       } else {
//         Alert.alert(response.data.message || "Login failed")
//       }
//     } catch (error) {
//       console.error("Login error:", error)
//       Alert.alert("Something went wrong. Please try again.")
//     } finally {
//       setLoading(false)
//       // Reset animation
//       fadeOut.setValue(0)
//     }
//   }

  return (
    <SafeAreaView className="bg-white px-4">
      <ScrollView className="flex-grow min-h-full pb-5">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View className="pt-20">
            <Text className="text-3xl font-semibold text-center text-black">Staff Portal</Text>
            <Text className="text-center text-gray-500 text-base mt-4 leading-5">
              Access your staff dashboard to manage appointments, patient records, and collaborate with your healthcare
              team.
            </Text>
          </View>

          <View className="mt-16 w-[97%] mx-auto gap-5">
            <Text className="text-base md:text-lg">Email Address</Text>
            <CustomInput
              keyboardType="email-address"
              placeholder={"Enter your email"}
              icon={Icons.email}
              value={email}
              onChange={setEmail}
              autoCapitalize="none"
            />
            <Text className="text-base md:text-lg">Password</Text>
            <CustomPasswordInput placeholder={"Enter your password"} value={password} onChange={setPassword} />

            <View className="items-end">
              <Text
                onPress={() => navigation.navigate("forget-password")}
                className="text-secondary text-base font-medium"
              >
                Forgot Password?
              </Text>
            </View>
          </View>

          <View className="mt-6 items-center">
            <CustomButton 
              label="Login"
              onPress={() => navigation.navigate("staffLayout", {
                screen: "AppointmentList"
              })}
              loading={isLoading}
            />
          </View>

          <View className="mx-auto mt-8 items-center gap-5">
            <Text className="text-[#253237] text-base font-medium">
              Need a staff account?
              <Text onPress={() => navigation.navigate("staff-register")} className="text-secondary">
                {" "}
                Contact Admin
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default StaffLogin
