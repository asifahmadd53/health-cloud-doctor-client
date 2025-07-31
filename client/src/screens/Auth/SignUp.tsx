import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Burnt from "burnt";
import { Checkbox } from "react-native-paper";
import Icons from "../../utils/libs/constants/Icons";
import CustomInput from "../../components/CustomInput";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import CustomButton from "../../components/CustomButton";
import Images from "../../utils/libs/constants/Images";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ReactNativeModal from "react-native-modal";
import axios from "axios";
import { Asset } from 'react-native-image-picker';
import Header from "../../components/Header";
import { BASE_URL } from "../../api/api";

interface SignUpProps {
  navigation: any;
}

const SignUp = ({ navigation }: SignUpProps) => {
  const [name, setName] = useState("");
  const [pmdcNumber, setPmdc] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [pmdcCopy, setPmdcCopy] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (isLoading) {
      return;
    }

    if (!name || !pmdcNumber || !email || !phoneNumber || !password || !confirmPassword) {
      Burnt.toast({
        title: "Please fill out all fields",
        preset: "error"
      });
      return;
    }

    if (password !== confirmPassword) {
      Burnt.toast({
        title: "Passwords do not match",
        preset: "error"
      });
      return;
    }

    if (!checked) {
      Burnt.toast({
        title: "You must agree to the terms",
        preset: "error"
      });
      return;
    }

    if (!pmdcCopy) {
      Burnt.toast({
        title: "Please upload your PMDC copy",
        preset: "error"
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("pmdcNumber", pmdcNumber);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);

    formData.append("pmdcCopy", {
      uri: pmdcCopy.uri,
      name: pmdcCopy.fileName || "pmdc.jpg",
      type: pmdcCopy.type || "image/jpeg",
    } as any);

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      const data = response.data;

      if (data.success) {
        setTimeout(() => {
          Burnt.toast({
            title: "Registration successful",
            preset: "done"
          });
        }, 1000);

        navigation.navigate("sign-up-completed");

        // Reset form
        setName("");
        setPmdc("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPassword("");
        setPmdcCopy(null);
        setChecked(false);
      } else {
        Burnt.toast({
          title: response.data.message || "Registration failed",
          preset: "error"
        });
      }
    } catch (error: any) {
      Burnt.toast({
        title: error.response?.data?.message || "Something went wrong",
        preset: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openCamera = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    }, response => {
      if (!response.didCancel && !response.errorCode && response.assets?.[0]) {
        setPmdcCopy(response.assets[0]);
      }
      setIsModalVisible(false);
    });
  };

  const openGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    }, response => {
      if (!response.didCancel && !response.errorCode && response.assets?.[0]) {
        setPmdcCopy(response.assets[0]);
      }
      setIsModalVisible(false);
    });
  };

  return (
    <SafeAreaView className="bg-white flex-1 px-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <Header title="" />
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >

          {/* Title Section */}
          <View className="mb-8 mt-6">
            <Text className="text-2xl font-bold text-center text-gray-900 mb-2">
              Join Our Platform
            </Text>
            <Text className="text-center text-gray-600 text-sm leading-6 px-1">
              Elevate your practice efficiency and foster meaningful patient
              relationships with unparalleled ease.
            </Text>
          </View>

          {/* Form Section */}
          <View className="pt-9 w-[99%] mx-auto">
            <CustomInput
              label="Full Name"
              keyboardType="default"
              placeholder="Enter your full name"
              value={name}
              icon="person-outline"
              
              onChange={setName}
            />

            <View className="-mt-2">
              <CustomInput
                label="PMDC Number"
                keyboardType="numeric"
                placeholder="Enter your PMDC number"
                value={pmdcNumber}
                icon="checkmark-outline"
                onChange={setPmdc}
              />
            </View>
            <View className="-mt-2">
              <CustomInput
                label="Email Address"
                keyboardType="email-address"
                placeholder="Enter your email address"
                value={email}
                icon={"mail-outline"}
                onChange={setEmail}
                autoCapitalize="none"
              />
            </View>
            <View className="-mt-2">
              <CustomInput
                label="Phone Number"
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
                value={phoneNumber}
                icon={"call-outline"}
                onChange={setPhoneNumber}
              />
            </View>
            <View className="-mt-2">
              <CustomPasswordInput
                label="Password"
                placeholder="Create a strong password"
                value={password}
                onChange={setPassword}
              />
            </View>
            <View className="-mt-2">
              <CustomPasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </View>
            {/* PMDC Upload Section */}
            <View className="mt-6">
              <Text className="text-base font-medium text-gray-900 mb-3">
                Upload PMDC Certificate
              </Text>
              <Text className="text-sm text-gray-600 mb-4">
                Please upload a clear photo of your PMDC certificate
              </Text>

              <View className="items-center">
                <Pressable
                  onPress={() => setIsModalVisible(true)}
                  className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl items-center justify-center bg-gray-50"
                >
                  {pmdcCopy ? (
                    <Image
                      className="w-full h-full rounded-xl"
                      source={{ uri: pmdcCopy.uri }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="items-center">
                      <Image
                        className="w-12 h-12 mb-2 opacity-60"
                        source={Images.addImage}
                      />
                      <Text className="text-gray-500 text-sm font-medium">
                        Tap to upload
                      </Text>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>

            {/* Terms and Conditions */}
            <Pressable
              onPress={() => setChecked(!checked)}
              className="flex-row items-center mt-6 px-2"
            >
              <View className="mt-1">
                <Checkbox
                  color="#2895cb"
                  uncheckedColor="#9CA3AF"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => setChecked(!checked)}
                />
              </View>
              <Text className="flex-1 text-gray-700 text-sm leading-5 ml-2">
                I agree to the{" "}
                <Text className="text-[#2895cb] font-medium">Terms of Service</Text>
                {" "}and{" "}
                <Text className="text-[#2895cb] font-medium">Privacy Policy</Text>
              </Text>
            </Pressable>

            {/* Sign Up Button */}
            <View className="mt-8">
              <CustomButton
                loading={isLoading}
                label="Create Account"
                onPress={handleSignUp}
              />
            </View>

            {/* Login Link */}
            <View className="mt-6 mb-4">
              <Text className="text-center text-gray-600">
                Already have an account?{" "}
                <Text
                  className="text-[#2895cb] font-medium"
                  onPress={() => navigation.navigate("login")}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Image Picker Modal */}
        <ReactNativeModal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
          style={{ justifyContent: 'flex-end', margin: 0 }}
          backdropOpacity={0.5}
        >
          <View className="bg-white rounded-t-3xl p-6">
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

            <Text className="text-xl font-semibold text-center text-gray-900 mb-6">
              Choose Photo Source
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center py-4 px-4 bg-gray-50 rounded-xl mb-3"
              onPress={openCamera}
            >
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4">
                <Text className="text-blue-600 text-lg">📷</Text>
              </View>
              <Text className="text-gray-900 font-medium text-base">Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center py-4 px-4 bg-gray-50 rounded-xl mb-6"
              onPress={openGallery}
            >
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
                <Text className="text-green-600 text-lg">🖼️</Text>
              </View>
              <Text className="text-gray-900 font-medium text-base">Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-3"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-center text-gray-500 font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;