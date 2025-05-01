import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton } from 'react-native-paper';
import { LocaleConfig } from 'react-native-calendars';

import CustomButton from '../../components/CustomButton';
import PatientCard from '../../components/PatientCard';
import Images from '../../utils/libs/constants/Images';
import CustomHeader from '../../components/CustomHeader';

const { height } = Dimensions.get('window');

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

const DashBoard = () => {
  const [patients] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
  }, []);

  const generateWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push({
        day: date.toLocaleString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        fullDate: date.toDateString()
      });
    }
    return dates;
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      
        {/* Header */}
        <View className="h-[30%] justify-center pt-10 px-7">
      
          <LinearGradient
            start={{ x: 0, y: 0.1 }}
            end={{ x: 1, y: 1.5 }}
            colors={[
              'rgba(30, 50, 80, 0.9)',
              'rgba(50, 130, 190, 0.75)',
              'rgba(180, 230, 250, 0.6)',
            ]}
            className="absolute inset-0"
          />
          <View className="flex-row justify-around items-center">
            <View className="flex-col items-start justify-center">
              <Text className="text-3xl font-bold text-white">Welcome!</Text>
              <Text className="text-2xl font-bold text-white">Dr. Ali</Text>
              <Text className="text-base font-bold text-white">Surgeon</Text>
            </View>
            <View className="w-1/2">
              <Image className="w-full h-full bottom-1" source={Images.dashboard} resizeMode="cover" />
            </View>
          </View>
        </View>

        {/* Content Area */}
        <View className="flex-1 bg-white -top-[1.50%] rounded-t-[1.8rem] pt-3 px-2">
          {/* Date Selector */}
          <View className="flex-row items-center justify-between px-7">
            <TouchableOpacity activeOpacity={0.9} className="flex-row items-center" onPress={() => setShow(true)}>
              <Text className="text-lg font-semibold">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Text>
              <IconButton icon={'chevron-down'} />
            </TouchableOpacity>
            <Animated.View
              className="bg-secondary"
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ scale: scaleAnim }],
              }}
            >
              <Text className="text-white font-bold text-[18px]">4</Text>
            </Animated.View>
          </View>

          {/* Week Scroll */}
          <ScrollView horizontal className="py-2 flex-none" showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3 px-3">
              {generateWeekDates().map((item, index) => {
                const isActive = item.fullDate === selectedDate.toDateString();
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedDate(new Date(item.fullDate))}
                    activeOpacity={0.8}
                    className={`items-center justify-center rounded-2xl h-20 min-w-[4rem] border border-gray-300 ${
                      isActive ? 'bg-[#2C415C]' : 'bg-transparent'
                    }`}
                  >
                    <Text className={`text-lg font-bold ${isActive ? 'text-white' : 'text-black'}`}>
                      {item.day}
                    </Text>
                    <Text className={`text-base font-semibold ${isActive ? 'text-white' : 'text-black'}`}>
                      {item.date}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Patient List */}
          <FlatList
            data={patients}
            className="px-4"
            contentContainerStyle={{ paddingBottom: 60 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <PatientCard index={index + 1} />}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Fixed Bottom Button */}

        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            height: height * 0.06,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}
        >
          <CustomButton label="New Appointment" link="newAppointment" />
        </View>
    </SafeAreaView>
  );
};

export default DashBoard;
