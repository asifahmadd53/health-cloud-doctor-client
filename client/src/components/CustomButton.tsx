import { Pressable, Text } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

interface ButtonProps {
  link?: string;
  label: string;
  onPress?: () => void;
}

const CustomButton = ({ link, label, onPress }: ButtonProps) => {
  const navigation = useNavigation();

  // Memoize the function to avoid unnecessary re-renders
  const handlePress = useCallback(() => {
    if (link) {
      navigation.navigate(link as never); // Fix TypeScript warning
    } else if (onPress) {
      onPress();
    }
  }, [link, onPress, navigation]);

  return (
    <Pressable
      className="bg-secondary w-[70%] mx-auto rounded-full py-4 md:py-5"
      onPress={handlePress}
      accessible
      accessibilityLabel={label}
    >
      <Text className="text-white text-xl text-center font-semibold">{label}</Text>
    </Pressable>
  );
};

export default CustomButton;
