import CustomButton from '../../components/CustomButton';
import PatientCard from '../../components/PatientCard';
import Images from '../../utils/libs/constants/Images';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';



const DashBoard = () => {
  const [patients] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const {height }= Dimensions.get('window');

  const handleDateChange = (_event: any, newDate?: Date) => {
    setShow(false); 
    if (newDate) {
      setSelectedDate(newDate);
    }
  };

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-[31%] justify-center pt-10 px-7">
        {/* <LinearGradient
          start={{ x: 0, y: 0.1 }}
          end={{ x: 1, y: 1.5 }}
          colors={[
            'rgba(30, 50, 80, 0.9)',
            'rgba(50, 130, 190, 0.75)',
            'rgba(180, 230, 250, 0.6)',
          ]}
          className="absolute inset-0"
        /> */}
        <View className="flex-row justify-around items-center">
          <View className="flex-col items-start justify-center">
            <Text className="text-3xl font-bold text-white">Welcome!</Text>
            <Text className="text-2xl font-bold text-white">Dr. Ali</Text>
            <Text className="text-base font-bold text-white">Surgeon</Text>
          </View>
          <View className="w-1/2">
            <Image className="w-full h-full" source={Images.dashboard} resizeMode="cover" />
          </View>
        </View>
      </View>

      <View className="px-2 h-full z-20 -top-[1.90%] rounded-t-[1.8rem] bg-white pt-3">
        <View className="flex-row items-center justify-between px-7">
          <TouchableOpacity activeOpacity={.90} className="items-center flex-row" onPress={() => setShow(true)}>
            <Text className="text-lg font-semibold">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
            <IconButton className="right-3" icon={'chevron-down'} />
          </TouchableOpacity>

          <View>
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
              <Text className="text-white" style={{ fontSize: 18, fontWeight: 'bold' }}>
                4
              </Text>
            </Animated.View>
          </View>
        </View>

        <ScrollView horizontal className="flex-none py-2" showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3 px-3">
            {generateWeekDates().map((item, index) => {
              const isActive = item.fullDate === selectedDate.toDateString();
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  onPress={() => setSelectedDate(new Date(item.fullDate))}
                  className={`flex-col items-center justify-center rounded-2xl h-20 min-w-[4rem] border border-gray-300 ${
                    isActive ? 'bg-[#2C415C]' : 'bg-transparent'
                  }`}
                >
                  <Text className={`text-lg font-bold ${isActive ? 'text-white' : 'text-black'}`}>
                    {item.day}
                  </Text>
                  <Text className={`font-semibold text-base ${isActive ? 'text-white' : 'text-black'}`}>
                    {item.date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View className=" max-h-[63%]  mt-3">
          <FlatList
            className="px-4 mb-2"
            data={patients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <PatientCard index={index + 1} />}
            showsVerticalScrollIndicator={true}
          />

          <View style={{height:height*.1}} className="items-center justify-center">
            <CustomButton label="New Appointment" link="newAppointment" />
          </View>
        </View>

        {/* {show && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )} */}
      </View>
    </SafeAreaView>
  );
};

export default DashBoard;
