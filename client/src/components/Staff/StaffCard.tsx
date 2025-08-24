import type React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

type StaffCardProps = {
  staff: {
    _id: string
    name: string
    role: string
    profileImage: string | null
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

const StaffCard: React.FC<StaffCardProps> = ({ staff, className = "" }) => {
  const navigation = useNavigation<StaffNavigationProp>()

  const handleView = () => {
    navigation.navigate("StaffDetails", { staffId: staff._id })
  }

  return (
    <TouchableOpacity
      onPress={handleView}
      activeOpacity={0.85}
      className={`bg-white rounded-2xl p-5 mb-4 shadow-md flex-row items-center justify-between ${className}`}
    >
      {/* Left Section: Profile */}
      <View className="flex-row items-center">
        <View className="relative">
          {staff.profileImage ? (
            <Image
              source={{ uri: staff.profileImage }}
              className="w-20 h-20 rounded-full border border-gray-200"
            />
          ) : (
            <View className="w-16 h-16 rounded-full bg-gray-200 items-center justify-center border border-gray-300">
              <Text className="text-xl font-bold text-gray-600">
                {staff.name.charAt(0)}
              </Text>
            </View>
          )}

        
        </View>

        <View className="ml-4">
          <Text className="text-lg font-semibold text-gray-900">{staff.name}</Text>
          <Text className="text-sm text-gray-500">{staff.role}</Text>
        <Text className="text-sm text-gray-600">View Profile</Text>
        </View>
      </View>

      {/* Right Arrow (hint clickable) */}
      <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
    </TouchableOpacity>
  )
}

export default StaffCard
