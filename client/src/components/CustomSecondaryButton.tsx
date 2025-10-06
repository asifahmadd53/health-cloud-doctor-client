import React from "react";
import { Text, TouchableOpacity, View, Image, GestureResponderEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface ButtonProps {
  label: string;
  link?: string; // optional navigation link
  onPress?: (event: GestureResponderEvent) => void; // optional custom press
  icon?: any; // optional icon (Image source)
  iconPosition?: "left" | "right"; // control icon placement
  className?: string; // allow tailwind styling override
}

const CustomSecondaryButton = ({ 
  label, 
  link, 
  onPress, 
  icon, 
  iconPosition = "left", 
  className 
}: ButtonProps) => {
  const navigation = useNavigation();

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    } else if (link) {
      // @ts-ignore (navigation typing issue sometimes)
      navigation.navigate(link);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className={`bg-gray-200 flex-row items-center justify-center rounded-full py-3 px-4 w-4/5 ${className || ""}`}
    >
      <View className="flex-row items-center gap-2 justify-center">
        {icon && iconPosition === "left" && (
          <Image tintColor={"white"} source={icon} className="w-5 h-5" />
        )}
        <Text className="text-white text-base text-center font-semibold">
          {label}
        </Text>
        {icon && iconPosition === "right" && (
          <Image tintColor={"white"} source={icon} className="w-5 h-5" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomSecondaryButton;
