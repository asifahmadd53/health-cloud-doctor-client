import { useState } from "react"
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native"

import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Card from "../../../components/Doctor/Card"
import PhotoUpload from "../../../components/Doctor/PhotoUpload"
import FormInput from "../../../components/Doctor/FormInput"
import Button from "../../../components/Doctor/Button"
import axios from "axios"
import { API_URL } from "../../../api/api"

export type RootStackParamList = {
  MainTabs: undefined
  Schedule: undefined
  AddStaff: undefined
  EditStaff: { staffId: string }
  StaffDetails: { staffId: string }
}
type AddStaffScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface StaffForm {
  name: string
  role: string
  email: string
  password: string
  phone: string
  address: string
  bio: string
  profileImage: string | null
}



const AddStaffScreen = () => {
  const navigation = useNavigation<AddStaffScreenNavigationProp>()

  const [form, setForm] = useState<StaffForm>({
    name: "",
    role: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    bio: "",
    profileImage: null,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof StaffForm, string>>>({})

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
        const formData = new FormData();
  
        formData.append("name", form.name);
        formData.append("role", form.role);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("phone", form.phone);
        formData.append("address", form.address);
        formData.append("bio", form.bio);
        
        // Assuming form.profileImage is an image object from an image picker
        if (form.profileImage) {
          formData.append("profileImage", {
            uri: form.profileImage,
            name: "profile.jpg",
            type: "image/jpeg",
          });
        }
  
        const response = await axios.post(`${API_URL}/api/staff/add-staff`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
  
        if (response.status === 201) {
          Alert.alert("Success", "Staff member added successfully!");
          navigation.goBack();
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to add staff member");
      }
    }
  };
  

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
              label="Password"
              value={form.password}
              onChangeText={(value) => handleChange("password", value)}
              placeholder="Enter password"
              keyboardType="default"
              autoCapitalize="none"
              error={errors.password}
              secureTextEntry={true}
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
              <Button title="Cancel" onPress={() => navigation.goBack()} variant="outline" className="flex-1 mr-2" />
              <Button title="Add Staff Member" onPress={handleSubmit} variant="primary" className="flex-2 ml-2" />
            </View>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddStaffScreen
