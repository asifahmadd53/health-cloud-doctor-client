import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icons from '../utils/libs/constants/Icons'


interface HeaderProps {
    title: string;
}

const Header = ({title}:HeaderProps) => {

  
    const navigation = useNavigation()
  return (
    <View className="flex-row items-center justify-between relative">
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.goBack()}
                    className="w-12 h-12 items-center justify-center bg-gray-200 rounded-full shadow-sm"
                >
                    <Image className="w-6 h-6" source={Icons.leftIcon} />
                </TouchableOpacity>

                {/* Centered Title */}
                <View className="absolute left-0 right-0 items-center">
                    <Text className="text-xl font-semibold text-gray-800 tracking-wide">
                        {title}
                    </Text>
                </View>
            </View>
  )
}

export default Header

const styles = StyleSheet.create({})