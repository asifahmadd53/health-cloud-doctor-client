import { useState, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Header from "../../components/Header"
import { getAppointmentById } from "../../utils/libs/services/appointmentService"
import { formatDate, formatTime } from "../../utils/dateUtils"
import type { Appointment } from "../../utils/libs/types/appointment"
import CustomButton from "../../components/CustomButton"

const AppointmentDetailsScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { id } = route.params as { id: string }

  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAppointment()
  }, [id])

  const loadAppointment = async () => {
    try {
      setLoading(true)
      const data = await getAppointmentById(id)
      setAppointment(data)
    } catch (error) {
      Alert.alert("Error", "Failed to load appointment details")
      navigation.goBack()
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAppointment = () => {
    Alert.alert("Delete Appointment", "Are you sure you want to delete this appointment?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // API logic goes here
          navigation.goBack()
        },
      },
    ])
  }



  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Header title="Appointment Details" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0891b2" />
          <Text className="mt-2 text-gray-600">Loading appointment details...</Text>
        </View>
       
      </SafeAreaView>
    )
  }

  if (!appointment) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Header title="Appointment Details" />
        <View className="flex-1 justify-center items-center p-4">
          <View className="mb-4 bg-cyan-50 p-4 rounded-full">
            <MaterialCommunityIcons name="account-alert" size={48} color="#0891b2" />
          </View>
          <Text className="text-lg text-gray-800 mb-4">Appointment not found</Text>
          <TouchableOpacity
            className="bg-cyan-600 px-6 py-3 rounded-lg"
            onPress={() => navigation.navigate("NewAppointmentScreen" as never)}
          >
            <Text className="text-white font-semibold text-base">Add Patient</Text>
          </TouchableOpacity>
        </View>
      
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Appointment Details" />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Patient Info Card */}
        <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mt-4">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-cyan-50 items-center justify-center">
              <MaterialCommunityIcons name="account-circle" size={24} color="#0891b2" />
            </View>
            <View className="ml-3">
              <Text className="text-xl font-bold text-gray-800">{appointment.patientName}</Text>
              <Text className="text-gray-500">
                {appointment.age} years • {appointment.gender}
              </Text>
            </View>
          </View>

          <View className="border-t border-gray-100 pt-4">
            <View className="flex-row items-center mb-3">
              <MaterialCommunityIcons name="phone" size={18} color="#6b7280" style={{ marginRight: 12 }} />
              <View>
                <Text className="text-xs text-gray-500">Contact Number</Text>
                <Text className="text-base text-gray-800">{appointment.contactNumber}</Text>
              </View>
            </View>

            <View className="flex-row items-center mb-3">
              <MaterialCommunityIcons name="calendar" size={18} color="#6b7280" style={{ marginRight: 12 }} />
              <View>
                <Text className="text-xs text-gray-500">Appointment Date</Text>
                <Text className="text-base text-gray-800">{formatDate(appointment.date)}</Text>
              </View>
            </View>

            <View className="flex-row items-center mb-3">
              <MaterialCommunityIcons name="clock-outline" size={18} color="#6b7280" style={{ marginRight: 12 }} />
              <View>
                <Text className="text-xs text-gray-500">Appointment Time</Text>
                <Text className="text-base text-gray-800">{formatTime(appointment.time)}</Text>
              </View>
            </View>

            <View className="flex-row items-center mb-3">
              <MaterialCommunityIcons name="credit-card-outline" size={18} color="#6b7280" style={{ marginRight: 12 }} />
              <View>
                <Text className="text-xs text-gray-500">Payment Method</Text>
                <Text className="text-base text-gray-800 capitalize">{appointment.paymentMethod}</Text>
              </View>
            </View>

            {appointment.reason && (
              <View className="flex-row items-start mb-3">
                <MaterialCommunityIcons
                  name="message-text-outline"
                  size={18}
                  color="#6b7280"
                  style={{ marginRight: 12, marginTop: 4 }}
                />
                <View className="flex-1">
                  <Text className="text-xs text-gray-500">Reason for Visit</Text>
                  <Text className="text-base text-gray-800">{appointment.reason}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Additional Actions */}
        <View className="mt-6 mb-8">
         <CustomButton loading={loading} label="Check In Patient" onPress={() => {
          Alert.alert("Success", "Patient checked in successfully")
         }} />
        </View>
      </ScrollView>

      
    </SafeAreaView>
  )
}

export default AppointmentDetailsScreen
