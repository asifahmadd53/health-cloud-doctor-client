import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Ionicons from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../screens/Drawer/Staff/StaffScreen"

type StaffCardNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface StaffMember {
  _id: string
  name: string
  role: string
  email: string
  phone: string
  image?: string | null
}

interface StaffCardProps {
  staff: StaffMember
  onDelete: (id: string) => void
}

const StaffCard = ({ staff, onDelete }: StaffCardProps) => {
  const navigation = useNavigation<StaffCardNavigationProp>()

  const handleViewDetails = () => {
    navigation.navigate("StaffDetails", { staffId: staff._id })
  }

  const handleEdit = () => {
    navigation.navigate("EditStaff", { staffId: staff._id })
  }

  return (
    <Pressable onPress={handleViewDetails} className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-cyan-50 items-center justify-center mr-4">
          <Text className="text-xl font-bold text-cyan-600">{staff.name.charAt(0)}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">{staff.name}</Text>
          <Text className="text-sm text-cyan-600">{staff.role}</Text>
          <Text className="text-xs text-gray-500">{staff.email}</Text>
        </View>

        <View className="flex-row">
          <Pressable
            onPress={handleEdit}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mr-2"
          >
            <Ionicons name="create-outline" size={20} color="#0891b2" />
          </Pressable>

          <Pressable
            onPress={() => onDelete(staff._id)}
            className="w-10 h-10 rounded-full bg-red-50 items-center justify-center"
          >
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  )
}

export default StaffCard
