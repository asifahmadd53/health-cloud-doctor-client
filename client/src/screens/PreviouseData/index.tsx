import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Header from "../../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const PreviouseData = () => {
  const [activeTab, setActiveTab] = useState<"Documents" | "Reports">("Documents");

  const translateX = useSharedValue(0);

  const handleTabChange = (tab: "Documents" | "Reports") => {
    setActiveTab(tab);
    translateX.value = withTiming(tab === "Documents" ? 0 : -width, { duration: 400 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Patient Records" />

      {/* Tabs */}
      <View className="flex-row justify-between px-4 mt-4 mb-6">
        {["Documents", "Reports"].map((tab) => (
          <Pressable
            key={tab}
            className={`flex-1 py-3 rounded-xl mr-2 ${
              activeTab === tab ? "bg-blue-500" : "border border-blue-500"
            }`}
            onPress={() => handleTabChange(tab as "Documents" | "Reports")}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === tab ? "text-white" : "text-blue-500"
              }`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <View style={{ width, height: 400, alignSelf: "center", overflow: "hidden" }}>
        <Animated.View style={[{ width: width * 2, flexDirection: "row" }, animatedStyle]}>
          {/* Documents Tab */}
          <ScrollView
            style={{ width, paddingHorizontal: 16 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
              <Text className="text-lg font-semibold text-gray-800 mb-2">📂 Document Storage</Text>
              <Text className="text-gray-500 mb-4">
                Easily manage and access your saved documents anytime.
              </Text>
              
              {/* Placeholder for dropdown or filter */}
              <Pressable className="border border-blue-500 rounded-xl p-3 flex-row justify-between items-center">
                <Text className="text-blue-500 font-medium">Filter: All</Text>
                <Ionicons name="chevron-down" size={20} color="#2895cb" />
              </Pressable>

              {/* Example documents list */}
              <View className="mt-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <View
                    key={index}
                    className="flex-row justify-between items-center bg-gray-50 rounded-xl p-3 mb-2"
                  >
                    <Text className="text-gray-800 font-medium">Document {index + 1}</Text>
                    <Ionicons name="download-outline" size={22} color="#2895cb" />
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Reports Tab */}
          <ScrollView
            style={{ width, paddingHorizontal: 16 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
              <Text className="text-lg font-semibold text-blue-500 mb-2">📊 Your Reports</Text>
              <Text className="text-gray-500 mb-4">
                View detailed reports and insights for the patient.
              </Text>

              {/* Example reports list */}
              {Array.from({ length: 5 }).map((_, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center bg-blue-50 rounded-xl p-3 mb-2"
                >
                  <Text className="text-blue-700 font-medium">Report {index + 1}</Text>
                  <Ionicons name="eye-outline" size={22} color="#2895cb" />
                </View>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default PreviouseData;
