import {
    Button,
    Image,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Text,
    Touchable,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";

  import { Checkbox } from "react-native-paper";

  import { useNavigation } from "@react-navigation/native";
import Icons from "../../utils/libs/constants/Icons";
import CustomInput from "../../components/CustomInput";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import CustomButton from "../../components/CustomButton";


  
  
  const SignUp = () => {
    const [name, setName] = useState("");
    const [pmdc, setPmdc] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState(false);
  
    const [image, setImage] = useState<string | null>(null);
  
  
  
    // useEffect(() => {
    //   const requestPermissions = async () => {
    //     await ImagePicker.requestCameraPermissionsAsync();
    //     await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   };
  
    //   requestPermissions();
    // }, []);
  
  
    // const pickImage = async () => {
  
    //   let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ["images"],
    //     allowsEditing: true,
    //     aspect: [20, 20],
    //     quality: 1,
    //   });
  
  
  
    //   if (!result.canceled) {
    //     setImage(result.assets[0].uri);
    //   }
  
    // };
  
    const navigation = useNavigation()
  
    return (
      <SafeAreaView className="bg-white min-h-full px-4">
        <ScrollView className="flex-grow" showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView>
              <TouchableOpacity activeOpacity={.90} onPress={() => navigation.goBack()}
                  className='my-6 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full'>
                    <Image className='w-8 h-8 object-cover'source={Icons.leftIcon}/>
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
            <View className="pt-10 w-[97%] mx-auto gap-4">
              <CustomInput
                placeholder={"Name"}
                value={name}
                icon={Icons.user}
                onChange={setName}
              />
              <CustomInput
                placeholder={"PMDC #"}
                value={pmdc}
                icon={Icons.tick}
                onChange={setPmdc}
              />
              <CustomInput
                placeholder={"Email"}
                value={email}
                icon={Icons.email}
                onChange={setEmail}
              />
              <CustomInput
                placeholder={"Phone"}
                value={phone}
                icon={Icons.phone}
                onChange={setPhone}
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
            </View>
            <View>
              <Text className="text-base mt-8 ml-8">Upload PMDC scan copy</Text>
              <View className="w-32 h-32 mx-auto mt-8">
                {/* <Pressable onPress={pickImage}>
                  <Image
                    className="object-cover w-full h-full rounded-lg"
                    source={
                      image
                        ? { uri: image }
                        : Images.addImage
                    }
                  />
                </Pressable> */}
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
              <Text className="ml-2">
                I agree with the Terms of Service & Privacy Policy
              </Text>
            </Pressable>
            {/* <TouchableOpacity
            onPress={()=> navigation.navigate('sign-up-completed')}
            activeOpacity={1}
              className="bg-[#5aa9e6] mx-auto w-[70%] my-5 mb-8 rounded-2xl"
              accessible
              accessibilityLabel="Login"
            >
              <Text className="text-white text-xl text-center py-3 font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity> */}
  
           <View className="my-5">
           <CustomButton label="Sign Up" link="sign-up-completed"/>
           </View>
            
            
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default SignUp;
  