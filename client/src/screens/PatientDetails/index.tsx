import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

// import ReactNativeModal from 'react-native-modal'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import ReactNativeModal from 'react-native-modal'
import PatientText from '../../components/PatientText'
import Icons from '../../utils/libs/constants/Icons'
import CustomButton from '../../components/CustomButton'
import Header from '../../components/Header'



const PatientDetails = () => {
    const [showModal, setShowModal] = useState(false)
    const navigation = useNavigation<any>();
    return (
        <SafeAreaView className="px-5 flex-1 bg-white">
             <Header title="Patient Profile" />

            <View className="gap-4 bg-white p-5 rounded-2xl shadow-2xl mt-10">

                <PatientText label="Name:" item="Muhammad Hassan" />
                <PatientText label="Age:" item="18" />
                <PatientText label="Gender:" item="Male" />
                <PatientText label="Phone #:" item="5843757345" />
                <PatientText label="CNIC:" item="52735092735-3" />

                <View className="bg-gray-50 p-4 rounded-xl border border-gray-200 gap-1">

                    <TouchableOpacity activeOpacity={.80} className="flex-row items-center gap-3 border-gray-300 pb-2">
                        <Text className="text-lg font-semibold text-gray-700">Payment:</Text>
                        <Image source={Icons.paymentdone} className="w-8 h-8" />
                        <Text className="text-lg font-bold text-green-500">Via Online</Text>
                    </TouchableOpacity>
                    <View className='bg-black w-full border-t border-gray-100'></View>
                    <TouchableOpacity activeOpacity={.80} className="flex-row items-center gap-3 pt-3">
                        <Text className="text-lg font-semibold text-gray-700">Previous Record:</Text>
                        <Image source={Icons.historynot} className="w-6 h-6" />
                    </TouchableOpacity>
                </View>

                <View className="mt-5 items-center">
                    <TouchableOpacity
                        activeOpacity={.90}
                        onPress={() => setShowModal(prev => !prev)}
                        className="py-3 px-6 rounded-full bg-primary flex-row items-center justify-center"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 3,
                            elevation: 3
                        }}>
                        <Text className="text-white text-lg font-semibold">Send OTP to Patient</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-1 mt-8">
                <CustomButton label="Generate Prescription" link={"prescriptionLayout"} />
            </View>
            <ReactNativeModal isVisible={showModal} style={{ justifyContent: 'flex-end', margin: 0 }} onBackdropPress={() => setShowModal(false)}>
                <View
                    className="bg-white p-6 rounded-t-3xl"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: -3 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 5
                    }}>

                    <Text className="text-xl font-semibold text-gray-800 text-center mb-2">
                        We sent an OTP to the patient, enter the code below:
                    </Text>

                    <Text className="text-gray-600 text-center mb-4">
                        Please check the message and enter the 4-digit OTP code to proceed.
                    </Text>
                    <View className="flex-row gap-4 my-5 items-center justify-center">
                        {[...Array(4)].map((_, index) => (
                            <TextInput
                                activeUnderlineColor="#2895cb"
                                underlineColor="#2C415C"
                                key={index}
                                style={{
                                    width: 55,
                                    height: 55,
                                    fontSize: 22,
                                    backgroundColor: '#f3f4f6',
                                    textAlign: "center",
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    borderColor: "#adb5bd",
                                }}

                                keyboardType="numeric"
                                maxLength={1}
                            />
                        ))}
                    </View>

                    <View className='my-3 mt-4'>
                        <Pressable
                            className="bg-secondary w-[70%] mx-auto rounded-full py-4"
                            onPress={() => {
                                setShowModal(false);
                                navigation.navigate('previouseData');
                            }}
                            accessible
                            accessibilityLabel={'proceed'}>
                            <Text className="text-white text-xl text-center font-semibold">Procees</Text>
                        </Pressable>
                    </View>
                </View>
            </ReactNativeModal>

        </SafeAreaView>
    )
}

export default PatientDetails
