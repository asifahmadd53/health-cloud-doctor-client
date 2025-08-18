"use client"

import { useState, useRef } from "react"
import { View, Text, TouchableOpacity, Image, Animated, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import Icons from "../../utils/libs/constants/Icons"

const Privacy = () => {
  const navigation = useNavigation()
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const scrollY = useRef(new Animated.Value(0)).current

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  const privacyFAQ = [
    {
      question: "How is patient data protected in our system?",
      answer:
        "All patient data is encrypted using AES-256 encryption, stored in HIPAA-compliant servers, and accessible only through authenticated, role-based access controls specific to healthcare professionals.",
      icon: "🔒",
    },
    {
      question: "What are my responsibilities as a healthcare provider?",
      answer:
        "As a healthcare professional, you are responsible for maintaining patient confidentiality, using secure login credentials, logging out after sessions, and reporting any suspected security incidents immediately.",
      icon: "⚕️",
    },
    {
      question: "How long is patient data retained?",
      answer:
        "Patient data is retained according to medical record retention laws (typically 7-10 years post-treatment) and can be accessed by authorized healthcare providers during this period for continuity of care.",
      icon: "📅",
    },
    {
      question: "Can I access patient data from multiple locations?",
      answer:
        "Yes, authorized healthcare providers can securely access patient data from any location using secure authentication. All access is logged and monitored for security compliance.",
      icon: "🌐",
    },
    {
      question: "What happens if there's a data breach?",
      answer:
        "In the unlikely event of a breach, we immediately notify all affected healthcare providers within 24 hours, conduct forensic analysis, and implement remediation measures while maintaining full transparency.",
      icon: "🚨",
    },
  ]

  const complianceFeatures = [
    { title: "HIPAA Compliant", desc: "Full healthcare compliance", icon: "⚕️" },
    { title: "SOC 2 Type II", desc: "Security audit certified", icon: "🛡️" },
    { title: "End-to-End Encryption", desc: "AES-256 military grade", icon: "🔐" },
    { title: "Audit Logging", desc: "Complete access tracking", icon: "📊" },
  ]

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index)
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Animated Header */}
      <Animated.View className="absolute top-0 left-0 right-0 z-50" style={{ opacity: headerOpacity }}>
        <View className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <SafeAreaView>
            <View className="flex-row items-center px-6 py-4">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
                className="w-10 h-10 items-center justify-center bg-gray-100 rounded-lg mr-4"
              >
                <Image className="w-5 h-5" source={Icons.leftIcon} />
              </TouchableOpacity>
              <Text className="text-lg font-semibold text-gray-900">Privacy & Compliance</Text>
            </View>
          </SafeAreaView>
        </View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header Section */}
        <View className="bg-white px-6 pt-20 pb-8">
          <SafeAreaView>
            <View className="flex-row items-center mb-8">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
                className="w-11 h-11 items-center justify-center bg-gray-100 rounded-xl mr-4"
              >
                <Image className="w-6 h-6" source={Icons.leftIcon} />
              </TouchableOpacity>
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-900 mb-1">Privacy & Compliance</Text>
                <Text className="text-gray-600">Healthcare data protection standards</Text>
              </View>
            </View>

            {/* Compliance Banner */}
            <View className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <View className="flex-row items-center mb-4">
                <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
                  <Text className="text-2xl">🏥</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-blue-900 mb-1">Healthcare Grade Security</Text>
                  <Text className="text-blue-700">HIPAA & SOC 2 Certified Platform</Text>
                </View>
              </View>
              <Text className="text-blue-800 leading-6">
                Our platform meets the highest standards for healthcare data protection, ensuring patient privacy and
                regulatory compliance for medical professionals.
              </Text>
              <View className="flex-row items-center mt-4">
                <Text className="text-blue-700 text-sm">Last updated: </Text>
                <Text className="text-blue-900 font-medium text-sm">January 15, 2024</Text>
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* Compliance Features */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Security & Compliance</Text>
          <View className="flex-row flex-wrap justify-between">
            {complianceFeatures.map((feature, index) => (
              <View key={index} className="w-[48%] mb-4">
                <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <View className="w-10 h-10 bg-gray-50 rounded-lg items-center justify-center mb-3">
                    <Text className="text-xl">{feature.icon}</Text>
                  </View>
                  <Text className="text-gray-900 font-medium text-base mb-1">{feature.title}</Text>
                  <Text className="text-gray-600 text-sm">{feature.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</Text>
          {privacyFAQ.map((faq, index) => (
            <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => toggleSection(index)} className="mb-4">
              <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <View className="p-6">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <View className="w-10 h-10 bg-gray-50 rounded-lg items-center justify-center mr-4">
                        <Text className="text-lg">{faq.icon}</Text>
                      </View>
                      <Text className="text-gray-900 font-medium text-base flex-1 pr-4">{faq.question}</Text>
                    </View>
                    <View
                      className={`w-8 h-8 rounded-lg items-center justify-center ${
                        expandedSection === index ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`text-lg font-medium ${
                          expandedSection === index ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
                        {expandedSection === index ? "−" : "+"}
                      </Text>
                    </View>
                  </View>

                  {expandedSection === index && (
                    <View className="mt-4 pt-4 border-t border-gray-100">
                      <Text className="text-gray-700 leading-6">{faq.answer}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Healthcare Provider Responsibilities */}
        <View className="px-6 mb-8">
          <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-6">
              <View className="w-12 h-12 bg-green-50 rounded-xl items-center justify-center mr-4">
                <Text className="text-2xl">👨‍⚕️</Text>
              </View>
              <View>
                <Text className="text-lg font-semibold text-gray-900">Provider Responsibilities</Text>
                <Text className="text-gray-600">Your role in maintaining patient privacy</Text>
              </View>
            </View>

            <View className="space-y-4">
              {[
                { title: "Secure Authentication", desc: "Use strong passwords and enable two-factor authentication" },
                { title: "Session Management", desc: "Always log out when finished and don't share credentials" },
                { title: "Data Access", desc: "Only access patient data necessary for treatment" },
                { title: "Incident Reporting", desc: "Report any security concerns immediately" },
              ].map((responsibility, index) => (
                <View key={index} className="flex-row items-start p-4 bg-gray-50 rounded-lg">
                  <View className="w-6 h-6 bg-green-100 rounded-full items-center justify-center mr-3 mt-0.5">
                    <Text className="text-green-600 text-xs font-bold">✓</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-medium mb-1">{responsibility.title}</Text>
                    <Text className="text-gray-600 text-sm">{responsibility.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Data Protection Details */}
        <View className="px-6 mb-8">
          <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-6">
              <View className="w-12 h-12 bg-blue-50 rounded-xl items-center justify-center mr-4">
                <Text className="text-2xl">🔐</Text>
              </View>
              <View>
                <Text className="text-lg font-semibold text-gray-900">Data Protection Measures</Text>
                <Text className="text-gray-600">How we protect patient information</Text>
              </View>
            </View>

            <View className="space-y-6">
              <View>
                <Text className="text-gray-900 font-medium mb-3">Encryption & Storage</Text>
                <View className="space-y-2">
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <Text className="text-gray-700 text-sm">AES-256 encryption for data at rest and in transit</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <Text className="text-gray-700 text-sm">HIPAA-compliant cloud infrastructure</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <Text className="text-gray-700 text-sm">Regular security audits and penetration testing</Text>
                  </View>
                </View>
              </View>

              <View>
                <Text className="text-gray-900 font-medium mb-3">Access Controls</Text>
                <View className="space-y-2">
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <Text className="text-gray-700 text-sm">Role-based access control for healthcare providers</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <Text className="text-gray-700 text-sm">Multi-factor authentication required</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <Text className="text-gray-700 text-sm">Complete audit trail of all data access</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View className="px-6 mb-8">
          <View className="bg-gray-900 rounded-xl p-6">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-white/10 rounded-xl items-center justify-center mr-4">
                <Text className="text-2xl">📞</Text>
              </View>
              <View>
                <Text className="text-lg font-semibold text-white">Privacy & Compliance Team</Text>
                <Text className="text-gray-300">Available 24/7 for healthcare professionals</Text>
              </View>
            </View>

            <View className="space-y-3">
              <TouchableOpacity className="flex-row items-center p-4 bg-white/5 rounded-lg">
                <View className="w-10 h-10 bg-white/10 rounded-lg items-center justify-center mr-3">
                  <Text className="text-lg">📧</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">Email Support</Text>
                  <Text className="text-gray-300 text-sm">compliance@healthcloud.com</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center p-4 bg-white/5 rounded-lg">
                <View className="w-10 h-10 bg-white/10 rounded-lg items-center justify-center mr-3">
                  <Text className="text-lg">📱</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">Direct Line</Text>
                  <Text className="text-gray-300 text-sm">+1 (800) 555-HIPAA</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default Privacy
