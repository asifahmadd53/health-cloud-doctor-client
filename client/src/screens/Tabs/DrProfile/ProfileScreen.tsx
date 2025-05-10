"use client"

import { useState, useRef } from "react"
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  TextInput as RNTextInput,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import PhotoUpload from "../../../components/Doctor/PhotoUpload"
import Button from "../../../components/Doctor/Button"
import Card from "../../../components/Doctor/Card"
import FormInput from "../../../components/Doctor/FormInput"

const ProfileScreen = () => {
  const navigation = useNavigation()
  const newPasswordRef = useRef<RNTextInput>(null)
  const confirmPasswordRef = useRef<RNTextInput>(null)

  // State for profile data
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15",
    licenseNumber: "MD12345678",
    certifications: "American Board of Internal Medicine, Cardiovascular Disease",
    bio: "Experienced cardiologist specializing in preventive cardiology and heart failure management.",
    email: "sarah.johnson@medical.com",
    phone: "(555) 123-4567",
    clinicAddress: "123 Medical Center Dr, Suite 300, Boston, MA 02115",
    profileImage: null,
  })

  // State for password management
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0

    let strength = 0
    // Length check
    if (password.length >= 8) strength += 0.25
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 0.25
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 0.25
    // Contains number or special char
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 0.25

    return strength
  }

  const passwordStrength = calculatePasswordStrength(passwordData.newPassword)

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "No password"
    if (passwordStrength <= 0.25) return "Weak"
    if (passwordStrength <= 0.5) return "Fair"
    if (passwordStrength <= 0.75) return "Good"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "#e5e7eb"
    if (passwordStrength <= 0.25) return "#ef4444"
    if (passwordStrength <= 0.5) return "#f59e0b"
    if (passwordStrength <= 0.75) return "#10b981"
    return "#10b981"
  }

  // Handle profile field changes
  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  // Handle password field changes
  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle image selection
  const handleImageSelected = (uri: string) => {
    setProfile((prev) => ({ ...prev, profileImage: uri }))
  }

  // Handle save profile
  const handleSave = () => {
    Alert.alert("Success", "Profile updated successfully!")
  }

  // Handle password update
  const handleUpdatePassword = () => {
    // Validate passwords
    if (!passwordData.currentPassword) {
      Alert.alert("Error", "Please enter your current password")
      return
    }

    if (!passwordData.newPassword) {
      Alert.alert("Error", "Please enter a new password")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert("Error", "New passwords don't match")
      return
    }

    if (passwordStrength < 0.5) {
      Alert.alert(
        "Weak Password",
        "Your password is not strong enough. Please include uppercase, lowercase, numbers, and special characters.",
      )
      return
    }

    // Success case
    Alert.alert("Success", "Password updated successfully!")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  // Navigate to schedule screen
  const navigateToSchedule = () => {
    navigation.navigate("ScheduleScreen" as never)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView className="flex-1 bg-gray-100">
        <View className="p-4">
          {/* Profile Card */}
          <Card>
            <View className="items-center">
              <PhotoUpload initialImage={profile.profileImage} onImageSelected={handleImageSelected} />
              <Text className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</Text>
              <Text className="text-cyan-600 font-medium mb-4">{profile.specialty}</Text>

              <View className="w-full mb-2">
                <Button
                  title="Manage Schedule"
                  onPress={navigateToSchedule}
                  variant="primary"
                  fullWidth
                  icon={<MaterialIcons name="schedule" size={20} color="white" />}
                />
              </View>
            </View>
          </Card>

          {/* Personal Information */}
          <Card className="mt-4">
            <View className="flex-row items-center mb-4">
              <MaterialIcons name="person" size={24} color="#0891b2" />
              <Text className="text-xl font-bold text-gray-800 ml-2">Personal Information</Text>
            </View>

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
              label="License Number"
              value={profile.licenseNumber}
              onChangeText={(value) => handleChange("licenseNumber", value)}
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

          {/* Contact Information */}
          <Card className="mt-4">
            <View className="flex-row items-center mb-4">
              <MaterialIcons name="contact-phone" size={24} color="#0891b2" />
              <Text className="text-xl font-bold text-gray-800 ml-2">Contact Information</Text>
            </View>

            <View className="flex-row items-start mb-4">
              <View className="w-10 h-10 rounded-full bg-cyan-50 items-center justify-center mt-2">
                <MaterialIcons name="email" size={20} color="#0891b2" />
              </View>
              <View className="ml-3 flex-1">
                <FormInput
                  label="Email"
                  value={profile.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(value) => handleChange("email", value)}
                  className="mb-0"
                />
              </View>
            </View>

            <View className="flex-row items-start mb-4">
              <View className="w-10 h-10 rounded-full bg-cyan-50 items-center justify-center mt-2">
                <MaterialIcons name="phone" size={20} color="#0891b2" />
              </View>
              <View className="ml-3 flex-1">
                <FormInput
                  label="Phone Number"
                  value={profile.phone}
                  keyboardType="phone-pad"
                  onChangeText={(value) => handleChange("phone", value)}
                  className="mb-0"
                />
              </View>
            </View>

            <View className="flex-row items-start mb-4">
              <View className="w-10 h-10 rounded-full bg-cyan-50 items-center justify-center mt-2">
                <MaterialIcons name="location-on" size={20} color="#0891b2" />
              </View>
              <View className="ml-3 flex-1">
                <FormInput
                  label="Clinic Address"
                  value={profile.clinicAddress}
                  multiline
                  numberOfLines={2}
                  onChangeText={(value) => handleChange("clinicAddress", value)}
                  className="mb-0"
                />
              </View>
            </View>
          </Card>

          {/* Password Management */}
          <Card className="mt-4">
            <View className="flex-row items-center mb-4">
              <MaterialIcons name="security" size={24} color="#0891b2" />
              <Text className="text-xl font-bold text-gray-800 ml-2">Password Management</Text>
            </View>

            <Text className="text-gray-600 mb-4">Update your password regularly to keep your account secure.</Text>

            {/* Current Password */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-1.5">Current Password</Text>
              <View className="flex-row items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                <TextInput
                  value={passwordData.currentPassword}
                  onChangeText={(value) => handlePasswordChange("currentPassword", value)}
                  secureTextEntry={!showCurrentPassword}
                  placeholder="Enter current password"
                  className="flex-1 p-4 text-gray-800"
                  placeholderTextColor="#9ca3af"
                  returnKeyType="next"
                  onSubmitEditing={() => newPasswordRef.current?.focus()}
                />
                <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} className="px-4">
                  <MaterialIcons
                    name={showCurrentPassword ? "visibility-off" : "visibility"}
                    size={24}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* New Password */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-1.5">New Password</Text>
              <View className="flex-row items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                <TextInput
                  ref={newPasswordRef}
                  value={passwordData.newPassword}
                  onChangeText={(value) => handlePasswordChange("newPassword", value)}
                  secureTextEntry={!showNewPassword}
                  placeholder="Enter new password"
                  className="flex-1 p-4 text-gray-800"
                  placeholderTextColor="#9ca3af"
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                />
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} className="px-4">
                  <MaterialIcons name={showNewPassword ? "visibility-off" : "visibility"} size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>

              {/* Password strength indicator */}
              {passwordData.newPassword ? (
                <View className="mt-2">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-xs text-gray-500">Password Strength</Text>
                    <Text className="text-xs font-medium" style={{ color: getPasswordStrengthColor() }}>
                      {getPasswordStrengthLabel()}
                    </Text>
                  </View>
                  <View className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <View
                      className="h-full"
                      style={{
                        width: `${passwordStrength * 100}%`,
                        backgroundColor: getPasswordStrengthColor(),
                      }}
                    />
                  </View>
                </View>
              ) : null}
            </View>

            {/* Confirm Password */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-1.5">Confirm New Password</Text>
              <View className="flex-row items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                <TextInput
                  ref={confirmPasswordRef}
                  value={passwordData.confirmPassword}
                  onChangeText={(value) => handlePasswordChange("confirmPassword", value)}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirm new password"
                  className="flex-1 p-4 text-gray-800"
                  placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="px-4">
                  <MaterialIcons
                    name={showConfirmPassword ? "visibility-off" : "visibility"}
                    size={24}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>

              {/* Password match indicator */}
              {passwordData.newPassword && passwordData.confirmPassword && (
                <View className="flex-row items-center mt-1">
                  <MaterialIcons
                    name={passwordData.newPassword === passwordData.confirmPassword ? "check-circle" : "error"}
                    size={16}
                    color={passwordData.newPassword === passwordData.confirmPassword ? "#10b981" : "#ef4444"}
                  />
                  <Text
                    className="text-xs ml-1"
                    style={{
                      color: passwordData.newPassword === passwordData.confirmPassword ? "#10b981" : "#ef4444",
                    }}
                  >
                    {passwordData.newPassword === passwordData.confirmPassword
                      ? "Passwords match"
                      : "Passwords don't match"}
                  </Text>
                </View>
              )}
            </View>

            <Button
              title="Update Password"
              onPress={handleUpdatePassword}
              variant="primary"
              icon={<MaterialIcons name="lock" size={20} color="white" />}
            />
          </Card>

          {/* Save Button */}
          <View className="mt-6 mb-8">
            <Button
              title="Save Profile Changes"
              onPress={handleSave}
              variant="primary"
              fullWidth
              className="shadow-sm"
              icon={<MaterialIcons name="save" size={20} color="white" />}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ProfileScreen

const TextInput = ({ ...props }) => {
  return <RNTextInput {...props} />
}
