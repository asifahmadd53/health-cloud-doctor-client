import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FormInput from "../../components/Doctor/FormInput";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";
import { formatDate, formatTime } from "../../utils/dateUtils";

import {
  getAppointmentById,
  updateAppointment,
} from "../../utils/libs/services/appointmentService";
import RNDateTimePicker from "@react-native-community/datetimepicker";


const EditAppointmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(
    null
  );
  const [age, setAge] = useState(Number);
  const [reason, setReason] = useState("");

  // Date and time pickers
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    loadAppointment();
  }, [id]);

  const loadAppointment = async () => {
    try {
      setInitialLoading(true);
      const appointment = await getAppointmentById(id);
      
      if(appointment.patientName){
        setName(appointment.patientName)
        setCnic(appointment.patientCNIC)
        setMobile(appointment.patientPhone)
        setAge(appointment.patientAge)
        setGender(appointment.gender)
        setPaymentMethod(appointment.paymentStatus)
      }
      
      if (appointment) {
        // Set date and time
        if (appointment.date) {
          setDate(new Date(appointment.date));
        }
  
        if (appointment.time) {
          const [hours, minutes] = appointment.time.split(":");
          const timeDate = new Date();
          timeDate.setHours(Number.parseInt(hours), Number.parseInt(minutes));
          setTime(timeDate);
        }
      } else {
        Alert.alert("Error", "Appointment not found");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load appointment details");
      navigation.goBack();
    } finally {
      setInitialLoading(false);
    }
  };
  
  // Form validation
  // const validateForm = () => {
  //   if (!name.trim()) {
  //     Alert.alert("Error", "Patient name is required");
  //     return false;
  //   }

  //   if (!mobile.trim()) {
  //     Alert.alert("Error", "Mobile number is required");
  //     return false;
  //   }

  //   if (!age.trim()) {
  //     Alert.alert("Error", "Age is required");
  //     return false;
  //   }

  //   if (!gender) {
  //     Alert.alert("Error", "Please select gender");
  //     return false;
  //   }

  //   if (!date) {
  //     Alert.alert("Error", "Please select appointment date");
  //     return false;
  //   }

  //   if (!time) {
  //     Alert.alert("Error", "Please select appointment time");
  //     return false;
  //   }

  //   if (!paymentMethod) {
  //     Alert.alert("Error", "Please select payment method");
  //     return false;
  //   }

  //   return true;
  // };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Create appointment object
      const appointmentData = {
        id,
        patientName: name,
        cnic: cnic,
        contactNumber: mobile,
        age: Number.parseInt(age),
        gender: gender as string,
        date: date?.toISOString().split("T")[0] || "",
        time: time?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "",
        reason,
        paymentMethod: paymentMethod as string,
      };

      // In a real app, you would call an API here
      await updateAppointment(id, appointmentData);

      Alert.alert("Success", "Appointment updated successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to update appointment");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0891b2" />
        <Text className="mt-2">Loading appointment details...</Text>
      </SafeAreaView>
    );

  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          <Header title="Edit Appointment" />
          <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mt-4 mb-8">
            {/* Patient Information */}
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Patient Information
            </Text>

            <FormInput
              value={name}
              onChangeText={setName}
              placeholder="Enter patient name"
              label="Patient Name"
            />

            <FormInput
              value={cnic}
              onChangeText={setCnic}
              placeholder="Enter CNIC number"
              label="CNIC # (Optional)"
              keyboardType="numeric"
            />

            <FormInput
              value={mobile}
              onChangeText={setMobile}
              placeholder="Enter mobile number"
              label="Mobile #"
              keyboardType="phone-pad"
            />

            <FormInput
              value={age}
              onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ""))}
              placeholder="Enter age"
              label="Age"
              keyboardType="numeric"
            />

            {/* Gender Selection */}
            <Text className="mt-4 mb-2 font-semibold text-base text-gray-700">
              Gender
            </Text>
            <View className="flex-row space-x-6 items-center">
              {["male", "female"].map((g) => (
                <Pressable
                  key={g}
                  onPress={() => setGender(g as "male" | "female")}
                  className="flex-row items-center space-x-1"
                >
                  <RadioButton
                    value={g}
                    color="#0891b2"
                    status={gender === g ? "checked" : "unchecked"}
                  />
                  <Text className="text-gray-700 capitalize">{g}</Text>
                </Pressable>
              ))}
            </View>

            {/* Appointment Details */}
            <Text className="text-lg font-bold text-gray-800 mt-8 mb-4">
              Appointment Details
            </Text>

            {/* Date Picker */}
            <Text className="mb-2 font-semibold text-base text-gray-700">
              Appointment Date
            </Text>
            <TouchableOpacity
              onPress={showDatePicker}
              className="flex-row items-center border border-gray-200 rounded-lg p-3 mb-4"
            >
              <MaterialCommunityIcons name="calendar" size={20} color="#6b7280" />
              <Text className="ml-2 text-gray-700">
                {date ? formatDate(date.toISOString()) : "Select date"}
              </Text>
            </TouchableOpacity>
            {isDatePickerVisible && (
              <RNDateTimePicker
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setDatePickerVisibility(false); // hide on selection
                  if (event.type === "set" && selectedDate) {
                    setDate(selectedDate);
                  }
                }}
              />
            )}


            {/* Time Picker */}
            <Text className="mb-2 font-semibold text-base text-gray-700">
              Appointment Time
            </Text>
            <TouchableOpacity
              onPress={() => setTimePickerVisible(true)}
              className="flex-row items-center border border-gray-200 rounded-lg p-3 mb-4"
            >
              <MaterialCommunityIcons name="clock" size={20} color="#6b7280" />
              <Text className="ml-2 text-gray-700">
                {time ? formatTime(time.toISOString()) : "Select time"}
              </Text>
            </TouchableOpacity>
            {isTimePickerVisible && (
              <RNDateTimePicker
                value={time || new Date()}
                mode="time"
                display="inline"
                onChange={(event, selectedTime) => {
                  setTimePickerVisible(false);
                  if (event.type === "set" && selectedTime) {
                    setTime(selectedTime);
                  }
                }}
              />
            )}


            {/* Reason for Visit */}
            <FormInput
              value={reason}
              onChangeText={setReason}
              placeholder="Enter reason for visit"
              label="Reason for Visit (Optional)"
              multiline
              numberOfLines={3}
            />

            {/* Payment Method */}
            <Text className="mt-4 mb-2 font-semibold text-base text-gray-700">
              Payment Method
            </Text>
            <View className="flex-row space-x-6 items-center">
              {["cash", "online"].map((p) => (
                <Pressable
                  key={p}
                  onPress={() => setPaymentMethod(p as "cash" | "online")}
                  className="flex-row items-center space-x-1"
                >
                  <RadioButton
                    value={p}
                    color="#0891b2"
                    status={paymentMethod === p ? "checked" : "unchecked"}
                  />
                  <Text className="text-gray-700 capitalize">{p}</Text>
                </Pressable>
              ))}
            </View>

            {/* Submit Button */}
            <View className="mt-8">
              <CustomButton
                label={loading ? "Updating..." : "Update Appointment"}
                onPress={handleSubmit}
                disabled={loading}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditAppointmentScreen;