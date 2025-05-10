"use client"

import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Pressable,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { useState, useRef, useEffect } from "react"
import CustomInput from "../../components/CustomInput"
import CustomPasswordInput from "../../components/CustomPasswordInput"
import Icons from "../../utils/libs/constants/Icons"
import { Button } from '@rneui/themed';
import CustomButton from "../../components/CustomButton"
import axios from "axios"
import { API_URL } from "../../utils/libs/constants/api/api"
import * as Burnt from "burnt"
import AsyncStorage from "@react-native-async-storage/async-storage"

const SignIn = () => {
  const [pmdcNumber, setPmdc] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ pmdcNumber: "", password: "" })
  const navigation = useNavigation<any>()
  const [isLoading, setLoading] = useState(false)
  

  const handleLogin = async () => {
    if(isLoading){
      return
    }
    setLoading(true)

    if(!pmdcNumber){
      setLoading(false)
      Burnt.toast({
        title: "Please enter your PMDC number",
        preset: "error"
      })
      return
    }
    if(!password){
      setLoading(false)
      Burnt.toast({
        title: "Please enter your password",
        preset: "error"
      })
      return
    }
    try{
      
      const response = await axios.post(`${API_URL}/api/auth/login`, {pmdcNumber, password}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })

      const data = response.data
      
      if(data.success){
        setLoading(true)
        setTimeout(()=>{
          Burnt.toast({
            title: "Login successful",
            preset: "done"
          })
        }, 1000)
        // await AsyncStorage.setItem("user", JSON.stringify(data.user))
        // await AsyncStorage.setItem("token", data.token)
        await AsyncStorage.multiSet([
          ["user", JSON.stringify(data.user)],
          ["token", data.token],
        ]);
        navigation.navigate("drawer")
      }
    } catch (error) {
      console.log(error)
      setLoading(true)
      Burnt.toast({
        title: "Invalid PMDC number or password",
        preset: "error"
      })
    }finally{
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="bg-white px-4">
      <ScrollView className="flex-grow min-h-full pb-5">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View className="pt-20">
            <Text className="text-3xl font-semibold text-center text-black">Welcome Back!</Text>
            <Text className="text-center text-gray-500 text-base mt-4 leading-5">
              Elevate your practice efficiency and foster meaningful patient relationships with unparalleled ease.
            </Text>
          </View>

          <View className="mt-16 w-[97%] mx-auto gap-5">
            <Text className="text-base md:text-lg">Enter your PMDC #</Text>
            <CustomInput
              keyboardType="numeric"
              placeholder={"PMDC #"}
              icon={Icons.tick}
              value={pmdcNumber}
              onChange={(text) => {
                setPmdc(text)
                if (errors.pmdcNumber) setErrors({ ...errors, pmdcNumber: "" })
              }}
              error={errors.pmdcNumber}
            />
            <Text className="text-base md:text-lg">Enter your Password</Text>
            <CustomPasswordInput
              placeholder={"Password"}
              value={password}
              onChange={(text) => {
                setPassword(text)
                if (errors.password) setErrors({ ...errors, password: "" })
              }}
              error={errors.password}
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

         
            <View className="mt-4">
            <CustomButton
            loading={isLoading}
            label="Login"
            onPress={handleLogin}
            />
            </View>
          <View className="mx-auto mt-8 items-center gap-5">
            <Text className="text-[#253237] text-base font-medium">
              Don't have an account?
              <Text onPress={() => navigation.navigate("sign-up")} className="text-secondary">
                {" "}
                Join us
              </Text>
            </Text>
          </View>
          <View className="flex-row items-center mt-8 mb-4">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-4 text-gray-500">or</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          {/* Staff Login Button */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("staff-login")}
            className="bg-white border border-secondary w-[70%] mx-auto rounded-full py-3 h-[50px] justify-center items-center mb-8"
          >
            <Text className="text-secondary text-base font-medium">Login as Staff</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
