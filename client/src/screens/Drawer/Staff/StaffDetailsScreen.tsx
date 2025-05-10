import { useState, useEffect } from "react"
import { View, Text, ScrollView, Image, Alert } from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Ionicons from "react-native-vector-icons/Ionicons"
import Button from "../../../components/Doctor/Button"
import Card from "../../../components/Doctor/Card"

export type RootStackParamList = {
  MainTabs: undefined
  Schedule: undefined
  AddStaff: undefined
  EditStaff: { staffId: string }
  StaffDetails: { staffId: string }
}

type StaffDetailsScreenRouteProp = RouteProp<RootStackParamList, "StaffDetails">
type StaffDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const mockStaffDetails = {
  "1": {
    id: "1",
    name: "Jennifer Lee",
    role: "Nurse Practitioner",
    email: "jennifer.lee@example.com",
    phone: "(555) 123-4567",
    address: "123 Medical Center Dr, Suite 101, Boston, MA 02115",
    bio: "Experienced nurse practitioner with 10 years in cardiology.",
    startDate: "January 15, 2018",
    department: "Cardiology",
    certifications: "Registered Nurse (RN), Nurse Practitioner (NP)",
    profileImage: null,
  },
  "2": {
    id: "2",
    name: "David Rodriguez",
    role: "Medical Assistant",
    email: "david.rodriguez@example.com",
    phone: "(555) 987-6543",
    address: "123 Medical Center Dr, Suite 101, Boston, MA 02115",
    bio: "Certified medical assistant with expertise in patient care.",
    startDate: "March 10, 2020",
    department: "General Practice",
    certifications: "Certified Medical Assistant (CMA)",
    profileImage: null,
  },
  "3": {
    id: "3",
    name: "Sarah Kim",
    role: "Receptionist",
    email: "sarah.kim@example.com",
    phone: "(555) 456-7890",
    address: "123 Medical Center Dr, Suite 101, Boston, MA 02115",
    bio: "Front desk receptionist with excellent organizational skills.",
    startDate: "June 5, 2021",
    department: "Administration",
    certifications: "Medical Office Administration Certificate",
    profileImage: null,
  },
}

const StaffDetailsScreen = () => {
  const navigation = useNavigation<StaffDetailsScreenNavigationProp>()
  const route = useRoute<StaffDetailsScreenRouteProp>()
  const { staffId } = route.params

  const [staffDetails, setStaffDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const details = mockStaffDetails[staffId as keyof typeof mockStaffDetails]
      setStaffDetails(details)
      setLoading(false)
    }, 500)
  }, [staffId])

  const handleEdit = () => {
    navigation.navigate("EditStaff", { staffId })
  }

  const handleDelete = () => {
    Alert.alert("Delete Staff Member", "Are you sure you want to delete this staff member?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          Alert.alert("Success", "Staff member deleted successfully!")
          navigation.goBack()
        },
        style: "destructive",
      },
    ])
  }

  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 items-center justify-center">
        <Text className="text-gray-500 text-base">Loading staff details...</Text>
      </View>
    )
  }

  if (!staffDetails) {
    return (
      <View className="flex-1 bg-gray-100 items-center justify-center p-4">
        <Text className="text-gray-500 text-base mb-4">Staff member not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} variant="primary" />
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Card>
          <View className="items-center p-4">
            {staffDetails.profileImage ? (
              <Image source={{ uri: staffDetails.profileImage }} className="w-24 h-24 rounded-full mb-4" />
            ) : (
              <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center mb-4">
                <Text className="text-4xl font-bold text-gray-500">{staffDetails.name.charAt(0)}</Text>
              </View>
            )}
            <Text className="text-2xl font-bold text-gray-800 mb-1">{staffDetails.name}</Text>
            <Text className="text-base text-primary font-medium mb-1">{staffDetails.role}</Text>
            <Text className="text-sm text-gray-500 mb-4">{staffDetails.department}</Text>

            <View className="flex-row justify-center w-full">
              <Button
                title="Edit"
                onPress={handleEdit}
                variant="outline"
                className="flex-1 mr-2 flex-row items-center justify-center"
                icon={<Ionicons name="create-outline" size={16} color="#0891b2" />}
              />
              <Button
                title="Delete"
                onPress={handleDelete}
                variant="danger"
                className="flex-1 ml-2 flex-row items-center justify-center"
                icon={<Ionicons name="trash-bin" size={16} color="#fff" />}
              />
            </View>
          </View>
        </Card>

        <Card>
          <Text className="text-lg font-bold text-gray-800 mb-4">Contact Information</Text>
          <View className="flex-row items-center mb-3">
            <Ionicons name="mail-outline" size={20} color="#0891b2" />
            <Text className="ml-3 text-base text-gray-600">{staffDetails.email}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="call-outline" size={20} color="#0891b2" />
            <Text className="ml-3 text-base text-gray-600">{staffDetails.phone}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="location-outline" size={20} color="#0891b2" />
            <Text className="ml-3 text-base text-gray-600">{staffDetails.address}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={20} color="#0891b2" />
            <Text className="ml-3 text-base text-gray-600">Started {staffDetails.startDate}</Text>
          </View>
        </Card>

        <Card>
          <Text className="text-lg font-bold text-gray-800 mb-4">Professional Information</Text>
          <View className="mb-4">
            <Text className="text-base font-semibold text-gray-600 mb-2">Bio</Text>
            <Text className="text-base text-gray-600 leading-6">{staffDetails.bio}</Text>
          </View>
          <View>
            <Text className="text-base font-semibold text-gray-600 mb-2">Certifications</Text>
            <Text className="text-base text-gray-600 leading-6">{staffDetails.certifications}</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  )
}

export default StaffDetailsScreen
