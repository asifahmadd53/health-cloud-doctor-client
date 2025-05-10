
import { useState, useEffect } from "react"
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native"

import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Card from "../../../components/Doctor/Card"
import FormInput from "../../../components/Doctor/FormInput"
import PhotoUpload from "../../../components/Doctor/PhotoUpload"
import Button from "../../../components/Doctor/Button"
import { RootStackParamList } from "./AddStaffScreen"


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

// Mock staff data - in a real app, you would fetch this from an API
const mockStaffDetails = [
  {
    id: "1",
    name: "Ahmed Ali",
    role: "Nurse Practitioner",
    email: "ahmed.ali@example.com",
    phone: "(042) 123-4567",
    image: null,
  },
  {
    id: "2",
    name: "Usman",
    role: "Medical Assistant",
    email: "usman.raza@example.com",
    phone: "(021) 987-6543",
    image: null,
  },
  {
    id: "3",
    name: "Bilal",
    role: "Receptionist",
    email: "bilal.zafar@example.com",
    phone: "(051) 456-7890",
    image: null,
  },
]





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
    // In a real app, you would fetch staff details from an API
    const staffDetails = mockStaffDetails[staffId as keyof typeof mockStaffDetails]
    if (staffDetails) {
      setForm({
        name: staffDetails.name,
        role: staffDetails.role,
        email: staffDetails.email,
        phone: staffDetails.phone,
        address: staffDetails.address || "",
        bio: staffDetails.bio || "",
        profileImage: staffDetails.profileImage,
      })
    }
  }, [staffId])

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

  const handleSubmit = () => {
    if (validateForm()) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setLoading(false)
        Alert.alert("Success", "Staff member updated successfully!")
        navigation.goBack()
      }, 1000)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView className="flex-1 bg-gray-100">
        <View className="p-4">
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
