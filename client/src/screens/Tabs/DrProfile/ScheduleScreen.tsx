"use client"

import { useState } from "react"
import { View, Text, ScrollView, Switch, Alert, TouchableOpacity, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DateTimePicker from "@react-native-community/datetimepicker"
import Header from "../../../components/Header"

type DaySchedule = {
  day: string
  isWorking: boolean
  startTime: string
  endTime: string
  hasBreak: boolean
  breakStart: string | null
  breakEnd: string | null
  patientsPerHour: string
}

const formatTimeToAMPM = (time24: string) => {
  const [hours, minutes] = time24.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
}

const ScheduleScreen = () => {
  const navigation = useNavigation()
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: "Monday",
      isWorking: true,
      startTime: "08:00",
      endTime: "17:00",
      hasBreak: false,
      breakStart: null,
      breakEnd: null,
      patientsPerHour: "4",
    },
    {
      day: "Tuesday",
      isWorking: true,
      startTime: "08:30",
      endTime: "16:30",
      hasBreak: false,
      breakStart: null,
      breakEnd: null,
      patientsPerHour: "4",
    },
    {
      day: "Wednesday",
      isWorking: true,
      startTime: "09:00",
      endTime: "18:00",
      hasBreak: false,
      breakStart: null,
      breakEnd: null,
      patientsPerHour: "6",
    },
    {
      day: "Thursday",
      isWorking: true,
      startTime: "08:00",
      endTime: "17:00",
      hasBreak: false,
      breakStart: null,
      breakEnd: null,
      patientsPerHour: "4",
    },
    {
      day: "Friday",
      isWorking: true,
      startTime: "08:00",
      endTime: "16:00",
      hasBreak: false,
      breakStart: null,
      breakEnd: null,
      patientsPerHour: "6",
    },
    {
      day: "Saturday",
      isWorking: false,
      startTime: "09:00",
      endTime: "15:00",
      hasBreak: false,
      breakStart: null,
      breakEnd: null,
      patientsPerHour: "4",
    },
    {
      day: "Sunday",
      isWorking: false,
      startTime: "10:00",
      endTime: "16:00",
      hasBreak: false,
      breakStart: null,
      breakEnd: null,
      patientsPerHour: "4",
    },
  ])

  const [showTimePicker, setShowTimePicker] = useState(false)
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedField, setSelectedField] = useState("")
  const [pickerDate, setPickerDate] = useState(new Date())
  const [showPatientsDropdown, setShowPatientsDropdown] = useState<string | null>(null)
  const [visibleSlots, setVisibleSlots] = useState<{ [key: string]: number }>({})

  const patientsPerHourOptions = [
    { value: "1", label: "1 Patient per Hour" },
    { value: "2", label: "2 Patients per Hour" },
    { value: "3", label: "3 Patients per Hour" },
    { value: "4", label: "4 Patients per Hour" },
    { value: "5", label: "5 Patients per Hour" },
    { value: "6", label: "6 Patients per Hour" },
    { value: "8", label: "8 Patients per Hour" },
    { value: "12", label: "12 Patients per Hour" },
  ]

  const toggleWorkingDay = (day: string) => {
    setSchedule((prev) => prev.map((item) => (item.day === day ? { ...item, isWorking: !item.isWorking } : item)))
  }

  const toggleBreakTime = (day: string) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.day === day
          ? {
              ...item,
              hasBreak: !item.hasBreak,
              breakStart: !item.hasBreak ? "12:00" : null,
              breakEnd: !item.hasBreak ? "13:00" : null,
            }
          : item,
      ),
    )
  }

  const openTimePicker = (day: string, field: string, currentValue: string) => {
    setSelectedDay(day)
    setSelectedField(field)
    const [hours, minutes] = currentValue.split(":").map(Number)
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    setPickerDate(date)
    setShowTimePicker(true)
  }

  const onTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowTimePicker(false)

    if (selectedDate && event.type !== "dismissed") {
      const hours = selectedDate.getHours().toString().padStart(2, "0")
      const minutes = selectedDate.getMinutes().toString().padStart(2, "0")
      const timeString = `${hours}:${minutes}`

      setSchedule((prev) =>
        prev.map((item) => (item.day === selectedDay ? { ...item, [selectedField]: timeString } : item)),
      )

      if (Platform.OS === "ios") setShowTimePicker(false)
    } else if (Platform.OS === "android") {
      setShowTimePicker(false)
    }
  }

  const updatePatientsPerHour = (day: string, value: string) => {
    setSchedule((prev) => prev.map((item) => (item.day === day ? { ...item, patientsPerHour: value } : item)))
    setShowPatientsDropdown(null)
  }

  const showMoreSlots = (day: string) => {
    setVisibleSlots((prev) => ({
      ...prev,
      [day]: (prev[day] || 4) + 6,
    }))
  }

  const generateTimeSlots = (daySchedule: DaySchedule) => {
    if (!daySchedule.isWorking) return []

    const slots = []
    const startHour = Number.parseInt(daySchedule.startTime.split(":")[0])
    const startMinute = Number.parseInt(daySchedule.startTime.split(":")[1])
    const endHour = Number.parseInt(daySchedule.endTime.split(":")[0])
    const endMinute = Number.parseInt(daySchedule.endTime.split(":")[1])
    const patientsPerHour = Number.parseInt(daySchedule.patientsPerHour)
    const slotDurationMinutes = 60 / patientsPerHour

    let breakStartHour = 0,
      breakStartMinute = 0,
      breakEndHour = 0,
      breakEndMinute = 0

    if (daySchedule.hasBreak && daySchedule.breakStart && daySchedule.breakEnd) {
      breakStartHour = Number.parseInt(daySchedule.breakStart.split(":")[0])
      breakStartMinute = Number.parseInt(daySchedule.breakStart.split(":")[1])
      breakEndHour = Number.parseInt(daySchedule.breakEnd.split(":")[0])
      breakEndMinute = Number.parseInt(daySchedule.breakEnd.split(":")[1])
    }

    let currentHour = startHour
    let currentMinute = startMinute

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const slotStart = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

      let slotEndMinute = currentMinute + slotDurationMinutes
      let slotEndHour = currentHour

      if (slotEndMinute >= 60) {
        slotEndHour += Math.floor(slotEndMinute / 60)
        slotEndMinute = slotEndMinute % 60
      }

      const slotEnd = `${slotEndHour.toString().padStart(2, "0")}:${slotEndMinute.toString().padStart(2, "0")}`

      const isBreakTime =
        daySchedule.hasBreak &&
        (currentHour > breakStartHour || (currentHour === breakStartHour && currentMinute >= breakStartMinute)) &&
        (currentHour < breakEndHour || (currentHour === breakEndHour && currentMinute < breakEndMinute))

      if (!isBreakTime) {
        slots.push(`${formatTimeToAMPM(slotStart)} - ${formatTimeToAMPM(slotEnd)}`)
      }

      currentMinute += slotDurationMinutes
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60)
        currentMinute = currentMinute % 60
      }
    }

    return slots
  }

  const handleSaveSchedule = () => {
    Alert.alert("Success", "Professional schedule saved successfully!")
  }

  return (
    <View className="flex-1 bg-gray-50 px-5">
      <Header title="Schedule Management"/>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          <View className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
            <View className="flex-row items-center mb-6">
              <View className="w-10 h-10 bg-[#e6f3fa] rounded-xl items-center justify-center mr-3">
                <MaterialIcons name="schedule" size={22} color="#2895cb" />
              </View>
              <Text className="text-xl font-bold text-gray-900">Weekly Schedule Overview</Text>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center bg-[#e6f3fa] rounded-xl px-2 py-4 mx-1 border border-slate-200">
                <Text className="text-3xl font-bold text-secondary">
                  {schedule.filter((day) => day.isWorking).length}
                </Text>
                <Text className="text-sm font-medium text-secondary mt-1">Working Days</Text>
              </View>
              <View className="items-center bg-emerald-50 rounded-xl px-2 py-4 mx-1 border border-emerald-200">
                <Text className="text-3xl font-bold text-emerald-600">
                  {schedule
                    .filter((day) => day.isWorking)
                    .reduce((total, day) => total + generateTimeSlots(day).length, 0)}
                </Text>
                <Text className="text-sm font-medium text-emerald-600 mt-1">Available Slots</Text>
              </View>
              <View className="items-center bg-amber-50 rounded-xl px-2 py-4 mx-1 border border-amber-200">
                <Text className="text-3xl font-bold text-amber-700">
                  {schedule.filter((day) => day.isWorking && day.hasBreak).length}
                </Text>
                <Text className="text-sm font-medium text-amber-600 mt-1">Break Days</Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <View className="px-6 py-5 border-b border-gray-200">
              <Text className="text-xl font-bold text-gray-900">Professional Schedule Configuration</Text>
              <Text className="text-sm text-gray-500 mt-1">Set your working hours and patient capacity</Text>
            </View>

            <View className="divide-y divide-gray-100">
              {schedule.map((daySchedule) => {
                const allSlots = generateTimeSlots(daySchedule)
                const currentVisibleCount = visibleSlots[daySchedule.day] || 4
                const slotsToShow = allSlots.slice(0, currentVisibleCount)
                const hasMoreSlots = allSlots.length > currentVisibleCount

                return (
                  <View key={daySchedule.day} className="p-6">
                    <View className="flex-row items-center justify-between mb-6">
                      <View className="flex-row items-center">
                        <View
                          className={`w-4 h-4 rounded-full mr-4 ${daySchedule.isWorking ? "bg-green-500" : "bg-gray-300"}`}
                        />
                        <View>
                          <Text className="text-lg font-bold text-gray-900">{daySchedule.day}</Text>
                          <Text className="text-sm text-gray-500">
                            {daySchedule.isWorking
                              ? `${allSlots.length} appointment slots available`
                              : "Not working today"}
                          </Text>
                        </View>
                      </View>
                      <Switch
                        value={daySchedule.isWorking}
                        onValueChange={() => toggleWorkingDay(daySchedule.day)}
                        trackColor={{ false: "#e5e7eb", true: "#3b82f6" }}
                        thumbColor={daySchedule.isWorking ? "#ffffff" : "#f9fafb"}
                      />
                    </View>

                    {daySchedule.isWorking && (
                      <View className="space-y-6">
                        <View className="bg-gray-50 rounded-xl px-2">
                          <Text className="text-base font-bold text-gray-800 mb-4">⏰ Working Hours</Text>
                          <View className="flex-row space-x-4">
                            <View className="flex-1 mr-3">
                              <Text className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                Start Time
                              </Text>
                              <TouchableOpacity
                                onPress={() => openTimePicker(daySchedule.day, "startTime", daySchedule.startTime)}
                                className="border-2 border-gray-200 rounded-xl px-4 py-2 bg-white flex-row items-center justify-between shadow-sm"
                              >
                                <Text className="text-lg font-bold text-gray-900">
                                  {formatTimeToAMPM(daySchedule.startTime)}
                                </Text>
                                <MaterialIcons name="access-time" size={22} color="#6b7280" />
                              </TouchableOpacity>
                            </View>
                            <View className="flex-1">
                              <Text className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                End Time
                              </Text>
                              <TouchableOpacity
                                onPress={() => openTimePicker(daySchedule.day, "endTime", daySchedule.endTime)}
                                className="border-2 border-gray-200 rounded-xl px-4 py-2 bg-white flex-row items-center justify-between shadow-sm"
                              >
                                <Text className="text-lg font-bold text-gray-900">
                                  {formatTimeToAMPM(daySchedule.endTime)}
                                </Text>
                                <MaterialIcons name="access-time" size={22} color="#6b7280" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>

                        <View className="bg-amber-50 rounded-xl p-5 my-5">
                          <View className="flex-row items-center justify-between mb-4">
                            <View>
                              <Text className="text-base font-bold text-amber-800">☕ Break Time</Text>
                              <Text className="text-sm text-amber-600 mt-1">
                                {daySchedule.hasBreak ? "Break time enabled" : "No break time"}
                              </Text>
                            </View>
                            <Switch
                              value={daySchedule.hasBreak}
                              onValueChange={() => toggleBreakTime(daySchedule.day)}
                              trackColor={{ false: "#FDE68A", true: "#F59E0B" }}
                              thumbColor={daySchedule.hasBreak ? "#ffffff" : "#f9fafb"}
                            />
                          </View>
                          {daySchedule.hasBreak && (
                            <View className="flex-row space-x-4">
                              <View className="flex-1 mr-3">
                                <Text className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-wide">
                                  Break Start
                                </Text>
                                <TouchableOpacity
                                  onPress={() =>
                                    openTimePicker(daySchedule.day, "breakStart", daySchedule.breakStart || "12:00")
                                  }
                                  className="border-2 border-amber-200 rounded-xl px-4 py-2 bg-white flex-row items-center justify-between shadow-sm"
                                >
                                  <Text className="text-lg font-bold text-amber-900">
                                    {formatTimeToAMPM(daySchedule.breakStart || "12:00")}
                                  </Text>
                                  <MaterialIcons name="free-breakfast" size={22} color="#F59E0B" />
                                </TouchableOpacity>
                              </View>
                              <View className="flex-1">
                                <Text className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-wide">
                                  Break End
                                </Text>
                                <TouchableOpacity
                                  onPress={() =>
                                    openTimePicker(daySchedule.day, "breakEnd", daySchedule.breakEnd || "13:00")
                                  }
                                  className="border-2 border-orange-200 rounded-xl px-4 py-2 bg-white flex-row items-center justify-between shadow-sm"
                                >
                                  <Text className="text-lg font-bold text-amber-900">
                                    {formatTimeToAMPM(daySchedule.breakEnd || "13:00")}
                                  </Text>
                                  <MaterialIcons name="free-breakfast" size={22} color="#F59E0B" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        </View>

                        <View className="bg-blue-50 rounded-xl p-5">
                          <Text className="text-base font-bold text-blue-800 mb-4"> Patient Capacity</Text>
                          <View className="relative">
                            <Text className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">
                              Maximum Appointments per Hour
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                setShowPatientsDropdown(
                                  showPatientsDropdown === daySchedule.day ? null : daySchedule.day,
                                )
                              }
                              className="border-2 border-blue-200 rounded-xl px-4 py-2 bg-white flex-row items-center justify-between shadow-sm"
                            >
                              <Text className="text-lg font-bold text-blue-900">
                                {patientsPerHourOptions.find((opt) => opt.value === daySchedule.patientsPerHour)?.label}
                              </Text>
                              <MaterialIcons
                                name={
                                  showPatientsDropdown === daySchedule.day ? "keyboard-arrow-up" : "keyboard-arrow-down"
                                }
                                size={24}
                                color="#1d4ed8"
                              />
                            </TouchableOpacity>

                            {showPatientsDropdown === daySchedule.day && (
                              <View className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-200 rounded-xl shadow-lg z-10">
                                {patientsPerHourOptions.map((option) => (
                                  <TouchableOpacity
                                    key={option.value}
                                    onPress={() => updatePatientsPerHour(daySchedule.day, option.value)}
                                    className={`px-4 py-4 border-b border-blue-100 ${daySchedule.patientsPerHour === option.value ? "bg-blue-50" : "bg-white"}`}
                                  >
                                    <Text
                                      className={`text-base font-medium ${daySchedule.patientsPerHour === option.value ? "text-blue-900" : "text-gray-700"}`}
                                    >
                                      {option.label}
                                    </Text>
                                  </TouchableOpacity>
                                ))}
                              </View>
                            )}
                          </View>
                        </View>

                        {/* Simple Compact Available Slots with Show More */}
                        <View className="bg-gray-100 rounded-xl p-4">
                          <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-sm font-medium text-gray-700">Available Slots</Text>
                            <Text className="text-xs text-gray-500">{allSlots.length} total</Text>
                          </View>
                          <View className="flex-row flex-wrap -mx-1">
                            {slotsToShow.map((slot, index) => (
                              <View key={index} className="mx-1 mb-2 px-2 py-1 bg-gray-200 rounded">
                                <Text className="text-xs text-gray-600">{slot}</Text>
                              </View>
                            ))}
                            {hasMoreSlots && (
                              <TouchableOpacity
                                onPress={() => showMoreSlots(daySchedule.day)}
                                className="mx-1 mb-2 px-2 py-1"
                              >
                                <Text className="text-xs text-blue-600 font-medium">
                                  +{allSlots.length - currentVisibleCount} more...
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                )
              })}
            </View>
          </View>

          <View className="mt-8 space-y-4">
            <TouchableOpacity
              onPress={handleSaveSchedule}
              className="bg-blue-600 rounded-2xl py-5 px-8 flex-row items-center justify-center shadow-lg"
            >
              <MaterialIcons name="save" size={24} color="white" />
              <Text className="text-white text-lg font-bold ml-3">Save Professional Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white border-2 border-gray-300 rounded-2xl py-5 px-8 flex-row items-center justify-center shadow-sm">
              <MaterialIcons name="refresh" size={24} color="#374151" />
              <Text className="text-gray-700 text-lg font-bold ml-3">Reset to Default</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {showTimePicker && (
        <DateTimePicker
          value={pickerDate}
          mode="time"
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onTimeChange}
        />
      )}
    </View>
  )
}

export default ScheduleScreen
