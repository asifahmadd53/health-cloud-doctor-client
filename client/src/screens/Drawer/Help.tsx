"use client"

import { useState, useRef } from "react"
import { View, Text, TouchableOpacity, TextInput, Animated, ScrollView, Alert, Linking } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import CustomButton from "../../components/CustomButton"

const Help = () => {
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState<"feedback" | "contact">("feedback")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const slideAnim = useRef(new Animated.Value(0)).current

  const handleTabChange = (tab: "feedback" | "contact") => {
    setActiveTab(tab)
    Animated.spring(slideAnim, {
      toValue: tab === "feedback" ? 0 : 1,
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
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white border-b border-slate-200 px-6 py-5">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-slate-900">Help & Support</Text>
            <Text className="text-sm text-slate-500 mt-1">We’re here to help</Text>
          </View>
          <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
            <Text className="text-xl">💬</Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="mx-6 mt-6">
        <View className="flex-row bg-white rounded-full p-1 shadow-sm">
          {["feedback", "contact"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabChange(tab as any)}
              className={`flex-1 py-3 rounded-full ${activeTab === tab ? "bg-blue-600" : "bg-transparent"}`}
            >
              <Text className={`text-center font-semibold ${activeTab === tab ? "text-white" : "text-slate-600"}`}>
                {tab === "feedback" ? "Feedback" : "Contact & FAQ"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-6 mt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <Text className="text-lg font-bold text-slate-900 mb-2">Share Your Experience</Text>
            <Text className="text-sm text-slate-500 mb-4">Help us improve with your feedback</Text>

            {/* Rating */}
            <Text className="text-sm font-semibold text-slate-700 mb-2">Rate your experience</Text>
            <View className="flex-row justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-slate-300"}`}>⭐</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Feedback Input */}
            <Text className="text-sm font-semibold text-slate-700 mb-2">Tell us more</Text>
            <TextInput
              className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-sm"
              placeholder="Share your thoughts..."
              multiline
              numberOfLines={5}
              value={feedback}
              onChangeText={setFeedback}
              textAlignVertical="top"
            />

            <View className="mt-5">
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
          <>
            {/* Contact Options */}
            <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <Text className="text-lg font-bold text-slate-900 mb-2">Get in Touch</Text>
              <Text className="text-sm text-slate-500 mb-4">Choose how you'd like to contact us</Text>

              <TouchableOpacity
                onPress={() => handleContactPress("email")}
                className="flex-row items-center p-4 bg-red-50 rounded-xl mb-3"
              >
                <Text className="text-2xl mr-4">📧</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-slate-800">Email Support</Text>
                  <Text className="text-sm text-slate-500">support@healthcloud.com</Text>
                </View>
                <Text className="text-red-500 text-xl">→</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleContactPress("phone")}
                className="flex-row items-center p-4 bg-blue-50 rounded-xl mb-3"
              >
                <Text className="text-2xl mr-4">📱</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-slate-800">Phone Support</Text>
                  <Text className="text-sm text-slate-500">+1 (234) 567-8900</Text>
                </View>
                <Text className="text-blue-500 text-xl">→</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleContactPress("whatsapp")}
                className="flex-row items-center p-4 bg-green-50 rounded-xl"
              >
                <Text className="text-2xl mr-4">💬</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-slate-800">WhatsApp</Text>
                  <Text className="text-sm text-slate-500">Chat with us instantly</Text>
                </View>
                <Text className="text-green-500 text-xl">→</Text>
              </TouchableOpacity>
            </View>

            {/* FAQ Section */}
            <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <Text className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</Text>
              {faqData.map((faq, index) => (
                <View key={index} className="mb-4">
                  <Text className="font-semibold text-slate-800 text-sm mb-1">• {faq.question}</Text>
                  <Text className="text-slate-600 text-xs leading-4">{faq.answer}</Text>
                </View>
              ))}
            </View>

            {/* Emergency Note */}
            <View className="bg-red-50 border border-red-200 rounded-xl p-4">
              <Text className="text-sm font-semibold text-red-800 mb-1">🚨 Emergency?</Text>
              <Text className="text-xs text-red-700">
                For medical emergencies, call 911. This app is not for emergency use.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Help