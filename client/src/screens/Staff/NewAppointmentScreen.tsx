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
import { RadioButton } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FormInput from "../../components/Doctor/FormInput"
import CustomButton from "../../components/CustomButton"
import Header from "../../components/Header"
import { formatDate, formatTime } from "../../utils/dateUtils"
import { createAppointment } from "../../utils/libs/services/appointmentService"
import RNDateTimePicker from "@react-native-community/datetimepicker"

const NewAppointmentScreen = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [cnic, setCnic] = useState("")
  const [mobile, setMobile] = useState("")
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(null)
  const [age, setAge] = useState("")
  const [reason, setReason] = useState("")

  // Date and time pickers
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<Date | null>(null)
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [isTimePickerVisible, setTimePickerVisible] = useState(false)

  // Form validation
  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Patient name is required")
      return false
    }
    if (!mobile.trim()) {
      Alert.alert("Error", "Mobile number is required")
      return false
    }
    if (!age.trim()) {
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
    if (!time) {
      Alert.alert("Error", "Please select appointment time")
      return false
    }
    if (!paymentMethod) {
      Alert.alert("Error", "Please select payment method")
      return false
    }
    return true
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)

    try {
      // Create appointment object
      const appointmentData = {
        patientName: name,
        cnic,
        contactNumber: mobile,
        age: Number.parseInt(age),
        gender: gender as string,
        date: date?.toISOString().split("T")[0] || "",
        time: time?.toTimeString().split(" ")[0].substring(0, 5) || "",
        reason,
        paymentMethod: paymentMethod as string,
      }
      

      // In a real app, you would call an API here
      await createAppointment(appointmentData)

      Alert.alert("Success", "Appointment created successfully", [{ text: "OK", onPress: () => navigation.goBack() }])
    } catch (error) {
      Alert.alert("Error", "Failed to create appointment")
    } finally {
      setLoading(false)
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

            <FormInput value={name} onChangeText={setName} placeholder="Enter patient name" label="Patient Name" />

            <FormInput value={cnic} onChangeText={setCnic} placeholder="Enter CNIC number" label="CNIC # (Optional)" />

            <FormInput
              value={mobile}
              onChangeText={setMobile}
              placeholder="Enter mobile number"
              label="Mobile #"
              keyboardType="phone-pad"
            />

            <FormInput value={age} onChangeText={setAge} placeholder="Enter age" label="Age" keyboardType="numeric" />

            {/* Gender Selection */}
            <Text className="mt-4 mb-2 font-semibold text-base text-gray-700">Gender</Text>
            <View className="flex-row space-x-6 items-center">
              {["male", "female"].map((g) => (
                <Pressable
                  key={g}
                  onPress={() => setGender(g as "male" | "female")}
                  className="flex-row items-center space-x-1"
                >
                  <RadioButton value={g} color="#0891b2" status={gender === g ? "checked" : "unchecked"} />
                  <Text className="text-gray-700 capitalize">{g}</Text>
                </Pressable>
              ))}
            </View>

            {/* Appointment Details */}
            <Text className="text-lg font-bold text-gray-800 mt-8 mb-4">Appointment Details</Text>

            {/* Date Picker */}
            <Text className="mb-2 font-semibold text-base text-gray-700">Appointment Date</Text>
            <TouchableOpacity
              onPress={() => setDatePickerVisible(true)}
              className="flex-row items-center border border-gray-200 rounded-lg p-3 mb-4"
            >
              <MaterialCommunityIcons name="calendar" size={20} color="#6b7280" />
              <Text className="ml-2 text-gray-700">{date ? formatDate(date.toISOString()) : "Select date"}</Text>
            </TouchableOpacity>

            {isDatePickerVisible && (
              <RNDateTimePicker
                value={date || new Date()}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  setDatePickerVisible(false); // hide on selection
                  if (event.type === "set" && selectedDate) {
                    setDate(selectedDate);
                  }
                }}
              />
            )}

            {/* Time Picker */}
            <Text className="mb-2 font-semibold text-base text-gray-700">Appointment Time</Text>
            <TouchableOpacity
              onPress={() => setTimePickerVisible(true)}
              className="flex-row items-center border border-gray-200 rounded-lg p-3 mb-4"
            >
              <MaterialCommunityIcons name="clock" size={20} color="#6b7280" />
              <Text className="ml-2 text-gray-700">{time ? formatTime(time.toISOString()) : "Select time"}</Text>
            </TouchableOpacity>

            {isTimePickerVisible && (
              <RNDateTimePicker
                value={time || new Date()}
                mode="time"
                display="spinner"
                onChange={(event, selectedTime) => {
                  setTimePickerVisible(false);
                  if (event.type === "set" && selectedTime) {
                    setTime(selectedTime);
                  }
                }}
              />
            )}
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
            <View className="flex-row space-x-6 items-center">
              {["cash", "online"].map((p) => (
                <Pressable
                  key={p}
                  onPress={() => setPaymentMethod(p as "cash" | "online")}
                  className="flex-row items-center space-x-1"
                >
                  <RadioButton value={p} color="#0891b2" status={paymentMethod === p ? "checked" : "unchecked"} />
                  <Text className="text-gray-700 capitalize">{p}</Text>
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
