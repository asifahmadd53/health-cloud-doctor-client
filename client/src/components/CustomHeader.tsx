// components/CustomHeader.js
import { Image, Pressable, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icons from '../utils/libs/constants/Icons';

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View className="absolute left-3 top-3 h-10 w-10 z-40">
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image className="object-cover w-full h-full" source={Icons.menu} />
      </Pressable>
    </View>
  );
};

export default CustomHeader;