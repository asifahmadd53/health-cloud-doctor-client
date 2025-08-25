'use client';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {useState, useRef, useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import CustomSecondaryButton from '../../components/CustomSecondaryButton';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import FormInput from '../../components/Doctor/FormInput';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CustomInput from '../../components/CustomInput';
import { TextInput } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../api/api';

const DrugSheet = () => {
  const [drugsList, setDrugsList] = useState([]);
  const [instruction, setInstruction] = useState('');
  const [selectedDrug, setSelectedDrug] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedStrength, setSelectedStrength] = useState('');
  const [Dosage, setDosage] = useState('');
  const [selectedDosage, setSelectedDosage] = useState('');
  const [mealTiming, setMealTiming] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [beforeAfter, setBeforeAfter] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropDownVisible, setDropDownVisible] = useState(false);
  const [isDropDownVisibleDosage, setDropDownVisibleDosage] = useState(false);
  const [isDropDownVisibleDuration, setDropDownVisibleDuration] = useState(false);
  const [timing, setTiming] = useState('Before Meal');
  const bottomSheetRef = useRef<BottomSheet>(null);
   const [allDrugs, setAllDrugs] = useState<any[]>([]);
  const [pickedDrug,   setPickedDrug]   = useState('');
  const [pickedType,   setPickedType]   = useState('');
  const [pickedMode,   setPickedMode]   = useState('');
  const mealOptions = ['od', 'bd', 'tds', 'qid', 'hs', 'morning'];
  

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  const toggleModal = () => setModalVisible(!isModalVisible);



  const dosageData = [
    {key: '1', value: 'Once a day'},
    {key: '2', value: 'Twice a day'},
    {key: '3', value: 'Three times a day'},
    {key: '4', value: 'Every 6 hours'},
  ];
  const durationData = [
    {key: '1', value: 'Days'},
    {key: '2', value: 'Weeks'},
    {key: '3', value: 'Months'},
  ];

  // Function to hide all dropdowns
  const hideAllDropdowns = () => {
    setDropDownVisible(false);
    setDropDownVisibleDosage(false);
    setDropDownVisibleDuration(false);
    Keyboard.dismiss();
  };

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
      alert('Please fill all fields before adding!');
      return;
    }

    const parsedDuration = Number.parseInt(duration.trim(), 10);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      alert('Please enter a valid duration.');
      return;
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
    };

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
    );

    if (isDuplicate) {
      alert('This medication is already added!');
      return;
    }

    // Add new drug to the list
    setDrugsList(prevList => [...prevList, newDrug]);

    // Close modal and reset input fields
    setModalVisible(false);
    // setDrug("")
    setSelectedDrug('');
    setSelectedType('');
    setSelectedMode('');
    setSelectedStrength('');
    setSelectedDosage('');
    setDuration('');
    setBeforeAfter('');
  };

  const handleDosagePress = e => {
    e.stopPropagation();

    setDropDownVisible(false);
    setDropDownVisibleDuration(false);

    setDropDownVisibleDosage(!isDropDownVisibleDosage);
  };

  const handleDurationPress = e => {
    e.stopPropagation();

    setDropDownVisible(false);
    setDropDownVisibleDosage(false);

    setDropDownVisibleDuration(!isDropDownVisibleDuration);
  };

  const inputRef = useRef<TextInput>(null);

  const focusSearch = () => {
    setTimeout(() => inputRef.current?.focus(), 250);
  };

