"use client"

import { ScrollView, Text, View, KeyboardAvoidingView, Platform, Image, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from "react"
import CustomInput from "../../components/CustomInput"
import CustomPasswordInput from "../../components/CustomPasswordInput"
import CustomButton from "../../components/CustomButton"
import axios from "axios"
import { BASE_URL } from "../../api/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Images from "../../utils/libs/constants/Images"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner-native"
import { showToast } from "../../utils/toastUtils"

const SignIn = () => {
  const navigation = useNavigation<any>()
  const [isLoading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    defaultValues: {
      pmdcNumber: "",
      password: "",
    },
  })

  useEffect(() => {
    checkRememberedSession()
  }, [])

  const checkRememberedSession = async () => {
    try {
      const [savedPmdcNumber, savedPassword, rememberMeEnabled] = await AsyncStorage.multiGet([
        "savedPmdcNumber",
        "savedPassword",
        "rememberMeEnabled",
      ])

      const pmdc = savedPmdcNumber[1]
      const password = savedPassword[1]
      const isRememberMeEnabled = rememberMeEnabled[1] === "true"

      if (pmdc && password && isRememberMeEnabled) {
        setValue("pmdcNumber", pmdc)
        setValue("password", password)
        setRememberMe(true)
      }
    } catch (error) {
      console.log("Error loading saved credentials:", error)
    }
  }

  const handleLogin = async (values: { pmdcNumber: string; password: string }) => {
    if (isLoading) {
      return
    }
    setLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      const data = response.data

      if (!data.user.isApproved) {
        setLoading(false)
        toast.error("Your account has not been approved yet. Please wait for admin approval.")
        return
      }

      if (data.user.isApproved) {
        await AsyncStorage.multiSet([
          ["user", JSON.stringify(data.user)],
          ["token", data.token],
        ])

        if (rememberMe) {
          await AsyncStorage.multiSet([
            ["savedPmdcNumber", values.pmdcNumber],
            ["savedPassword", values.password],
            ["rememberMeEnabled", "true"],
          ])
        } else {
          await AsyncStorage.multiRemove(["savedPmdcNumber", "savedPassword", "rememberMeEnabled"])
        }

        navigation.navigate("drawer")
      }
    } catch (error: any) {
      console.log(error)

      if (error.response) {
        const { status, data } = error.response
        if (status === 400) {
          setError("password", {
            type: "manual",
            message: data.message || "Invalid PMDC number or password",
          })
        } else if (status === 403) {
          showToast("error", "Access pending approval.")
        } else {
          toast.warning("Something went wrong. Please try again.")
        }
      } else {
        toast.warning("Network error. Please check your connection.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRememberMeToggle = async () => {
    const newValue = !rememberMe
    setRememberMe(newValue)

    if (newValue) {
      try {
        const [savedPmdcNumber, savedPassword] = await AsyncStorage.multiGet(["savedPmdcNumber", "savedPassword"])

        const pmdc = savedPmdcNumber[1]
        const password = savedPassword[1]

        if (pmdc && password) {
          setValue("pmdcNumber", pmdc)
          setValue("password", password)
          showToast("success", "Credentials loaded")
        }
      } catch (error) {
        console.log("Error loading saved credentials:", error)
      }
    } else {
      try {
        await AsyncStorage.multiRemove(["savedPmdcNumber", "savedPassword", "rememberMeEnabled"])
        showToast("info", "Remember Me disabled")
      } catch (error) {
        console.log("Error clearing saved credentials:", error)
      }
    }
  }

  return (
    <SafeAreaView className="bg-white px-5">
      <ScrollView className="flex-grow min-h-full pb-5">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View className="pt-20">
            <Image source={Images.logo} className="w-16 h-16 mb-2" resizeMode="contain" />
            <Text className="text-3xl font-semibold text-left text-black">Welcome Back!</Text>
            <Text className="text-left text-gray-500 text-base mt-2 leading-5">
              Elevate your practice efficiency and foster meaningful patient relationships with unparalleled ease.
            </Text>
          </View>
          <View className="mt-16 w-[99%] flex flex-col mx-auto">
            <Controller
              control={control}
              name="pmdcNumber"
              rules={{
                required: "PMDC number is required",
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  label={"Enter your PMDC #"}
                  placeholder={"PMDC #"}
                  icon="checkmark-outline"
                  value={value}
                  onChangeText={onChange}
                  error={errors.pmdcNumber?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
              }}
              render={({ field: { onChange, value } }) => (
                <CustomPasswordInput
                  label={"Enter your Password"}
                  placeholder={"Password"}
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <View className="flex-row items-center justify-between mt-2 -mb-1">
              <Pressable onPress={handleRememberMeToggle} className="flex-row items-center">
                <View
                  className={`w-5 h-5 border-2 rounded mr-2 items-center justify-center ${rememberMe ? "bg-secondary border-secondary" : "border-gray-400"
                    }`}
                >
                  {rememberMe && <Text className="text-white text-xs font-bold">✓</Text>}
                </View>
                <Text className="text-gray-700 text-base">Remember Me</Text>
              </Pressable>

              <Text
                onPress={() => navigation.navigate("forget-password")}
                className="text-secondary text-base font-medium"
              >
                Forgot Password?
              </Text>
            </View>
          </View>
          <View className="mt-6">
            <CustomButton loading={isLoading} label="Login" onPress={handleSubmit(handleLogin)} />
          </View>
          <View className="mx-auto mt-8 items-center gap-5">
            <Text className="text-[#253237] text-base font-medium">
              Don't have an account?
              <Text onPress={() => navigation.navigate("sign-up")} className="text-secondary underline">
                {" "}
                Join us{" "}
              </Text>
            </Text>
          </View>
          <View className="flex-row items-center mt-16 mb-6 w-[90%] mx-auto">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-3 text-gray-500">or</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          <Pressable onPress={() => navigation.navigate("staffLogin")} className="px-2 py-1 self-center">
            <Text className="text-secondary text-base underline font-medium">Login as Staff</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
