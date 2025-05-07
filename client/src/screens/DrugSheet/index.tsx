"use client"

import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native"
import { useState, useRef } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Modal from "react-native-modal"
import { RadioButton, TextInput } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { Dropdown } from "react-native-element-dropdown"
import CustomSecondaryButton from "../../components/CustomSecondaryButton"
import CustomButton from "../../components/CustomButton"
import Header from "../../components/Header"
import FormInput from "../../components/Doctor/FormInput"

const DrugSheet = () => {
  const [drugsList, setDrugsList] = useState([])
  const [instruction, setInstruction] = useState("")
  const [drug, setDrug] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedMode, setSelectedMode] = useState("")
  const [selectedStrength, setSelectedStrength] = useState("")
  const [Dosage, setDosage] = useState("")
  const [selectedDosage, setSelectedDosage] = useState("")
  const [mealTiming, setMealTiming] = useState("")
  const [duration, setDuration] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")
  const [beforeAfter, setBeforeAfter] = useState("")
  const [isModalVisible, setModalVisible] = useState(false)
  const [isDropDownVisible, setDropDownVisible] = useState(false)
  const [isDropDownVisibleDosage, setDropDownVisibleDosage] = useState(false)
  const [isDropDownVisibleDuration, setDropDownVisibleDuration] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  // Create a ref for the drug input
  const drugInputRef = useRef(null)
  // Create a ref for the scroll view
  const scrollViewRef = useRef(null)

  const toggleModal = () => setModalVisible(!isModalVisible)

  const data = [
    { key: "2", value: "Tablet" },
    { key: "3", value: "Capsule" },
    { key: "5", value: "Cream/Lotion" },
    { key: "6", value: "Syrup" },
    { key: "7", value: "Nebulizer" },
    { key: "8", value: "Injection" },
  ]

  const modeData = [
    { key: "2", value: "Oral" },
    { key: "3", value: "IV" },
    { key: "5", value: "IM" },
    { key: "6", value: "Eye Drop" },
    { key: "7", value: "Nasal Spray" },
    { key: "8", value: "Ear Drop" },
  ]
  const strengthData = [
    { key: "1", value: "50mg" },
    { key: "2", value: "100mg" },
    { key: "3", value: "250mg" },
    { key: "4", value: "500mg" },
  ]

  const dosageData = [
    { key: "1", value: "Once a day" },
    { key: "2", value: "Twice a day" },
    { key: "3", value: "Three times a day" },
    { key: "4", value: "Every 6 hours" },
  ]
  const durationData = [
    { key: "1", value: "Days" },
    { key: "2", value: "Weeks" },
    { key: "3", value: "Months" },
  ]
  const beforeAfterDate = [
    { key: "1", value: "Before" },
    { key: "2", value: "After" },
  ]

  // Function to hide all dropdowns
  const hideAllDropdowns = () => {
    setDropDownVisible(false)
    setDropDownVisibleDosage(false)
    setDropDownVisibleDuration(false)
    Keyboard.dismiss()
  }

  // Function to add drug to the list
  const handleAddDrug = () => {
    if (
      !drug.trim() ||
      !selectedType ||
      !selectedMode ||
      !selectedStrength ||
      !selectedDosage ||
      !duration.trim() ||
      !beforeAfter
    ) {
      alert("Please fill all fields before adding!")
      return
    }

    // Convert duration to a number
    const parsedDuration = Number.parseInt(duration.trim(), 10)
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      alert("Please enter a valid duration.")
      return
    }

    const newDrug = {
      name: drug.trim(),
      type: selectedType,
      mode: selectedMode,
      strength: selectedStrength,
      dosage: selectedDosage,
      duration: parsedDuration,
      mealTiming: mealTiming,
      beforeAfter,
    }

    // Check for duplicates in the drugsList
    interface Drug {
      name: string
      type: string
      mode: string
      strength: string
      dosage: string
      duration: number
      mealTiming: string
      beforeAfter: string
    }
    const isDuplicate = drugsList.some(
      (item: Drug) =>
        item.name.toLowerCase() === newDrug.name.toLowerCase() &&
        item.type === newDrug.type &&
        item.mode === newDrug.mode &&
        item.strength === newDrug.strength &&
        item.dosage === newDrug.dosage &&
        item.duration === newDrug.duration &&
        item.beforeAfter === newDrug.beforeAfter &&
        item.mealTiming === newDrug.mealTiming,
    )

    if (isDuplicate) {
      alert("This medication is already added!")
      return
    }

    // Add new drug to the list
    setDrugsList((prevList) => [...prevList, newDrug])

    // Close modal and reset input fields
    setModalVisible(false)
    setDrug("")
    setSelectedType("")
    setSelectedMode("")
    setSelectedStrength("")
    setSelectedDosage("")
    setDuration("")
    setBeforeAfter("")
  }

  // Update the handleSearch function to hide the dropdown when there are no matches

  const handleSearch = (query) => {
    setDrug(query)
    if (query.trim() === "") {
      // Show all options when input is empty
      setFilteredData(data)
      setDropDownVisible(true)
    } else {
      const newData = data.filter((item) => item.value.toLowerCase().includes(query.toLowerCase()))
      if (newData.length > 0) {
        setFilteredData(newData)
        setDropDownVisible(true)
      } else {
        // Hide dropdown when no matches are found
        setDropDownVisible(false)
      }
    }
  }

  // Function to handle the drug input press
  const handleDrugInputPress = (e) => {
    // Prevent event from bubbling up to parent
    e.stopPropagation()

    // Hide other dropdowns first
    setDropDownVisibleDosage(false)
    setDropDownVisibleDuration(false)

    // Show the dropdown
    setFilteredData(data)
    setDropDownVisible(true)

    // Focus the input field
    if (drugInputRef.current) {
      drugInputRef.current.focus()
    }
  }

  // Function to handle the dosage dropdown press
  const handleDosagePress = (e) => {
    // Prevent event from bubbling up to parent
    e.stopPropagation()

    // Hide other dropdowns first
    setDropDownVisible(false)
    setDropDownVisibleDuration(false)

    // Toggle dosage dropdown
    setDropDownVisibleDosage(!isDropDownVisibleDosage)
  }

  // Function to handle the duration dropdown press
  const handleDurationPress = (e) => {
    // Prevent event from bubbling up to parent
    e.stopPropagation()

    // Hide other dropdowns first
    setDropDownVisible(false)
    setDropDownVisibleDosage(false)

    // Toggle duration dropdown
    setDropDownVisibleDuration(!isDropDownVisibleDuration)
  }

  const navigation = useNavigation()

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray-50 px-5">
        <Header title="Prescription" />

        <View className="bg-white p-5 rounded-xl shadow-sm mx-4 border-gray-200 border mt-10">
          <Text className="text-xl font-bold text-gray-800 mb-3">Prescribed Medications</Text>
          <View className="mt-3 space-y-3">
            {drugsList.length > 0 ? (
              drugsList.map((item: any, index: any) => (
                <View
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-row items-center space-x-3"
                >
                  {/* Drug Information */}
                  <View className="flex-1">
                    <Text className="font-bold text-lg text-gray-800">
                      {index + 1}. {item.type} {item.name} ({item.mode})
                    </Text>
                    <Text className="text-sm text-gray-600 mt-1">
                      <Text className="font-semibold text-gray-700">Strength:</Text> {item.strength} |
                      <Text className="font-semibold text-gray-700"> Dosage:</Text> {item.dosage} |
                      <Text className="font-semibold text-gray-700"> Duration:</Text> {item.duration} days
                    </Text>
                    <Text className="text-sm text-gray-600 mt-1">
                      <Text className="font-semibold text-gray-700">Timing:</Text> {item.mealTiming} |
                      <Text className="font-semibold text-gray-700"> Before/After:</Text> {item.beforeAfter}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-gray-500 text-center py-8 text-lg font-medium">No medications added yet</Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleModal}
            className="mt-4 bg-[#d3ecf8] py-3.5 rounded-lg items-center active:bg-[#d3ecf8]"
          >
            <Text className="font-semibold text-black">+ Add Medication</Text>
          </TouchableOpacity>
        </View>

        {/* MODAL */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={400}
          animationOutTiming={400}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          style={{ margin: 0, justifyContent: "flex-end" }}
          backdropOpacity={0.5}
          statusBarTranslucent
        >
          <View className="bg-white rounded-t-3xl shadow-xl" style={{ maxHeight: "90%" }}>
            <View className="flex-row justify-between items-center px-6 py-5 border-b border-gray-200">
              <Text className="text-xl font-bold text-gray-800">Add Medication</Text>
              <TouchableOpacity
                onPress={toggleModal}
                className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              >
                <MaterialCommunityIcons name="close" size={22} color="#2895cb" />
              </TouchableOpacity>
            </View>

            {/* Wrap ScrollView with TouchableWithoutFeedback to handle background taps */}
            <TouchableWithoutFeedback onPress={hideAllDropdowns}>
              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ paddingBottom: 30 }}
                className="px-6 py-5"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View className="relative mb-4">
                  <Text className="text-base font-semibold text-gray-700 mb-2">Drug Name</Text>

                  {/* Wrap TextInput in TouchableOpacity for better touch handling */}
                  <TouchableOpacity activeOpacity={1} onPress={handleDrugInputPress} style={styles.inputWrapper}>
                    <TextInput
                      ref={drugInputRef}
                      value={drug}
                      onChangeText={handleSearch}
                      placeholder="Enter Drug Name"
                      mode="outlined"
                      outlineColor="#e5e7eb"
                      activeOutlineColor="#2895cb"
                      onFocus={() => {
                        setFilteredData(data)
                        setDropDownVisible(true)
                        // Hide other dropdowns
                        setDropDownVisibleDosage(false)
                        setDropDownVisibleDuration(false)
                      }}
                      right={
                        <TextInput.Icon
                          icon={"chevron-down"}
                          color="#9ca3af"
                          onPress={(e) => {
                            e.stopPropagation()
                            setFilteredData(data)
                            setDropDownVisible(!isDropDownVisible)
                            // Hide other dropdowns
                            setDropDownVisibleDosage(false)
                            setDropDownVisibleDuration(false)
                            // Focus the input when dropdown icon is clicked
                            if (drugInputRef.current) {
                              drugInputRef.current.focus()
                            }
                          }}
                        />
                      }
                      style={{ backgroundColor: "white", height: 56, fontSize: 16 }}
                      theme={{ roundness: 12 }}
                    />
                  </TouchableOpacity>

                  {isDropDownVisible && filteredData.length > 0 && (
                    <ScrollView
                      style={{
                        maxHeight: 200,
                        borderRadius: 12,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 5,
                      }}
                      showsVerticalScrollIndicator={false}
                      className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg rounded-lg mt-1 z-50"
                      keyboardShouldPersistTaps="handled"
                    >
                      {filteredData.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={0.7}
                          className={`p-4 ${index < filteredData.length - 1 ? "border-b border-gray-100" : ""}`}
                          onPress={(e) => {
                            e.stopPropagation()
                            setDrug(item.value)
                            setDropDownVisible(false)
                            // Dismiss keyboard after selection
                            Keyboard.dismiss()
                          }}
                        >
                          <Text className="text-base text-gray-700">{item.value}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>

                <Text className="text-base font-semibold text-gray-700 mb-2">Type</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="value"
                  valueField="value"
                  placeholder="Select type"
                  searchPlaceholder="Search..."
                  value={selectedType}
                  onChange={(item) => {
                    setSelectedType(item.value)
                    hideAllDropdowns()
                  }}
                  onFocus={() => hideAllDropdowns()}
                />

                <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Mode of Drug</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={modeData}
                  search
                  maxHeight={300}
                  labelField="value"
                  valueField="value"
                  placeholder="Select mode"
                  searchPlaceholder="Search..."
                  value={selectedMode}
                  onChange={(item) => {
                    setSelectedMode(item.value)
                    hideAllDropdowns()
                  }}
                  onFocus={() => hideAllDropdowns()}
                />

                <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Strength</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={strengthData}
                  search
                  maxHeight={300}
                  labelField="value"
                  valueField="value"
                  placeholder="Select strength"
                  searchPlaceholder="Search..."
                  value={selectedStrength}
                  onChange={(item) => {
                    setSelectedStrength(item.value)
                    hideAllDropdowns()
                  }}
                  onFocus={() => hideAllDropdowns()}
                />

                <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Dosage</Text>
                <View className="relative">
                  <View style={styles.splitInput}>
                    <TextInput
                      value={Dosage}
                      onChangeText={setDosage}
                      placeholder="Enter dosage"
                      mode="flat"
                      underlineColor="transparent"
                      activeUnderlineColor="transparent"
                      style={styles.splitInputLeft}
                      theme={{ roundness: 12 }}
                      onFocus={() => {
                        // Hide all dropdowns when focusing on this input
                        setDropDownVisible(false)
                        setDropDownVisibleDosage(false)
                        setDropDownVisibleDuration(false)
                      }}
                    />

                    <TouchableOpacity activeOpacity={0.8} style={styles.splitInputRight} onPress={handleDosagePress}>
                      <Text style={styles.dropdownText}>{selectedDosage || "Select frequency"}</Text>
                      <MaterialCommunityIcons name="chevron-down" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                  </View>

                  {isDropDownVisibleDosage && dosageData.length > 0 && (
                    <ScrollView
                      style={styles.dropdownList}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="handled"
                    >
                      {dosageData.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={0.7}
                          style={styles.dropdownItem}
                          onPress={(e) => {
                            e.stopPropagation()
                            setSelectedDosage(item.value)
                            setDropDownVisibleDosage(false)
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{item.value}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>

                <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Timing of Drugs</Text>
                <View className="flex-row flex-wrap bg-gray-50 p-3 rounded-xl">
                  <View className="flex-row items-center m-2">
                    <RadioButton
                      value="od"
                      status={mealTiming === "od" ? "checked" : "unchecked"}
                      onPress={() => {
                        setMealTiming("od")
                        hideAllDropdowns()
                      }}
                      color="#2895cb"
                    />
                    <Text
                      onPress={() => {
                        setMealTiming("od")
                        hideAllDropdowns()
                      }}
                      className="font-semibold text-gray-700 ml-1"
                    >
                      OD
                    </Text>
                  </View>

                  <View className="flex-row items-center m-2">
                    <RadioButton
                      value="bd"
                      status={mealTiming === "bd" ? "checked" : "unchecked"}
                      onPress={() => {
                        setMealTiming("bd")
                        hideAllDropdowns()
                      }}
                      color="#2895cb"
                    />
                    <Text
                      onPress={() => {
                        setMealTiming("bd")
                        hideAllDropdowns()
                      }}
                      className="font-semibold text-gray-700 ml-1"
                    >
                      BD
                    </Text>
                  </View>

                  <View className="flex-row items-center m-2">
                    <RadioButton
                      value="tds"
                      status={mealTiming === "tds" ? "checked" : "unchecked"}
                      onPress={() => {
                        setMealTiming("tds")
                        hideAllDropdowns()
                      }}
                      color="#2895cb"
                    />
                    <Text
                      onPress={() => {
                        setMealTiming("tds")
                        hideAllDropdowns()
                      }}
                      className="font-semibold text-gray-700 ml-1"
                    >
                      TDS
                    </Text>
                  </View>

                  <View className="flex-row items-center m-2">
                    <RadioButton
                      value="qid"
                      status={mealTiming === "qid" ? "checked" : "unchecked"}
                      onPress={() => {
                        setMealTiming("qid")
                        hideAllDropdowns()
                      }}
                      color="#2895cb"
                    />
                    <Text
                      onPress={() => {
                        setMealTiming("qid")
                        hideAllDropdowns()
                      }}
                      className="font-semibold text-gray-700 ml-1"
                    >
                      QID
                    </Text>
                  </View>

                  <View className="flex-row items-center m-2">
                    <RadioButton
                      value="hs"
                      status={mealTiming === "hs" ? "checked" : "unchecked"}
                      onPress={() => {
                        setMealTiming("hs")
                        hideAllDropdowns()
                      }}
                      color="#2895cb"
                    />
                    <Text
                      onPress={() => {
                        setMealTiming("hs")
                        hideAllDropdowns()
                      }}
                      className="font-semibold text-gray-700 ml-1"
                    >
                      HS
                    </Text>
                  </View>

                  <View className="flex-row items-center m-2">
                    <RadioButton
                      value="morning"
                      status={mealTiming === "morning" ? "checked" : "unchecked"}
                      onPress={() => {
                        setMealTiming("morning")
                        hideAllDropdowns()
                      }}
                      color="#2895cb"
                    />
                    <Text
                      onPress={() => {
                        setMealTiming("morning")
                        hideAllDropdowns()
                      }}
                      className="font-semibold text-gray-700 ml-1"
                    >
                      Morning
                    </Text>
                  </View>
                </View>

                <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Duration</Text>
                <View className="relative">
                  <View style={styles.splitInput}>
                    <TextInput
                      value={duration}
                      onChangeText={setDuration}
                      placeholder="Enter number"
                      mode="flat"
                      keyboardType="numeric"
                      underlineColor="transparent"
                      activeUnderlineColor="transparent"
                      style={styles.splitInputLeft}
                      theme={{ roundness: 12 }}
                      onFocus={() => {
                        // Hide all dropdowns when focusing on this input
                        setDropDownVisible(false)
                        setDropDownVisibleDosage(false)
                        setDropDownVisibleDuration(false)
                      }}
                    />

                    <TouchableOpacity activeOpacity={0.8} style={styles.splitInputRight} onPress={handleDurationPress}>
                      <Text style={styles.dropdownText}>{selectedDuration || "Select unit"}</Text>
                      <MaterialCommunityIcons name="chevron-down" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                  </View>

                  {isDropDownVisibleDuration && durationData.length > 0 && (
                    <ScrollView
                      style={styles.dropdownList}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="handled"
                    >
                      {durationData.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={0.7}
                          style={styles.dropdownItem}
                          onPress={(e) => {
                            e.stopPropagation()
                            setSelectedDuration(item.value)
                            setDropDownVisibleDuration(false)
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{item.value}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>

                <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Before/After</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={beforeAfterDate}
                  maxHeight={300}
                  labelField="value"
                  valueField="value"
                  placeholder="Select timing"
                  value={beforeAfter}
                  onChange={(item) => {
                    setBeforeAfter(item.value)
                    hideAllDropdowns()
                  }}
                  onFocus={() => hideAllDropdowns()}
                />

                <View className="mt-8">
                  <CustomSecondaryButton onPress={handleAddDrug} label={"Add Drug"} />
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </View>
        </Modal>

        <View className="mt-6 mx-4">
          <FormInput
            label="Special Instructions"
            value={instruction}
            onChangeText={setInstruction}
            placeholder="E.g., Take after meals, avoid caffeine, etc."
            multiline
            numberOfLines={4}
          />
        </View>

        <View className="mt-8 mx-4">
          <CustomButton link={""} label="Generate Prescription" />
        </View>
      </SafeAreaView>
    </>
  )
}

export default DrugSheet

const styles = StyleSheet.create({
  dropdown: {
    height: 56,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#9ca3af",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#1f2937",
  },
  inputSearchStyle: {
    height: 48,
    fontSize: 16,
    borderRadius: 8,
  },
  inputWrapper: {
    width: "100%",
  },
  splitInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "white",
    overflow: "hidden",
  },
  splitInputLeft: {
    flex: 1,
    backgroundColor: "white",
    height: 56,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  splitInputRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    height: 56,
    borderLeftWidth: 1,
    borderLeftColor: "#e5e7eb",
  },
  dropdownText: {
    fontSize: 16,
    color: "#9ca3af",
  },
  dropdownList: {
    maxHeight: 200,
    borderRadius: 12,
    position: "absolute",
    right: 0,
    top: "100%",
    width: "50%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 50,
    marginTop: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#1f2937",
  },
})
