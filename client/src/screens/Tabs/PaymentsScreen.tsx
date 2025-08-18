"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../../components/Header"

const mockPayments = [
  {
    id: "1",
    patientName: "Emma Thompson",
    amount: 150,
    date: "May 5, 2023",
    status: "completed",
    cardType: "Visa",
    cardLast4: "4242",
    serviceType: "Consultation",
  },
  {
    id: "2",
    patientName: "Michael Chen",
    amount: 200,
    date: "May 3, 2023",
    status: "pending",
    cardType: "Mastercard",
    cardLast4: "5678",
    serviceType: "Follow-up",
  },
  {
    id: "3",
    patientName: "James Wilson",
    amount: 175,
    date: "May 1, 2023",
    status: "completed",
    cardType: "Amex",
    cardLast4: "9876",
    serviceType: "Consultation",
  },
  {
    id: "4",
    patientName: "Sophia Garcia",
    amount: 225,
    date: "April 28, 2023",
    status: "failed",
    cardType: "Visa",
    cardLast4: "1234",
    serviceType: "Procedure",
  },
  {
    id: "5",
    patientName: "Robert Johnson",
    amount: 300,
    date: "April 25, 2023",
    status: "completed",
    cardType: "Discover",
    cardLast4: "5432",
    serviceType: "Procedure",
  },
  {
    id: "6",
    patientName: "Lisa Anderson",
    amount: 125,
    date: "April 23, 2023",
    status: "completed",
    cardType: "Visa",
    cardLast4: "8765",
    serviceType: "Consultation",
  },
]

const PaymentsScreen = () => {
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | "failed">("all")
  const [payments, setPayments] = useState(mockPayments)

  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true
    return payment.status === filter
  })

  const totalAmount = filteredPayments.reduce((sum, payment) => {
    if (payment.status === "completed") {
      return sum + payment.amount
    }
    return sum
  }, 0)

  const completedPayments = filteredPayments.filter((p) => p.status === "completed").length
  const pendingPayments = filteredPayments.filter((p) => p.status === "pending").length
  const failedPayments = filteredPayments.filter((p) => p.status === "failed").length

  const handlePaymentPress = (id: string) => {
    const payment = payments.find((p) => p.id === id)
    if (payment) {
      Alert.alert(
        "Payment Details",
        `Patient: ${payment.patientName}\nService: ${payment.serviceType}\nAmount: $${payment.amount}\nDate: ${payment.date}\nStatus: ${payment.status}\nCard: ${payment.cardType} ending in ${payment.cardLast4}`,
      )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-emerald-600"
      case "pending":
        return "text-amber-600"
      case "failed":
        return "text-red-600"
      default:
        return "text-slate-600"
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50"
      case "pending":
        return "bg-amber-50"
      case "failed":
        return "bg-red-50"
      default:
        return "bg-slate-50"
    }
  }

  return (
    <>
        <Header title="Payment Dashboard" />
    <SafeAreaView className="flex-1 bg-slate-50">

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-800">Revenue Overview</Text>
              <View className="w-10 h-10 rounded-full bg-violet-100 items-center justify-center">
                <MaterialIcon name="trending-up" size={20} color="#8b5cf6" />
              </View>
            </View>

            <View className="flex-row items-end mb-2">
              <Text className="text-3xl font-bold text-slate-900">${totalAmount.toLocaleString()}</Text>
              <Text className="text-sm text-slate-500 ml-2 mb-1">USD</Text>
            </View>

            <Text className="text-sm text-slate-600 mb-4">
              Total from {completedPayments} completed payment{completedPayments !== 1 ? "s" : ""}
            </Text>

            <View className="flex-row justify-between">
              <View className="flex-1 bg-emerald-50 rounded-xl p-3 mr-2">
                <Text className="text-xs font-medium text-emerald-700 mb-1">Completed</Text>
                <Text className="text-lg font-bold text-emerald-800">{completedPayments}</Text>
              </View>
              <View className="flex-1 bg-amber-50 rounded-xl p-3 mx-1">
                <Text className="text-xs font-medium text-amber-700 mb-1">Pending</Text>
                <Text className="text-lg font-bold text-amber-800">{pendingPayments}</Text>
              </View>
              <View className="flex-1 bg-red-50 rounded-xl p-3 ml-2">
                <Text className="text-xs font-medium text-red-700 mb-1">Failed</Text>
                <Text className="text-lg font-bold text-red-800">{failedPayments}</Text>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <View className="flex-row items-center mb-3">
              <MaterialIcon name="filter-list" size={18} color="#64748b" />
              <Text className="text-base font-semibold text-slate-700 ml-2">Filter Payments</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {["all", "completed", "pending", "failed"].map((status) => (
                <TouchableOpacity
                  key={status}
                  className={`py-2 px-5 rounded-full mr-3 border-2 ${
                    filter === status ? "bg-secondary border-secondary" : "bg-white border-slate-200"
                  }`}
                  onPress={() => setFilter(status as any)}
                >
                  <Text className={`text-sm font-semibold ${filter === status ? "text-white" : "text-slate-600"}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-slate-800">Payment History</Text>
            <Text className="text-sm text-slate-500">{filteredPayments.length} transactions</Text>
          </View>

          {filteredPayments.length > 0 ? (
            <View className="space-y-3">
              {filteredPayments.map((payment) => (
                <TouchableOpacity
                  key={payment.id}
                  onPress={() => handlePaymentPress(payment.id)}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 active:bg-slate-50"
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <Text className="text-base font-bold text-slate-900 mb-1">{payment.patientName}</Text>
                      <Text className="text-sm text-slate-600 mb-2">{payment.serviceType}</Text>
                    </View>

                    <View className="items-end">
                      <Text className="text-lg font-bold text-slate-900 mb-1">${payment.amount}</Text>
                      <View className={`px-3 py-1 rounded-full ${getStatusBgColor(payment.status)}`}>
                        <Text className={`text-xs font-semibold capitalize ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between pt-3 border-t border-slate-100">
                    <View className="flex-row items-center">
                      <MaterialIcon name="credit-card" size={16} color="#64748b" />
                      <Text className="text-sm text-slate-600 ml-2">
                        {payment.cardType} ••••{payment.cardLast4}
                      </Text>
                    </View>

                    <View className="flex-row items-center">
                      <MaterialIcon name="schedule" size={16} color="#64748b" />
                      <Text className="text-sm text-slate-600 ml-2">{payment.date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 items-center">
              <MaterialIcon name="receipt-long" size={48} color="#cbd5e1" />
              <Text className="text-base font-medium text-slate-600 mt-3 mb-1">No payments found</Text>
              <Text className="text-sm text-slate-500 text-center">Try adjusting your filter to see more results</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default PaymentsScreen
