"use client"

import { useState } from "react"
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "react-native-paper"
import PhotoUpload from "../../components/Doctor/PhotoUpload"
import Button from "../../components/Doctor/Button"
import Card from "../../components/Doctor/Card"
import FormInput from "../../components/Doctor/FormInput"


const ProfileScreen = () => {
  const navigation = useNavigation()

  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15",
    certifications: "American Board of Internal Medicine, Cardiovascular Disease",
    bio: "Experienced cardiologist specializing in preventive cardiology and heart failure management.",
    email: "sarah.johnson@medical.com",
    phone: "(555) 123-4567",
    clinicAddress: "123 Medical Center Dr, Suite 300, Boston, MA 02115",
    profileImage: null,
  })

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageSelected = (uri: string) => {
    setProfile((prev) => ({ ...prev, profileImage: uri }))
  }

  const handleSave = () => {
    alert("Profile saved successfully!")
  }

  const navigateToSchedule = () => {
    navigation.navigate("ScheduleScreen" as never)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView className="flex-1 bg-gray-100">
        <View className="p-4">
          <Card>
            <View className="items-center">
              <PhotoUpload initialImage={profile.profileImage} onImageSelected={handleImageSelected} />
              <Text className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</Text>
              <Text className="text-cyan-600 font-medium mb-4">{profile.specialty}</Text>

              <View className="flex-row mb-4">
                <Button title="Manage Schedule" onPress={navigateToSchedule} variant="primary" fullWidth={false} />
              </View>
            </View>
          </Card>

          <Card>
            <Text className="text-xl font-bold text-gray-800 mb-4">Personal Information</Text>

            <FormInput label="Full Name" value={profile.name} onChangeText={(value) => handleChange("name", value)} />

            <FormInput
              label="Specialty"
              value={profile.specialty}
              onChangeText={(value) => handleChange("specialty", value)}
            />

            <FormInput
              label="Years of Experience"
              value={profile.experience}
              keyboardType="numeric"
              onChangeText={(value) => handleChange("experience", value)}
            />

            <FormInput
              label="Certifications"
              value={profile.certifications}
              multiline
              numberOfLines={3}
              onChangeText={(value) => handleChange("certifications", value)}
            />

            <FormInput
              label="Professional Bio"
              value={profile.bio}
              multiline
              numberOfLines={4}
              onChangeText={(value) => handleChange("bio", value)}
            />
          </Card>

          <Card>
            <Text className="text-xl font-bold text-gray-800 mb-4">Contact Information</Text>

            <View className="flex-row items-center mb-4">
              <Icon source="email" size={20} color="#0891b2" />
              <View className="ml-2 flex-1">
                <FormInput
                  label="Email"
                  value={profile.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(value) => handleChange("email", value)}
                />
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <Icon source="phone" size={20} color="#0891b2" />
              <View className="ml-2 flex-1">
                <FormInput
                  label="Phone Number"
                  value={profile.phone}
                  keyboardType="phone-pad"
                  onChangeText={(value) => handleChange("phone", value)}
                />
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <Icon source="map-marker" size={20} color="#0891b2" />
              <View className="ml-2 flex-1">
                <FormInput
                  label="Clinic Address"
                  value={profile.clinicAddress}
                  multiline
                  numberOfLines={2}
                  onChangeText={(value) => handleChange("clinicAddress", value)}
                />
              </View>
            </View>
          </Card>

          <View className="flex-row justify-center mt-4 mb-8">
            <Button title="Save Changes" onPress={handleSave} variant="primary" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ProfileScreen
