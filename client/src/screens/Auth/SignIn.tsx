import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Pressable,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";
import CustomInput from "../../components/CustomInput";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import Icons from "../../utils/libs/constants/Icons";
import axios from "axios";
import { API_URL } from "../../utils/libs/constants/api/api";

const SignIn = () => {
  const [pmdcNumber, setpmcd] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>();

  const [isLoading, setLoading] = useState(false);

  const fadeOut = useRef(new Animated.Value(0)).current;

  const _fadeOut = fadeOut.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 0],
  });

  // const handleLogin = async () => {
  //   if (!pmdcNumber || !password) {
  //     Alert.alert("Please fill all the fields");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     Animated.timing(fadeOut, {
  //       toValue: 1,
  //       duration: 250,
  //       useNativeDriver: false,
  //     }).start();


  //     const response = await axios.post(`${API_URL}/api/auth/login`, {
  //       pmdcNumber,
  //       password,
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );

      
  //   if (response.data.success) {
  //     navigation.navigate("drawer");
  //   } else {
  //     Alert.alert(response.data.message);
  //   }
    
  //   } catch (error) {
  //     Alert.alert("Something went wrong. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <SafeAreaView className="bg-white px-4">
      <ScrollView className="flex-grow min-h-full pb-5">
        <KeyboardAvoidingView>
          <View className="pt-20">
            <Text className="text-3xl font-semibold text-center text-black">
              Welcome Back!
            </Text>
            <Text className="text-center text-gray-500 text-base mt-4 leading-5">
              Elevate your practice efficiency and foster meaningful patient
              relationships with unparalleled ease.
            </Text>
          </View>

          <View className="mt-16 w-[97%] mx-auto gap-5">
            <Text className="text-base md:text-lg">Enter your PMDC #</Text>
            <CustomInput
              placeholder={"PMDC #"}
              icon={Icons.tick}
              value={pmdcNumber}
              onChange={setpmcd}
            />
            <Text className="text-base md:text-lg">Enter your Password</Text>
            <CustomPasswordInput
              placeholder={"Password"}
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
            <Pressable
              // onPress={handleLogin}
              onPress={() => navigation.navigate("drawer")}
              className="bg-secondary w-[70%] mx-auto rounded-full py-3 md:py-5 h-[50px] justify-center items-center"
              >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Animated.Text
                 className='text-white text-xl text-center font-semibold'
                >
                  Submit
                </Animated.Text>
              )}
            </Pressable>
          </View>

          <View className="mx-auto mt-8 items-center gap-5">
            <Text
              onPress={() => navigation.navigate("sign-up")}
              className="text-[#253237] text-base font-medium"
            >
              Don’t have an account?
              <Text className="text-secondary"> Join us</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
