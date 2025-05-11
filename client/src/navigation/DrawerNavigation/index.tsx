import { createDrawerNavigator } from "@react-navigation/drawer"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import LinearGradient  from "react-native-linear-gradient"

import Images from "../../utils/libs/constants/Images"
import TabLayout from "../TabNavigation"
import { Help, Privacy, Profile } from "../../screens"
import StaffLayout from "../StaffNavigation"

const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
     
       
          
       <View className='flex-col items-center  mb-8 mt-4'>
        <Image className='w-28 h-28 md:w-36 md:h-36' source={Images.logo} />
        <Text className='font-bold text-2xl'>Health Cloud</Text>
      </View>
        
     

      <DrawerItemList {...props} />

      <TouchableOpacity className="flex-row items-center px-5 py-4 mt-auto border-t border-gray-200">
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-center">
            <View className="w-10 h-10 items-center justify-center rounded-full bg-red-50">
              <MaterialCommunityIcons name="logout" size={24} color="#EF4444" />
            </View>
            <Text className="text-lg font-semibold ml-4 text-red-600">Logout</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={22} color="#EF4444" />
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  )
}

const DrawerLayout = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#EEF2FF", // Light indigo background
        drawerActiveTintColor: "#4F46E5", // Indigo text
        drawerInactiveTintColor: "#4B5563", // Gray text
        drawerLabelStyle: {
          marginLeft: -20, // Remove default left margin
          fontSize: 16,
          fontWeight: "500",
        },
        drawerStyle: {
          width: 300,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={TabLayout} options={{ drawerItemStyle: { display: "none" } }} />

     

      <Drawer.Screen
        name="Privacy"
        component={Privacy}
        options={{
          drawerIcon: ({ color, focused }) => (
            <View className={`w-10 h-10 items-center justify-center rounded-full ${focused ? "bg-indigo-100" : ""}`}>
              <MaterialCommunityIcons name="shield-lock" size={24} color={color} />
            </View>
          ),
          drawerLabel: ({ color }) => (
            <View className="flex-row justify-between items-center w-full">
              <Text className="text-lg font-semibold" style={{ color }}>
                Privacy
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={22} color={color} />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ color, focused }) => (
            <View className={`w-10 h-10 items-center justify-center rounded-full ${focused ? "bg-indigo-100" : ""}`}>
              <MaterialCommunityIcons name="help-circle" size={24} color={color} />
            </View>
          ),
          drawerLabel: ({ color }) => (
            <View className="flex-row justify-between items-center w-full">
              <Text className="text-lg font-semibold" style={{ color }}>
                Help
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={22} color={color} />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Add Staff"
        component={StaffLayout}
        options={{
          drawerIcon: ({ color, focused }) => (
            <View className={`w-10 h-10 items-center justify-center rounded-full ${focused ? "bg-indigo-100" : ""}`}>
              <MaterialCommunityIcons name="account-multiple-plus" size={24} color={color} />
            </View>
          ),
          drawerLabel: ({ color }) => (
            <View className="flex-row justify-between items-center w-full">
              <Text className="text-lg font-semibold" style={{ color }}>
                Add Staff
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={22} color={color} />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerLayout
