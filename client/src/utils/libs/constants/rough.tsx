// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import ReactNativeModal from 'react-native-modal'

// const rough = () => {
//   return (
//     <View>
//      <ReactNativeModal
//                       style={{ justifyContent: "flex-end", margin: 0 }}
//             backdropColor="#333333"
//             isVisible={currentModal === "modal1"}
//             onBackdropPress={() => setCurrentModal("")}
//             animationIn={'fadeIn'}
//           >
//             <View style={{borderTopLeftRadius:40, borderTopRightRadius:40, paddingTop:70}} className="p-4 bg-white">
//               <Text className="text-2xl font-semibold ">Forgot Password</Text>
//               <Text className="pt-4">Enter your phone number for the verification process, we will send 4 digits code to your phone number.</Text>

//               <View className="mt-5">
//                 <InputField label={"Phone #"} icon={'phone-check-outline'} value={phone} onchange={setPhone} />
//               </View>

//               <View className="">
//                 <TouchableOpacity
//                 onPress={()=> setCurrentModal("modal2")}
//                 style={{minWidth:250,maxWidth:350,marginBottom:20, marginTop:23}}
//                   activeOpacity={.90}
//                   className="bg-[#5aa9e6] mx-auto self-center rounded-2xl"
//                   accessible
//                   accessibilityLabel="Continue">
//                   <Text className="text-white text-xl text-center  font-semibold py-3">
//                     Continue
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//             </View>
//           </ReactNativeModal>
//               {/* ✅ Modal 2 */}


//           <ReactNativeModal

//             style={{ justifyContent: "flex-end", margin: 0, }}
//             backdropColor="#333333"
//             isVisible={currentModal === "modal2"}
//             onBackdropPress={() => setCurrentModal("")}
//             animationIn='fadeIn'
//             animationOut="fadeOut"
            
//           >
// <View style={{borderTopLeftRadius:40, borderTopRightRadius:40, paddingTop:70}} className="p-4 bg-white"> 
//                <Text className="text-2xl font-semibold">Forget Password</Text>
//               <Text className="pt-4">Enter the 4 digits code that you have received via your phone number.</Text>

//               <View className="flex-row gap-4 justify-center items-center mt-5">
//   {[...Array(4)].map((_, index) => (
//     <TextInput
//     activeUnderlineColor="#5aa9e6"
//     underlineColor=""
//       key={index}
//       style={{width:50,height:50, fontSize: 20,backgroundColor: '#F5F5F5' }}
//       className=" border-gray-300 rounded-md items-center justify-center"
//       keyboardType="numeric"
//       maxLength={1}
//     />
//   ))}
// </View>

//               <View className="">
//                 <TouchableOpacity
//                 onPress={()=> setCurrentModal("modal3")}
//                 style={{minWidth:250,maxWidth:350,marginBottom:20, marginTop:23, borderRadius:10}}
//                   activeOpacity={.90}
//                   className="bg-[#5aa9e6] mx-auto self-center rounded-2xl"
//                   accessible
//                   accessibilityLabel="Continue">
//                   <Text className="text-white text-xl text-center  font-semibold py-3">
            
//                     Continue
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//             </View>
//           </ReactNativeModal>

//               {/* ✅ Modal 3 */}
//           <ReactNativeModal

//             style={{ justifyContent: "flex-end", margin: 0, }}
//             backdropColor="#333333"
//             isVisible={currentModal === "modal3"}
//             onBackdropPress={() => setCurrentModal("")}
//             animationIn={'fadeIn'}
            
//           >
//             <View style={{borderTopLeftRadius:40, borderTopRightRadius:40, paddingTop:70}} className="p-4 bg-white"> 
//             <Text className="text-2xl font-semibold">Forget Password</Text>
//               <Text className="pt-4">Enter your phone number for the verification process, we will send 4 digits code to your phone number.</Text>

//               <View style={{gap:10}} className="mt-5 flex-col">
                
//                 <PasswordField label={'New Password'} value={resetPassword} onchange={setResetPassword} setShowPassword={setShowPassword} showPassword={showPassword} />
                
//                 <PasswordField label={'Re-enter Password'} value={reresetPassword} onchange={setReResetPassword} setShowPassword={setShowPassword} showPassword={showPassword} />
//               </View>

//               <View className="">
//                 <TouchableOpacity
                
//                 style={{minWidth:250,maxWidth:350,marginBottom:20, marginTop:23, borderRadius:10}}
//                   activeOpacity={.90}
//                   className="bg-[#5aa9e6] mx-auto self-center rounded-2xl"
//                   accessible
//                   accessibilityLabel="Continue">
//                   <Text className="text-white text-xl text-center  font-semibold py-3">
//                     Update Password
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//             </View>
//           </ReactNativeModal>
//     </View>
//   )
// }

// export default rough

// const styles = StyleSheet.create({})