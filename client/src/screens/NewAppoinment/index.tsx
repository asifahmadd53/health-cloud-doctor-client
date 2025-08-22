"use client";

import {
  ScrollView,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../../components/Doctor/FormInput";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";

const NewAppointment = () => {
  const [name, setName] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(
    null
  );

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <Header title="New Appointment" />
      <KeyboardAvoidingView
  className="flex-1"
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
>
        <ScrollView
          className="px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Main Card */}
          <View className="bg-white rounded-3xl p-4 shadow-md border border-gray-100">
            {/* Header */}
            <View className="mb-6">
              <Text className="text-2xl font-bold text-gray-900">
                Patient Information
              </Text>
              <Text className="text-gray-600 mt-1">
                Please fill in the patient details below
              </Text>
            </View>

            {/* Input Fields */}
            <View className="space-y-5">
              <FormInput
                value={name}
                onChangeText={setName}
                placeholder="Enter patient name"
                label="Patient Name"
              />
              <FormInput
                value={CNIC}
                onChangeText={setCNIC}
                placeholder="Enter CNIC number"
                label="CNIC #"
              />
              <FormInput
                value={mobile}
                onChangeText={setMobile}
                placeholder="Enter mobile number"
                label="Mobile #"
              />
              <FormInput
                value={age}
                keyboardType="numeric"
                onChangeText={setAge}
                placeholder="Enter age"
                label="Age"
              />
            </View>

            {/* Gender Selection */}
            <View className="mt-8">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Gender
              </Text>
              <View className="flex-row gap-4">
                {["Male", "Female"].map((g) => (
                  <TouchableOpacity
                    key={g}
                    onPress={() => setSelectedGender(g)}
                    className={`flex-1 py-4 rounded-xl items-center ${
                      selectedGender === g
                        ? g === "Male"
                          ? "bg-blue-500"
                          : "bg-pink-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`font-semibold ${
                        selectedGender === g ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Payment Method */}
            <View className="mt-8">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Payment Method
              </Text>
              <View className="gap-4">
                {[
                  {
                    key: "cash",
                    label: "Cash Payment",
                    icon: "💵",
                    desc: "Pay at the clinic",
                  },
                  {
                    key: "online",
                    label: "Online Payment",
                    icon: "💳",
                    desc: "Pay securely online",
                  },
                ].map((method) => (
                  <Pressable
                    key={method.key}
                    onPress={() =>
                      setPaymentMethod(method.key as "cash" | "online")
                    }
                    className={`p-1 px-2 rounded-2xl border-2 ${
                      paymentMethod === method.key
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Text className="text-2xl mr-3">{method.icon}</Text>
                      <View className="flex-1">
                        <Text
                          className={`font-semibold text-lg ${
                            paymentMethod === method.key
                              ? "text-green-700"
                              : "text-gray-900"
                          }`}
                        >
                          {method.label}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                          {method.desc}
                        </Text>
                      </View>
                      <View
                        className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                          paymentMethod === method.key
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === method.key && (
                          <Text className="text-white text-xs">✓</Text>
                        )}
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* Submit Button */}
          
        </ScrollView>
        <View className="py-2">
            <CustomButton
              label="Proceed to Patient Details"
              link="patientDetailsLayout"
            />
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewAppointment;
