"use client"

import { useState, useCallback } from "react"
import { Text, TouchableOpacity, View, Platform, Modal, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Calendar } from "react-native-calendars"

interface PatientCardProps {
  index: number
}

const RescheduleModal = ({
  visible,
  onClose,
  patient,
  onConfirm,
}: {
  visible: boolean
  onClose: () => void
  patient: {
    id: string
    patientName: string
    time: string
    currentDate: string
  }
  onConfirm: (newDate: string, newTime: string) => void
}) => {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [step, setStep] = useState(1)

  const availableTimeSlots = {
    morning: ["09:00 AM", "10:30 AM", "11:30 AM"],
    afternoon: ["01:00 PM", "02:30 PM", "03:30 PM"],
    evening: ["05:00 PM", "06:30 PM"],
  }

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString)
    setStep(2)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleConfirmReschedule = () => {
    onConfirm(selectedDate, selectedTime)
    setStep(1)
    setSelectedDate("")
    setSelectedTime("")
    onClose()
  }

  const handleBack = () => {
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-6">
        <View className="bg-white rounded-2xl w-full max-h-[90%] p-5">
          <ScrollView showsVerticalScrollIndicator={false}>
            {step === 1 && (
              <>
                <Text className="text-xl font-bold text-gray-800 mb-4">Select New Date</Text>
                <Text className="text-gray-600 mb-4">
                  Current appointment: {patient.currentDate} at {patient.time}
                </Text>
                <Calendar
                  onDayPress={handleDateSelect}
                  markedDates={{
                    [selectedDate]: { selected: true, selectedColor: "#4F46E5" },
                  }}
                  minDate={new Date().toISOString().split("T")[0]}
                  theme={{
                    todayTextColor: "#4F46E5",
                    selectedDayBackgroundColor: "#4F46E5",
                    selectedDayTextColor: "#ffffff",
                    arrowColor: "#4F46E5",
                  }}
                />
              </>
            )}

            {step === 2 && (
              <>
                <View className="flex-row items-center mb-4">
                  <TouchableOpacity onPress={handleBack} className="mr-3">
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#4F46E5" />
                  </TouchableOpacity>
                  <Text className="text-xl font-bold text-gray-800">Select New Time</Text>
                </View>
                <Text className="text-gray-600 mb-2">
                  Selected date: {new Date(selectedDate).toLocaleDateString("en-US")}
                </Text>
                {Object.entries(availableTimeSlots).map(([period, times]) => (
                  <View key={period} className="mb-4">
                    <Text className="font-semibold text-gray-700 mb-2 capitalize">{period}</Text>
                    <View className="flex-row flex-wrap">
                      {times.map((time) => (
                        <TouchableOpacity
                          key={time}
                          onPress={() => handleTimeSelect(time)}
                          className="mr-2 mb-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-lg"
                        >
                          <Text className="text-indigo-600 font-medium">{time}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </>
            )}

            {step === 3 && (
              <>
                <View className="flex-row items-center mb-4">
                  <TouchableOpacity onPress={handleBack} className="mr-3">
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#4F46E5" />
                  </TouchableOpacity>
                  <Text className="text-xl font-bold text-gray-800">Confirm Reschedule</Text>
                </View>
                <Text className="text-gray-700 mb-4">
                  New appointment for {patient.patientName}:
                </Text>
                <Text className="text-base font-medium text-gray-800 mb-2">{new Date(selectedDate).toDateString()}</Text>
                <Text className="text-base font-medium text-indigo-600 mb-6">at {selectedTime}</Text>
                <TouchableOpacity
                  onPress={handleConfirmReschedule}
                  className="bg-indigo-600 py-3 rounded-lg items-center"
                >
                  <Text className="text-white font-medium">Confirm</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}
