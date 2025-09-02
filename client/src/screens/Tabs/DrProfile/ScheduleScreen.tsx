import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Switch} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../../api/api';
import {ActivityIndicator} from 'react-native';
import Icons from '../../../utils/libs/constants/Icons';
import {Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {showToast} from '../../../utils/toastUtils';
import { toast } from 'sonner-native';

type DaySchedule = {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
  hasBreak: boolean;
  breakStart: string | null;
  breakEnd: string | null;
  patientsPerHour: string;
};

const formatTimeToAMPM = (time24?: string) => {
  if (!time24) return '12:00 AM';
  const [hoursStr, minutesStr] = time24.split(':');
  const hours = Number(hoursStr) || 0;
  const minutes = Number(minutesStr) || 0;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const ScheduleScreen = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [pickerDate, setPickerDate] = useState(new Date());
  const [showPatientsDropdown, setShowPatientsDropdown] = useState<
    string | null
  >(null);
  const [visibleSlots, setVisibleSlots] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(false);

  const patientsPerHourOptions = [
    {label: '1 Patient per Hour', value: '1'},
    {label: '2 Patients per Hour', value: '2'},
    {label: '3 Patients per Hour', value: '3'},
    {label: '4 Patients per Hour', value: '4'},
    {label: '5 Patients per Hour', value: '5'},
    {label: '6 Patients per Hour', value: '6'},
    {label: '8 Patients per Hour', value: '8'},
    {label: '9 Patients per Hour', value: '9'},
    {label: '10 Patients per Hour', value: '10'},
    {label: '11 Patients per Hour', value: '11'},
    {label: '12 Patients per Hour', value: '12'},
    {label: '13 Patients per Hour', value: '13'},
    {label: '14 Patients per Hour', value: '14'},
    {label: '15 Patients per Hour', value: '15'},
    {label: '16 Patients per Hour', value: '16'},
    {label: '17 Patients per Hour', value: '17'},
    {label: '18 Patients per Hour', value: '18'},
    {label: '19 Patients per Hour', value: '19'},
    {label: '20 Patients per Hour', value: '20'},
  ];

  const toggleWorkingDay = (day: string) => {
    setSchedule(prev =>
      prev.map(item =>
        item.day === day ? {...item, isWorking: !item.isWorking} : item,
      ),
    );
  };

  const toggleBreakTime = (day: string) => {
    setSchedule(prev =>
      prev.map(item =>
        item.day === day
          ? {
              ...item,
              hasBreak: !item.hasBreak,
              breakStart: !item.hasBreak ? item.breakStart || '12:00' : null,
              breakEnd: !item.hasBreak ? item.breakEnd || '13:00' : null,
            }
          : item,
      ),
    );
  };

  const openTimePicker = (
    day: string,
    field: string,
    currentValue?: string,
  ) => {
    setSelectedDay(day);
    setSelectedField(field);

    // Use a default time if currentValue is undefined or null
    let time = currentValue;
    if (!time) {
      // For break fields, default to 12:00 - 13:00
      if (field === 'breakStart') time = '12:00';
      else if (field === 'breakEnd') time = '13:00';
      else time = '09:00'; // default for working hours
    }

    const [hoursStr, minutesStr] = time.split(':');
    const hours = Number(hoursStr) || 0;
    const minutes = Number(minutesStr) || 0;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    setPickerDate(date);
    setShowTimePicker(true);
  };

  // Handle time selection safely
  const onTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowTimePicker(false);

    if (selectedDate && event.type !== 'dismissed') {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;

      // Update the schedule safely
      setSchedule(prev =>
        prev.map(item => {
          if (item.day === selectedDay) {
            return {...item, [selectedField]: timeString};
          }
          return item;
        }),
      );

      if (Platform.OS === 'ios') setShowTimePicker(false);
    }
  };

  const updatePatientsPerHour = (day: string, value: string) => {
    setSchedule(prev =>
      prev.map(item =>
        item.day === day ? {...item, patientsPerHour: value} : item,
      ),
    );
    setShowPatientsDropdown(null);
  };

  const showMoreSlots = (day: string) => {
    setVisibleSlots(prev => ({
      ...prev,
      [day]: (prev[day] || 4) + 6,
    }));
  };

  const generateTimeSlots = (daySchedule: DaySchedule) => {
    if (!daySchedule.isWorking) return [];

    const slots: string[] = [];

    const startTime = daySchedule.startTime || '09:00';
    const endTime = daySchedule.endTime || '17:00';

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const patientsPerHour = Number(daySchedule.patientsPerHour) || 1;
    const slotDurationMinutes = 60 / patientsPerHour;

    let breakStartHour = 0,
      breakStartMinute = 0,
      breakEndHour = 0,
      breakEndMinute = 0;

    if (
      daySchedule.hasBreak &&
      daySchedule.breakStart &&
      daySchedule.breakEnd
    ) {
      [breakStartHour, breakStartMinute] = daySchedule.breakStart
        .split(':')
        .map(Number);
      [breakEndHour, breakEndMinute] = daySchedule.breakEnd
        .split(':')
        .map(Number);
    }

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      const slotStart = `${currentHour
        .toString()
        .padStart(2, '0')}:${Math.round(currentMinute)
        .toString()
        .padStart(2, '0')}`;

      let slotEndMinute = Math.round(currentMinute + slotDurationMinutes);
      let slotEndHour = currentHour;

      if (slotEndMinute >= 60) {
        slotEndHour += Math.floor(slotEndMinute / 60);
        slotEndMinute = slotEndMinute % 60;
      }

      const slotEnd = `${slotEndHour
        .toString()
        .padStart(2, '0')}:${slotEndMinute.toString().padStart(2, '0')}`;

      const isBreakTime =
        daySchedule.hasBreak &&
        (currentHour > breakStartHour ||
          (currentHour === breakStartHour &&
            currentMinute >= breakStartMinute)) &&
        (currentHour < breakEndHour ||
          (currentHour === breakEndHour && currentMinute < breakEndMinute));

      if (!isBreakTime) {
        slots.push(
          `${formatTimeToAMPM(slotStart)} - ${formatTimeToAMPM(slotEnd)}`,
        );
      }

      currentMinute += slotDurationMinutes;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }

    return slots;
  };

  const allDaySlots = schedule.reduce((acc, day) => {
    acc[day.day] = generateTimeSlots(day);
    return acc;
  }, {} as Record<string, string[]>);

  const addSchedule = async () => {
    try {
      setLoading(true);
      const storedToken = await AsyncStorage.getItem('token')
      if (!storedToken) {
      showToast('error', 'Not authenticated');
      return;
    }


      const payload = {
        schedules: schedule.map(day => ({
          day: day.day,
          isWorking: day.isWorking,
          startTime: day.startTime,
          endTime: day.endTime,
          hasBreak: day.hasBreak,
          breakStart: day.breakStart,
          breakEnd: day.breakEnd,
          patientPerHour: Number(day.patientsPerHour),
        })),
      };

      const response = await axios.post(
        `${BASE_URL}/doctors/create-schedule`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:`Bearer ${storedToken}`
          },
        },
      );

      const {success, message} = response.data;

      if (success) {
        showToast('success', message || 'Operation completed successfully.');
      } else {
        showToast(
          'error',
          message || 'Something went wrong. Please try again.',
        );
      }
    } catch (error: any) {

  const errorMessage =
    error.response?.data?.message || 
    error.message ||                
    "Something went wrong. Please try again."; 

  showToast("error", errorMessage);

    } finally {
      setLoading(false);
    }
  };

  const handleSaveSchedule = async () => {
    await addSchedule();
  };

  const defaultWeeklySchedule = () =>
  ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => ({
    day,
    isWorking: false,
    startTime: '11:00',
    endTime: '18:00',
    hasBreak: false,
    breakStart: '13:00',
    breakEnd: '14:00',
    patientsPerHour: '1',
  }));

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        
        const storedToken = await AsyncStorage.getItem('token')
        if (!storedToken) {
      showToast('error', 'Not authenticated');
      return;
    }


        const response = await axios.get(
          `${BASE_URL}/doctors/get-schedule`,
          {
            headers:{
              Authorization:`Bearer ${storedToken}`
            }
          }
        );
        if (response.data.success) {
          const weekly = response.data.schedule.weeklySchedule.map(
            (day: any) => ({
              day: day.day,
              isWorking: day.isWorking,
              startTime: day.startTime,
              endTime: day.endTime,
              hasBreak: day.hasBreak,
              breakStart: day.breakStart,
              breakEnd: day.breakEnd,
              patientsPerHour: day.patientPerHour.toString(),
            }),
          );
          setSchedule(weekly);
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          setSchedule(defaultWeeklySchedule());
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <Header title="Payment Dashboard" />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          <View className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
            <View className="flex-row items-center mb-6">
              <View className="w-10 h-10 bg-[#e6f3fa] rounded-xl items-center justify-center mr-3">
                <MaterialIcons name="schedule" size={22} color="#2895cb" />
              </View>
              <Text className="text-xl font-bold text-gray-900">
                Weekly Schedule Overview
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center bg-[#e6f3fa] rounded-xl px-2 py-4 mx-1 border border-slate-200">
                <Text className="text-3xl font-bold text-secondary">
                  {schedule.filter(day => day.isWorking).length}
                </Text>
                <Text className="text-sm font-medium text-secondary mt-1">
                  Working Days
                </Text>
              </View>
              <View className="items-center bg-emerald-50 rounded-xl px-2 py-4 mx-1 border border-emerald-200">
                <Text className="text-3xl font-bold text-emerald-600">
                  {schedule
                    .filter(day => day.isWorking)
                    .reduce(
                      (total, day) => total + generateTimeSlots(day).length,
                      0,
                    )}
                </Text>
                <Text className="text-sm font-medium text-emerald-600 mt-1">
                  Available Slots
                </Text>
              </View>
              <View className="items-center bg-amber-50 rounded-xl px-2 py-4 mx-1 border border-amber-200">
                <Text className="text-3xl font-bold text-amber-700">
                  {schedule.filter(day => day.isWorking && day.hasBreak).length}
                </Text>
                <Text className="text-sm font-medium text-amber-600 mt-1">
                  Break Days
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <View className="px-6 py-5 border-b border-gray-200">
              <Text className="text-xl font-bold text-gray-900">
                Professional Schedule Configuration
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Set your working hours and patient capacity
              </Text>
            </View>

            <View className="divide-y divide-gray-100">
              {schedule.map(daySchedule => {
                const allSlots = allDaySlots[daySchedule.day] || [];

                const currentVisibleCount = visibleSlots[daySchedule.day] || 4;
                const slotsToShow = allSlots.slice(0, currentVisibleCount);
                const hasMoreSlots = allSlots.length > currentVisibleCount;

                return (
                  <View key={daySchedule.day} className="p-6">
                    <View className="flex-row items-center justify-between mb-6">
                      <View className="flex-row items-center">
                        <View
                          className={`w-4 h-4 rounded-full mr-4 ${
                            daySchedule.isWorking
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                        />
                        <View>
                          <Text className="text-lg font-bold text-gray-900">
                            {daySchedule.day}
                          </Text>
                          <Text className="text-sm text-gray-500">
                            {daySchedule.isWorking
                              ? `${allSlots.length} appointment slots available`
                              : 'Not working today'}
                          </Text>
                        </View>
                      </View>

                      <Switch
                        trackColor={{false: '#e5e7eb', true: '#2895cb'}}
                        value={daySchedule.isWorking}
                        thumbColor={
                          daySchedule.isWorking ? '#ffffff' : '#f9fafb'
                        }
                        onValueChange={() => toggleWorkingDay(daySchedule.day)}
                      />
                    </View>

                    {daySchedule.isWorking && (
                      <View className="space-y-6">
                        <View className="bg-gray-50 rounded-xl px-2">
                          <Text className="text-base font-bold text-gray-800 mb-4">
                            ⏰ Working Hours
                          </Text>
                          <View className="flex-row space-x-4">
                            <View className="flex-1 mr-3">
                              <Text className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                Start Time
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  openTimePicker(
                                    daySchedule.day,
                                    'startTime',
                                    daySchedule.startTime,
                                  )
                                }
                                className="border border-gray-300 rounded-xl px-4 py-2 bg-white flex-row items-center justify-between shadow-sm">
                                <Text className="text-lg font-bold text-gray-900">
                                  {formatTimeToAMPM(daySchedule.startTime)}
                                </Text>
                                <MaterialIcons
                                  name="access-time"
                                  size={22}
                                  color="#6b7280"
                                />
                              </TouchableOpacity>
                            </View>
                            <View className="flex-1">
                              <Text className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                End Time
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  openTimePicker(
                                    daySchedule.day,
                                    'endTime',
                                    daySchedule.endTime,
                                  )
                                }
                                className="border border-gray-300 rounded-xl px-4 py-2 bg-white flex-row items-center justify-between shadow-sm">
                                <Text className="text-lg font-bold text-gray-900">
                                  {formatTimeToAMPM(daySchedule.endTime)}
                                </Text>
                                <MaterialIcons
                                  name="access-time"
                                  size={22}
                                  color="#6b7280"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>

                        <View className="bg-amber-50 rounded-xl p-5 my-5">
                          <View className="flex-row items-center justify-between mb-4">
                            <View>
                              <Text className="text-base font-bold text-amber-800">
                                ☕ Break Time
                              </Text>
                              <Text className="text-sm text-amber-600 mt-1">
                                {daySchedule.hasBreak
                                  ? 'Break time enabled'
                                  : 'No break time'}
                              </Text>
                            </View>
                            <Switch
                              value={daySchedule.hasBreak}
                              onValueChange={() =>
                                toggleBreakTime(daySchedule.day)
                              }
                              trackColor={{false: '#FDE68A', true: '#F59E0B'}}
                              thumbColor={
                                daySchedule.hasBreak ? '#ffffff' : '#f9fafb'
                              }
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
                                    openTimePicker(
                                      daySchedule.day,
                                      'breakStart',
                                      daySchedule.breakStart || '12:00',
                                    )
                                  }
                                  className="border-2 border-amber-200 rounded-xl px-4 py-2 bg-white flex-row items-center justify-between shadow-sm">
                                  <Text className="text-lg font-bold text-amber-900">
                                    {formatTimeToAMPM(
                                      daySchedule.breakStart || '12:00',
                                    )}
                                  </Text>
                                  <MaterialIcons
                                    name="free-breakfast"
                                    size={22}
                                    color="#F59E0B"
                                  />
                                </TouchableOpacity>
                              </View>
                              <View className="flex-1">
                                <Text className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-wide">
                                  Break End
                                </Text>
                                <TouchableOpacity
                                  onPress={() =>
                                    openTimePicker(
                                      daySchedule.day,
                                      'breakEnd',
                                      daySchedule.breakEnd || '13:00',
                                    )
                                  }
                                  className="border-2 border-orange-200 rounded-xl px-4 py-2 bg-white flex-row items-center justify-between shadow-sm">
                                  <Text className="text-lg font-bold text-amber-900">
                                    {formatTimeToAMPM(
                                      daySchedule.breakEnd || '13:00',
                                    )}
                                  </Text>
                                  <MaterialIcons
                                    name="free-breakfast"
                                    size={22}
                                    color="#F59E0B"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        </View>

                        <View className="bg-blue-50 rounded-xl p-5">
                          <Text className="text-base font-bold text-blue-800 mb-4">
                            {' '}
                            Patient Capacity
                          </Text>
                          <View className="relative">
                            <Text className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">
                              Maximum Appointments per Hour
                            </Text>

                            <Dropdown
                              style={styles.consistentDropdown}
                              containerStyle={{borderRadius: 8}}
                              placeholderStyle={styles.consistentPlaceholder}
                              selectedTextStyle={styles.consistentSelectedText}
                              inputSearchStyle={styles.consistentInputSearch}
                              itemTextStyle={styles.consistentItemText}
                              data={patientsPerHourOptions}
                              search={false}
                              maxHeight={300}
                              labelField="label"
                              valueField="value"
                              placeholder="Select Patients per Hour"
                              value={daySchedule.patientsPerHour} // bind value
                              onChange={item =>
                                updatePatientsPerHour(
                                  daySchedule.day,
                                  item.value,
                                )
                              }
                              renderItem={item => (
                                <View style={styles.dropdownItemContainer}>
                                  <Text
                                    style={styles.dropdownItemText}
                                    numberOfLines={1}>
                                    {item.label}
                                  </Text>
                                </View>
                              )}
                            />
                            {showPatientsDropdown === daySchedule.day && (
                              <View className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-200 rounded-xl shadow-lg z-10">
                                {patientsPerHourOptions.map(option => (
                                  <TouchableOpacity
                                    key={option.value}
                                    onPress={() =>
                                      updatePatientsPerHour(
                                        daySchedule.day,
                                        option.value,
                                      )
                                    }
                                    className={`px-4 py-4 border-b border-blue-100 ${
                                      daySchedule.patientsPerHour ===
                                      option.value
                                        ? 'bg-blue-50'
                                        : 'bg-white'
                                    }`}>
                                    <Text
                                      className={`text-base font-medium ${
                                        daySchedule.patientsPerHour ===
                                        option.value
                                          ? 'text-blue-900'
                                          : 'text-gray-700'
                                      }`}>
                                      {option.label}
                                    </Text>
                                  </TouchableOpacity>
                                ))}
                              </View>
                            )}
                          </View>
                        </View>

                        <View className="bg-gray-100 rounded-xl p-4 mt-5">
                          <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-sm font-medium text-gray-700">
                              Available Slots
                            </Text>
                            <Text className="text-xs text-gray-500">
                              {allSlots.length} total
                            </Text>
                          </View>
                          <View className="flex-row flex-wrap -mx-1">
                            {slotsToShow.map((slot, index) => (
                              <View
                                key={index}
                                className="mx-1 mb-2 px-2 py-1 bg-gray-200 rounded">
                                <Text className="text-xs text-gray-600">
                                  {slot}
                                </Text>
                              </View>
                            ))}
                            {hasMoreSlots && (
                              <TouchableOpacity
                                onPress={() => showMoreSlots(daySchedule.day)}
                                className="mx-1 mb-2 px-2 py-1">
                                <Text className="text-xs text-blue-600 font-medium">
                                  +{allSlots.length - currentVisibleCount}{' '}
                                  more...
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          <View className="mt-8 space-y-4">
            {/* <TouchableOpacity
              onPress={handleSaveSchedule}
              className="bg-blue-600 rounded-2xl py-5 px-8 flex-row items-center justify-center shadow-lg"
            >
              <MaterialIcons name="save" size={24} color="white" />
              <Text className="text-white text-lg font-bold ml-3">Save Professional Schedule</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleSaveSchedule}
              className="bg-primary py-3 px-6 rounded-2xl flex-row items-center justify-center shadow-xl"
              disabled={loading} // disable button while loading
            >
              {loading ? (
                <ActivityIndicator color="white" className="mr-2 w-8 h-8" />
              ) : (
                <Image
                  className="w-8 h-8 mr-2"
                  source={Icons.saveIcon}
                  tintColor={'white'}
                />
              )}
              <Text className="text-white text-base font-bold ">
                Save All Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {showTimePicker && (
        <DateTimePicker
          value={pickerDate}
          mode="time"
          is24Hour={false}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  consistentDropdown: {
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  consistentPlaceholder: {
    fontSize: 14,
    color: '#red',
  },
  consistentSelectedText: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: '700',
  },
  consistentInputSearch: {
    height: 40,
    fontSize: 14,
    borderRadius: 8,
    color: 'black',
  },
  consistentItemText: {
    fontSize: 14,
    color: 'red',
  },
  dropdownItemContainer: {
    padding: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: '600',
  },
});

export default ScheduleScreen;
