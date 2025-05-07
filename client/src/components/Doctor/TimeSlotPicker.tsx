import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"


type TimeSlot = {
  id: string
  startTime: string
  endTime: string
  isSelected: boolean
}

type TimeSlotPickerProps = {
  day: string
  initialTimeSlots?: TimeSlot[]
  onTimeSlotsChange: (day: string, timeSlots: TimeSlot[]) => void
  className?: string
}


const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { id: "1", startTime: "08:00", endTime: "09:00", isSelected: false },
  { id: "2", startTime: "09:00", endTime: "10:00", isSelected: false },
  { id: "3", startTime: "10:00", endTime: "11:00", isSelected: false },
  { id: "4", startTime: "11:00", endTime: "12:00", isSelected: false },
  { id: "5", startTime: "13:00", endTime: "14:00", isSelected: false },
  { id: "6", startTime: "14:00", endTime: "15:00", isSelected: false },
  { id: "7", startTime: "15:00", endTime: "16:00", isSelected: false },
  { id: "8", startTime: "16:00", endTime: "17:00", isSelected: false },
]

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  day,
  initialTimeSlots = DEFAULT_TIME_SLOTS,
  onTimeSlotsChange,
  className = "",
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots)

  const toggleTimeSlot = (id: string) => {
    const updatedTimeSlots = timeSlots.map((slot) =>
      slot.id === id ? { ...slot, isSelected: !slot.isSelected } : slot,
    )
    setTimeSlots(updatedTimeSlots)
    onTimeSlotsChange(day, updatedTimeSlots)
  }

  return (
    <View className={`mb-4 ${className}`}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row">
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              onPress={() => toggleTimeSlot(slot.id)}
              className={`mr-2 p-3 rounded-lg border min-w-[120px] ${
                slot.isSelected ? "bg-primary border-primary-dark" : "bg-white border-gray-300"
              }`}
            >
              <Text className={`text-center font-medium ${slot.isSelected ? "text-white" : "text-gray-600"}`}>
                {`${slot.startTime} - ${slot.endTime}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default TimeSlotPicker
