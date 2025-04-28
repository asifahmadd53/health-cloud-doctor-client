import { Link } from "expo-router";
import {
  ScrollView,
  Text,
  Pressable,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { TextInput } from "react-native-paper";

import { useState } from "react";

import SignUp from "./sign-up";
import CustomInput from "@/src/components/CustomInput";
import CustomPasswordInput from "@/src/components/CustomPasswordInput";
import CustomButton from "@/src/components/CustomButton";
import Icons from "@/src/utils/libs/constants/Icons";

const SignIn = () => {

  const [pmdc, setpmcd] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [currentModal, setCurrentModal] = useState("")
  const [resetPassword, setResetPassword] = useState('')
  const [reresetPassword, setReResetPassword] = useState('')

  const navigation = useNavigation()



  return (
    <SafeAreaView className="bg-white px-3">
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
           {/* <Text className="text-base md:text-lg">Enter your PMDC #</Text> */}
            <CustomInput placeholder={'PMDC #'} icon={Icons.tick} value={pmdc} onChange={setpmcd} />
            {/* <Text className="text-base md:text-lg">Enter your Password</Text> */}
            <CustomPasswordInput placeholder={'Password'} value={password} onChange={setPassword} />

            <View className="items-end">

              <Text onPress={() => navigation.navigate('forget-password')} className="text-secondary text-base font-medium">
                Forgot Password?
              </Text>

            </View>
          </View>


          <View className="mt-6">
            <CustomButton label={'Login'} link={'(drawer)'} />
          </View>
          <View className="mx-auto mt-8 items-center gap-5">
            <Text onPress={() => navigation.navigate('sign-up')} className="text-[#253237] text-base font-medium">
              Don’t have an account?<Text className="text-secondary"> Join us</Text>
            </Text>
          </View>
          {/* ✅ Modal 1 */}

        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
