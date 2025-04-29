import { StyleSheet, Text, View, ScrollView, Pressable, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../utils/libs/constants/Icons';


const Privacy = () => {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView className="flex-1 bg-white px-6">
            <View className="flex-row items-center mt-5 ">
                   <TouchableOpacity activeOpacity={.90} onPress={() => navigation.goBack()}
                               className='my-6 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full'>
                                 <Image className='w-8 h-8 object-cover'source={Icons.leftIcon}/>
                               </TouchableOpacity>
                <Text className="text-xl font-bold text-center pl-5">
                    Privacy Policy – Health Cloud
                </Text>
            </View>

                <Text className="text-sm text-center text-gray-500 pl-5 pb-3">
                    Effective Date: [Insert Date]
                </Text>

            <ScrollView showsVerticalScrollIndicator={false} className="space-y-6 pt-4">
                <Section title="1. Data Collection">
                    <Text>We collect and process the following types of data to provide secure and efficient healthcare services:</Text>
                    <BulletPoint>**Personal Information:** Name, email, phone, age, gender, and profile details.</BulletPoint>
                    <BulletPoint>**Medical Records:** Health history, symptoms, prescriptions, and doctor recommendations.</BulletPoint>
                    <BulletPoint>**Device Information:** IP address, device type, and analytics for performance optimization.</BulletPoint>
                </Section>

                <Section title="2. Use of Information">
                    <Text>The data collected is used to:</Text>
                    <BulletPoint>Facilitate healthcare services and doctor-patient interactions.</BulletPoint>
                    <BulletPoint>Maintain secure electronic medical records (EMRs).</BulletPoint>
                    <BulletPoint>Enhance application functionality and user experience.</BulletPoint>
                    <BulletPoint>Ensure compliance with legal and medical regulations.</BulletPoint>
                </Section>

                <Section title="3. Data Security">
                    <Text>We implement strict security measures to protect user data, including:</Text>
                    <BulletPoint>**End-to-End Encryption:** Ensuring confidentiality of medical records.</BulletPoint>
                    <BulletPoint>**Access Control:** Restricting data access to authorized personnel.</BulletPoint>
                    <BulletPoint>**Regular Security Audits:** Conducting assessments to prevent breaches.</BulletPoint>
                </Section>

                <Section title="4. Data Sharing & Disclosure">
                    <Text>We do not sell or rent personal data. Data is shared only when:</Text>
                    <BulletPoint>Required for medical consultations with healthcare professionals.</BulletPoint>
                    <BulletPoint>Shared with third-party service providers (e.g., labs, pharmacies) under strict agreements.</BulletPoint>
                    <BulletPoint>Mandated by law for regulatory compliance or legal obligations.</BulletPoint>
                </Section>

                <Section title="5. User Rights & Data Control">
                    <Text>Users have full control over their personal data, including:</Text>
                    <BulletPoint>Accessing and updating personal details.</BulletPoint>
                    <BulletPoint>Requesting account deletion and data removal.</BulletPoint>
                    <BulletPoint>Withdrawing consent for data processing, subject to legal constraints.</BulletPoint>
                </Section>

                <Section title="6. Cookies & Tracking Technologies">
                    <Text>We use cookies and analytics tools to improve user experience and system performance.</Text>
                </Section>

                <Section title="7. Policy Updates">
                    <Text>This policy may be updated periodically to reflect regulatory changes. Users will be notified via in-app notifications or email.</Text>
                </Section>

                <View className='mb-16'>
                <Section title="8. Contact Information">
                    <Text>For inquiries or concerns, contact us at:</Text>
                    <BulletPoint>📧 **Email:** [Your Support Email]</BulletPoint>
                    <BulletPoint>📞 **Phone:** [Your Contact Number]</BulletPoint>
                </Section>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const Section = ({ title, children }) => (
    <View>
        <Text className="text-lg font-semibold mt-4">{title}</Text>
        <Text className="text-base text-gray-700 mt-2">{children}</Text>
    </View>
);

const BulletPoint = ({ children }) => (
    <Text className="text-base text-gray-700 pl-5">• {children}</Text>
);

export default Privacy;
