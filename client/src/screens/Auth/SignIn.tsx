import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import CustomButton from "../../components/CustomButton";
import Icons from "../../utils/libs/constants/Icons";
import axios from "axios";
import { API_URL } from "../../utils/libs/constants/api/api";





const SignIn = () => {

  const [pmdcNumber, setpmdcNumber] = useState('')
  const [password, setPassword] = useState('')

  const navigation: any = useNavigation()

  // const handleSignIn = async () => {
  //   if (!pmdcNumber || !password) {
  //     Alert.alert('Please fill all the fields');
  //     return;
  //   }
  
  //   try {
  //     const formData = new FormData();
  //     formData.append('pmdcNumber', pmdcNumber);
  //     formData.append('password', password);
  
  //     const response = await axios.post(`${API_URL}/api/auth/login`, formData);
  
  //     if (response.data.success) {
  //       Alert.alert('Login successful');
  //       navigation.navigate('drawer');
  //     } else {
  //       Alert.alert(response.data.message || 'Login failed');
  //     }
  //   } catch (error) {
      
  //     Alert.alert('Something went wrong');
  //   }
  // };
  

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
           <Text className="text-base md:text-lg">Enter your PMDC #</Text>
            <CustomInput placeholder={'PMDC #'} icon={Icons.tick} value={pmdcNumber} onChange={setpmdcNumber} />
            <Text className="text-base md:text-lg">Enter your Password</Text>
            <CustomPasswordInput placeholder={'Password'} value={password} onChange={setPassword} />

            <View className="items-end">

              <Text onPress={() => navigation.navigate('forget-password')} className="text-secondary text-base font-medium">
                Forgot Password?
              </Text>

            </View>
          </View>


          <View className="mt-6">
            <CustomButton label={'Login'} link="drawer" onPress={()=>{}}/>
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
