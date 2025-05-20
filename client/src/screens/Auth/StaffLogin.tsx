import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";
import CustomInput from "../../components/CustomInput";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import Icons from "../../utils/libs/constants/Icons";
import axios from "axios";
import { API_URL } from "../../utils/libs/constants/api/api";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>();
  const [isLoading, setLoading] = useState(false);
  const fadeOut = useRef(new Animated.Value(0)).current;

  const _fadeOut = fadeOut.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 0],
  });

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Alert.alert("Please fill all the fields");
  //     return;
  //   }

  //   // Basic email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     Alert.alert("Please enter a valid email address");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     Animated.timing(fadeOut, {
  //       toValue: 1,
  //       duration: 250,
  //       useNativeDriver: false,
  //     }).start();

  //     const response = await axios.post(
  //       `${API_URL}/api/staff/login-staff`,
  //       {
  //         email,
  //         password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     if (response.data.success) {
  //       navigation.navigate("staffLayout", {
  //         screen: "AppointmentList",
  //         params: { token: response.data.token, staff: response.data.staff },
  //       });
  //       const token = response.data.token;
  //       const staffId = response.data._id;

  //       await AsyncStorage.setItem("staffToken", token);
  //       await AsyncStorage.setItem("staffId", staffId);

  //       Alert.alert("Login Successful", `Token and Staff ID saved:\nToken: ${token}\nStaff ID: ${staffId}`);

  //       setLoading(false);
  //     } else {
  //       Alert.alert(response.data.message || "Login failed");
  //       setLoading(false); // set loading to false here as well
  //     }
  //   } catch (error: any) {
  //     setLoading(false);
  //     Alert.alert(
  //       error.response?.data?.message ||
  //         error.message ||
  //         "Something went wrong. Please try again."
  //     );
  //   }
  // };
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please fill all the fields");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Please enter a valid email address");
      return;
    }
  
    try {
      setLoading(true);
      Animated.timing(fadeOut, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
  
      const response = await axios.post(
        `${API_URL}/api/staff/login-staff`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        const token = response.data.token;
        const staffId = response.data.staff._id;
  
        // ✅ Save token and staffId
        await AsyncStorage.setItem("staffToken", token);
        await AsyncStorage.setItem("staffId", staffId);
  
        // ✅ Show confirmation alert
        Alert.alert("Login Successful", `Token and Staff ID saved:\nToken: ${token}\nStaff ID: ${staffId}`);
  
        // Navigate to staff layout
        navigation.navigate("staffLayout", {
          screen: "AppointmentList",
          params: { token, staff: response.data.staff },
        });
  
        setLoading(false);
      } else {
        Alert.alert(response.data.message || "Login failed");
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      Alert.alert(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again."
      );
    }
  };
  
  return (
    <SafeAreaView className="bg-white px-4">
      <ScrollView className="flex-grow min-h-full pb-5">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View className="pt-20">
            <Text className="text-3xl font-semibold text-center text-black">
              Staff Portal
            </Text>
            <Text className="text-center text-gray-500 text-base mt-4 leading-5">
              Access your staff dashboard to manage appointments, patient
              records, and collaborate with your healthcare team.
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
            <CustomPasswordInput
              placeholder={"Enter your password"}
              value={password}
              onChange={setPassword}
            />

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
            <CustomButton label="Login" onPress={handleLogin} loading={isLoading} />
          </View>

          <View className="mx-auto mt-8 items-center gap-5">
            <Text className="text-[#253237] text-base font-medium">
              Need a staff account?
              <Text
                onPress={() => navigation.navigate("staff-register")}
                className="text-secondary"
              >
                {" "}
                Contact Admin
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StaffLogin;
