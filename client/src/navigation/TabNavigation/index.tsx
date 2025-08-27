import React, { useEffect } from 'react'
import { Image, Pressable } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashBoard from '../../screens/Tabs/Dashboard'
import PaymentsScreen from '../../screens/Tabs/PaymentsScreen'
import DrProfileLayout from '../DrProfileNavigation'
import Icons from '../../utils/libs/constants/Icons'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated'

const Tab = createBottomTabNavigator()

// Pop-up animation
const AnimatedTabIcon = ({ source, focused, color }: any) => {
  const scale = useSharedValue(1)

  useEffect(() => {
    if (focused) {
      // Smooth pop-up effect
      scale.value = withSequence(
        withTiming(1.2, { duration: 180, easing: Easing.out(Easing.ease) }), // grow smoothly
        withSpring(1.1, { damping: 6, stiffness: 120 }) // settle with spring
      )
    } else {
      // Go back to normal smoothly
      scale.value = withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) })
    }
  }, [focused])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <Image
        source={source}
        style={{
          width: 28,
          height: 28,
          tintColor: color,
          resizeMode: 'contain',
        }}
      />
    </Animated.View>
  )
}

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          paddingTop:6,
          backgroundColor: '#ffffff',
          borderTopWidth: 0.5,
          borderTopColor: '#e2e8f0',
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#64748b',
        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={null}
            onPress={(e) => {
              e?.preventDefault?.()
              props.onPress?.()
            }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Clinic"
        component={DashBoard}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              source={focused ? Icons.homeFilled : Icons.homeOutline}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              source={focused ? Icons.paymentFilled : Icons.paymentOutline}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DrProfileLayout}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              source={focused ? Icons.profileFilled : Icons.profileOutline}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
