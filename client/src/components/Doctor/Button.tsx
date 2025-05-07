import type React from "react"
import { TouchableOpacity, Text, ActivityIndicator } from "react-native"

type ButtonProps = {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline" | "danger"
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  className?: string
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  loading = false,
  className = "",
  icon,
}) => {
  const getButtonClass = () => {
    switch (variant) {
      case "primary":
        return "bg-primary border border-primary"
      case "secondary":
        return "bg-secondary border border-secondary"
      case "outline":
        return "bg-transparent border border-primary"
      case "danger":
        return "bg-danger border border-danger"
      default:
        return "bg-primary border border-primary"
    }
  }

  const getTextClass = () => {
    switch (variant) {
      case "outline":
        return "text-primary"
      default:
        return "text-white"
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      className={`py-3 px-6 rounded-lg flex-row justify-center items-center ${getButtonClass()} ${
        fullWidth ? "w-full" : ""
      } ${disabled ? "opacity-50" : ""} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#0891b2" : "#fff"} />
      ) : (
        <>
          {icon}
          <Text className={`font-semibold text-base ${getTextClass()}`}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}

export default Button
