"use client"

import { useState, useRef } from "react"
import { View, Text, TouchableOpacity, TextInput, Animated, Image, ScrollView, Alert, Linking } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import Icons from "../../utils/libs/constants/Icons"
import CustomButton from "../../components/CustomButton"

const Help = () => {
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState<"feedback" | "contact" | "faq">("feedback")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const slideAnim = useRef(new Animated.Value(0)).current

  const handleTabChange = (tab: "feedback" | "contact" | "faq") => {
    setActiveTab(tab)
    Animated.spring(slideAnim, {
      toValue: tab === "feedback" ? 0 : tab === "contact" ? 1 : 2,
      useNativeDriver: true,
    }).start()
  }

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert("Missing Information", "Please provide your feedback before submitting.")
      return
    }

    if (rating === 0) {
      Alert.alert("Missing Rating", "Please rate your experience before submitting.")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      Alert.alert("Thank You!", "Your feedback has been submitted successfully. We appreciate your input!", [
        {
          text: "OK",
          onPress: () => {
            setFeedback("")
            setRating(0)
          },
        },
      ])
    }, 2000)
  }

  const handleContactPress = (type: "email" | "phone" | "whatsapp") => {
    switch (type) {
      case "email":
        Linking.openURL("mailto:support@healthcloud.com")
        break
      case "phone":
        Linking.openURL("tel:+12345678900")
        break
      case "whatsapp":
        Linking.openURL("whatsapp://send?phone=12345678900")
        break
    }
  }

  const faqData = [
    {
      question: "How do I reset my password?",
      answer: "Go to Settings > Account > Change Password, or use the 'Forgot Password' link on the login screen.",
    },
    {
      question: "How can I book an appointment?",
      answer:
        "Navigate to the 'Appointments' tab, select your preferred doctor, choose an available time slot, and confirm your booking.",
    },
    {
      question: "Is my medical data secure?",
      answer:
        "Yes, we use bank-level encryption and comply with HIPAA regulations to ensure your data is completely secure.",
    },
    {
      question: "Can I access my medical records?",
      answer: "Go to 'My Records' in the main menu to view, download, or share your medical history.",
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Enhanced Header */}
      <View className="bg-white shadow-sm border-b border-gray-100">
        <View className="flex-row items-center px-6 py-4">
          
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">Help & Support</Text>
            <Text className="text-sm text-gray-600 mt-1">We're here to assist you</Text>
          </View>
          <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center">
            <Text className="text-xl">💬</Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="bg-white mx-6 mt-6 rounded-2xl p-2 shadow-sm">
        <View className="flex-row">
          {[
            { key: "feedback", label: "Feedback", icon: "⭐" },
            { key: "contact", label: "Contact", icon: "📞" },
            { key: "faq", label: "FAQ", icon: "❓" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.7}
              onPress={() => handleTabChange(tab.key as any)}
              className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-xl ${
                activeTab === tab.key ? "bg-blue-500" : "bg-transparent"
              }`}
            >
              <Text className="text-lg mr-2">{tab.icon}</Text>
              <Text className={`font-semibold ${activeTab === tab.key ? "text-white" : "text-gray-600"}`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <View className="mx-6 mt-6">
            <View className="bg-white rounded-2xl p-6 shadow-sm">
              <View className="flex-row items-center mb-6">
                <View className="w-12 h-12 bg-yellow-100 rounded-xl items-center justify-center mr-4">
                  <Text className="text-2xl">💭</Text>
                </View>
                <View>
                  <Text className="text-xl font-bold text-gray-900">Share Your Experience</Text>
                  <Text className="text-gray-600">Help us improve our services</Text>
                </View>
              </View>

              {/* Rating Section */}
              <View className="mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">Rate your experience</Text>
                <View className="flex-row justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)} className="p-2">
                      <Text className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}>⭐</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {rating > 0 && (
                  <Text className="text-center text-gray-600 mt-2">
                    {rating === 1
                      ? "Poor"
                      : rating === 2
                        ? "Fair"
                        : rating === 3
                          ? "Good"
                          : rating === 4
                            ? "Very Good"
                            : "Excellent"}
                  </Text>
                )}
              </View>

              {/* Feedback Input */}
              <View className="mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">Tell us more</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
                  placeholder="Share your thoughts, suggestions, or report any issues..."
                  multiline
                  numberOfLines={6}
                  value={feedback}
                  onChangeText={setFeedback}
                  textAlignVertical="top"
                />
              </View>

              <CustomButton
                label={isSubmitting ? "Submitting..." : "Submit Feedback"}
                onPress={handleSubmitFeedback}
                loading={isSubmitting}
              />
            </View>
          </View>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <View className="mx-6 mt-6">
            <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <View className="flex-row items-center mb-6">
                <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
                  <Text className="text-2xl">🤝</Text>
                </View>
                <View>
                  <Text className="text-xl font-bold text-gray-900">Get in Touch</Text>
                  <Text className="text-gray-600">Multiple ways to reach us</Text>
                </View>
              </View>

              <View className="space-y-4">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleContactPress("email")}
                  className="flex-row items-center p-4 bg-red-50 border border-red-100 rounded-xl"
                >
                  <View className="w-12 h-12 bg-red-500 rounded-xl items-center justify-center mr-4">
                    <Text className="text-white text-xl">📧</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900 text-base">Email Support</Text>
                    <Text className="text-gray-600 text-sm">support@healthcloud.com</Text>
                    <Text className="text-red-600 text-xs mt-1">Response within 24 hours</Text>
                  </View>
                  <Text className="text-red-500 text-xl">→</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleContactPress("phone")}
                  className="flex-row items-center p-4 bg-blue-50 border border-blue-100 rounded-xl"
                >
                  <View className="w-12 h-12 bg-blue-500 rounded-xl items-center justify-center mr-4">
                    <Text className="text-white text-xl">📱</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900 text-base">Phone Support</Text>
                    <Text className="text-gray-600 text-sm">+1 (234) 567-8900</Text>
                    <Text className="text-blue-600 text-xs mt-1">Mon-Fri, 9 AM - 6 PM EST</Text>
                  </View>
                  <Text className="text-blue-500 text-xl">→</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleContactPress("whatsapp")}
                  className="flex-row items-center p-4 bg-green-50 border border-green-100 rounded-xl"
                >
                  <View className="w-12 h-12 bg-green-500 rounded-xl items-center justify-center mr-4">
                    <Text className="text-white text-xl">💬</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-900 text-base">WhatsApp Chat</Text>
                    <Text className="text-gray-600 text-sm">+1 (234) 567-8900</Text>
                    <Text className="text-green-600 text-xs mt-1">Instant messaging support</Text>
                  </View>
                  <Text className="text-green-500 text-xl">→</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Emergency Contact */}
            <View className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <View className="flex-row items-center mb-3">
                <Text className="text-2xl mr-3">🚨</Text>
                <Text className="text-lg font-bold text-red-800">Emergency Support</Text>
              </View>
              <Text className="text-red-700 text-sm leading-5">
                For urgent medical emergencies, please call 911 or visit your nearest emergency room. This app is not
                intended for emergency medical situations.
              </Text>
            </View>
          </View>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <View className="mx-6 mt-6">
            <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <View className="flex-row items-center mb-6">
                <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mr-4">
                  <Text className="text-2xl">❓</Text>
                </View>
                <View>
                  <Text className="text-xl font-bold text-gray-900">Frequently Asked Questions</Text>
                  <Text className="text-gray-600">Quick answers to common questions</Text>
                </View>
              </View>

              <View className="space-y-4">
                {faqData.map((faq, index) => (
                  <View key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <Text className="font-semibold text-gray-900 text-base mb-2">{faq.question}</Text>
                    <Text className="text-gray-600 text-sm leading-5">{faq.answer}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Still Need Help */}
            <View className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <Text className="text-lg font-bold text-blue-900 mb-2">Still need help?</Text>
              <Text className="text-blue-700 text-sm mb-4">
                Can't find what you're looking for? Our support team is ready to assist you.
              </Text>
              <TouchableOpacity onPress={() => handleTabChange("contact")} className="bg-blue-500 py-3 px-6 rounded-xl">
                <Text className="text-white font-semibold text-center">Contact Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Help
