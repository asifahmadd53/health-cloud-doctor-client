import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomHeader from '../../components/CustomHeader';
import DashBoard from '../../screens/Tabs/Dashboard';
import { Billing, EConsults, FollowUps } from '../../screens';
import Icons from '../../utils/libs/constants/Icons';



const Tab = createBottomTabNavigator();

const TabLayout = () => {

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Custom Header */}
      <View className="absolute top-3 left-3 right-0 z-50 p-4">
        <CustomHeader />
      </View>

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            padding:10,
            height: 58,
            paddingBottom: 4,
            paddingTop: 5,
            backgroundColor: '#f8f9fa',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
          },
          
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIconStyle: {
            width: 24,
            height: 24,
          },
          tabBarActiveTintColor:'#2895cb'
        }}
      >
        <Tab.Screen
          name="Clinc"
          component={DashBoard}
          options={{
            
            tabBarIcon: () => <Image className="w-5 h-5" source={Icons.dashboard} />,
            tabBarLabel: 'Clinc',
          }}
        />
        <Tab.Screen
          name="E-Consults"
          component={EConsults}
          options={{
            tabBarIcon: () => <Image className="w-7 h-7" source={Icons.consultation} />,
            tabBarLabel: 'E-Consults',
          }}
        />
        <Tab.Screen
          name="Follow Ups"
          component={FollowUps}
          options={{
            tabBarIcon: () => <Image className="w-7 h-7" source={Icons.sign} />,
            tabBarLabel: 'Follow Ups',
          }}
        />
        <Tab.Screen
          name="Billing"
          component={Billing}
          options={{
            tabBarIcon: () => <Image className="w-7 h-7" source={Icons.credit} />,
            tabBarLabel: 'Billing',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabLayout;