useEffect(() => {
  const fetchDrugs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/drugs/get-all-drugs`);
      if (data?.drugsList) {
        setAllDrugs(data.drugsList);
      } else {
        console.warn("No drugs list found in response:", data);
      }
    } catch (error) {
      console.error("Failed to fetch drugs:", error);
    }
  };

  fetchDrugs();
}, []);


const medicineData = allDrugs.map(item => ({
  label: item.name,
  value: item._id, // keep id for reference
}));

  const selectedDrugObj = allDrugs.find(d => d._id === selectedDrug);


const typeOptions = selectedDrugObj
  ? selectedDrugObj.type.map(type => ({ label: type.name, value: type.name }))
  : [];

const selectedTypeObj = selectedDrugObj?.type.find(type => type.name === selectedType);


const modeOptions = selectedTypeObj
  ? selectedTypeObj.dosageMode.map(mode => ({ label: mode, value: mode }))
  : [];


const strengthOptions = selectedTypeObj
  ? selectedTypeObj.dosageStrength.map(strength=> ({ label: strength, value: strength }))
  : [];

useEffect(() => {
  if (modeOptions.length === 1) {
    setSelectedMode(modeOptions[0].value);
  }
}, [modeOptions]);

useEffect(() => {
  if (strengthOptions.length === 1) {
    setSelectedStrength(strengthOptions[0].value);
  }
}, [strengthOptions]);



  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="Prescription" />
      <View className="flex-1 px-4">
        <View className="bg-white p-5 rounded-xl shadow-sm mx-4 border-gray-200 border mt-10">
          <Text className="text-xl font-bold text-gray-800 mb-3">
            Prescribed Medications
          </Text>
          <View className="mt-3 space-y-3">
            {drugsList.length > 0 ? (
              drugsList.map((item: any, index: any) => (
                <View
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-row items-center space-x-3">
                  {/* Drug Information */}
                  <View className="flex-1">
                    <Text className="font-bold text-lg text-gray-800">
                      {index + 1}. {item.type} {item.name} ({item.mode})
                    </Text>
                    <Text className="text-sm text-gray-600 mt-1">
                      <Text className="font-semibold text-gray-700">
                        Strength:
                      </Text>{' '}
                      {item.strength} |
                      <Text className="font-semibold text-gray-700">
                        {' '}
                        Dosage:
                      </Text>{' '}
                      {item.dosage} |
                      <Text className="font-semibold text-gray-700">
                        {' '}
                        Duration:
                      </Text>{' '}
                      {item.duration} days
                    </Text>
                    <Text className="text-sm text-gray-600 mt-1">
                      <Text className="font-semibold text-gray-700">
                        Timing:
                      </Text>{' '}
                      {item.mealTiming} |
                      <Text className="font-semibold text-gray-700">
                        {' '}
                        Before/After:
                      </Text>{' '}
                      {item.beforeAfter}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-gray-500 text-center py-8 text-lg font-medium">
                No medications added yet
              </Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => bottomSheetRef.current?.expand()}
            className="mt-4 bg-[#d3ecf8] py-3.5 rounded-lg items-center active:bg-[#d3ecf8]">
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
          <CustomButton link={''} label="Generate Prescription" />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['90%']}
          index={-1}
          backgroundStyle={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: 'white',
          }}
          enablePanDownToClose // allow swipe down to fully close
          onChange={handleSheetChanges}>
          <View className="flex-row justify-between items-center px-6 py-5 border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-800">
              Add Medication
            </Text>
            <TouchableOpacity
              onPress={toggleModal}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <MaterialCommunityIcons name="close" size={22} color="#2895cb" />
            </TouchableOpacity>
          </View>
          <BottomSheetScrollView style={{flex: 1, padding: 10}}>
            <View className="bg-white rounded-t-3xl shadow-xl">
              {/* Wrap ScrollView with TouchableWithoutFeedback to handle background taps */}
              <TouchableWithoutFeedback onPress={hideAllDropdowns}>
                <View className="p-3 pb-10">
                  <Text className="text-base font-semibold text-gray-700 mb-2">
                    Choose Drug Name
                  </Text>

                 <Dropdown
                  containerStyle={{borderRadius: 8}}
                    style={styles.consistentDropdown}
                    placeholderStyle={styles.consistentPlaceholder}
                    selectedTextStyle={styles.consistentSelectedText}
                    inputSearchStyle={styles.consistentInputSearch}
                    iconStyle={styles.consistentIcon}
                    itemTextStyle={styles.consistentItemText}
                    data={medicineData}
                    search
                    renderInputSearch={onSearch => (
                     <FormInput
          ref={inputRef}
          style={styles.consistentInputSearch}
          placeholder="Search drug..."
          onChangeText={onSearch}
        />
                    )}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Enter Drug Name"
                    searchPlaceholder="Search drug..."
                    value={selectedDrug}
                    onChange={item => {
    setSelectedDrug(item.value);
    setSelectedType('');
    setSelectedMode('');
    setSelectedStrength('');
  }}
                    onFocus={focusSearch}
                    
                  />

                  <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">
                    Type
                  </Text>
                  <Dropdown
                    containerStyle={{borderRadius: 8}}
                    data={typeOptions}
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
                    onChange={item => {
    setSelectedType(item.value);
    setSelectedMode('');
    setSelectedStrength('');
  }}
                    onFocus={() => hideAllDropdowns()}
                  />

                  <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">
                    Mode of Drug
                  </Text>
                  <Dropdown
                  containerStyle={{borderRadius: 8}}
                    style={styles.consistentDropdown}
                    placeholderStyle={styles.consistentPlaceholder}
                    selectedTextStyle={styles.consistentSelectedText}
                    inputSearchStyle={styles.consistentInputSearch}
                    iconStyle={styles.consistentIcon}
                    itemTextStyle={styles.consistentItemText}
                    data={modeOptions}
                    search={false}
                    maxHeight={300}
                    labelField="value"
                    valueField="value"
                    placeholder="Select mode"
                    searchPlaceholder="Search..."
                    value={selectedMode}
                    onChange={item => setSelectedMode(item.value)}
                    onFocus={() => hideAllDropdowns()}
                  />

                  <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">
                    Strength
                  </Text>
                  <Dropdown
                   containerStyle={{borderRadius: 8}}
                    style={styles.consistentDropdown}
                        placeholderStyle={styles.consistentPlaceholder}
                        selectedTextStyle={styles.consistentSelectedText}
                        inputSearchStyle={styles.consistentInputSearch}
                        iconStyle={styles.consistentIcon}
                        itemTextStyle={styles.consistentItemText}
                    data={strengthOptions}
                    search={false}
                    maxHeight={300}
                    labelField="value"
                    valueField="value"
                    placeholder="Select strength"
                    searchPlaceholder="Search..."
                    value={selectedStrength}
                    onChange={item => setSelectedStrength(item.value)}
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
                        style={{height: 48}}
                      />
                    </View>

                    {/* Dropdown fixed width */}

                    <View className="w-1/2">
                      <Dropdown
                       containerStyle={{borderRadius: 8}}
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
                        onChange={item => {
                          setSelectedDosage(item.value);
                          hideAllDropdowns();
                        }}
                        onFocus={() => hideAllDropdowns()}
                        renderItem={item => (
                          <View style={styles.dropdownItemContainer}>
                            <Text
                              style={styles.dropdownItemText}
                              numberOfLines={2}>
                              {item.value}
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  </View>

                  <Text className="text-base font-semibold text-gray-700 mb-2 mt-4">
                    Timing of Drugs
                  </Text>
                  <View className="flex-row flex-wrap bg-gray-100 p-2 rounded-xl">
                    {mealOptions.map(option => (
                      <Pressable
                        key={option}
                        onPress={() => {
                          setMealTiming(option);
                          hideAllDropdowns();
                        }}
                        className={`px-4 py-2 m-2 rounded-lg border justify-center items-center 
            ${
              mealTiming === option
                ? 'bg-secondary border-secondary'
                : 'bg-white border-gray-300'
            }
          `}>
                        <Text
                          className={`font-semibold ${
                            mealTiming === option
                              ? 'text-white'
                              : 'text-gray-700'
                          }`}>
                          {option.toUpperCase()}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <View className="flex-row items-center w-full gap-2 mt-4">
                    <View className="flex-1 ">
                      <CustomInput
                        label="Duration"
                        value={duration}
                        onChange={setDuration}
                        placeholder="Enter Duration"
                        keyboardType="numeric"
                        onFocus={() => {
                          setDropDownVisible(false);
                          setDropDownVisibleDosage(false);
                          setDropDownVisibleDuration(false);
                        }}
                        style={{height: 48,backgroundColor:"white"}}
                      />
                    </View>
                    
                    {/* Dropdown fixed width */}

                    <View className="w-1/2">
                      <Dropdown
                       containerStyle={{borderRadius: 8}}
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
                        onChange={item => {
                          setSelectedDuration(item.value);
                          hideAllDropdowns();
                        }}
                        onFocus={() => hideAllDropdowns()}
                        renderItem={item => (
                          <View style={styles.dropdownItemContainer}>
                            <Text
                              style={styles.dropdownItemText}
                              numberOfLines={2}>
                              {item.value}
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  </View>

                  <Text className="text-base font-semibold text-gray-700 mb-4">
                    Before/After
                  </Text>
                  <View className="flex-row bg-gray-100 rounded-full p-1">
                    {['Before Meal', 'After Meal'].map(option => (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        key={option}
                        onPress={() => setTiming(option)}
                        className={`flex-1 py-2 rounded-full ${
                          timing === option ? 'bg-secondary' : 'bg-gray-100'
                        }`}>
                        <Text
                          className={`text-center ${
                            timing === option
                              ? 'text-white font-semibold'
                              : 'text-gray-600'
                          }`}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View className="mt-8">
                    <CustomSecondaryButton
                      onPress={handleAddDrug}
                      label={'Add Drug'}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default DrugSheet;

const styles = StyleSheet.create({
  consistentDropdown: {
    height: 50, 
    backgroundColor: '#fff',
    borderRadius: 7, 
    paddingHorizontal: 10, 
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  consistentPlaceholder: {
    fontSize: 16, 
    color: '#9ca3af',
  },
  consistentSelectedText: {
    fontSize: 16, 
    color: 'black', 
  },
  consistentInputSearch: {
    height: 48,
    fontSize: 16,
    borderRadius: 7,
    color: 'black',
  },
  consistentIcon: {
    tintColor: '#9ca3af',
  },
  consistentItemText: {
    fontSize: 16,
    color: 'black',
  },

  dropdownItemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    minHeight: 48,
    justifyContent: 'center',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1f2937',
    flexWrap: 'wrap',
    lineHeight: 20,
  },
  // Legacy styles (keeping for compatibility)
  dropdown: {
    height: 56,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#9ca3af',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#1f2937',
  },
  inputSearchStyle: {
    height: 48,
    fontSize: 16,
    borderRadius: 8,
  },
  inputWrapper: {
    width: '100%',
  },
  splitInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  splitInputRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 56,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e7eb',
  },
  dropdownText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  dropdownList: {
    maxHeight: 200,
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    top: '100%',
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 50,
    marginTop: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
});
