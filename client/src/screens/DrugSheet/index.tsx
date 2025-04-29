import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Modal from "react-native-modal";

import { RadioButton, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import CustomSimpleInput from '../../components/CustomSimpleInput';
import CustomSecondaryButton from '../../components/CustomSecondaryButton';
import CustomButton from '../../components/CustomButton';



const DrugSheet = () => {
    const [drugsList, setDrugsList] = useState([]);
    const [instruction, setInstruction] = useState('');
    const [drug, setDrug] = useState('');
    const [selectedType, setSelectedType] = useState("");
    const [selectedMode, setSelectedMode] = useState("");
    const [selectedStrength, setSelectedStrength] = useState("");
    const [Dosage,setDosage] = useState("");
    const [selectedDosage, setSelectedDosage] = useState("");
    const [mealTiming, setMealTiming] = useState("");
    const [duration, setDuration] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');
    const [beforeAfter, setBeforeAfter] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDropDownVisible, setDropDownVisible] = useState(false);
    const [isDropDownVisibleDosage, setDropDownVisibleDosage] = useState(false);
    const [isDropDownVisibleDuration, setDropDownVisibleDuration] = useState(false);
    const [filteredData, setFilteredData] = useState([]);


    const toggleModal = () => setModalVisible(!isModalVisible);

    const data = [
        { key: '2', value: 'Tablet' },
        { key: '3', value: 'Capsule' },
        { key: '5', value: 'Cream/Lotion' },
        { key: '6', value: 'Syrup' },
        { key: '7', value: 'Nebulizer' },
        { key: '8', value: 'Injection' },
    ];

    const modeData = [
        { key: '2', value: 'Oral' },
        { key: '3', value: 'IV' },
        { key: '5', value: 'IM' },
        { key: '6', value: 'Eye Drop' },
        { key: '7', value: 'Nasal Spray' },
        { key: '8', value: 'Ear Drop' },
    ];
    const strengthData = [
        { key: '1', value: '50mg' },
        { key: '2', value: '100mg' },
        { key: '3', value: '250mg' },
        { key: '4', value: '500mg' },
    ];

    const dosageData = [
        { key: '1', value: 'Once a day' },
        { key: '2', value: 'Twice a day' },
        { key: '3', value: 'Three times a day' },
        { key: '4', value: 'Every 6 hours' },
    ];
    const durationData = [
        { key: '1', value: 'Days' },
        { key: '2', value: 'Weeks' },
        { key: '3', value: 'Months' }
    ];
    const beforeAfterDate = [
        { key: '1', value: 'Before' },
        { key: '2', value: 'After' },
    ];

    // Function to add drug to the list
    const handleAddDrug = () => {
        if (!drug.trim() || !selectedType || !selectedMode || !selectedStrength || !selectedDosage || !duration.trim() || !beforeAfter) {
            alert("Please fill all fields before adding!");
            return;
        }
    
        // Convert duration to a number
        const parsedDuration = parseInt(duration.trim(), 10);
        if (isNaN(parsedDuration) || parsedDuration <= 0) {
            alert("Please enter a valid duration.");
            return;
        }
    
        const newDrug = {
            name: drug.trim(),
            type: selectedType,
            mode: selectedMode,
            strength: selectedStrength,
            dosage: selectedDosage,
            duration: parsedDuration,
            mealTiming: mealTiming,
            beforeAfter
        };
    
       
        // Check for duplicates in the drugsList
        interface Drug {
            name: string;
            type: string;
            mode: string;
            strength: string;
            dosage: string;
            duration: number;
            mealTiming: string;
            beforeAfter: string;
        }
        const isDuplicate = drugsList.some((item:Drug) => 
            item.name.toLowerCase() === newDrug.name.toLowerCase() && 
            item.type === newDrug.type &&
            item.mode === newDrug.mode &&
            item.strength === newDrug.strength &&
            item.dosage === newDrug.dosage &&
            item.duration === newDrug.duration &&
            item.beforeAfter === newDrug.beforeAfter &&
            item.mealTiming === newDrug.mealTiming
        );
    
        if (isDuplicate) {
            alert("This medication is already added!");
            return;
        }
    
        // Add new drug to the list
        setDrugsList(prevList => [...prevList, newDrug]);
    
        // Close modal and reset input fields
        setModalVisible(false);
        setDrug('');
        setSelectedType('');
        setSelectedMode('');
        setSelectedStrength('');
        setSelectedDosage('');
        setDuration('');
        setBeforeAfter('');
    };
    

    const handleSearch = (query) => {
        setDrug(query);
        if (query.trim() === "") {
          setFilteredData([]); // Hide dropdown if input is empty
          setDropDownVisible(false);
        } else {
          const newData = data.filter((item) =>
            item.value.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredData(newData);
          setDropDownVisible(newData.length > 0); // Show dropdown only if there are matches
        }
      };
      const navigation = useNavigation()

    return (
        <>
             
            <SafeAreaView className="flex-1 bg-gray-50 ">
  <View className="flex-row gap-4 items-center shadow-xl bg-white rounded-xl px-4">
                <TouchableOpacity
                  activeOpacity={0.90}
                  onPress={() => navigation.goBack()}
                  className="my-3 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full shadow-md">
                  <Image className="w-8 h-8 object-cover" source={Icons.leftIcon} />
                </TouchableOpacity>
                <Text className="text-xl font-semibold text-gray-800">Prescription</Text>
              </View>


                <View className="bg-white  p-5 rounded-lg shadow-sm mx-4 border-gray-200 border mt-4">
                    <Text className="text-lg font-semibold text-gray-800 mb-3">Prescribed Medications</Text>
                    <View className="mt-3 space-y-3">
    {drugsList.length > 0 ? (
        drugsList.map((item: any, index: any) => (
            <View 
                key={index} 
                className="bg-white p-4 rounded-xl border border-gray-300 shadow-md flex-row items-center space-x-3"
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
        <Text className="text-gray-500 text-center text-lg font-medium">No medications added yet</Text>
    )}
</View>




                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={toggleModal}
                        className="mt-4 bg-blue-100 py-3 rounded-md items-center active:bg-blue-200"
                    >
                        <Text className="font-semibold">+ Add More</Text>
                    </TouchableOpacity>
                </View>

                {/* MODAL */}
                <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} onBackButtonPress={toggleModal}  style={{flex:1, marginVertical:'auto', maxHeight:"90%",alignItems:'center', justifyContent:'center'}}>
                <ScrollView>
                    <View className="bg-white px-3 py-8 pt-7 rounded-xl">
                        <Text className='my-2 font-semibold text-base'>Drug</Text>


    <View className="relative">
  <TextInput
    value={drug}
    onChangeText={handleSearch}
    placeholder="Enter Drug Name"
    mode="outlined"
    outlineColor="lightgray"
    activeOutlineColor="gray"
    onFocus={() => setDropDownVisible(filteredData?.length > 0)}
    onPress={() => setDropDownVisible(!isDropDownVisible)} // Toggle visibility when clicked
    right={<TextInput.Icon icon={'chevron-down'} />}
    style={{ backgroundColor: 'white', maxHeight: 60 }}
    theme={{ roundness: 12 }}
  />

  {isDropDownVisible && filteredData.length > 0 && (
    <ScrollView
      style={{ maxHeight: 150, borderRadius: 10 }}
      showsVerticalScrollIndicator
      className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded mt-1 z-50"
    >
      {filteredData.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.9}
          className="p-2 border-b border-gray-200"
          onPress={() => {
            setDrug(item.value); // Set selected item
            setDropDownVisible(false); // Hide dropdown
          }}
        >
          <Text className="text-base md:text-lg px-2 py-2">{item.value}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )}
</View>




                        <Text className='my-2 font-semibold text-base'>Type</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            // iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="value"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={selectedType}
                            onChange={item => setSelectedType(item.value)}
                        />
                        <Text className='my-2 font-semibold text-base'>Mode of Drug</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            // iconStyle={styles.iconStyle}
                            data={modeData}
                            search
                            maxHeight={300}
                            labelField="value"
                            valueField="value"
                            placeholder="Select mode"
                            searchPlaceholder="Search..."
                            value={selectedMode}
                            onChange={item => setSelectedMode(item.value)}
                          
                        />
                        <Text className='my-2 font-semibold text-base'>Strength</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            // iconStyle={styles.iconStyle}
                            data={strengthData}
                            search
                            maxHeight={300}
                            labelField="value"
                            valueField="value"
                            placeholder="Select mode"
                            searchPlaceholder="Search..."
                            value={selectedStrength}
                            onChange={item => setSelectedStrength(item.value)}
                           
                        />
                        <Text className='my-2 font-semibold text-base'>Dosage</Text>
                        <View className="relative">
  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'lightgray', borderRadius: 12, backgroundColor: 'white' }}>
    {/* Left Side: User Input (50%) */}
    <TextInput
      value={Dosage}
      onChangeText={setDosage}
      placeholder="Enter Drug Name"
      mode="flat"
      underlineColor='lightgray'
      activeUnderlineColor='lightgray'
      style={{ flex: 1, backgroundColor: 'white', maxHeight: 55, borderRightColor: 'none' }}
      theme={{ roundness: 12 }}
    />

    {/* Right Side: Selected Dosage (50%) */}
    <TouchableOpacity
    activeOpacity={.90}
      style={{
        flex: 0.5, // Takes 50% width
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}
      onPress={() => setDropDownVisibleDosage(!isDropDownVisibleDosage)}
    >
      <Text style={{ color: 'gray' }}>{selectedDosage || "Select"}</Text>
    </TouchableOpacity>
  </View>

  {/* Dropdown List */}
  {isDropDownVisibleDosage && dosageData.length > 0 && (
    <ScrollView
      style={{
        maxHeight: 150,
        borderRadius: 10,
        position: 'absolute',
        right: 0,
        top: '100%',
        width: '45%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 50,
      }}
      showsVerticalScrollIndicator
    >
      {dosageData.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.9}
          className="p-2 border-b border-gray-200"
          onPress={() => {
            setSelectedDosage(item.value); // Set selected item
            setDropDownVisibleDosage(false); // Hide dropdown
          }}
        >
          <Text className="text-base md:text-lg px-2 py-2">{item.value}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )}
</View>

<Text className='my-2 font-semibold text-base mt-3'>Timimgs of Drugs</Text>
<View className='flex-row flex-wrap'>


<View className='flex-row items-center w-20  m-2 gap-1'>
<RadioButton
  value="od"
  
  status={mealTiming === 'od' ? 'checked' : 'unchecked'}
  onPress={() => setMealTiming('od')}
  color="#2895cb" // Equivalent to 'info' status
/>
<Text   onPress={() => setMealTiming('od')}
 className='font-bold'>OD</Text>
</View>

<View className='flex-row items-center w-20  m-2 gap-1'>

  <RadioButton
    value='bd'
    status={mealTiming === 'bd' ? 'checked' : 'unchecked'}
    onPress={() => setMealTiming('bd')}
    color="#2895cb" 
  />
  <Text     onPress={() => setMealTiming('bd')}
 className='font-bold'>BD</Text>
</View>
 

<View className='flex-row items-center w-20  m-2 gap-1'>

  <RadioButton
    value='tds'
    status={mealTiming === 'tds' ? 'checked' : 'unchecked'}
    onPress={() => setMealTiming('tds')}
    color="#2895cb" 
  />
 <Text     onPress={() => setMealTiming('tds')}
 className='font-bold'>TDS</Text>
 </View>

 <View className='flex-row items-center w-20  m-2 gap-1'>

  <RadioButton
     value='qid'
     status={mealTiming === 'qid' ? 'checked' : 'unchecked'}
     onPress={() => setMealTiming('qid')}
     color="#2895cb" 
  />
    <Text      onPress={() => setMealTiming('qid')}
 className='font-bold'>QID</Text>
    </View>
    <View className='flex-row items-center w-20 m-2 gap-1'>
  <RadioButton
     value='hs'
     status={mealTiming === 'hs' ? 'checked' : 'unchecked'}
     onPress={() => setMealTiming('hs')}
     color="#2895cb" 
  />
  <Text      onPress={() => setMealTiming('hs')}
 className='font-bold'>HS</Text>
  </View>
  <View className='flex-row items-center   m-2 gap-1'>

  <RadioButton
     value='morning'
     status={mealTiming === 'morning' ? 'checked' : 'unchecked'}
     onPress={() => setMealTiming('morning')}
     color="#2895cb" 
  />
  <Text  onPress={() => setMealTiming('morning')} className='font-bold'>Morning</Text>
  </View>
   
</View>




<Text className='my-2 font-semibold text-base '>Duration</Text>
<View className="relative">
  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'lightgray', borderRadius: 12, backgroundColor: 'white' }}>
    {/* Left Side: User Input (50%) */}
    <TextInput
      value={duration}
      onChangeText={setDuration}
      placeholder="Enter Durationcc"
      mode="flat"
      underlineColor='lightgray'
      activeUnderlineColor='lightgray'
      style={{ flex: 1, backgroundColor: 'white', maxHeight: 55, borderRightColor: 'none' }}
      theme={{ roundness: 12 }}
      
    />

    <TouchableOpacity
      style={{
        flex: 0.5, // Takes 50% width
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}
      onPress={() => setDropDownVisibleDuration(!isDropDownVisibleDuration)}
    >
      <Text style={{ color: 'gray' }}>{selectedDuration || "Select"}</Text>
    </TouchableOpacity>
  </View>

  {/* Dropdown List */}
  {isDropDownVisibleDuration && durationData.length > 0 && (
    <ScrollView
    
      style={{
        maxHeight: 150,
        borderRadius: 10,
        position: 'absolute',
        right: 0,
        top: '100%',
        width: '45%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 50,
      }}
      showsVerticalScrollIndicator={false}
    >
      {durationData.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.9}
          className="p-2 border-b border-gray-200"
          onPress={() => {
            setSelectedDuration(item.value); // Set selected item
            setDropDownVisibleDuration(false); // Hide dropdown
          }}
        >
          <Text className="text-base md:text-lg px-2 py-2">{item.value}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )}
</View>

<Text className='my-2 font-semibold text-base'>Before/ After</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            // iconStyle={styles.iconStyle}
                            data={beforeAfterDate}
                            maxHeight={300}
                            labelField="value"
                            valueField="value"
                            placeholder="Select item"
                            searchPlaceholder="Search..."
                            value={beforeAfter}
                            onChange={item => setBeforeAfter(item.value)}
                        />
                        <View className="mt-6">
                            <CustomSecondaryButton onPress={handleAddDrug} label={'Add Drug'} />
                        </View>
                    </View>
                    </ScrollView>
                </Modal>

                <View className="mt-6 mx-4">
                    <CustomSimpleInput
                        value={instruction}
                        onChange={setInstruction}
                        label="Special Instructions"
                        placeholder="E.g., Take after meals, avoid caffeine, etc."
                    />
                </View>

                <View className="mt-8">
                    <CustomButton link={''} label="Generate Prescription" />
                </View>
            </SafeAreaView>
            </>
    );
};

export default DrugSheet;

const styles = StyleSheet.create({
    dropdown: {
        height: 55,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        elevation: 2,
        
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
