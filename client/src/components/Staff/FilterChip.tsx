import { TouchableOpacity, Text } from "react-native"

interface FilterChipProps {
  label: string
  active: boolean
  onPress: () => void
}

const FilterChip = ({ label, active, onPress }: FilterChipProps) => {
  return (
    <TouchableOpacity activeOpacity={.90} onPress={onPress} className={`px-5 py-2 mr-2 rounded-full ${active ? "bg-cyan-600" : "bg-gray-200"}`}>
      <Text className={`text-base font-medium ${active ? "text-white" : "text-gray-700"}`}>{label}</Text>
    </TouchableOpacity>
  )
}

export default FilterChip
