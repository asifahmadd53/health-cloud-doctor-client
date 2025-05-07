import type React from "react"
import { View, Text } from "react-native"


type StatCardProps = {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  change?: {
    value: number
    isPositive: boolean
  }
  className?: string
}



const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, change, className = "" }) => {
  return (
    <View className={`bg-white rounded-xl p-4 flex-1 mx-1.5 shadow-md ${className}`}>
      <View className="flex-row justify-between items-center mb-3">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center bg-opacity-20`}
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </View>
        {change && (
          <View className={`px-2 py-1 rounded-full ${change.isPositive ? "bg-green-100" : "bg-red-100"}`}>
            <Text className={`text-xs font-semibold ${change.isPositive ? "text-green-600" : "text-red-600"}`}>
              {change.isPositive ? "+" : "-"}
              {Math.abs(change.value)}%
            </Text>
          </View>
        )}
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-1">{value}</Text>
      <Text className="text-sm text-gray-500">{title}</Text>
    </View>
  )
}

export default StatCard
