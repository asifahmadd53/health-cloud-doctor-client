import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleInput from '@/components/SimpleInput';
import Button from '@/components/Button';
import ReactNativeModal from 'react-native-modal';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';


const SecondPrescriptionPage = () => {
    const [od, setOd] = useState(false);
    const [bd, setBd] = useState(false);
    const [tds, setTds] = useState(false);
    const [qid, setQid] = useState(false);
    const [hs, setHs] = useState(false);
    const [morning, setMorning] = useState(false);
    const [instruction, setInstruction] = useState('');
    const [drug, setDrug] = useState('');
    const [checked, setChecked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValueDrug, setSelectedValueDrug] = useState('');

    const dropdownData = [
        { label: 'Tablet', value: '1' },
        { label: 'Capsule', value: '2' },
        { label: 'Syrup', value: '3' },
        { label: 'Cream/Lotion', value: '4' },
        { label: 'Nebulizer', value: '5' },
        { label: 'Injection', value: '6' },
    ];
    const dropdownDataDrug = [
        { label: 'Oral', value: '1' },
        { label: 'IV', value: '2' },
        { label: 'IM', value: '3' },
        { label: 'Eye Drop', value: '4' },
        { label: 'Nasal Spray', value: '5' },
        { label: 'Ear Drop', value: '6' },
    ];
    return (
        <SafeAreaView className="flex-1 bg-gray-50 px-5 py-6">



            <View className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <Text className="text-lg font-semibold text-gray-800 mb-3">Prescribed Medications</Text>

                <View className="space-y-2 mt-3">
                    <Text className="text-base text-gray-700">1. Tab Augmentin 625mg</Text>
                    <Text className="text-base text-gray-700">2. Tab Panadol 500mg</Text>
                </View>


                <TouchableOpacity onPress={() => setIsVisible(!isVisible)} className="mt-4 bg-blue-100 py-2 rounded-md items-center active:bg-blue-200">
                    <Text className="font-semibold">+ Add More</Text>
                </TouchableOpacity>
            </View>
            <ReactNativeModal isVisible className="bg-white h-screen m-0">
                <View className="flex-1 justify-start px-3 pt-4">
                    {/* Drug Input */}
                    <SimpleInput label="Drug" placeholder="Enter the Drug" onChangeText={setDrug} value={drug} />

                    <Text className="text-lg mb-2 my-3 px-3">Type</Text>

                    <Dropdown

                        data={dropdownData}
                        value={selectedValue}
                        iconStyle={{ tintColor: 'black' }}
                        onChange={(item) => setSelectedValue(item.value)}
                        labelField="label"
                        valueField="value"

                        search
                        renderInputSearch={(onSearch) => (
                            <View className="p-3 border-b">
                                <TextInput
                                    placeholder="Search..."
                                    onChangeText={onSearch}
                                    mode="flat" // Removes underline
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor="#0077B6"
                                    style={{
                                        backgroundColor: 'white',
                                        fontSize: 16,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: '#0077B6',
                                        paddingHorizontal: 12,
                                    }}
                                    left={<TextInput.Icon icon="magnify" color="#0077B6" />}
                                />
                            </View>
                        )}
                        style={{
                            width: '95%',
                            marginHorizontal: 'auto',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                            borderRadius: 8,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            backgroundColor: 'white',
                        }}
                        selectedTextStyle={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000',
                        }}
                        placeholderStyle={{
                            fontSize: 16,
                            color: '#6B7280',
                        }}
                        containerStyle={{
                            borderRadius: 8,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                        }}
                        itemTextStyle={{
                            fontSize: 14,
                            color: '#333',
                        }}
                        renderRightIcon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                    />
                    <Text className="text-lg mb-2 my-3 px-3">Mode of Drug</Text>

                    <Dropdown

                        data={dropdownDataDrug}
                        value={selectedValueDrug}
                        iconStyle={{ tintColor: 'black' }}
                        onChange={(item) => setSelectedValueDrug(item.value)}
                        labelField="label"
                        valueField="value"
                        search
                        renderInputSearch={(onSearch) => (
                            <View className="p-3 border-b">
                                <TextInput
                                    placeholder="Search..."
                                    onChangeText={onSearch}
                                    mode="flat" // Removes underline
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor="#0077B6"
                                    style={{
                                        backgroundColor: 'white',
                                        fontSize: 16,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: '#0077B6',
                                        paddingHorizontal: 12,
                                    }}
                                    left={<TextInput.Icon icon="magnify" color="#0077B6" />}
                                />
                            </View>
                        )}
                        style={{
                            width: '95%',
                            marginHorizontal: 'auto',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                            borderRadius: 8,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            backgroundColor: 'white',
                        }}
                        selectedTextStyle={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000',
                        }}
                        placeholderStyle={{
                            fontSize: 16,
                            color: '#6B7280',
                        }}
                        containerStyle={{
                            borderRadius: 8,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                        }}
                        itemTextStyle={{
                            fontSize: 14,
                            color: '#333',
                        }}
                        renderRightIcon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                    />
                    <Text className="text-lg mb-2 my-3 px-3">Mode of Drug</Text>

                    <Dropdown

                        data={dropdownDataDrug}
                        value={selectedValueDrug}
                        iconStyle={{ tintColor: 'black' }}
                        onChange={(item) => setSelectedValueDrug(item.value)}
                        labelField="label"
                        valueField="value"
                        search
                        renderInputSearch={(onSearch) => (
                            <View className="p-3 border-b">
                                <TextInput
                                    placeholder="Search..."
                                    onChangeText={onSearch}
                                    mode="flat" // Removes underline
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor="#0077B6"
                                    style={{
                                        backgroundColor: 'white',
                                        fontSize: 16,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: '#0077B6',
                                        paddingHorizontal: 12,
                                    }}
                                    left={<TextInput.Icon icon="magnify" color="#0077B6" />}
                                />
                            </View>
                        )}
                        style={{
                            width: '95%',
                            marginHorizontal: 'auto',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                            borderRadius: 8,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            backgroundColor: 'white',
                        }}
                        selectedTextStyle={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000',
                        }}
                        placeholderStyle={{
                            fontSize: 16,
                            color: '#6B7280',
                        }}
                        containerStyle={{
                            borderRadius: 8,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                        }}
                        itemTextStyle={{
                            fontSize: 14,
                            color: '#333',
                        }}
                        renderRightIcon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                    />



                    <View className='mt-5 px-3'>
                        <Text className='text-lg pb-2'>Timings of Drug</Text>
                        <View className="flex-row flex-wrap">
                            <CheckBox
                                center
                                title={<Text>OD</Text>}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={od}
                                onPress={() => setOd(!od)}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                            <CheckBox
                                center
                                title={<Text>BD</Text>}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={bd}
                                onPress={() => setBd(!bd)}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                            <CheckBox
                                center
                                title={<Text>TDS</Text>}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={tds}
                                onPress={() => setTds(!tds)}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                            <CheckBox
                                center
                                title={<Text>QID</Text>}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={qid}
                                onPress={() => setQid(!qid)}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                            <CheckBox
                                center
                                title={<Text>HS</Text>}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={hs}
                                onPress={() => setHs(!hs)}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                            <CheckBox
                                center
                                title={<Text>Morning</Text>}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={morning}
                                onPress={() => setMorning(!morning)}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />

                        </View>
                    </View>
                    <Text className="text-lg mb-2 my-3 px-3">Mode of Drug</Text>

                    <Dropdown

                        data={dropdownDataDrug}
                        value={selectedValueDrug}
                        iconStyle={{ tintColor: 'black' }}
                        onChange={(item) => setSelectedValueDrug(item.value)}
                        labelField="label"
                        valueField="value"
                        search
                        renderInputSearch={(onSearch) => (
                            <View className="p-3 border-b">
                                <TextInput
                                    placeholder="Search..."
                                    onChangeText={onSearch}
                                    mode="flat" // Removes underline
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor="#0077B6"
                                    style={{
                                        backgroundColor: 'white',
                                        fontSize: 16,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: '#0077B6',
                                        paddingHorizontal: 12,
                                    }}
                                    left={<TextInput.Icon icon="magnify" color="#0077B6" />}
                                />
                            </View>
                        )}
                        style={{
                            width: '95%',
                            marginHorizontal: 'auto',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                            borderRadius: 8,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            backgroundColor: 'white',
                        }}
                        selectedTextStyle={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000',
                        }}
                        placeholderStyle={{
                            fontSize: 16,
                            color: '#6B7280',
                        }}
                        containerStyle={{
                            borderRadius: 8,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                        }}
                        itemTextStyle={{
                            fontSize: 14,
                            color: '#333',
                        }}
                        renderRightIcon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                    />
                    <Text className="text-lg mb-2 my-3 px-3">Mode of Drug</Text>

                    <Dropdown

                        data={dropdownDataDrug}
                        value={selectedValueDrug}
                        iconStyle={{ tintColor: 'black' }}
                        onChange={(item) => setSelectedValueDrug(item.value)}
                        labelField="label"
                        valueField="value"
                        search
                        renderInputSearch={(onSearch) => (
                            <View className="p-3 border-b">
                                <TextInput
                                    placeholder="Search..."
                                    onChangeText={onSearch}
                                    mode="flat" // Removes underline
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    selectionColor="#0077B6"
                                    style={{
                                        backgroundColor: 'white',
                                        fontSize: 16,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: '#0077B6',
                                        paddingHorizontal: 12,
                                    }}
                                    left={<TextInput.Icon icon="magnify" color="#0077B6" />}
                                />
                            </View>
                        )}
                        style={{
                            width: '95%',
                            marginHorizontal: 'auto',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                            borderRadius: 8,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            backgroundColor: 'white',
                        }}
                        selectedTextStyle={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000',
                        }}
                        placeholderStyle={{
                            fontSize: 16,
                            color: '#6B7280',
                        }}
                        containerStyle={{
                            borderRadius: 8,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                        }}
                        itemTextStyle={{
                            fontSize: 14,
                            color: '#333',
                        }}
                        renderRightIcon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                    />

                </View>
               <View className=''>
               <Button label={'Add Drug'} link={''} />
               </View>
            </ReactNativeModal>



            <View className="mt-6">
                <SimpleInput
                    value={instruction}
                    onChangeText={setInstruction}
                    label="Special Instructions"
                    placeholder="E.g., Take after meals, avoid caffeine, etc."
                />
            </View>


            <View className="mt-8">
                <Button link={''} label="Generate Prescription" />
            </View>
        </SafeAreaView>
    );
};

export default SecondPrescriptionPage;
