"use client"

import { useState } from "react"
import {
  ScrollView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FormInput from "../../components/Doctor/FormInput"
import CustomButton from "../../components/CustomButton"
import Header from "../../components/Header"
import { formatDate } from "../../utils/dateUtils"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import axios from "axios"
import { BASE_URL } from "../../api/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

const NewAppointmentScreen = () => {
  const navigation = useNavigation<any>()
  const [loading, setLoading] = useState(false)

  // Form state
  const [patientName, setPatientName] = useState("")
  const [patientCNIC, setPatientCNIC] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(null)
  const [patientAge, setPatientAge] = useState("")
  const [reason, setReason] = useState("")

  const [availableSlots, setAvailableSlots] = useState<any[]>([])
  const [selectedSlot, setSelectedSlot] = useState<{
    _id: string
    slotTime: string
  } | null>(null)

  const [loadingSlots, setLoadingSlots] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  // Date and time pickers
  const [date, setDate] = useState<Date | null>(null)

  const [isDatePickerVisible, setDatePickerVisible] = useState(false)

  const validateForm = () => {
    if (!patientName.trim()) {
      Alert.alert("Error", "Patient name is required")
      return false
    }
    if (!patientPhone.trim()) {
      Alert.alert("Error", "Mobile number is required")
      return false
    }
    if (!patientAge.trim()) {
      Alert.alert("Error", "Age is required")
      return false
    }
    if (!gender) {
      Alert.alert("Error", "Please select gender")
      return false
    }
    if (!date) {
      Alert.alert("Error", "Please select appointment date")
      return false
    }
    if (!selectedSlot) {
      Alert.alert("Error", "Please select a time slot")
      return false
    }
    if (!paymentMethod) {
      Alert.alert("Error", "Please select payment method")
      return false
    }

    if (!/^[0-9]{11}$/.test(patientPhone)) {
      Alert.alert("Error", "Invalid phone number.  Use 11 digits.")
      return false
    }
    if (isNaN(Number(patientAge)) || Number(patientAge) <= 0) {
      Alert.alert("Error", "Invalid age.  Must be a positive number.")
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)

    try {
      const token = await AsyncStorage.getItem("staffToken")

      if (!token) {
        Alert.alert("Session Expired", "Please login again")
        navigation.navigate("StaffLogin")
        return
      }

      const dateString = date?.toISOString().split("T")[0] || ""

      const response = await axios.post(
        `${BASE_URL}/appointment/create-appointment`,
        {
          patientName,
          patientCNIC,
          patientPhone,
          patientAge,
          gender,
          date: dateString,
          slotTime: selectedSlot.slotTime,
          clinicScheduleSlotId: selectedSlot._id,
          paymentStatus: paymentMethod,
          reason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.data.success) {
        Alert.alert("Success", "Appointment created successfully", [{ text: "OK", onPress: () => navigation.goBack() }])
      } else {
        Alert.alert("Error", response.data.message)
      }
    } catch (error: any) {
      console.error("Appointment error:", error)

      if (error.response?.status === 401) {
        Alert.alert("Session Expired", "Your session has expired. Please login again.", [
          { text: "OK", onPress: () => navigation.navigate("StaffLogin") },
        ])
      } else {
        Alert.alert("Error", error.response?.data?.message || "Failed to create appointment")
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailableSlots = async (selectedDate: Date) => {
    try {
      setLoadingSlots(true)
      setAvailableSlots([])
      setSelectedSlot(null)

      // Get staff token
      const token = await AsyncStorage.getItem("staffToken")
      if (!token) {
        Alert.alert("Session Expired", "Please login again")
        navigation.navigate("StaffLogin")
        return
      }

      // Format date as YYYY-MM-DD
      const dateString = selectedDate.toISOString().split("T")[0]

      // Fetch available slots from API
      const res = await axios.get(`${BASE_URL}/doctors/get-available-slots`, {
        params: {
          date: dateString, // ✅ Properly passed as query parameter
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.success) {
        let slots = res.data.slots || []

        // Filter out past slots if selected date is today
        const today = new Date()
        if (selectedDate.toDateString() === today.toDateString()) {
          slots = slots.filter((slot: { slotTime: string }) => {
            const [hours, minutes] = slot.slotTime.split(":").map(Number)
            const slotDateTime = new Date()
            slotDateTime.setHours(hours, minutes, 0, 0)
            return slotDateTime > today
          })
        }

        if (slots.length === 0) {
          Alert.alert("No Slots", "No available slots for this date.")
        }

        setAvailableSlots(slots)
      } else {
        Alert.alert("Error", res.data.message || "Failed to load slots.")
      }
    } catch (error: any) {
      console.error("Fetch Slots Error:", error)
      Alert.alert("Error", error.response?.data?.message || "Failed to load available slots")
    } finally {
      setLoadingSlots(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="New Appointment" />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mt-4 mb-8">
            {/* Patient Information */}
            <Text className="text-lg font-bold text-gray-800 mb-4">Patient Information</Text>

            <FormInput
              value={patientName}
              onChangeText={setPatientName}
              placeholder="Enter patient name"
              label="Patient Name"
            />

            <FormInput
              value={patientCNIC}
              onChangeText={setPatientCNIC}
              placeholder="Enter CNIC number (XXXXX-XXXXXXX-X)"
              label="CNIC #"
              keyboardType="numeric"
            />

            <FormInput
              value={patientPhone}
              onChangeText={setPatientPhone}
              placeholder="Enter mobile number (11 digits)"
              label="Mobile #"
              keyboardType="phone-pad"
            />

            <FormInput
              value={patientAge}
              onChangeText={setPatientAge}
              placeholder="Enter age"
              label="Age"
              keyboardType="numeric"
            />

            {/* Gender Selection */}
            <Text className="mt-4 mb-2 font-semibold text-base text-gray-700">Gender</Text>
            <View className="flex-row gap-4">
              {["Male", "Female"].map((g) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  key={g}
                  onPress={() => setGender(g.toLowerCase() as "male" | "female")}
                  className={`flex-1 py-4 rounded-xl items-center ${gender === g.toLowerCase() ? (g === "Male" ? "bg-blue-500" : "bg-pink-500") : "bg-gray-200"
                    }`}
                >
                  <Text className={`font-semibold ${gender === g.toLowerCase() ? "text-white" : "text-gray-700"}`}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Appointment Details */}
            <Text className="text-lg font-bold text-gray-800 mt-8 mb-4">Appointment Details</Text>

            {/* Date Picker */}
            <Text className="mb-2 font-semibold text-base text-gray-700">Appointment Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="flex-row items-center border border-gray-200 rounded-lg p-3 mb-4"
            >
              <MaterialCommunityIcons name="calendar" size={20} color="#6b7280" />
              <Text className="ml-2 text-gray-700">{date ? formatDate(date.toISOString()) : "Select date"}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <RNDateTimePicker
                value={date || new Date()}
                mode="date"
                minimumDate={new Date()}
                display={Platform.OS === "android" ? "default" : "calendar"}
                onChange={(event, selectedDate) => {
                  if (Platform.OS === "android") {
                    setShowDatePicker(false)
                  }

                  if (event.type === "set" && selectedDate) {
                    setDate(selectedDate)
                    fetchAvailableSlots(selectedDate)
                  }
                }}
              />
            )}

            {/* Time Picker */}

            <Text className="mt-4 mb-2 font-semibold text-base text-gray-700">Available Time Slots</Text>

            {loadingSlots && <Text className="text-gray-500">Loading slots...</Text>}

            {!loadingSlots && availableSlots.length === 0 && date && (
              <Text className="text-red-500">No slots available for this date</Text>
            )}

            <View className="flex-row flex-wrap mb-2 px-1 justify-between">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
                {availableSlots.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => setSelectedSlot(slot)}
                    className={`mr-2 rounded-full p-2 px-3 items-center justify-center 
        ${selectedSlot?._id === slot._id ? "bg-primary" : "bg-[#F5F7FB]"}
      `}
                  >
                    <Text
                      className={`text-center ${selectedSlot?._id === slot._id ? "text-white" : "text-black"} text-sm lg:text-base`}
                    >
                      {slot.slotTime}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Reason for Visit */}
            <FormInput
              value={reason}
              onChangeText={setReason}
              placeholder="Enter reason for visit"
              label="Reason for Visit (Optional)"
              multiline
              numberOfLines={3}
            />

            {/* Payment Method */}
            <Text className="mt-4 mb-2 font-semibold text-base text-gray-700">Payment Method</Text>
            <View className="gap-4">
              {[
                {
                  key: "cash",
                  label: "Cash Payment",
                  icon: "💵",
                  desc: "Pay at the clinic",
                },
                {
                  key: "online",
                  label: "Online Payment",
                  icon: "💳",
                  desc: "Pay securely online",
                },
              ].map((method) => (
                <Pressable
                  key={method.key}
                  onPress={() => setPaymentMethod(method.key as "cash" | "online")}
                  className={`p-1 px-2 rounded-2xl border-2 ${paymentMethod === method.key ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"
                    }`}
                >
                  <View className="flex-row items-center">
                    <Text className="text-2xl mr-3">{method.icon}</Text>
                    <View className="flex-1">
                      <Text
                        className={`font-semibold text-lg ${paymentMethod === method.key ? "text-green-700" : "text-gray-900"
                          }`}
                      >
                        {method.label}
                      </Text>
                      <Text className="text-gray-600 text-sm">{method.desc}</Text>
                    </View>
                    <View
                      className={`w-6 h-6 rounded-full border-2 items-center justify-center ${paymentMethod === method.key ? "border-green-500 bg-green-500" : "border-gray-300"
                        }`}
                    >
                      {paymentMethod === method.key && <Text className="text-white text-xs">✓</Text>}
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
            {/* Submit Button */}
            <View className="mt-8">
              <CustomButton
                label={loading ? "Creating..." : "Create Appointment"}
                onPress={handleSubmit}
                disabled={loading}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default NewAppointmentScreen
