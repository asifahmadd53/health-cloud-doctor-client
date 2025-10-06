import { useState, useEffect } from "react"
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert, Pressable, Image } from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Card from "../../../components/Doctor/Card"
import FormInput from "../../../components/Doctor/FormInput"
import Button from "../../../components/Doctor/Button"
import Header from "../../../components/Header"
import axios from "axios"
import { BASE_URL } from "../../../api/api"
import type { RootStackParamList } from "./StaffScreen"
import Icons from "../../../utils/libs/constants/Icons"
import { launchImageLibrary } from "react-native-image-picker"
import { Controller, useForm } from "react-hook-form"
import { showToast } from "../../../utils/toastUtils"
import { SafeAreaView } from "react-native-safe-area-context"

type EditStaffScreenRouteProp = RouteProp<RootStackParamList, "EditStaff">
type EditStaffScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface StaffForm {
  name: string
  role: string
  email: string
  phone: string
  address: string
  bio: string
  profileImage: string | null
}

const EditStaffScreen = () => {
  const navigation = useNavigation<EditStaffScreenNavigationProp>()
  const route = useRoute<EditStaffScreenRouteProp>()
  const { staffId } = route.params

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StaffForm>({
    defaultValues: {
      name: "",
      role: "",
      email: "",
      phone: "",
      address: "",
      bio: "",
      profileImage: "",
    },
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getStaffDetails()
  }, [staffId])

  const getStaffDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/staff/get-staff/${staffId}`, {
        withCredentials: true,
      })

      if (response.data && response.data.staff) {
        const staffData = response.data.staff
        reset({
          name: staffData.name || "",
          role: staffData.role || "",
          email: staffData.email || "",
          phone: staffData.phone || "",
          address: staffData.address || "",
          bio: staffData.bio || "",
          profileImage: staffData.profileImage || null,
        })
      } else {
        Alert.alert("Error", "Received unexpected data format from server.")
      }
    } catch (error: any) {
      console.error("Fetch Staff Error:", error?.response?.data || error.message)
      Alert.alert("Error", "Could not load staff details. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleImageSelected = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.8, maxHeight: 2000, maxWidth: 2000 },
      (response) => {
        if (!response.didCancel && !response.errorCode && response.assets?.[0]) {
          const selectedImage = response.assets[0]
          if (selectedImage.uri) {
            setValue("profileImage", selectedImage.uri)
          }
        } else if (response.errorCode) {
          console.log("Gallery Error: ", response.errorMessage)
        }
      }
    )
  }

  const onSubmit = async (values: StaffForm) => {
    try {
      setLoading(true)
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === "profileImage" && value) {
          formData.append(key, {
            uri: value,
            type: "image/jpeg",
            name: "profile.jpg",
          } as any)
        } else if (value) {
          formData.append(key, value as string)
        }
      })

      const response = await axios.put(
        `${BASE_URL}/staff/update-staff/${staffId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      )

      if (response?.data?.success) {
        showToast("success", "Profile updated successfully!")
        navigation.goBack()
      } else {
        showToast("error", response?.data?.message || "Failed to update profile")
      }
    } catch (error: any) {
      console.error("Update Staff Error:", error?.response?.data || error.message)
      showToast("error", "Something went wrong while updating profile")
    } finally {
      setLoading(false)
    }
  }

  return (
   <SafeAreaView className="flex-1 bg-white">
      <Header title="Edit Profile" />
      <KeyboardAvoidingView
  className="flex-1"
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
>
        <ScrollView
          className="pt-6 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
        
            <View className="items-center">
              <View className="mb-3">
                <Pressable
                  onPress={handleImageSelected}
                  className="w-24 h-24 rounded-full items-center justify-center bg-slate-100 border border-slate-200 shadow-lg overflow-hidden"
                >
                  <Controller
                    control={control}
                    name="profileImage"
                    render={({ field: { value } }) =>
                      value ? (
                        <Image
                          source={{ uri: value }}
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <Image
                          source={Icons.profileIcon}
                          className="w-24 h-24"
                          resizeMode="contain"
                        />
                      )
                    }
                  />
                </Pressable>
                <Pressable
                  onPress={handleImageSelected}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full items-center justify-center shadow-lg"
                >
                  <Image
                    source={Icons.camera}
                    className="w-4 h-4"
                    tintColor={"white"}
                  />
                </Pressable>
              </View>
            </View>

            {/* Form Fields */}
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label="Full Name"
                  placeholder="Enter full name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="role"
              rules={{ required: "Role is required" }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label="Role"
                  placeholder="e.g. Nurse, Medical Assistant"
                  value={value}
                  onChangeText={onChange}
                  error={errors.role?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label="Email"
                  placeholder="example@email.com"
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={onChange}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              rules={{ required: "Phone is required" }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label="Phone Number"
                  value={value}
                  placeholder="(555) 123-4567"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label="Address"
                  value={value}
                  placeholder="Enter address"
                  onChangeText={onChange}
                  multiline
                  numberOfLines={2}
                  error={errors.address?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="bio"
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label="Bio"
                  value={value}
                  placeholder="Brief description or notes"
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                  error={errors.bio?.message}
                />
              )}
            />

            
              <Button
                title="Save Changes"
                onPress={handleSubmit(onSubmit)}
                variant="primary"
                className="flex-2 ml-2"
                loading={loading}
                disabled={loading}
              />
          
         
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default EditStaffScreen
