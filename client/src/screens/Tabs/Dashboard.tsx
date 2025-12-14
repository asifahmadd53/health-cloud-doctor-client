'use client';

import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../../utils/libs/constants/Images';
import CustomHeader from '../../components/CustomHeader';
import PatientCard from '../../components/PatientCard';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../utils/toastUtils';
import axios from 'axios';
import {BASE_URL} from '../../api/api';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const modalScale = useRef(new Animated.Value(0)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const navigation = useNavigation();

  const [doctor, setDoctor] = useState({
    name: '',
    specialty: '',
    gender: '',
  });

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
  }, []);

  useEffect(() => {
    if (showCalendar) {
      Animated.parallel([
        Animated.timing(modalScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalScale, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showCalendar]);

  const handleCloseCalendar = () => {
    Animated.parallel([
      Animated.timing(modalScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowCalendar(false);
    });
  };

  const getDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const generateWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push({
        day: date.toLocaleString('en-US', {weekday: 'short'}),
        date: date.getDate(),
        fullDate: date.toDateString(),
        dateString: getDateString(date),
      });
    }
    return dates;
  };

  useEffect(() => {
    const filterAppointmentsByDate = () => {
      if (!appointments || appointments.length === 0) {
        setFilteredAppointments([]);
        return;
      }

      const selectedDateStr = getDateString(selectedDate);

      const filtered = appointments.filter(appointment => {
        if (!appointment.date) return false;

        const appointmentDate = new Date(appointment.date);
        const appointmentDateStr = getDateString(appointmentDate);

        return appointmentDateStr === selectedDateStr;
      });

      setFilteredAppointments(filtered);
    };

    filterAppointmentsByDate();
  }, [selectedDate, appointments]);

  const generateTimeSlots = () => {
    const allSlots = [
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM',
      '12:00 PM',
      '12:30 PM',
      '01:00 PM',
      '01:30 PM',
      '02:00 PM',
      '02:30 PM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM',
      '04:30 PM',
      '05:00 PM',
      '05:30 PM',
    ];

    const bookedTimes = filteredAppointments.map(apt => apt.time);

    return allSlots.slice(0, 8).map((time, index) => ({
      id: String(index + 1),
      time,
      status: bookedTimes.includes(time) ? 'booked' : 'available',
    }));
  };

  const getDoctorAppointments = async () => {
    try {
      setLoading(true);
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        showToast('error', 'User not found. Please login again.');
        navigation.navigate('sign-in' as never);
        return;
      }

      const res = await axios.get(
        `${BASE_URL}/appointment/get-doctor-appointments`,
        {
          headers: {Authorization: `Bearer ${storedToken}`},
        },
      );

      if (res.data.success) {
        setAppointments(res.data.appointments ?? []);
        setTotalAppointments(res.data.appointments.length);
      } else {
        showToast('error', res.data.message || 'Failed to fetch');
      }
    } catch (err: any) {
      console.error('API Error:', err.response?.data || err.message);
      showToast('error', err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorAppointments();
  }, []);

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        const doctorId = parsedUser._id;

        const response = await axios.get(
          `${BASE_URL}/doctors/get-doctor/${doctorId}`,
        );
        if (!response.data.success) return;

        const {doctor, profile} = response.data;

        setDoctor({
          name: doctor?.name || '',
          specialty: profile?.specialty || '',
          gender: doctor?.gender || '',
        });
      } catch (err) {
        console.log('Error fetching doctor', err);
      }
    };

    getDoctor();
  }, []);

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-12">
      <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-4">
        <MaterialCommunityIcons
          name="calendar-blank-outline"
          size={48}
          color="#9CA3AF"
        />
      </View>
      <Text className="text-xl font-bold text-gray-800 mb-2">
        No Appointments
      </Text>
      <Text className="text-gray-500 text-center px-8 mb-6">
        No appointments scheduled for{' '}
        {selectedDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </Text>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('newAppointmentLayout' as never)}
        className="bg-secondary rounded-xl py-3 px-6 flex-row items-center">
        <MaterialCommunityIcons name="plus" size={20} color="white" />
        <Text className="text-white font-medium ml-2">Create Appointment</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="absolute top-3 left-3 right-0 z-50 p-4">
        <CustomHeader />
      </View>

      <View className="h-[30%] justify-center">
        <LinearGradient
          start={{x: 0, y: 0.1}}
          end={{x: 1, y: 1.5}}
          colors={[
            'rgba(30, 50, 80, 0.9)',
            'rgba(50, 130, 190, 0.75)',
            'rgba(180, 230, 250, 0.6)',
          ]}
          className="absolute inset-0"
        />

        <View className="flex-row justify-around items-center pt-6 px-6 ">
          <View className="flex-col items-start justify-center">
            <Text className="text-3xl font-bold text-white">Welcome!</Text>
            <Text
              style={{maxWidth: width * 0.4}}
              numberOfLines={1}
              ellipsizeMode="tail"
              className=" text-xl font-bold text-white">
              {doctor.name}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{maxWidth: width * 0.4}}
              className="text-base font-bold text-white">
              {Array.isArray(doctor.specialty)
                ? doctor.specialty.join(', ')
                : doctor.specialty}
            </Text>
          </View>
          <View className="w-1/2">
            <Image
              className="w-full h-full"
              source={Images.dashboard}
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="absolute -bottom-14 left-0 right-0 flex-row justify-between px-4">
          <View className="bg-white rounded-xl p-4 shadow-md w-[48%]">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-100 bg-opacity-30 rounded-full items-center justify-center">
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color="#2895cb"
                />
              </View>
              <View className="ml-2">
                <Text className="text-gray-500 text-sm">Total</Text>
                <Text className="text-gray-800 text-base font-bold">
                  {totalAppointments} Appointments
                </Text>
              </View>
            </View>
          </View>
          <View className="bg-white rounded-xl p-4 shadow-md w-[48%]">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={20}
                  color="#10B981"
                />
              </View>
              <View className="ml-2">
                <Text className="text-gray-500 text-sm">Today</Text>
                <Text className="text-gray-800 text-base font-bold">
                  {filteredAppointments.length} Scheduled
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-1 pt-16 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center bg-white rounded-xl py-3 px-4 shadow-sm border border-gray-100"
            onPress={() => setShowCalendar(true)}>
            <MaterialCommunityIcons name="calendar" size={20} color="#2895cb" />
            <Text className="text-gray-800 font-medium ml-2 mr-1">
              {selectedDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={16}
              color="#2895cb"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('newAppointmentLayout' as never)}
            className="bg-secondary rounded-xl py-3 px-4 flex-row items-center">
            <MaterialCommunityIcons name="plus" size={20} color="white" />
            <Text className="text-white font-medium ml-1">New Appointment</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 flex-none"
          contentContainerStyle={{paddingRight: 20}}>
          {generateWeekDates().map((item, index) => {
            const isSelected = item.dateString === getDateString(selectedDate);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  const [year, month, day] = item.dateString.split('-');
                  const newDate = new Date(
                    Number.parseInt(year),
                    Number.parseInt(month) - 1,
                    Number.parseInt(day),
                  );
                  setSelectedDate(newDate);
                }}
                activeOpacity={0.9}
                className={`items-center justify-center rounded-xl mr-3 w-16 h-20 ${
                  isSelected
                    ? 'bg-secondary border-secondary'
                    : 'bg-white border-gray-200'
                } border shadow-sm`}>
                <Text
                  className={`text-sm font-medium ${
                    isSelected ? 'text-white' : 'text-gray-500'
                  }`}>
                  {item.day}
                </Text>
                <Text
                  className={`text-xl font-bold mt-1 ${
                    isSelected ? 'text-white' : 'text-gray-800'
                  }`}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text className="text-lg font-bold text-gray-800 mb-3">
          {selectedDate.toDateString() === new Date().toDateString()
            ? "Today's Appointments"
            : 'Appointments'}
        </Text>

        {loading ? (
          <View className="flex-1 items-center justify-center py-12">
            <ActivityIndicator size="large" color="#2895cb" />
            <Text className="text-gray-500 mt-4">Loading appointments...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredAppointments}
            keyExtractor={item => item._id}
            renderItem={({item, index}) => (
              <PatientCard index={index + 1} appointment={item} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 5}}
            ListEmptyComponent={renderEmptyState}
          />
        )}
      </View>

      <Modal visible={showCalendar} transparent={true} animationType="none">
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: modalOpacity,
          }}>
          <Animated.View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
              width: '90%',
              maxWidth: 400,
              transform: [{scale: modalScale}],
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">
                Select Date
              </Text>
              <TouchableOpacity
                onPress={handleCloseCalendar}
                className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center">
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color="#2895cb"
                />
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={day => {
                const [year, month, dayNum] = day.dateString.split('-');
                const newDate = new Date(
                  Number.parseInt(year),
                  Number.parseInt(month) - 1,
                  Number.parseInt(dayNum),
                );
                setSelectedDate(newDate);
                handleCloseCalendar();
              }}
              markedDates={{
                [getDateString(selectedDate)]: {
                  selected: true,
                  selectedColor: '#2895cb',
                },
              }}
              theme={{
                todayTextColor: '#2895cb',
                selectedDayBackgroundColor: '#2895cb',
                selectedDayTextColor: '#ffffff',
                arrowColor: '#2895cb',
                dotColor: '#2895cb',
                monthTextColor: '#1F2937',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
                textDayFontWeight: '500',
                textMonthFontWeight: '700',
                textDayHeaderFontWeight: '600',
              }}
            />
            <TouchableOpacity
              onPress={handleCloseCalendar}
              className="bg-secondary py-3 rounded-xl mt-4 items-center">
              <Text className="text-white font-bold">Confirm</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

export default Dashboard;
