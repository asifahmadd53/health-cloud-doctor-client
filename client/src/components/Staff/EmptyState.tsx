import type { ReactNode } from "react"
import { View, Text, TouchableOpacity } from "react-native"

interface EmptyStateProps {
  title: string
  description: string
  icon: ReactNode
  actionLabel?: string
  onAction?: () => void
}

const EmptyState = ({ title, description, icon, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <View className="flex-1 justify-center items-center p-8">
      <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">{icon}</View>
      <Text className="text-xl font-bold text-gray-800 mb-2">{title}</Text>
      <Text className="text-gray-500 text-center mb-6">{description}</Text>

      {actionLabel && onAction && (
        <TouchableOpacity onPress={onAction} className="bg-cyan-600 px-6 py-3 rounded-lg">
          <Text className="text-white font-medium">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default EmptyState
