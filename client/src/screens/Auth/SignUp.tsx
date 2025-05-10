import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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
import { API_URL } from "../../utils/libs/constants/api/api";

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
  const [isLoading, setIsLoading] = useState(false)


  
  const handleSignUp = async () => {
    if(isLoading){
      return
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
    });
  
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });
      const data = response.data
  
      if(data.success){
        setIsLoading(true)
        setTimeout(()=>{
          Burnt.toast({
            title: "Login successful",
            preset: "done"
          })
        }, 1000)
        navigation.navigate("sign-up-completed");
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
          title: response.data.message || "Signup failed",
          preset: "error"
        });
      }
    } catch (error: any) {
      Burnt.toast({
        title: error.response?.data?.message || "Something went wrong",
        preset: "error"
      });
    }finally{
      setIsLoading(false)
    }
  };
  
  


  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode && response.assets?.[0]) {
        setPmdcCopy(response.assets[0]); // ✅ now sets the full object
      }
      setIsModalVisible(false);
    });
  };


  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode && response.assets?.[0]) {
        setPmdcCopy(response.assets[0]); // ✅ now sets the full object
      }
      setIsModalVisible(false);
    });
  };






  return (
    <SafeAreaView className="bg-white min-h-full px-5">
      <ScrollView className="flex-grow" showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <TouchableOpacity activeOpacity={.90} onPress={() => navigation.goBack()}
            className='my-6 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full'>
            <Image className='w-8 h-8 object-cover' source={Icons.leftIcon} />
          </TouchableOpacity>
          <View className="pt-2">
            <Text className="text-2xl font-semibold text-center text-black">
              Join now and grow your practice
            </Text>
            <Text className="text-center text-gray-500 text-sm mt-4 leading-5">
              Elevate your practice efficiency and foster meaningful patient
              relationships with unparalleled ease.
            </Text>
          </View>

          <View className="pt-10 w-[97%] mx-auto gap-4 ">
            <CustomInput
              keyboardType="default"
              placeholder={"Name"}
              value={name}
              icon={Icons.user}
              onChange={setName}
            />
            <CustomInput
              keyboardType="numeric"
              placeholder={"PMDC #"}
              value={pmdcNumber}
              icon={Icons.tick}
              onChange={setPmdc}
            />
            <CustomInput
              keyboardType="email-address"
              placeholder={"Email"}
              value={email}
              icon={Icons.email}
              onChange={setEmail}
              autoCapitalize="none"
            />
            <CustomInput
              keyboardType="phone-pad"
              placeholder={"Phone"}
              value={phoneNumber}
              icon={Icons.phone}
              onChange={setPhoneNumber}
            />
            <CustomPasswordInput
              placeholder={"Password"}
              value={password}
              onChange={setPassword}

            />
            <CustomPasswordInput
              placeholder={"Confirm Password"}
              value={confirmPassword}
             
              onChange={setConfirmPassword}
            />
            <View>
              <Text className="text-base mt-8 ml-8">Upload PMDC scan copy</Text>
              <View className="w-32 h-32 mx-auto mt-8">
                <Pressable onPress={() => setIsModalVisible(true)}>
                  
                  <Image
                    className="object-cover w-full h-full rounded-lg"
                    source={pmdcCopy ? { uri: pmdcCopy.uri } : Images.addImage}
                  />
                </Pressable>
              </View>
            </View>

            <Pressable
              onPress={() => {
                setChecked(!checked);
              }}
              className="flex-row items-center justify-center text-sm py-2"
            >
              <View className="transform scale-110">
                <Checkbox
                  color="#2895cb"
                  uncheckedColor="#2895cb"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => setChecked(!checked)}
                />
              </View>
              <Text className="ml-2 text-base text-ellipsis lg:text-xl">
                I agree with the Terms of Service & Privacy Policy
              </Text>
            </Pressable>
            <View className="my-2">
            <CustomButton
            loading={isLoading}
            label="Sign Up"
            onPress={handleSignUp}
            />
            </View>
          </View>

          <ReactNativeModal
            isVisible={isModalVisible}
            onBackdropPress={() => setIsModalVisible(false)}
            style={{ justifyContent: 'flex-end', margin: 0 }}
          >
            <View className="bg-white p-6 rounded-t-2xl">
              <Text className="text-lg font-semibold text-center mb-4">Choose Option</Text>
              <TouchableOpacity
                activeOpacity={.90}
                className="py-3 border-b border-gray-200"
                onPress={openCamera}
              >
                <Text className="text-center text-secondary font-medium">Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={.90}
                className="py-3"
                onPress={openGallery}
              >
                <Text className="text-center text-secondary font-medium">Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mt-4"
                onPress={() => setIsModalVisible(false)}
              >
                <Text className="text-center text-gray-500">Cancel</Text>
              </TouchableOpacity>
            </View>
          </ReactNativeModal>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
