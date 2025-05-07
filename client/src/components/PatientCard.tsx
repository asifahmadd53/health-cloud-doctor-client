"use client"

import { Text, TouchableOpacity, View, Platform } from "react-native"
import { useCallback } from "react"
import { useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

interface PatientCardProps {
  index: number
}

const PatientCard = ({ index }: PatientCardProps) => {
  const navigation = useNavigation()

  const handlePress = useCallback(() => {
    navigation.navigate("patientDetailsLayout" as never)
  }, [navigation])

  const appointments = [
    {
      id: "1",
      patientName: "Sarah Johnson",
      ageValue: 17,
      ageUnit: "years",
      time: "10:30 AM",
      status: "confirmed",
      paymentStatus: "completed",
    },
    {
      id: "2",
      patientName: "Michael Chen",
      ageValue: 8,
      ageUnit: "months",
      time: "02:30 PM",
      status: "confirmed",
      paymentStatus: "pending",
    },
    {
      id: "3",
      patientName: "Emily Rodriguez",
      ageValue: 28,
      ageUnit: "years",
      time: "11:00 AM",
      paymentStatus: "completed",
    },
    {
      id: "4",
      patientName: "David Wilson",
      ageValue: 3,
      ageUnit: "days",
      time: "03:45 PM",
      status: "confirmed",
      paymentStatus: "completed",
    },
  ]

  // Get appointment data based on index (with fallback)
  const item = appointments[(index - 1) % appointments.length] || appointments[0]
  if (!item) return null

  // Format age display
  const ageDisplay = `${item.ageValue} ${item.ageUnit}`

  return (
    <TouchableOpacity
      activeOpacity={1}
      className="bg-white rounded-2xl p-4 mb-4 border border-gray-100"
      style={Platform.select({
        ios: {
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      })}
    >
      {/* Patient Info Section */}
      <View className="flex-row items-center">
        {/* Patient Number */}
        <View className="w-10 h-10 bg-blue-100 bg-opacity-30 rounded-full items-center justify-center mr-3">
          <Text className="text-secondary font-bold text-base">{index}</Text>
        </View>

        {/* Patient Details */}
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-800">{item.patientName}</Text>

            {/* Status Badge - Only show if status exists */}
            {item.status && (
              <View className="px-3 py-1 rounded-full bg-green-50 border border-green-100">
                <Text className="text-xs font-medium text-green-700 capitalize">{item.status}</Text>
              </View>
            )}
          </View>

          <View className="flex-row justify-between items-center mt-1">
            {/* Age Display */}
            <Text className="text-gray-600 text-sm">Age: {ageDisplay}</Text>

            {/* Time Display */}
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="clock-outline" size={14} color="#2C415C" />
              <Text className="text-primary ml-1 font-medium text-sm">{item.time}</Text>
            </View>
          </View>

          {/* Payment Status */}
          <View className="mt-1 flex-row items-center">
            <MaterialCommunityIcons
              name={item.paymentStatus === "completed" ? "check-circle-outline" : "clock-time-four-outline"}
              size={14}
              color={item.paymentStatus === "completed" ? "#10B981" : "#F59E0B"}
            />
            <Text
              className={`ml-1 text-sm ${item.paymentStatus === "completed" ? "text-green-600" : "text-amber-600"}`}
            >
              {item.paymentStatus === "completed" ? "Payment Done" : "Payment Pending"}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row mt-1 pt-3 border-t border-gray-100">
        {/* Reschedule Button */}
        {/* <TouchableOpacity className="flex-1 mr-2 bg-indigo-50 py-2.5 rounded-lg items-center border border-indigo-100">
          <Text className="text-indigo-600 font-medium">Reschedule</Text>
        </TouchableOpacity> */}

        {/* Start Session Button */}
        <TouchableOpacity onPress={handlePress} activeOpacity={.95} className="flex-1 ml-2 bg-secondary py-2.5 rounded-lg items-center">
          <Text className="text-white font-medium">Start Session</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default PatientCard
