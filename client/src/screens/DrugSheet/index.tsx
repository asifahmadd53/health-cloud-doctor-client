"use client"

import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback, Pressable } from "react-native"
import { useState, useRef, useCallback } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Modal from "react-native-modal"
import { RadioButton } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { Dropdown } from "react-native-element-dropdown"
import CustomSecondaryButton from "../../components/CustomSecondaryButton"
import CustomButton from "../../components/CustomButton"
import Header from "../../components/Header"
import FormInput from "../../components/Doctor/FormInput"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList } from "react-native-gesture-handler"
import { Icon, Input } from "@rneui/themed"
import CustomInput from "../../components/CustomInput"

const DrugSheet = () => {
  const [drugsList, setDrugsList] = useState([])
  const [instruction, setInstruction] = useState("")
  const [drug, setDrug] = useState("")
  const [selectedDrug, setSelectedDrug] = useState("");
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
  const [timing, setTiming] = useState(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mealOptions = ["od", "bd", "tds", "qid", "hs", "morning"]

  // const handleSearch = (text) => {
  //   setQuery(text);

  //   if (text.trim().length > 0) {
  //     const results = drugs.filter((item) =>
  //       item.toLowerCase().includes(text.toLowerCase())
  //     );
  //     setFilteredData(results);
  //     setShowList(true);
  //   } else {
  //     setFilteredData([]);
  //     setShowList(false);
  //   }
  // };


  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
 
  const scrollViewRef = useRef(null)

  const toggleModal = () => setModalVisible(!isModalVisible)

  const medincineData = [
  { label: "Paracetamol", value: "paracetamol" },
  { label: "Ibuprofen", value: "ibuprofen" },
  { label: "Amoxicillin", value: "amoxicillin" },
  { label: "Ciprofloxacin", value: "ciprofloxacin" },
  { label: "Ciprofloxacin", value: "ciprofloxacin" },
  { label: "Ciprofloxacin", value: "ciprofloxacin" },
  { label: "Ciprofloxacin", value: "ciprofloxacin" },
];
  const typeData = [
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
      // !drug.trim() ||
       !selectedDrug ||
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

    
    const parsedDuration = Number.parseInt(duration.trim(), 10)
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      alert("Please enter a valid duration.")
      return
    }

    const newDrug = {
      // name: drug.trim(),
      name: selectedDrug,
      type: selectedType,
      mode: selectedMode,
      strength: selectedStrength,
      dosage: selectedDosage,
      duration: parsedDuration,
      mealTiming: mealTiming,
      beforeAfter,
    }

 
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
    // setDrug("")
    setSelectedDrug("");
    setSelectedType("")
    setSelectedMode("")
    setSelectedStrength("")
    setSelectedDosage("")
    setDuration("")
    setBeforeAfter("")
  }


  
  const handleDosagePress = (e) => {
    
    e.stopPropagation()

   
    setDropDownVisible(false)
    setDropDownVisibleDuration(false)

    setDropDownVisibleDosage(!isDropDownVisibleDosage)
  }

  const handleDurationPress = (e) => {

    e.stopPropagation()

    setDropDownVisible(false)
    setDropDownVisibleDosage(false)

    
    setDropDownVisibleDuration(!isDropDownVisibleDuration)
  }

  const navigation = useNavigation()

  return (
    
      <SafeAreaView className="flex-1 bg-gray-50">
        <Header title="Prescription" />
<View className="flex-1 px-4">

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
            onPress={()=> bottomSheetRef.current?.expand()}
            className="mt-4 bg-[#d3ecf8] py-3.5 rounded-lg items-center active:bg-[#d3ecf8]"
          >
            <Text className="font-semibold text-black">+ Add Medication</Text>
          </TouchableOpacity>
        </View>
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

      
            <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["90%"]}
          index={-1}
          
          backgroundStyle={{
    borderTopLeftRadius: 24,   
    borderTopRightRadius: 24,
    backgroundColor: "white",
  }}
          enablePanDownToClose // allow swipe down to fully close
          onChange={handleSheetChanges}>
             <View className="flex-row justify-between items-center px-6 py-5 border-b border-gray-200">
              <Text className="text-xl font-bold text-gray-800">Add Medication</Text>
              <TouchableOpacity
                onPress={toggleModal}
                className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              >
                <MaterialCommunityIcons name="close" size={22} color="#2895cb" />
              </TouchableOpacity>
            </View>
          <BottomSheetScrollView style={{flex: 1, padding: 10}}>
             <View className="bg-white rounded-t-3xl shadow-xl" >
           

            {/* Wrap ScrollView with TouchableWithoutFeedback to handle background taps */}
            <TouchableWithoutFeedback onPress={hideAllDropdowns}>
              <View className="p-3 pb-10">
           
      <Text className="text-base font-semibold text-gray-700 mb-2">
        Choose Drug Name
      </Text>

       {/* <Input
       style={{margin:0}}
        value={query}
        onChangeText={handleSearch}
        placeholder="Enter drug name"
        onFocus={() => {
          if (query.length > 0) setShowList(true);
        }}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: "#d1d5db", // gray-300
          borderRadius: 8,
          paddingHorizontal: 6,
        }}
        leftIcon={
          <Icon
            name="search"
            type="material"
            size={22}
            color="gray"
            style={{ marginRight: 6 }}
          />
        }
      />

      {showList && (
        <View className="bg-white rounded-lg border border-gray-200 z-50">
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                className="p-3 py-5 border-b border-gray-200"
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            style={{ maxHeight: 240 }} 
          />
        </View>
      )} */}

       <Dropdown
        
        style={styles.consistentDropdown}
                    placeholderStyle={styles.consistentPlaceholder}
                    selectedTextStyle={styles.consistentSelectedText}
                    inputSearchStyle={styles.consistentInputSearch}
                    iconStyle={styles.consistentIcon}
                    itemTextStyle={styles.consistentItemText}
        data={medincineData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Enter Drug Name"
        searchPlaceholder="Search drug..."
        value={selectedDrug}
        onChange={(item) => {
          setSelectedDrug(item.value);
        }}
      />


                <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Type</Text>
                <Dropdown
                  containerStyle={{ borderRadius: 8 }}
                  data={typeData}
                  search={false}
                   style={styles.consistentDropdown}
                    placeholderStyle={styles.consistentPlaceholder}
                    selectedTextStyle={styles.consistentSelectedText}
                    inputSearchStyle={styles.consistentInputSearch}
                    iconStyle={styles.consistentIcon}
                    itemTextStyle={styles.consistentItemText}
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
                  style={styles.consistentDropdown}
                    placeholderStyle={styles.consistentPlaceholder}
                    selectedTextStyle={styles.consistentSelectedText}
                    inputSearchStyle={styles.consistentInputSearch}
                    iconStyle={styles.consistentIcon}
                    itemTextStyle={styles.consistentItemText}
                  data={modeData}
                  search={false}
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
                  search={false}
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

               {/* <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Dosage</Text> */}
                <View className="flex-row items-center w-full gap-2 mt-4">

  <View className="flex-1 ">
    <CustomInput
      label="Dosage"
      value={Dosage}
      onChange={setDosage}
      placeholder="Enter Dosage"
      keyboardType="numeric"
      onFocus={() => {
        setDropDownVisible(false);
        setDropDownVisibleDosage(false);
        setDropDownVisibleDuration(false);
      }}
     style={{ height: 48 }} 
    />
  </View>

  {/* Dropdown fixed width */}
  
   <View className="w-1/2">
                  <Dropdown
                    style={styles.consistentDropdown}
                    placeholderStyle={styles.consistentPlaceholder}
                    selectedTextStyle={styles.consistentSelectedText}
                    inputSearchStyle={styles.consistentInputSearch}
                    iconStyle={styles.consistentIcon}
                    itemTextStyle={styles.consistentItemText}
                    data={dosageData}
                    search={false}
                    maxHeight={300}
                    labelField="value"
                    valueField="value"
                    placeholder="Select"
                    value={selectedDosage}
                    onChange={(item) => {
                      setSelectedDosage(item.value)
                      hideAllDropdowns()
                    }}
                    onFocus={() => hideAllDropdowns()}
                    renderItem={(item) => (
                      <View style={styles.dropdownItemContainer}>
                        <Text style={styles.dropdownItemText} numberOfLines={2}>
                          {item.value}
                        </Text>
                      </View>
                    )}
                  />
                </View>
</View>


                <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Timing of Drugs</Text>
                <View className="flex-row flex-wrap bg-gray-100 p-2 rounded-xl">
      {mealOptions.map((option) => (
        <Pressable
          key={option}
          onPress={() => {
            setMealTiming(option)
            hideAllDropdowns()
          }}
          className={`px-4 py-2 m-2 rounded-lg border justify-center items-center 
            ${mealTiming === option ? "bg-secondary border-secondary" : "bg-white border-gray-300"}
          `}
        >
          <Text
            className={`font-semibold ${
              mealTiming === option ? "text-white" : "text-gray-700"
            }`}
          >
            {option.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
                <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Duration</Text>
               <View className="flex-row items-center w-full gap-2 mt-4">

  <View className="flex-1 ">
    <CustomInput
      label="Dosage"
      value={Dosage}
      onChange={setDosage}
      placeholder="Enter Dosage"
      keyboardType="numeric"
      onFocus={() => {
        setDropDownVisible(false);
        setDropDownVisibleDosage(false);
        setDropDownVisibleDuration(false);
      }}
     style={{ height: 48 }} 
    />
  </View>

  {/* Dropdown fixed width */}
  
   <View className="w-1/2">
                  <Dropdown
                    style={styles.consistentDropdown}
                    placeholderStyle={styles.consistentPlaceholder}
                    selectedTextStyle={styles.consistentSelectedText}
                    inputSearchStyle={styles.consistentInputSearch}
                    iconStyle={styles.consistentIcon}
                    itemTextStyle={styles.consistentItemText}
                    data={durationData}
                    search={false}
                    maxHeight={300}
                    labelField="value"
                    valueField="value"
                    placeholder="Select"
                    value={selectedDuration}
                    onChange={(item) => {
                      setSelectedDuration(item.value)
                      hideAllDropdowns()
                    }}
                    onFocus={() => hideAllDropdowns()}
                    renderItem={(item) => (
                      <View style={styles.dropdownItemContainer}>
                        <Text style={styles.dropdownItemText} numberOfLines={2}>
                          {item.value}
                        </Text>
                      </View>
                    )}
                  />
                </View>
</View>

                <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">Before/After</Text>
               <View className="flex-row bg-gray-100 rounded-xl p-1">
      {["Before Meal", "After Meal"].map((option) => (
        <TouchableOpacity
        activeOpacity={.90}
          key={option}
          onPress={() => setTiming(option)}
          className={`flex-1 py-2 rounded-lg ${
            timing === option ? "bg-secondary" : "bg-transparent"
          }`}
        >
          <Text
            className={`text-center ${
              timing === option ? "text-white font-semibold" : "text-gray-600"
            }`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>




                <View className="mt-8">
                  <CustomSecondaryButton onPress={handleAddDrug} label={"Add Drug"} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>

            
          </BottomSheetScrollView>
        </BottomSheet>
</View>
        

       
      </SafeAreaView>
    
  )
}

export default DrugSheet

const styles = StyleSheet.create({
  consistentDropdown: {
    height: 55, // Same height as CustomInput
    backgroundColor: "#fff",
    borderRadius: 7, // Same border radius as CustomInput
    paddingHorizontal: 10, // Same padding as CustomInput
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#d1d5db", // Same border color as CustomInput
  },
  consistentPlaceholder: {
    fontSize: 16, // Same font size as CustomInput
    color: "#9ca3af", // Same placeholder color as CustomInput
  },
  consistentSelectedText: {
    fontSize: 16, // Same font size as CustomInput
    color: "black", // Same text color as CustomInput
  },
  consistentInputSearch: {
    height: 48,
    fontSize: 16,
    borderRadius: 7,
    color: "black",
  },
  consistentIcon: {
    tintColor: "#9ca3af",
  },
  consistentItemText: {
    fontSize: 16,
    color: "black",
  },
  
  dropdownItemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    minHeight: 48,
    justifyContent: "center",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#1f2937",
    flexWrap: "wrap",
    lineHeight: 20,
  },
  // Legacy styles (keeping for compatibility)
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
})