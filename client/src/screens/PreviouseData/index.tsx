import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const PreviouseData = () => {
  const [activeTab, setActiveTab] = useState('Documents');
  const [selectedValue, setSelectedValue] = useState('1');
  const DATA = [2,34,3,43,2423,423,4,24,2,4,234,23]


  const dropdownData = [
    { label: 'All', value: '1' },
    { label: 'E-Prescription', value: '2' },
    { label: 'Manual Prescription', value: '3' },
  ];

  const translateX = useSharedValue(0);

  const handleTabChange = (tab:any) => {
    setActiveTab(tab);
    translateX.value = withTiming(tab === 'Documents' ? 0 : -width, { duration: 500 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-white px-4 ">
      {/* Tab Buttons */}
      <View className="flex-row justify-center gap-4 mt-6 mb-8">
        <Button
          mode={activeTab === 'Documents' ? 'contained' : 'outlined'}
          style={{
            flex: 1,
            backgroundColor: activeTab === 'Documents' ? '#2895cb' : 'transparent',
            borderRadius: 12,
            paddingVertical: 12,
            borderWidth: activeTab === 'Documents' ? 0 : 1.5,
            borderColor: '#2895cb',
          }}
          labelStyle={{
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
            color: activeTab === 'Documents' ? 'white' : '#0077B6',
          }}
          // icon={() => (
          //   <Ionicons
          //     name="document-text-outline"
          //     size={20}
          //     color={activeTab === 'Documents' ? 'white' : '#0077B6'}
          //   />
          // )}
          onPress={() => handleTabChange('Documents')}
        >
          Documents
        </Button>

        <Button
          mode={activeTab === 'Reports' ? 'contained' : 'outlined'}
          style={{
            flex: 1,
            backgroundColor: activeTab === 'Reports' ? '#2895cb' : 'transparent',
            borderRadius: 12,
            paddingVertical: 12,
            borderWidth: activeTab === 'Reports' ? 0 : 1.5,
            borderColor: '#2895cb',
          }}
          labelStyle={{
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
            color: activeTab === 'Reports' ? 'white' : '#023E8A',
          }}
          // icon={() => (
          //   <Ionicons
          //     name="bar-chart-outline"
          //     size={20}
          //     color={activeTab === 'Reports' ? 'white' : '#023E8A'}
          //   />
          // )}
          onPress={() => handleTabChange('Reports')}
        >
          Reports
        </Button>
      </View>

      <View style={{ width, height: 300, alignSelf: 'center', overflow: 'hidden' }}>
        <Animated.View style={[{ width: width * 2, flexDirection: 'row' }, animatedStyle]}>
          <View style={{ width, paddingHorizontal: 16 }}>
            <View className="rounded-lg  h-auto p-3">
              {/* <Text className="text-lg font-semibold text-gray-700">📂 Document Storage</Text>
<Text className="text-gray-500 mt-2">Easily manage and access your saved documents anytime.</Text> */}

              {/* <Dropdown
                data={dropdownData}
                value={selectedValue}
                onChange={(item) => setSelectedValue(item.value)}
                labelField="label"
                valueField="value"

                style={{
                  paddingVertical: 14,
                  borderWidth: 1.5,
                  borderColor: '#0077B6',
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#0077B6',
                }}
                placeholderStyle={{
                  fontSize: 16,
                  color: '#555',
                }}
                containerStyle={{
                  borderRadius: 12,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#0077B6',
                }}
                itemTextStyle={{
                  fontSize: 14,
                  color: '#333',
                }}
                renderRightIcon={() => (
                  <Ionicons name="chevron-down" size={20} color="#0077B6" />
                )}
              /> */}
            </View>
            
          </View>

          <View style={{ width, padding: 16 }}>
            <View className="p-6 bg-blue-50 rounded-lg shadow-md">
              <Text className="text-lg font-semibold text-[#2895cb]">📊 Your Reports</Text>
              <Text className="text-gray-500 mt-2">View detailed reports and insights.</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default PreviouseData;
