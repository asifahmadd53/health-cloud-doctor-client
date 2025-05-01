import { Image, Text, TouchableOpacity, View, Platform } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icons from '../utils/libs/constants/Icons';

const PatientCard = ({ index }) => {
  const navigation = useNavigation();

  // Memoized function to avoid re-renders
  const handlePress = useCallback(() => {
    navigation.navigate('patientDetailsLayout' as never, );
  }, [navigation]);

  // Memoize patient age string
  const patientAge = useMemo(() => `17 years, 8 months, 3 days`, []);

  // Optimize shadows for Android & iOS
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: 'rgba(0, 0, 0, 0.4)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    android: {
      elevation: 3, // Reduce elevation for better performance
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={handlePress}
      style={[
        {
          marginTop: 10,
          paddingVertical: 20,
          paddingHorizontal: 15,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          backgroundColor: '#fff',
        },
        shadowStyle,
      ]}
      className="flex-row items-start gap-4 overflow-hidden"
    >
      <View className="h-10 w-7 flex items-center justify-center" style={{ borderRadius: 22.5 }}>
        <Text className="text-xl font-extrabold text-black">{index}</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row items-center mb-2" style={{ gap: 5 }}>
          <Image style={{ width: 18, height: 18, resizeMode: 'contain' }} source={Icons.name} />
          <Text numberOfLines={1} ellipsizeMode="tail" className="text-lg font-semibold text-gray-900" style={{ width: 160 }}>
            Muhammad Hassan
          </Text>
        </View>

        <View className="flex-row gap-2 flex-wrap">
          <Text className="text-base text-gray-700">{patientAge}</Text>
          <Text className="text-base font-semibold">/ Male</Text>
        </View>

        <View className="flex-row justify-between mt-2">
          <View className="flex-row items-center gap-2">
            <Text className="text-sm font-medium text-gray-800">History Access</Text>
            <Image style={{ width: 17, height: 17, resizeMode: 'contain' }} source={Icons.historyyes} />
          </View>
          <View className="flex-row gap-2 items-center">
            <Text className="text-sm font-medium text-gray-800">Payment</Text>
            <Image style={{ width: 23, height: 23, resizeMode: 'contain' }} source={Icons.paymentdone} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PatientCard;
