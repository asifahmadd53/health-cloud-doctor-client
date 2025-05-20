import { useCallback, useEffect, useState } from "react"
import { View, Text, ScrollView, Alert } from "react-native"

import { useFocusEffect, useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Button from "../../../components/Doctor/Button"
import StaffCard from "../../../components/Staff/StaffCard"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from "../../../components/Header"
import { SafeAreaView } from "react-native-safe-area-context"
import { API_URL } from "../../../utils/libs/constants/api/api"
import axios from "axios"



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
  const [staff, setStaff] = useState<any>([])

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
        onPress: async () => {
          try {
            const response = await axios.delete(`${API_URL}/api/staff/delete-staff/${id}`, {
              withCredentials: true,
            })
            if (response.status === 200) {
              setStaff((prevStaff: any) => prevStaff.filter((member: any) => member._id !== id))
              Alert.alert("Success", "Staff member deleted successfully!")
            } else {
              console.error("Failed to delete staff:", response.data)
            }
          } catch (error) {
            console.error("Failed to delete staff:", error)
          }
        },
        style: "destructive",
      },
    ])
  }
  const getStaff = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/staff/get-staff`, {
        withCredentials: true,
      })
      if (response.data && response.data.staff) {
        setStaff(response.data.staff)
      } else {
        console.error("Unexpected API response format:", response.data)
        Alert.alert("Error", "Received unexpected data format from server.")
      }
    } catch (error) {
      console.error("Failed to get staff:", error)
    }
  }

  const getStaffById = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/staff/get-staff/${id}`, {
        withCredentials: true,
      })
      return response.data.staff
    } catch (error) {
      console.error("Failed to get staff:", error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getStaff()
    }, [])
  )


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
          staff.map((member: any) => <StaffCard key={member._id} staff={member} onDelete={()=> handleDeleteStaff(member._id)} />)
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
