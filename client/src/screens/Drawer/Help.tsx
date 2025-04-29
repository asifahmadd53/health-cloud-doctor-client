
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Animated, Pressable, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '../../utils/libs/constants/Icons';
import CustomButton from '../../components/CustomButton';

const Help = () => {
  const [showReport, setShowReport] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const fadeAnim = new Animated.Value(0);


  const toggleReport = () => {
    setShowReport(!showReport);
    setShowContact(false);
    Animated.timing(fadeAnim, {
      toValue: showReport ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleContact = () => {
    setShowContact(!showContact);
    setShowReport(false);
  };

  const navigation = useNavigation();

  const reportButtonColor = showReport ? '#2895cb' : '#6ec0e5'; // More distinct but still subtle  
  const contactButtonColor = showContact ? '#2895cb' : '#6ec0e5';
  
  
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="flex-row items-center gap-5">
          <TouchableOpacity activeOpacity={.90} onPress={() => navigation.goBack()}
                                      className='my-6 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full'>
                                        <Image className='w-8 h-8 object-cover'source={Icons.leftIcon}/>
                                      </TouchableOpacity>
        <View className="items-center py-4">
          <Text className="text-xl font-semibold text-gray-800">Help & Support</Text>
        </View>
      </View>

     
      <View className="flex-row w-full justify-evenly mt-10">
        <TouchableOpacity
        activeOpacity={.9}
          onPress={toggleReport}
          className="w-[40%] p-4 rounded-lg mt-4"
          style={{ backgroundColor: reportButtonColor }}>
          <Text className="text-lg text-center font-semibold text-white">Report Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
        activeOpacity={.9}
          onPress={toggleContact}
          className="w-[40%] p-4 rounded-lg mt-4"
          style={{ backgroundColor: contactButtonColor }}>
          <Text className="text-white text-lg text-center font-semibold">Contact Us</Text>
        </TouchableOpacity>
      </View>

      {showReport && (
        <Animated.View className="p-4 mt-4 bg-gray-100 rounded-lg">
          <Text className="text-lg font-semibold text-gray-800">Give Us Feedback</Text>
          <TextInput
            className="w-full p-2 rounded-md mt-2 bg-white h-44 text-start text-lg"
            placeholder="Describe the issue..."
            multiline
            value={feedback}
            onChangeText={setFeedback}
            style={{ textAlignVertical: 'top' }} 
          />

          
          <View className="flex-row justify-center mt-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton
                key={star}
                icon="star"
                size={28}
                iconColor={star <= rating ? 'gold' : 'gray'}
                onPress={() => setRating(star)}
              />
            ))}
          </View>
          <CustomButton label={'Submit'} link={''}/>      
          </Animated.View>
      )}

    
      {showContact && (
        <View className="p-4 mt-4 bg-gray-100 rounded-lg">
          <Text className="text-lg font-semibold text-gray-800">Reach Us</Text>

          <View className="flex-row items-center gap-3 mt-3">
            <IconButton icon="email" size={28} iconColor="red" />
            <Text className="text-gray-700 text-base">support@healthcloud.com</Text>
          </View>

          <View className="flex-row items-center gap-3 mt-3">
            <IconButton icon="phone" size={28} iconColor="blue" />
            <Text className="text-gray-700 text-base">+1 234 567 890</Text>
          </View>

          <View className="flex-row items-center gap-3 mt-3">
            <IconButton icon="whatsapp" size={28} iconColor="green" />
            <Text className="text-gray-700 text-base">+1 234 567 890</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Help;
