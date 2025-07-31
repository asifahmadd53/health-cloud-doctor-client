import { View, Text, TouchableOpacity, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import type { Appointment } from "../../utils/libs/types/appointment";
import { formatDate, formatTime } from "../../utils/dateUtils";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useMemo } from "react";

interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const AppointmentCard = ({ appointment, onPress, onEdit, onDelete }: AppointmentCardProps) => {
  const { statusInfo } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(0, 0, 0, 0);
    
    const isToday = today.getTime() === appointmentDate.getTime();
    const isPast = today.getTime() > appointmentDate.getTime();
    
    return {
      statusInfo: {
        backgroundColor: isToday ? "bg-cyan-50" : isPast ? "bg-gray-100" : "bg-emerald-50",
        textColor: isToday ? "text-cyan-700" : isPast ? "text-gray-600" : "text-emerald-700",
        iconColor: isToday ? "#0891b2" : isPast ? "#6b7280" : "#10b981",
        statusText: isToday ? "Today" : isPast ? "Past" : "Upcoming"
      }
    };
  }, [appointment.date]);

  const handlePress = () => {
    onPress?.();
  };

  const handleEdit = (e: any) => {
    e?.stopPropagation();
    onEdit?.();
  };

  const handleDelete = (e: any) => {
    e?.stopPropagation();
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this appointment?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => onDelete?.() }
      ]
    );
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.9}
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(200)}
      onPress={handlePress}
      className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-200"
    >
      {/* Header Row */}
      <View className="flex-row justify-between items-start">
        <View className="flex-row items-center flex-1">
          <View className={`w-10 h-10 rounded-full items-center justify-center ${statusInfo.backgroundColor}`}>
            <MaterialCommunityIcons name="calendar" size={18} color={statusInfo.iconColor} />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>
              {appointment.patientName}
            </Text>
            <Text className="text-sm text-gray-500">
              {appointment.age} years • {appointment.gender}
            </Text>
          </View>
        </View>

        <View className={`px-2 py-1 rounded-full ${statusInfo.backgroundColor}`}>
          <Text className={`text-xs font-medium ${statusInfo.textColor}`}>
            {statusInfo.statusText}
          </Text>
        </View>
      </View>

      {/* Appointment Details */}
      <View className="mt-4 flex-row flex-wrap">
        <View className="flex-row items-center mr-4 mb-2">
          <MaterialCommunityIcons name="calendar" size={14} color="#6b7280" />
          <Text className="ml-1 text-sm text-gray-600">{formatDate(appointment.date)}</Text>
        </View>
        <View className="flex-row items-center mr-4 mb-2">
          <MaterialCommunityIcons name="clock" size={14} color="#6b7280" />
          <Text className="ml-1 text-sm text-gray-600">{formatTime(appointment.time)}</Text>
        </View>
        <View className="flex-row items-center mb-2">
          <MaterialCommunityIcons name="phone" size={14} color="#6b7280" />
          <Text className="ml-1 text-sm text-gray-600">{appointment.contactNumber || "N/A"}</Text>
        </View>
      </View>

      {/* Reason for Visit */}
      {appointment.reason && (
        <View className="mt-2 bg-gray-50 p-2 rounded-md">
          <Text className="text-sm text-gray-700" numberOfLines={2}>
            {appointment.reason}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View className="flex-row justify-end mt-3">
        <TouchableOpacity 
          onPress={handleEdit}
          className="flex-row items-center py-1.5 px-3 rounded-md bg-cyan-50 mr-2"
        >
          <MaterialCommunityIcons name="pencil" size={14} color="#0891b2" />
          <Text className="ml-1 text-xs font-medium text-cyan-700">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleDelete}
          className="flex-row items-center py-1.5 px-3 rounded-md bg-red-50"
        >
          <MaterialCommunityIcons name="trash-can-outline" size={14} color="#ef4444" />
          <Text className="ml-1 text-xs font-medium text-red-700">Delete</Text>
        </TouchableOpacity>
      </View>
    </AnimatedTouchableOpacity>
  );
};

export default AppointmentCard;