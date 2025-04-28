import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

interface ButtonProps {
  label: string;
  link?: string; // Make link optional
  onPress?: () => void; // Allow custom onPress function
}

const CustomSecondaryButton = ({ label, link, onPress }: ButtonProps) => {
  const navigation = useNavigation();

  return (
    <Pressable
      className="bg-secondary w-[40%] mx-auto rounded-full py-4"
      onPress={() => (link ? navigation.navigate(link) : onPress && onPress())}
      accessible
    >
      <Text className="text-white text-xl text-center font-semibold">{label}</Text>
    </Pressable>
  );
};

export default CustomSecondaryButton;

const styles = StyleSheet.create({});
