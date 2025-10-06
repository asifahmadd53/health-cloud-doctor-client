import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native'

const AboutUs = () => {
  return (
     <SafeAreaView className="flex-1 bg-white">
      <Header title="About Us" />
      <KeyboardAvoidingView
  className="flex-1"
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
>
        <ScrollView
          className="px-6 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
            <Text>fsogjhksgfksjgflksfgfg</Text>
        </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
  )
}

export default AboutUs

const styles = StyleSheet.create({})