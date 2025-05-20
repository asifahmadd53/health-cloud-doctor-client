import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FormInput from "../../components/Doctor/FormInput";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";
import { formatDate, formatTime } from "../../utils/dateUtils";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { API_URL } from "../../utils/libs/constants/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewAppointmentScreen = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  // Form state
  const [patientName, setPatientName] = useState("");
  const [patientCNIC, setPatientCNIC] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(null);
  const [patientAge, setPatientAge] = useState("");
  const [reason, setReason] = useState("");

  // Date and time pickers
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

    const validateForm = () => {
    if (!patientName.trim()) {
      Alert.alert("Error", "Patient name is required");
      return false;
    }
    if (!patientPhone.trim()) {
      Alert.alert("Error", "Mobile number is required");
      return false;
    }
    if (!patientAge.trim()) {
      Alert.alert("Error", "Age is required");
      return false;
    }
    if (!gender) {
      Alert.alert("Error", "Please select gender");
      return false;
    }
    if (!date) {
      Alert.alert("Error", "Please select appointment date");
      return false;
    }
    if (!time) {
      Alert.alert("Error", "Please select appointment time");
      return false;
    }
    if (!paymentMethod) {
      Alert.alert("Error", "Please select payment method");
      return false;
    }
    if (!patientCNIC) {
        Alert.alert("Error", "Invalid CNIC format.  Use XXXXX-XXXXXXX-X");
        return false;
    }
    if (!/^[0-9]{11}$/.test(patientPhone)) {
        Alert.alert("Error", "Invalid phone number.  Use 11 digits.");
        return false;
    }
    if (isNaN(Number(patientAge)) || Number(patientAge) <= 0) {
        Alert.alert("Error", "Invalid age.  Must be a positive number.");
        return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const staffId = await AsyncStorage.getItem("staffId");


      if (!staffId) {
        Alert.alert("Error", "Staff ID not found. Please login again.");
        setLoading(false);
        return; // Stop if staff ID is missing
      }
      const dateString = date?.toISOString().split("T")[0] || "";
      const timeString = time?.toTimeString().split(" ")[0].substring(0, 5) || "";

      const response = await axios.post(
        `${API_URL}/api/appointment/create-appointment`,
        {
          patientName,
          patientCNIC,
          patientPhone,
          patientAge,
          gender,
          date: dateString,
          time: timeString,
          paymentStatus: paymentMethod,
          staffId, 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        Alert.alert(
          "Success",
          "Appointment created successfully",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error: any) {
      console.error("Appointment creation error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="New Appointment" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mt-4 mb-8">
            {/* Patient Information */}
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Patient Information
            </Text>

            <FormInput
              value={patientName}
              onChangeText={setPatientName}
              placeholder="Enter patient name"
              label="Patient Name"
            />

            <FormInput
              value={patientCNIC}
              onChangeText={setPatientCNIC}
              placeholder="Enter CNIC number (XXXXX-XXXXXXX-X)"
              label="CNIC #"
              keyboardType="numeric"
            />

            <FormInput
              value={patientPhone}
              onChangeText={setPatientPhone}
              placeholder="Enter mobile number (11 digits)"
              label="Mobile #"
              keyboardType="phone-pad"
            />

            <FormInput
              value={patientAge}
              onChangeText={setPatientAge}
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
              onPress={() => setDatePickerVisible(true)}
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
                display="calendar"
                onChange={(event, selectedDate) => {
                  setDatePickerVisible(false); // hide on selection
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
                display="spinner"
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
                label={loading ? "Creating..." : "Create Appointment"}
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

export default NewAppointmentScreen;
