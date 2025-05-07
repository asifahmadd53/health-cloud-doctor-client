import type React from "react"
import { View } from "react-native"

type CardProps = {
  children: React.ReactNode
  className?: string
}


const Card: React.FC<CardProps> = ({ children, className }) => {
  return <View className={`bg-white rounded-xl p-4 mb-4 shadow-md ${className || ""}`}>{children}</View>
}

export default Card
