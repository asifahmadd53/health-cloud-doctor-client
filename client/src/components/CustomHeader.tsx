import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Image, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from '../utils/libs/constants/Icons';

const CustomHeader = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      position: 'absolute',
      left: 6,
      top: insets.top + 8,
      height: 32,
      width: 32,
      zIndex: 40
    }}>
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={Icons.menu} />
      </Pressable>
    </View>
  );
};

export default CustomHeader;