import { Image, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import Icons from "../utils/libs/constants/Icons"

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation()

  return (
    <View
      style={{
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 12, 
      }}
      className="flex-row items-center justify-between py-4 px-5"
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.goBack()}
        className="w-10 h-10 items-center justify-center shadow-2xl bg-gray-200 rounded-xl"
        
      >
        <Image className="w-6 h-6" source={Icons.leftIcon} />
      </TouchableOpacity>

      <Text className="text-lg font-semibold text-gray-800">{title}</Text>

     
      <View className="w-10 h-10" />
    </View>
  )
}

export default Header
