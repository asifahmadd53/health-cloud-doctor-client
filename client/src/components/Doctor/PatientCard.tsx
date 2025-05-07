import type React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
// import { Calendar, Phone, Mail } from "lucide-react-native"

type PatientCardProps = {
  patient: {
    id: string
    name: string
    age: number
    gender: string
    email: string
    phone: string
    nextAppointment?: string
    image: string | null
  }
  onPress: (id: string) => void
  className?: string
}


const PatientCard: React.FC<PatientCardProps> = ({ patient, onPress, className = "" }) => {
  return (
    <TouchableOpacity
      className={`bg-white rounded-xl p-4 mb-4 shadow-md ${className}`}
      onPress={() => onPress(patient.id)}
    >
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          {patient.image ? (
            <Image source={{ uri: patient.image }} className="w-12 h-12 rounded-full" />
          ) : (
            <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center">
              <Text className="text-xl font-bold text-gray-500">{patient.name.charAt(0)}</Text>
            </View>
          )}
          <View className="ml-3">
            <Text className="text-base font-semibold text-gray-800">{patient.name}</Text>
            <Text className="text-sm text-gray-500">
              {patient.age} years • {patient.gender}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-2">
        <View className="flex-row items-center mb-2">
          {/* <Mail size={16} color="#6b7280" /> */}
          <Text className="ml-2 text-sm text-gray-600">{patient.email}</Text>
        </View>
        <View className="flex-row items-center mb-2">
          {/* <Phone size={16} color="#6b7280" /> */}
          <Text className="ml-2 text-sm text-gray-600">{patient.phone}</Text>
        </View>
        {patient.nextAppointment && (
          <View className="flex-row items-center">
            {/* <Calendar size={16} color="#6b7280" /> */}
            <Text className="ml-2 text-sm text-gray-600">Next: {patient.nextAppointment}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default PatientCard
