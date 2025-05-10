import { View, TextInput, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
}

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-lg p-3 py-3">
      <MaterialCommunityIcons name="magnify" size={20} color="#6b7280" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search appointments..."
        placeholderTextColor="#9ca3af"
        className="flex-1 ml-2 text-gray-800"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <MaterialCommunityIcons name="close" size={18} color="#6b7280" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchBar
