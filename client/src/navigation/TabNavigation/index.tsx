import { Image, SafeAreaView } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import DashBoard from "../../screens/Tabs/Dashboard"
import Icons from "../../utils/libs/constants/Icons"
import DrProfileLayout from "../DrProfileNavigation"
import PaymentsScreen from "../../screens/Tabs/PaymentsScreen"

const Tab = createBottomTabNavigator()

const TabLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
            paddingBottom: 8,
            paddingTop: 8,
            paddingHorizontal: 20,
            backgroundColor: "#ffffff",
            borderTopWidth: 0,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: 4,
            letterSpacing: 0.3,
          },
          tabBarIconStyle: {
            width: 24,
            height: 24,
            marginBottom: 2,
          },
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#6b7280",
          tabBarItemStyle: {
            paddingVertical: 4,
          },
        }}
      >
        <Tab.Screen
          name="Clinic"
          component={DashBoard}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Image className="w-6 h-6" source={Icons.dashboard} style={{ tintColor: color }} />
            ),
            tabBarLabel: "Clinic",
          }}
        />
        <Tab.Screen
          name="Payments"
          component={PaymentsScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Image className="w-6 h-6" source={Icons.sign} style={{ tintColor: color }} />
            ),
            tabBarLabel: "Payments",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={DrProfileLayout}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Image className="w-6 h-6" source={Icons.user} style={{ tintColor: color }} />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default TabLayout
