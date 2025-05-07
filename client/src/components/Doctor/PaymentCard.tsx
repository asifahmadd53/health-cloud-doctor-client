import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"

// import { CreditCard, CheckCircle, XCircle, Clock } from "lucide-react-native"

type PaymentCardProps = {
  payment: {
    id: string
    patientName: string
    amount: number
    date: string
    status: "completed" | "pending" | "failed"
    cardType?: string
    cardLast4?: string
  }
  onPress: (id: string) => void
  className?: string
}


const PaymentCard: React.FC<PaymentCardProps> = ({ payment, onPress, className = "" }) => {
  const getStatusColor = () => {
    switch (payment.status) {
      case "completed":
        return "text-green-500"
      case "pending":
        return "text-amber-500"
      case "failed":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  // const getStatusIcon = () => {
  //   switch (payment.status) {
  //     case "completed":
  //       return <CheckCircle size={16} color="#10b981" />
  //     case "pending":
  //       return <Clock size={16} color="#f59e0b" />
  //     case "failed":
  //       return <XCircle size={16} color="#ef4444" />
  //     default:
  //       return null
  //   }
  // }

  return (
    <TouchableOpacity
      className={`bg-white rounded-xl p-4 mb-4 shadow-md ${className}`}
      onPress={() => onPress(payment.id)}
    >
      <View className="flex-row items-center mb-3">
        <View className="w-12 h-12 rounded-full bg-primary-light items-center justify-center mr-3">
          {/* <CreditCard size={24} color="#0891b2" /> */}
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">${payment.amount.toFixed(2)}</Text>
          <View className="flex-row items-center">
            {/* {getStatusIcon()} */}
            <Text className={`ml-1 font-medium ${getStatusColor()}`}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      <View className="mb-3">
        <Text className="text-base font-semibold text-gray-800 mb-1">{payment.patientName}</Text>
        <Text className="text-sm text-gray-500">{payment.date}</Text>
      </View>

      {payment.cardType && payment.cardLast4 && (
        <View className="pt-3 border-t border-gray-200">
          <Text className="text-sm text-gray-500">
            {payment.cardType} •••• {payment.cardLast4}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default PaymentCard
