import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Card from "../../components/Doctor/Card";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import CustomHeader from "../../components/CustomHeader";

// Mock payment data
const mockPayments = [
  {
    id: "1",
    patientName: "Emma Thompson",
    amount: 150,
    date: "May 5, 2023",
    status: "completed",
    cardType: "Visa",
    cardLast4: "4242",
  },
  {
    id: "2",
    patientName: "Michael Chen",
    amount: 200,
    date: "May 3, 2023",
    status: "pending",
    cardType: "Mastercard",
    cardLast4: "5678",
  },
  {
    id: "3",
    patientName: "James Wilson",
    amount: 175,
    date: "May 1, 2023",
    status: "completed",
    cardType: "Amex",
    cardLast4: "9876",
  },
  {
    id: "4",
    patientName: "Sophia Garcia",
    amount: 225,
    date: "April 28, 2023",
    status: "failed",
    cardType: "Visa",
    cardLast4: "1234",
  },
  {
    id: "5",
    patientName: "Robert Johnson",
    amount: 300,
    date: "April 25, 2023",
    status: "completed",
    cardType: "Discover",
    cardLast4: "5432",
  },
  {
    id: "6",
    patientName: "Robert Johnson",
    amount: 300,
    date: "April 25, 2023",
    status: "completed",
    cardType: "Discover",
    cardLast4: "5432",
  },
];

const PaymentsScreen = () => {
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | "failed">("all");
  const [payments, setPayments] = useState(mockPayments);

  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true;
    return payment.status === filter;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => {
    if (payment.status === "completed") {
      return sum + payment.amount;
    }
    return sum;
  }, 0);

  const handlePaymentPress = (id: string) => {
    const payment = payments.find((p) => p.id === id);
    if (payment) {
      Alert.alert(
        "Payment Details",
        `Patient: ${payment.patientName}\nAmount: $${payment.amount}\nDate: ${payment.date}\nStatus: ${payment.status}\nCard: ${payment.cardType} ending in ${payment.cardLast4}`
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4">
        <Header title="Payments"/>
      </View>
      <View className="p-4">
        <Card>
          <View className="flex-row items-center">
            <View className="w-14 h-14 rounded-full bg-primary-light items-center justify-center mr-4">
              <MaterialIcon name="attach-money" size={24} color="#0891b2" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1">Total Revenue</Text>
              <Text className="text-2xl font-bold text-gray-800 mb-0.5">${totalAmount.toFixed(2)}</Text>
              <Text className="text-sm text-gray-500">
                {filteredPayments.length} payment{filteredPayments.length !== 1 ? "s" : ""}
              </Text>
            </View>
          </View>
        </Card>
        <ScrollView >
        <View className="my-4">
          <Text className="text-base font-semibold text-gray-600 mb-3 flex-row items-center">
            <MaterialIcon name="filter-list" size={16} color="#4b5563" /> Filter by:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {["all", "completed", "pending", "failed"].map((status) => (
              <TouchableOpacity
                key={status}
                className={`py-2 px-4 rounded-full mr-2 border ${
                  filter === status ? "bg-primary border-primary" : "bg-gray-100 border-gray-300"
                }`}
                onPress={() => setFilter(status as any)}
              >
                <Text
                  className={`text-sm font-medium ${
                    filter === status ? "text-white" : "text-gray-600"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        </ScrollView>
        <Text className="text-lg font-bold text-gray-800 mb-3">Payment History</Text>
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <TouchableOpacity key={payment.id} onPress={() => handlePaymentPress(payment.id)}>
              <Card>
                <Text className="text-base font-semibold text-gray-800">{payment.patientName}</Text>
                <Text className="text-sm text-gray-600">
                  ${payment.amount} - {payment.cardType} ****{payment.cardLast4}
                </Text>
                <Text className="text-sm text-gray-500">{payment.date}</Text>
                <Text className="text-sm text-gray-500 capitalize">Status: {payment.status}</Text>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <Card>
            <Text className="text-base text-gray-500 text-center py-4">
              No payments found with the selected filter.
            </Text>
          </Card>
        )}
      </View>
    
    </SafeAreaView>
  );
};

export default PaymentsScreen;
