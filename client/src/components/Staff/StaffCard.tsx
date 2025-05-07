import type React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"


type StaffCardProps = {
  staff: {
    id: string
    name: string
    role: string
    email: string
    phone: string
    image: string | null
  }
  onDelete: (id: string) => void
  className?: string
}
export type RootStackParamList = {
  MainTabs: undefined
  Schedule: undefined
  AddStaff: undefined
  EditStaff: { staffId: string }
  StaffDetails: { staffId: string }
}

type StaffNavigationProp = NativeStackNavigationProp<RootStackParamList>



const StaffCard: React.FC<StaffCardProps> = ({ staff, onDelete, className = "" }) => {
  const navigation = useNavigation<StaffNavigationProp>()

  const handleEdit = () => {
    navigation.navigate("EditStaff", { staffId: staff.id })
  }

  const handleView = () => {
    navigation.navigate("StaffDetails", { staffId: staff.id })
  }

  return (
    <View className={`bg-white rounded-xl p-4 mb-4 shadow-md ${className}`}>
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          {staff.image ? (
            <Image source={{ uri: staff.image }} className="w-12 h-12 rounded-full" />
          ) : (
            <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center">
              <Text className="text-xl font-bold text-gray-500">{staff.name.charAt(0)}</Text>
            </View>
          )}
          <View className="ml-3">
            <Text className="text-base font-semibold text-gray-800">{staff.name}</Text>
            <Text className="text-sm text-gray-500">{staff.role}</Text>
          </View>
        </View>
      </View>

      <View className="mb-4">
        <View className="flex-row items-center mb-2">
        <Ionicons name="mail-outline" size={16} color="#4B5563" />

          <Text className="ml-2 text-sm text-gray-600">{staff.email}</Text>
        </View>
        <View className="flex-row items-center">
        <Ionicons name="call-outline" size={16} color="#4B5563" />

          <Text className="ml-2 text-sm text-gray-600">{staff.phone}</Text>
        </View>
      </View>

      <View className="flex-row justify-end">
        <TouchableOpacity
          className="flex-row items-center py-1.5 px-3 rounded-md bg-primary-light mr-2"
          onPress={handleView}
        >
<Ionicons name="eye-outline" size={16} color="#0891b2" />
<Text className="ml-1 text-primary font-medium">View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center py-1.5 px-3 rounded-md bg-secondary-light mr-2"
          onPress={handleEdit}
        >
         <Ionicons name="create-outline" size={16} color="#10b981" />

          <Text className="ml-1 text-secondary font-medium">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center py-1.5 px-3 rounded-md bg-danger-light"
          onPress={() => onDelete(staff.id)}
        >
         <Ionicons name="trash-outline" size={16} color="#ef4444" />

          <Text className="ml-1 text-danger font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StaffCard
