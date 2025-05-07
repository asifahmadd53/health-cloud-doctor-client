import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashBoard from '../../screens/Tabs/Dashboard';
import { EConsults } from '../../screens';
import PaymentsScreen from '../../screens/Tabs/PaymentsScreen';
import DrProfileLayout from '../DrProfileNavigation';
import Icons from '../../utils/libs/constants/Icons';

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.label,
          tabBarIcon: ({ focused }) => {
            let icon;

            switch (route.name) {
              case 'Clinic':
                icon = Icons.dashboard;
                break;
              case 'E-Consults':
                icon = Icons.consultation;
                break;
              case 'Payments':
                icon = Icons.sign;
                break;
              case 'Profile':
                icon = Icons.user;
                break;
            }

            return (
              <Image
                source={icon}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#007AFF' : '#A0A0A0' },
                ]}
              />
            );
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#A0A0A0',
        })}
      >
        <Tab.Screen name="Clinic" component={DashBoard} />
        <Tab.Screen name="E-Consults" component={EConsults} />
        <Tab.Screen name="Payments" component={PaymentsScreen} />
        <Tab.Screen name="Profile" component={DrProfileLayout} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabBar: {
    height: 64,
    paddingBottom: 10,
    paddingTop: 6,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: -4,
  },
});

export default TabLayout;
