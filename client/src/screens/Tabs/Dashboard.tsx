import { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Calendar } from "react-native-calendars"
import LinearGradient from 'react-native-linear-gradient'
const { height, width } = Dimensions.get("window")
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Images from "../../utils/libs/constants/Images"
import CustomHeader from "../../components/CustomHeader"
import PatientCard from "../../components/PatientCard"
import { useNavigation } from "@react-navigation/native"


const Dashboard = () => {
  const appointments = [2,3,1,6,4,10,34] as Array<number>
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [totalAppointments, setTotalAppointments] = useState(4)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const scaleAnim = useRef(new Animated.Value(1)).current
  const modalScale = useRef(new Animated.Value(0)).current
  const modalOpacity = useRef(new Animated.Value(0)).current

  const navigation = useNavigation()

  // Animation for the notification bell
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
    )
    pulse.start()
  }, [])

  // Animation for the calendar modal
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
      ]).start()
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
      ]).start()
    }
  }, [showCalendar])

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
      setShowCalendar(false)
    })
  }

  // Generate dates for the week view
  const generateWeekDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 10; i++) {
      const date = new Date()
      date.setDate(today.getDate() + i)
      dates.push({
        day: date.toLocaleString("en-US", { weekday: "short" }),
        date: date.getDate(),
        fullDate: date.toDateString(),
      })
    }
    return dates
  }

  // Time slots for the day
  const timeSlots = [
    { id: "1", time: "09:00 AM", status: "available" },
    { id: "2", time: "10:30 AM", status: "booked" },
    { id: "3", time: "01:00 PM", status: "available" },
    { id: "4", time: "02:30 PM", status: "booked" },
    { id: "5", time: "04:00 PM", status: "available" },
  ]



 

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="absolute top-3 left-3 right-0 z-50 p-4">
        <CustomHeader />
      </View>
      
      <View className="h-[30%] justify-center">
      <LinearGradient
            start={{ x: 0, y: 0.1 }}
            end={{ x: 1, y: 1.5 }}
            colors={[
              'rgba(30, 50, 80, 0.9)',
              'rgba(50, 130, 190, 0.75)',
              'rgba(180, 230, 250, 0.6)',
            ]}
            className="absolute inset-0"
          />


        {/* Doctor Info */}
      <View className="flex-row justify-around items-center pt-6 px-5">
            <View className="flex-col items-start justify-center">
              <Text className="text-3xl font-bold text-white">Welcome!</Text>
              <Text className="text-2xl font-bold text-white">Dr. Ali</Text>
              <Text className="text-base font-bold text-white">Surgeon</Text>
            </View>
            <View className="w-1/2">
              <Image className="w-full h-full" source={Images.dashboard} resizeMode="cover" />
            </View>
          </View>

        {/* Stats Cards */}
        <View className="absolute -bottom-14 left-0 right-0 flex-row justify-between px-4">
          <View className="bg-white rounded-xl p-4 shadow-md w-[48%]">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-100 bg-opacity-30 rounded-full items-center justify-center">
              <MaterialCommunityIcons name="calendar" size={20} color="#2895cb" />
              </View>
              <View className="ml-2">
                <Text className="text-gray-500 text-sm">Today's</Text>
                <Text className="text-gray-800 text-lg font-bold">{totalAppointments} Appointments</Text>
              </View>
            </View>
          </View>
          <View className="bg-white rounded-xl p-4 shadow-md w-[48%]">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
              <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />

              </View>
              <View className="ml-2">
                <Text className="text-gray-500 text-sm">Completed</Text>
                <Text className="text-gray-800 text-lg font-bold">2 Sessions</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 pt-16 px-4">
        {/* Date Selector */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center bg-white rounded-xl py-3 px-4 shadow-sm border border-gray-100"
            onPress={() => setShowCalendar(true)}
          >
                <MaterialCommunityIcons name="calendar" size={20} color="#2895cb" />
                <Text className="text-gray-800 font-medium ml-2 mr-1">
              {selectedDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={16} color="#2895cb" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("newAppointmentLayout" as never)} className="bg-secondary rounded-xl py-3 px-4 flex-row items-center">
          <MaterialCommunityIcons name="plus" size={20} color="white" />
          <Text className="text-white font-medium ml-1">New Appointment</Text>
          </TouchableOpacity>
        </View>

        {/* Week View */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 flex-none"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {generateWeekDates().map((item, index) => {
            const isSelected = item.fullDate === selectedDate.toDateString()
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(new Date(item.fullDate))}
                activeOpacity={0.9}
                className={`items-center justify-center rounded-xl mr-3 w-16 h-20 ${
                  isSelected ? "bg-secondary border-secondary" : "bg-white border-gray-200"
                } border shadow-sm`}
              >
                <Text className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-500"}`}>{item.day}</Text>
                <Text className={`text-xl font-bold mt-1 ${isSelected ? "text-white" : "text-gray-800"}`}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Time Slots */}
        {/* <Text className="text-lg font-bold text-gray-800 mb-3">Available Time Slots</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6 flex-none"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {timeSlots.map((slot, index) => {
            const isSelected = selectedTimeSlot === slot.id
            const isBooked = slot.status === "booked"
            return (
              <TouchableOpacity
                key={index}
                onPress={() => !isBooked && setSelectedTimeSlot(slot.id)}
                activeOpacity={isBooked ? 0.6 : 0.8}
                className={`mr-3 px-4 py-3 rounded-xl border ${
                  isBooked
                    ? "bg-gray-100 border-gray-200"
                    : isSelected
                      ? "bg-indigo-600 border-indigo-600"
                      : "bg-white border-gray-200"
                } ${isBooked ? "opacity-60" : ""}`}
              >
                <Text
                  className={`text-center font-medium ${
                    isBooked ? "text-gray-500" : isSelected ? "text-white" : "text-gray-800"
                  }`}
                >
                  {slot.time}
                </Text>
                <Text
                  className={`text-xs text-center mt-1 ${
                    isBooked ? "text-gray-500" : isSelected ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {isBooked ? "Booked" : "Available"}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView> */}

        {/* Appointments List */}
        <Text className="text-lg font-bold text-gray-800 mb-3">Today's Appointments</Text>
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => <PatientCard index={index + 1} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* Calendar Modal */}
      <Modal visible={showCalendar} transparent={true} animationType="none">
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            opacity: modalOpacity,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
              width: "90%",
              maxWidth: 400,
              transform: [{ scale: modalScale }],
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">Select Date</Text>
              <TouchableOpacity
                onPress={handleCloseCalendar}
                className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center"
              >
              <MaterialCommunityIcons name="close" size={20} color="#2895cb" />

              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={(day) => {
                setSelectedDate(new Date(day.dateString))
                handleCloseCalendar()
              }}
              markedDates={{
                [selectedDate.toISOString().split("T")[0]]: {
                  selected: true,
                  selectedColor: "#2895cb",
                },
              }}
              theme={{
                todayTextColor: "#2895cb",
                selectedDayBackgroundColor: "#2895cb",
                selectedDayTextColor: "#ffffff",
                arrowColor: "#2895cb",
                dotColor: "#2895cb",
                monthTextColor: "#1F2937",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
                textDayFontWeight: "500",
                textMonthFontWeight: "700",
                textDayHeaderFontWeight: "600",
              }}
            />
            <TouchableOpacity onPress={handleCloseCalendar} className="bg-secondary py-3 rounded-xl mt-4 items-center">
              <Text className="text-white font-bold">Confirm</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  )
}

export default Dashboard
