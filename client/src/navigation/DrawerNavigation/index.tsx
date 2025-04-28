import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';


import { Help, Privacy, Profile } from '../../screens';
import Images from '../../utils/libs/constants/Images';
import Icons from '../../utils/libs/constants/Icons';
import TabLayout from '../TabNavigation';

const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
   
  return (
    <Drawer.Navigator
    screenOptions={{headerShown:false}}
     drawerContent={(props)=>(
      <DrawerContentScrollView>
        <View className='flex-col items-center  mb-8 mt-4'>
        <Image className='w-28 h-28 md:w-36 md:h-36' source={Images.logo} />
        <Text className='font-bold text-2xl'>Health Cloud</Text>
      </View>
        <DrawerItemList {...props} />
        <TouchableOpacity
            className="flex-row items-center justify-between px-5 py-4 "
          >
            <View className="flex-row items-center">
              <View className=" w-10 h-10 items-center justify-center rounded-full">
                <Image className="w-10 h-10" source={Icons.logout} />
              </View>
              <Text className="text-lg font-semibold ml-4">Logout</Text>
            </View>
          </TouchableOpacity>
      </DrawerContentScrollView>
     )}
    >
      <Drawer.Screen name="Home" component={TabLayout} 
     options={{drawerItemStyle: {display:'none'}}}
      />
      <Drawer.Screen name="Profile" component={Profile}
      options={{
        drawerIcon:()=>(
          <View className='w-10 h-10 items-center justify-center rounded-full'>
            <Image className='w-10 h-10' source={Icons.user}/>
          </View>
        ),
        drawerLabel:()=>(
          <View className="flex-row justify-between items-center w-full">
              <Text className="text-lg font-semibold">Profile</Text>
                <Image className="w-7 h-7 md:w-10 md:h-10" source={Icons.right} />
            </View>
        )
        
      }}
      
      />
      <Drawer.Screen name="Privacy" component={Privacy} 
      options={{
        drawerIcon:()=>(
          <View className='w-10 h-10 items-center justify-center rounded-full'>
            <Image className='w-8 h-8' source={Icons.lock}/>
          </View>
        ),
        drawerLabel:()=>(
          <View className="flex-row justify-between items-center w-full">
              <Text className="text-lg font-semibold">Privacy</Text>
              
              <Image className="w-7 h-7 md:w-10 md:h-10" source={Icons.right} />
             
            </View>
        )
      }}
      />
      <Drawer.Screen name="Help" component={Help}
      options={{
        drawerIcon:()=>(
          <View className='w-10 h-10 items-center justify-center rounded-full'>
            <Image className='w-8 h-8' source={Icons.help}/>
          </View>
        ),
        drawerLabel:()=>(
          <View className="flex-row justify-between items-center w-full">
              <Text className="text-lg font-semibold">Help</Text>
              
              <Image className="w-7 h-7 md:w-10 md:h-10" source={Icons.right} />
             
            </View>
        )
      }}
      />
      {/* <Drawer.Screen name="Settings" component={Settings} 
      options={{
        drawerIcon:()=>(
          <View className='bg-primary w-10 h-10 items-center justify-center rounded-full'>
            <Image className='w-8 h-8' source={Icons.setings}/>
          </View>
        ),
        drawerLabel:()=>(
          <View className="flex-row justify-between items-center w-full">
              <Text className="text-lg font-semibold">Settings</Text>
              
                <Image className="w-8 h-8" source={Icons.right} />
             
            </View>
        )
      }}
      /> */}
      
    </Drawer.Navigator>
  );
};

export default DrawerLayout;
