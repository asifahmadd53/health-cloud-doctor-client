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
            height: 80,
            paddingBottom: 16,
            paddingTop: 4,
            paddingHorizontal: 14,
            marginHorizontal: 50,
            marginBottom: 20,
            backgroundColor: "#ffffff",
            borderRadius: 40,
            borderTopWidth: 0,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 15,
            position: "absolute",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginTop: 6,
            letterSpacing: 0.2,
            fontFamily: "System",
          },
          tabBarActiveTintColor: "#0891b2",
          tabBarInactiveTintColor: "#64748b",
          tabBarItemStyle: {
            paddingVertical: 8,
            paddingHorizontal: 4,
            borderRadius: 12,
            marginHorizontal: 2,
          },
          
        }}
        
      >
        <Tab.Screen
          name="Clinic"
          component={DashBoard}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={Icons.dashboard}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: color,
                  resizeMode: "contain",
                }}
              />
            ),
            tabBarLabel: "Clinic",
          }}
        />
        <Tab.Screen
          name="Payments"
          component={PaymentsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={Icons.sign}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: color,
                  resizeMode: "contain",
                }}
              />
            ),
            tabBarLabel: "Payments",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={DrProfileLayout}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={Icons.user}
                style={{
                  width: 26,
                  height: 26,
                  tintColor: color,
                  resizeMode: "contain",
                }}
              />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default TabLayout
