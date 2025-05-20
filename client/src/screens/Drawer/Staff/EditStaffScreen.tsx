import { useState, useEffect } from "react"
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Card from "../../../components/Doctor/Card"
import FormInput from "../../../components/Doctor/FormInput"
import PhotoUpload from "../../../components/Doctor/PhotoUpload"
import Button from "../../../components/Doctor/Button"
import Header from "../../../components/Header"
import axios from "axios"
import { API_URL } from "../../../utils/libs/constants/api/api"
import type { RootStackParamList } from "./StaffScreen"

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

  const [form, setForm] = useState<StaffForm>({
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    profileImage: null,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof StaffForm, string>>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getStaffDetails()
  }, [staffId])

  const getStaffDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/staff/get-staff/${staffId}`, {
        withCredentials: true,
      })

      if (response.data && response.data.staff) {
        const staffData = response.data.staff
        setForm({
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
      Alert.alert("Error", "Could not load staff details. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof StaffForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleImageSelected = (uri: string) => {
    setForm((prev) => ({ ...prev, profileImage: uri }))
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof StaffForm, string>> = {}

    if (!form.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!form.role.trim()) {
      newErrors.role = "Role is required"
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

   

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setLoading(true)
        await axios.put(`${API_URL}/api/staff/update-staff/${staffId}`, form, {
          withCredentials: true,
        })
        Alert.alert("Success", "Staff member updated successfully!")
        navigation.navigate<any>("Staff") 
      } catch (error: any) {
        console.error("Failed to update staff:", error?.response?.data?.message || error.message)
        Alert.alert("Error", "Could not update staff member. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView className="flex-1 bg-gray-100">
        <View className="p-4">
          <Header title="Edit Staff Member"  />
          <Card>
            <View className="items-center mb-4">
              <PhotoUpload initialImage={form.profileImage} onImageSelected={handleImageSelected} />
            </View>
            <FormInput
              label="Full Name"
              value={form.name}
              onChangeText={(value) => handleChange("name", value)}
              placeholder="Enter full name"
              error={errors.name}
            />

            <FormInput
              label="Role"
              value={form.role}
              onChangeText={(value) => handleChange("role", value)}
              placeholder="e.g. Nurse, Medical Assistant"
              error={errors.role}
            />

            <FormInput
              label="Email"
              value={form.email}
              onChangeText={(value) => handleChange("email", value)}
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <FormInput
              label="Phone Number"
              value={form.phone}
              onChangeText={(value) => handleChange("phone", value)}
              placeholder="(555) 123-4567"
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <FormInput
              label="Address"
              value={form.address}
              onChangeText={(value) => handleChange("address", value)}
              placeholder="Enter address"
              multiline
              numberOfLines={2}
            />

            <FormInput
              label="Bio"
              value={form.bio}
              onChangeText={(value) => handleChange("bio", value)}
              placeholder="Brief description or notes"
              multiline
              numberOfLines={4}
            />

            <View className="flex-row justify-between mt-4">
              <Button
                title="Cancel"
                onPress={() => navigation.goBack()}
                variant="outline"
                className="flex-1 mr-2"
                disabled={loading}
              />
              <Button
                title="Save Changes"
                onPress={handleSubmit}
                variant="primary"
                className="flex-2 ml-2"
                loading={loading}
                disabled={loading}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditStaffScreen
