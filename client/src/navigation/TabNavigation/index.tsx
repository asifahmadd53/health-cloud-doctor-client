import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomHeader from '../../components/CustomHeader';
import DashBoard from '../../screens/Tabs/Dashboard';
import { EConsults, Profile } from '../../screens';
import Icons from '../../utils/libs/constants/Icons';
import DrProfileLayout from '../DrProfileNavigation';
import PaymentsScreen from '../../screens/Tabs/PaymentsScreen';



const Tab = createBottomTabNavigator();

const TabLayout = () => {

  return (
    <SafeAreaView className="flex-1 bg-white">
      

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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
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
          name="Payments"
          component={PaymentsScreen}
          options={{
            tabBarIcon: () => <Image className="w-7 h-7" source={Icons.sign} />,
            tabBarLabel: 'Payments',
          }}
        />
        <Tab.Screen
          name="DrProfileLayout"
          component={DrProfileLayout}
          options={{
            tabBarIcon: () => <Image className="w-7 h-7" source={Icons.user} />,
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabLayout;
