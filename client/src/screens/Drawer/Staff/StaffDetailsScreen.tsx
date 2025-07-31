"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, Image, Alert } from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Ionicons from "react-native-vector-icons/Ionicons"
import Button from "../../../components/Doctor/Button"
import Card from "../../../components/Doctor/Card"
import Header from "../../../components/Header"
import axios from "axios"
import { API_URL } from "../../../api/api"
import type { RootStackParamList } from "./StaffScreen"

type StaffDetailsScreenRouteProp = RouteProp<RootStackParamList, "StaffDetails">
type StaffDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const StaffDetailsScreen = () => {
  const navigation = useNavigation<StaffDetailsScreenNavigationProp>()
  const route = useRoute<StaffDetailsScreenRouteProp>()
  const { staffId } = route.params

  const [staffDetails, setStaffDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStaffDetails()
  }, [staffId])

  const getStaffDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/staff/get-staff/${staffId}`, {
        withCredentials: true,
      })

      if (response.data && response.data.staff) {
        setStaffDetails(response.data.staff)
      } else {
        console.error("Unexpected API response format:", response.data)
        Alert.alert("Error", "Received unexpected data format from server.")
      }
    } catch (error: any) {
      console.error("Failed to fetch staff details:", error?.response?.data?.message || error.message)
      Alert.alert("Error", "Could not load staff details. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    navigation.navigate("EditStaff", { staffId })
  }

  const handleDelete = () => {
    Alert.alert("Delete Staff Member", "Are you sure you want to delete this staff member?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true)
            await axios.delete(`${API_URL}/api/staff/delete-staff/${staffId}`, {
              withCredentials: true,
            })
            Alert.alert("Success", "Staff member deleted successfully!")
            navigation.goBack()
          } catch (error: any) {
            console.error("Failed to delete staff:", error?.response?.data?.message || error.message)
            Alert.alert("Error", "Could not delete staff member. Please try again later.")
          } finally {
            setLoading(false)
          }
        },
      },
    ])
  }

  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 items-center justify-center">
        <Text className="text-gray-500 text-base">Loading staff details...</Text>
      </View>
    )
  }

  if (!staffDetails) {
    return (
      <View className="flex-1 bg-gray-100 items-center justify-center p-4">
        <Text className="text-gray-500 text-base mb-4">Staff member not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} variant="primary" />
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Header title="Staff Details" />
        <Card>
          <View className="items-center p-4">
            {staffDetails.profileImage ? (
              <Image source={{ uri: staffDetails.profileImage }} className="w-24 h-24 rounded-full mb-4" />
            ) : (
              <View className="w-24 h-24 rounded-full bg-cyan-50 items-center justify-center mb-4">
                <Text className="text-4xl font-bold text-cyan-600">{staffDetails.name.charAt(0)}</Text>
              </View>
            )}
            <Text className="text-2xl font-bold text-gray-800 mb-1">{staffDetails.name}</Text>
            <Text className="text-base text-cyan-600 font-medium mb-1">{staffDetails.role}</Text>
            <Text className="text-sm text-gray-500 mb-4">{staffDetails.department}</Text>

            <View className="flex-row justify-center w-full">
              <Button
                title="Edit"
                onPress={handleEdit}
                variant="outline"
                className="flex-1 mr-2 flex-row items-center justify-center"
                icon={<Ionicons name="create-outline" size={16} color="#0891b2" />}
              />
               <Button
                title="Delete"
                onPress={handleDelete}
                variant="outline"
                className="flex-1 mr-2 flex-row items-center justify-center"
                icon={<Ionicons name="trash-outline" size={16} color="#0891b2" />}
              />
            </View>
          </View>
        </Card>

        <Card>
          <Text className="text-lg font-bold text-gray-800 mb-4">Contact Information</Text>
          <View className="flex-row items-center mb-3">
            <Ionicons name="mail-outline" size={20} color="#0891b2" />
            <Text className="ml-3 text-base text-gray-600">{staffDetails.email}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="call-outline" size={20} color="#0891b2" />
            <Text className="ml-3 text-base text-gray-600">{staffDetails.phone}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="location-outline" size={20} color="#0891b2" />
            <Text className="ml-3 text-base text-gray-600">{staffDetails.address || "Not provided"}</Text>
          </View>
          {staffDetails.startDate && (
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={20} color="#0891b2" />
              <Text className="ml-3 text-base text-gray-600">Started {staffDetails.startDate}</Text>
            </View>
          )}
        </Card>

        <Card>
          <Text className="text-lg font-bold text-gray-800 mb-4">Professional Information</Text>
          <View className="mb-4">
            <Text className="text-base font-semibold text-gray-600 mb-2">Bio</Text>
            <Text className="text-base text-gray-600 leading-6">{staffDetails.bio || "No bio provided"}</Text>
          </View>
          {staffDetails.certifications && (
            <View>
              <Text className="text-base font-semibold text-gray-600 mb-2">Certifications</Text>
              <Text className="text-base text-gray-600 leading-6">{staffDetails.certifications}</Text>
            </View>
          )}
        </Card>
      </View>
    </ScrollView>
  )
}

export default StaffDetailsScreen
