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
import CustomSimpleInput from "../../../components/CustomSimpleInput"
import FormInput from "../../../components/Doctor/FormInput"
import CustomPasswordInput from "../../../components/CustomPasswordInput"

const ProfileScreen = () => {
  const navigation = useNavigation()

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



  // Handle profile field changes
  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
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
      <ScrollView className="flex-1 px-5 bg-slate-50" showsVerticalScrollIndicator={false}>
        {/* Premium Header */}
        <View className="bg-white pt-16 pb-10">
          <View className="px-8">
            <View className="items-center">
              <View className="mb-3">
                <PhotoUpload initialImage={profile.profileImage} onImageSelected={handleImageSelected} />
              </View>
              <Text className="text-3xl font-bold text-slate-900 mb-2">{profile.name}</Text>
              <View className="bg-slate-100 px-4 py-2 rounded-full mb-8">
                <Text className="text-base font-semibold text-slate-600">{profile.specialty}</Text>
              </View>
              <View className="w-full max-w-sm">
                <TouchableOpacity
                  onPress={navigateToSchedule}
                  className="bg-slate-900 py-4 px-6 rounded-2xl flex-row items-center justify-center shadow-lg"
                >
                  <MaterialIcons name="schedule" size={20} color="white" />
                  <Text className="text-white text-base font-semibold ml-2">Manage Schedule</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="px-1 mt-6">
          {/* Professional Information */}
          <View className="mb-8">
            <View className="mb-5">
              <Text className="text-xl font-bold text-slate-900 mb-1">Professional Information</Text>
              <Text className="text-sm text-slate-500">Manage your professional credentials and experience</Text>
            </View>

            <View className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
              <View className="space-y-6">
                <View>
                 
                  
                    <FormInput
                      label="Full Name"
                      value={profile.name}
                    />
                 
                </View>

                <View className="flex-row space-x-4">
                  <View className="flex-1 mr-2">
                      <FormInput
                        label="Specialty"
                        value={profile.specialty}
                      />
                  </View>
                  <View className="w-32">

                      <FormInput
                        label="Years"
                        value={profile.experience}
                        onChange={()=>''}
                        placeholder=""
                        keyboardType="numeric"
                        className="text-base text-slate-900 font-medium"
                        placeholderTextColor="#94a3b8"
                      />
                    
                  </View>
                </View>

                <View>
                  
                    <FormInput
                      value={profile.licenseNumber}
                      label="PMDC #"
                      placeholderTextColor="#94a3b8"
                    />
                </View>

                <View>
                
                  
                    <FormInput
                      label="Certifications"
                      value={profile.certifications}
                      multiline
                      numberOfLines={4}
                      
                      className="text-base text-slate-900 font-medium min-h-20 "
                      placeholderTextColor="#94a3b8"
                    />

                </View>

                <View>
                 
                
                    <FormInput
                      label=" Professional Bio"
                      value={profile.bio}
                      onChangeText={(value) => handleChange("bio", value)}
                      multiline
                      numberOfLines={4}
                      className="text-base text-slate-900 font-medium"
                      placeholderTextColor="#94a3b8"
                    />
                 
                </View>
              </View>
            </View>
          </View>

          {/* Contact Information */}
          <View className="mb-8">
            <View className="mb-5">
              <Text className="text-xl font-bold text-slate-900 mb-1">Contact Information</Text>
              <Text className="text-sm text-slate-500">Update your contact details and clinic information</Text>
            </View>

            <View className="bg-white rounded-3xl p-1 shadow-sm border border-slate-100">
              <View className="space-y-7">
                {/* Email */}
                <View>
                  <View className="flex-row items-center mb-3">
                    
                  </View>
                  
                    <FormInput
                      value={profile.email}
                      label="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="text-base text-slate-900 font-medium"
                      placeholderTextColor="#94a3b8"
                    />
                  
                </View>

                {/* Phone */}
                <View>
                    <FormInput
                      label="Phone Number"
                      value={profile.phone}
                      onChangeText={(value) => handleChange("phone", value)}
                      keyboardType="phone-pad"
                      className="text-base text-slate-900 font-medium"
                      placeholderTextColor="#94a3b8"
                    />
                 
                </View>

                {/* Address */}
                <View>
                 
                  
                    <FormInput
                      label="Clinic Address"
                      value={profile.clinicAddress}
                      onChangeText={(value) => handleChange("clinicAddress", value)}
                      multiline
                      numberOfLines={4}
                      className="text-base text-slate-900 font-medium"
                      placeholderTextColor="#94a3b8"
                    />
                </View>
              </View>
            </View>
          </View>

          {/* Security & Privacy */}
         

          {/* Save Changes */}
          <View className="mb-5">
            <TouchableOpacity
              onPress={handleSave}
              className="bg-slate-900 py-5 px-8 rounded-2xl flex-row items-center justify-center shadow-xl"
            >
              <MaterialIcons name="save" size={24} color="white" />
              <Text className="text-white text-lg font-bold ml-3">Save All Changes</Text>
            </TouchableOpacity>
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
