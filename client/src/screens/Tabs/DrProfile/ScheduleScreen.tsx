import { useState } from "react"
import { View, Text, ScrollView, Switch, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import Card from "../../../components/Doctor/Card"
import TimeSlotPicker from "../../../components/Doctor/TimeSlotPicker"
import Button from "../../../components/Doctor/Button"

type DaySchedule = {
  day: string
  isWorking: boolean
  timeSlots: {
    id: string
    startTime: string
    endTime: string
    isSelected: boolean
  }[]
}

const ScheduleScreen = () => {
  const navigation = useNavigation()

  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: "Monday",
      isWorking: true,
      timeSlots: [
        { id: "1", startTime: "08:00", endTime: "09:00", isSelected: true },
        { id: "2", startTime: "09:00", endTime: "10:00", isSelected: true },
        { id: "3", startTime: "10:00", endTime: "11:00", isSelected: true },
        { id: "4", startTime: "11:00", endTime: "12:00", isSelected: true },
        { id: "5", startTime: "13:00", endTime: "14:00", isSelected: true },
        { id: "6", startTime: "14:00", endTime: "15:00", isSelected: true },
        { id: "7", startTime: "15:00", endTime: "16:00", isSelected: true },
        { id: "8", startTime: "16:00", endTime: "17:00", isSelected: true },
      ],
    },
    {
      day: "Tuesday",
      isWorking: true,
      timeSlots: [
        { id: "1", startTime: "08:00", endTime: "09:00", isSelected: true },
        { id: "2", startTime: "09:00", endTime: "10:00", isSelected: true },
        { id: "3", startTime: "10:00", endTime: "11:00", isSelected: true },
        { id: "4", startTime: "11:00", endTime: "12:00", isSelected: true },
        { id: "5", startTime: "13:00", endTime: "14:00", isSelected: true },
        { id: "6", startTime: "14:00", endTime: "15:00", isSelected: true },
        { id: "7", startTime: "15:00", endTime: "16:00", isSelected: true },
        { id: "8", startTime: "16:00", endTime: "17:00", isSelected: true },
      ],
    },
    {
      day: "Wednesday",
      isWorking: true,
      timeSlots: [
        { id: "1", startTime: "08:00", endTime: "09:00", isSelected: true },
        { id: "2", startTime: "09:00", endTime: "10:00", isSelected: true },
        { id: "3", startTime: "10:00", endTime: "11:00", isSelected: true },
        { id: "4", startTime: "11:00", endTime: "12:00", isSelected: true },
        { id: "5", startTime: "13:00", endTime: "14:00", isSelected: true },
        { id: "6", startTime: "14:00", endTime: "15:00", isSelected: true },
        { id: "7", startTime: "15:00", endTime: "16:00", isSelected: true },
        { id: "8", startTime: "16:00", endTime: "17:00", isSelected: true },
      ],
    },
    {
      day: "Thursday",
      isWorking: true,
      timeSlots: [
        { id: "1", startTime: "08:00", endTime: "09:00", isSelected: true },
        { id: "2", startTime: "09:00", endTime: "10:00", isSelected: true },
        { id: "3", startTime: "10:00", endTime: "11:00", isSelected: true },
        { id: "4", startTime: "11:00", endTime: "12:00", isSelected: true },
        { id: "5", startTime: "13:00", endTime: "14:00", isSelected: true },
        { id: "6", startTime: "14:00", endTime: "15:00", isSelected: true },
        { id: "7", startTime: "15:00", endTime: "16:00", isSelected: true },
        { id: "8", startTime: "16:00", endTime: "17:00", isSelected: true },
      ],
    },
    {
      day: "Friday",
      isWorking: true,
      timeSlots: [
        { id: "1", startTime: "08:00", endTime: "09:00", isSelected: true },
        { id: "2", startTime: "09:00", endTime: "10:00", isSelected: true },
        { id: "3", startTime: "10:00", endTime: "11:00", isSelected: true },
        { id: "4", startTime: "11:00", endTime: "12:00", isSelected: true },
        { id: "5", startTime: "13:00", endTime: "14:00", isSelected: true },
        { id: "6", startTime: "14:00", endTime: "15:00", isSelected: true },
        { id: "7", startTime: "15:00", endTime: "16:00", isSelected: true },
        { id: "8", startTime: "16:00", endTime: "17:00", isSelected: true },
      ],
    },
    {
      day: "Saturday",
      isWorking: false,
      timeSlots: [
        { id: "1", startTime: "08:00", endTime: "09:00", isSelected: false },
        { id: "2", startTime: "09:00", endTime: "10:00", isSelected: false },
        { id: "3", startTime: "10:00", endTime: "11:00", isSelected: false },
        { id: "4", startTime: "11:00", endTime: "12:00", isSelected: false },
        { id: "5", startTime: "13:00", endTime: "14:00", isSelected: false },
        { id: "6", startTime: "14:00", endTime: "15:00", isSelected: false },
        { id: "7", startTime: "15:00", endTime: "16:00", isSelected: false },
        { id: "8", startTime: "16:00", endTime: "17:00", isSelected: false },
      ],
    },
    {
      day: "Sunday",
      isWorking: false,
      timeSlots: [
        { id: "1", startTime: "08:00", endTime: "09:00", isSelected: false },
        { id: "2", startTime: "09:00", endTime: "10:00", isSelected: false },
        { id: "3", startTime: "10:00", endTime: "11:00", isSelected: false },
        { id: "4", startTime: "11:00", endTime: "12:00", isSelected: false },
        { id: "5", startTime: "13:00", endTime: "14:00", isSelected: false },
        { id: "6", startTime: "14:00", endTime: "15:00", isSelected: false },
        { id: "7", startTime: "15:00", endTime: "16:00", isSelected: false },
        { id: "8", startTime: "16:00", endTime: "17:00", isSelected: false },
      ],
    },
  ])

  const toggleWorkingDay = (day: string) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item) => (item.day === day ? { ...item, isWorking: !item.isWorking } : item)),
    )
  }

  const handleTimeSlotsChange = (day: string, updatedTimeSlots: any[]) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item) => (item.day === day ? { ...item, timeSlots: updatedTimeSlots } : item)),
    )
  }

  const handleSaveSchedule = () => {
    // In a real app, you would save to a server
    Alert.alert("Success", "Schedule saved successfully!")
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Card>
          <View className="flex-row items-center mb-4">
            <MaterialIcons name="schedule" size={24} color="#0891b2" />
            <Text className="text-xl font-bold text-gray-800 ml-2">Working Schedule</Text>
          </View>

          <Text className="text-gray-600 mb-4">Set your working days and available time slots for appointments.</Text>

          {schedule.map((daySchedule) => (
            <View key={daySchedule.day} className="mb-6">
              <View className="flex-row items-center justify-between mb-2 bg-gray-50 p-3 rounded-lg">
                <View className="flex-row items-center">
                  <MaterialIcons
                    name={daySchedule.isWorking ? "event-available" : "event-busy"}
                    size={20}
                    color={daySchedule.isWorking ? "#0891b2" : "#9ca3af"}
                  />
                  <Text className="text-lg font-bold text-gray-800 ml-2">{daySchedule.day}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="mr-2 text-gray-600">{daySchedule.isWorking ? "Working" : "Off"}</Text>
                  <Switch
                    value={daySchedule.isWorking}
                    onValueChange={() => toggleWorkingDay(daySchedule.day)}
                    trackColor={{ false: "#cbd5e1", true: "#0891b2" }}
                    thumbColor={daySchedule.isWorking ? "#ffffff" : "#f4f4f5"}
                  />
                </View>
              </View>

              {daySchedule.isWorking && (
                <TimeSlotPicker
                  day={daySchedule.day}
                  initialTimeSlots={daySchedule.timeSlots}
                  onTimeSlotsChange={handleTimeSlotsChange}
                />
              )}
            </View>
          ))}

          <Button
            title="Save Schedule"
            onPress={handleSaveSchedule}
            variant="primary"
            fullWidth
            icon={<MaterialIcons name="save" size={20} color="white" />}
          />
        </Card>
      </View>
    </ScrollView>
  )
}

export default ScheduleScreen
