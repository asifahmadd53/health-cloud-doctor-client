import { Text, TouchableOpacity, View, Platform } from "react-native"
import { useCallback, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


interface Appointment {
  _id: string;
  patientName: string;
  patientAge: number | string;
  patientPhone?: string;
  time: string;
  gender: "male" | "female";
  paymentStatus: string;
}

interface PatientCardProps {
  index: number;
  appointment: Appointment;
}


const PatientCard = ({ index,appointment }: PatientCardProps) => {
  const navigation = useNavigation()

 const handlePress = useCallback(() => {
    navigation.navigate('patientDetailsLayout', {
  screen: 'patientDetails',
  params: { appointment },
})
  }, [navigation, appointment])
  
  if (!appointment) {
    return null;
  }

 const formatTime = (time: string) => {
  if (!time) return "";
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 → 12
  return `${hour}:${minuteStr} ${ampm}`;
};
  return (
    <TouchableOpacity
      activeOpacity={1}
      className="bg-white rounded-2xl p-4 mb-4 border border-gray-100"
      style={Platform.select({
        ios: {
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      })}
    >
      
      <View className="flex-row items-center">
 
        <View className="w-10 h-10 bg-secondary/10 bg-opacity-10 rounded-full items-center justify-center mr-3">
          <Text className="text-secondary font-bold text-base">{index}</Text>
        </View>

        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold text-primary">{appointment.patientName}</Text>
            
            {appointment.gender && (
             <View className="px-3 py-1 rounded-full bg-secondary/10 ">
  <Text
    className={`text-xs font-medium capitalize 
      ${appointment.gender === 'male' ? 'text-secondary' : 'text-pink-500'}`}
  >
    {appointment.gender}
  </Text>
</View>
            )}

          </View>

          <View className="flex-row justify-between items-center mt-1">
           
            <Text className="text-gray-600 text-sm">Age: {appointment.patientAge}</Text>

            <View className="flex-row items-center">
              <MaterialCommunityIcons name="clock-outline" size={14} color="#2C415C" />
              <Text className="text-primary ml-1 font-medium text-sm">{formatTime(appointment.time)}</Text>
            </View>
          </View>

          {/* Payment Status */}
          <View className="mt-1 flex-row items-center">
            <MaterialCommunityIcons
  name={appointment.paymentStatus === "cash" || appointment.paymentStatus === "online"
    ? "check-circle-outline"
    : "clock-time-four-outline"}
  size={14}
  color={appointment.paymentStatus === "cash" || appointment.paymentStatus === "online"
    ? "#10B981"
    : "#F59E0B"}
/>
<Text
  className={`ml-1 text-sm ${
    appointment.paymentStatus === "cash" || appointment.paymentStatus === "online"
      ? "text-green-600"
      : "text-amber-600"
  }`}
>
  {appointment.paymentStatus === "cash" || appointment.paymentStatus === "online"
    ? "Payment Done"
    : "Payment Pending"}
</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row mt-1 pt-3 border-t border-gray-100">
        {/* Reschedule Button */}
        {/* <TouchableOpacity className="flex-1 mr-2 bg-indigo-50 py-2.5 rounded-lg items-center border border-indigo-100">
          <Text className="text-indigo-600 font-medium">Reschedule</Text>
        </TouchableOpacity> */}

        {/* Start Session Button */}
        <TouchableOpacity onPress={handlePress} activeOpacity={.95} className="flex-1 ml-2 bg-secondary py-2.5 rounded-lg items-center">
          <Text className="text-white font-medium">Start Session</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default PatientCard
