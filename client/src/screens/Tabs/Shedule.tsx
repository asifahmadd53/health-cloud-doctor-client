import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

type DaySchedule = {
  day: string;
  isWorking: boolean;
  timeSlots: {
    id: string;
    startTime: string;
    endTime: string;
    isSelected: boolean;
  }[];
};

const ScheduleScreen = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: 'Monday',
      isWorking: true,
      timeSlots: [
        { id: '1', startTime: '08:00', endTime: '09:00', isSelected: true },
        { id: '2', startTime: '09:00', endTime: '10:00', isSelected: true },
        { id: '3', startTime: '10:00', endTime: '11:00', isSelected: true },
        { id: '4', startTime: '11:00', endTime: '12:00', isSelected: true },
        { id: '5', startTime: '13:00', endTime: '14:00', isSelected: true },
        { id: '6', startTime: '14:00', endTime: '15:00', isSelected: true },
        { id: '7', startTime: '15:00', endTime: '16:00', isSelected: true },
        { id: '8', startTime: '16:00', endTime: '17:00', isSelected: true },
      ],
    },
    {
      day: 'Tuesday',
      isWorking: true,
      timeSlots: [
        { id: '1', startTime: '08:00', endTime: '09:00', isSelected: true },
        { id: '2', startTime: '09:00', endTime: '10:00', isSelected: true },
        { id: '3', startTime: '10:00', endTime: '11:00', isSelected: true },
        { id: '4', startTime: '11:00', endTime: '12:00', isSelected: true },
        { id: '5', startTime: '13:00', endTime: '14:00', isSelected: true },
        { id: '6', startTime: '14:00', endTime: '15:00', isSelected: true },
        { id: '7', startTime: '15:00', endTime: '16:00', isSelected: true },
        { id: '8', startTime: '16:00', endTime: '17:00', isSelected: true },
      ],
    },
    {
      day: 'Wednesday',
      isWorking: true,
      timeSlots: [
        { id: '1', startTime: '08:00', endTime: '09:00', isSelected: true },
        { id: '2', startTime: '09:00', endTime: '10:00', isSelected: true },
        { id: '3', startTime: '10:00', endTime: '11:00', isSelected: true },
        { id: '4', startTime: '11:00', endTime: '12:00', isSelected: true },
        { id: '5', startTime: '13:00', endTime: '14:00', isSelected: true },
        { id: '6', startTime: '14:00', endTime: '15:00', isSelected: true },
        { id: '7', startTime: '15:00', endTime: '16:00', isSelected: true },
        { id: '8', startTime: '16:00', endTime: '17:00', isSelected: true },
      ],
    },
    {
      day: 'Thursday',
      isWorking: true,
      timeSlots: [
        { id: '1', startTime: '08:00', endTime: '09:00', isSelected: true },
        { id: '2', startTime: '09:00', endTime: '10:00', isSelected: true },
        { id: '3', startTime: '10:00', endTime: '11:00', isSelected: true },
        { id: '4', startTime: '11:00', endTime: '12:00', isSelected: true },
        { id: '5', startTime: '13:00', endTime: '14:00', isSelected: true },
        { id: '6', startTime: '14:00', endTime: '15:00', isSelected: true },
        { id: '7', startTime: '15:00', endTime: '16:00', isSelected: true },
        { id: '8', startTime: '16:00', endTime: '17:00', isSelected: true },
      ],
    },
    {
      day: 'Friday',
      isWorking: true,
      timeSlots: [
        { id: '1', startTime: '08:00', endTime: '09:00', isSelected: true },
        { id: '2', startTime: '09:00', endTime: '10:00', isSelected: true },
        { id: '3', startTime: '10:00', endTime: '11:00', isSelected: true },
        { id: '4', startTime: '11:00', endTime: '12:00', isSelected: true },
        { id: '5', startTime: '13:00', endTime: '14:00', isSelected: true },
        { id: '6', startTime: '14:00', endTime: '15:00', isSelected: true },
        { id: '7', startTime: '15:00', endTime: '16:00', isSelected: true },
        { id: '8', startTime: '16:00', endTime: '17:00', isSelected: true },
      ],
    },
    {
      day: 'Saturday',
      isWorking: false,
      timeSlots: [
        { id: '1', startTime: '08:00', endTime: '09:00', isSelected: false },
        { id: '2', startTime: '09:00', endTime: '10:00', isSelected: false },
        { id: '3', startTime: '10:00', endTime: '11:00', isSelected: false },
        { id: '4', startTime: '11:00', endTime: '12:00', isSelected: false },
        { id: '5', startTime: '13:00', endTime: '14:00', isSelected: false },
        { id: '6', startTime: '14:00', endTime: '15:00', isSelected: false },
        { id: '7', startTime: '15:00', endTime: '16:00', isSelected: false },
        { id: '8', startTime: '16:00', endTime: '17:00', isSelected: false },
      ],
    },
    {
      day: 'Sunday',
      isWorking: false,
      timeSlots: [
        { id: '1', startTime: '08:00', endTime: '09:00', isSelected: false },
        { id: '2', startTime: '09:00', endTime: '10:00', isSelected: false },
        { id: '3', startTime: '10:00', endTime: '11:00', isSelected: false },
        { id: '4', startTime: '11:00', endTime: '12:00', isSelected: false },
        { id: '5', startTime: '13:00', endTime: '14:00', isSelected: false },
        { id: '6', startTime: '14:00', endTime: '15:00', isSelected: false },
        { id: '7', startTime: '15:00', endTime: '16:00', isSelected: false },
        { id: '8', startTime: '16:00', endTime: '17:00', isSelected: false },
      ],
    },
  ]);

  const toggleWorkingDay = (day: string) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item) =>
        item.day === day ? { ...item, isWorking: !item.isWorking } : item
      )
    );
  };

  const toggleSlot = (day: string, slotId: string) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item) =>
        item.day === day
          ? {
              ...item,
              timeSlots: item.timeSlots.map((slot) =>
                slot.id === slotId ? { ...slot, isSelected: !slot.isSelected } : slot
              ),
            }
          : item
      )
    );
  };

  const toggleSelectAll = (day: string) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item) => {
        if (item.day === day) {
          const allSelected = item.timeSlots.every(slot => slot.isSelected);
          return {
            ...item,
            timeSlots: item.timeSlots.map((slot) => ({
              ...slot,
              isSelected: !allSelected,
            })),
          };
        }
        return item;
      })
    );
  };

  const handleSaveSchedule = () => {
    Alert.alert('Success', 'Schedule saved successfully!');
  };

  const getWorkingDaysCount = () => {
    return schedule.filter(day => day.isWorking).length;
  };

  const getTotalSlotsCount = () => {
    return schedule.reduce((total, day) => {
      if (day.isWorking) {
        return total + day.timeSlots.filter(slot => slot.isSelected).length;
      }
      return total;
    }, 0);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="bg-white pt-12 pb-6 px-6 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 text-center">Schedule Management</Text>
        <Text className="text-gray-600 text-center mt-2">Manage your availability and appointment slots</Text>
        
        {/* Stats */}
        <View className="flex-row justify-center mt-4 space-x-8">
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">{getWorkingDaysCount()}</Text>
            <Text className="text-sm text-gray-500">Working Days</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-600">{getTotalSlotsCount()}</Text>
            <Text className="text-sm text-gray-500">Available Slots</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {schedule.map((daySchedule, index) => (
            <View key={daySchedule.day} className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
              {/* Day Header */}
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    daySchedule.isWorking ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {/* <MaterialIcons
                      name={daySchedule.isWorking ? 'event-available' : 'event-busy'}
                      size={20}
                      color={daySchedule.isWorking ? '#10b981' : '#6b7280'}
                    /> */}
                  </View>
                  <View>
                    <Text className="text-lg font-bold text-gray-900">{daySchedule.day}</Text>
                    <Text className={`text-sm font-medium ${
                      daySchedule.isWorking ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {daySchedule.isWorking ? 
                        `${daySchedule.timeSlots.filter(slot => slot.isSelected).length} slots available` : 
                        'Day off'
                      }
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row items-center">
                  <Text className="mr-3 text-gray-600 font-medium">
                    {daySchedule.isWorking ? 'Working' : 'Off'}
                  </Text>
                  <Switch
                    value={daySchedule.isWorking}
                    onValueChange={() => toggleWorkingDay(daySchedule.day)}
                    trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                    thumbColor={daySchedule.isWorking ? '#ffffff' : '#f3f4f6'}
                  />
                </View>
              </View>

              {/* Time Slots */}
              {daySchedule.isWorking && (
                <View>
                  <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-base font-semibold text-gray-700">Available Time Slots</Text>
                    <TouchableOpacity
                      onPress={() => toggleSelectAll(daySchedule.day)}
                      className={`px-3 py-1 rounded-full ${
                        daySchedule.timeSlots.every(slot => slot.isSelected) 
                          ? 'bg-blue-100' 
                          : 'bg-gray-100'
                      }`}
                    >
                      <Text className={`text-xs font-medium ${
                        daySchedule.timeSlots.every(slot => slot.isSelected)
                          ? 'text-blue-700'
                          : 'text-gray-600'
                      }`}>
                        {daySchedule.timeSlots.every(slot => slot.isSelected) ? 'Deselect All' : 'Select All'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row flex-wrap gap-2">
                    {daySchedule.timeSlots.map((slot) => (
                      <TouchableOpacity
                        key={slot.id}
                        onPress={() => toggleSlot(daySchedule.day, slot.id)}
                        className={`px-4 py-3 rounded-xl border-2 min-w-20 items-center ${
                          slot.isSelected
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <Text className={`text-sm font-semibold ${
                          slot.isSelected ? 'text-blue-700' : 'text-gray-600'
                        }`}>
                          {slot.startTime}
                        </Text>
                        <Text className={`text-xs ${
                          slot.isSelected ? 'text-blue-500' : 'text-gray-400'
                        }`}>
                          {slot.endTime}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View className="mt-4 pt-4 border-t border-gray-100 flex-row items-center justify-center">
                    {/* <MaterialIcons name="event-available" size={16} color="#10b981" /> */}
                    <Text className="ml-2 text-sm font-medium text-green-600">
                      {daySchedule.timeSlots.filter(slot => slot.isSelected).length} slots selected for {daySchedule.day}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSaveSchedule}
            className="bg-green-500 rounded-xl py-4 flex-row items-center justify-center mb-8"
          >
            {/* <MaterialIcons name="save" size={20} color="white" /> */}
            <Text className="text-white font-semibold text-base ml-2">Save Schedule</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ScheduleScreen;