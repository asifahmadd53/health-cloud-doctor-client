"use client"

import { useState } from "react"
import { View, Text, ScrollView, Alert } from "react-native"

import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Button from "../../../components/Doctor/Button"
import StaffCard from "../../../components/Staff/StaffCard"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from "../../../components/Header"
import { SafeAreaView } from "react-native-safe-area-context"


// Mock staff data
const mockStaff = [
  {
    id: "1",
    name: "Ahmed Ali",
    role: "Nurse Practitioner",
    email: "ahmed.ali@example.com",
    phone: "(042) 123-4567",
    image: null,
  },
  {
    id: "2",
    name: "Usman",
    role: "Medical Assistant",
    email: "usman.raza@example.com",
    phone: "(021) 987-6543",
    image: null,
  },
  {
    id: "3",
    name: "Bilal",
    role: "Receptionist",
    email: "bilal.zafar@example.com",
    phone: "(051) 456-7890",
    image: null,
  },
]

export type RootStackParamList = {
  MainTabs: undefined
  Schedule: undefined
  AddStaff: undefined
  EditStaff: { staffId: string }
  StaffDetails: { staffId: string }
}

type StaffScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const StaffScreen = () => {
  const navigation = useNavigation<StaffScreenNavigationProp>()
  const [staff, setStaff] = useState(mockStaff)

  const handleAddStaff = () => {
    navigation.navigate("AddStaff")
  }

  const handleDeleteStaff = (id: string) => {
    Alert.alert("Delete Staff Member", "Are you sure you want to delete this staff member?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setStaff((prevStaff) => prevStaff.filter((member) => member.id !== id))
        },
        style: "destructive",
      },
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">

    <View className="px-4">
    <Header title="Staff Management" />

    </View>

    <ScrollView >

      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-bold text-gray-800">Staff Management</Text>
          <Button
            title="Add Staff"
            onPress={handleAddStaff}
            variant="primary"
            icon={<Ionicons name="person-add-outline" size={18} color="#2895cb" />}
            className="flex-row items-center gap-3"
          />
        </View>

        <Text className="text-gray-500 mb-4">
          Manage your clinic staff members, including nurses, assistants, and receptionists.
        </Text>

        {staff.length > 0 ? (
          staff.map((member) => <StaffCard key={member.id} staff={member} onDelete={handleDeleteStaff} />)
        ) : (
          <View className="bg-white rounded-xl p-6 items-center justify-center mt-4 shadow-md">
            <Text className="text-base text-gray-500 mb-4">No staff members found.</Text>
            <Button title="Add Staff Member" onPress={handleAddStaff} variant="primary" className="min-w-[200px]" />
          </View>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default StaffScreen
