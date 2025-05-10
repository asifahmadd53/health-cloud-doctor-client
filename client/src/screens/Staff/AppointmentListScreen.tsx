"use client";
import { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import Header from "../../components/Header";
import AppointmentCard from "../../components/Staff/AppointmentCard";
import SearchBar from "../../components/Staff/SearchBar";
import EmptyState from "../../components/Staff/EmptyState";
import FilterChip from "../../components/Staff/FilterChip";
import { fetchAppointments } from "../../utils/libs/services/appointmentService";
import type { Appointment } from "../../utils/libs/types/appointment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

// Memoize the AppointmentCard to prevent unnecessary re-renders
const MemoizedAppointmentCard = React.memo(AppointmentCard);

const AppointmentListScreen = () => {
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchAppointments();
            setAppointments(data);
            setFilteredAppointments(data);
        } catch (error) {
            Alert.alert("Error", "Failed to load appointments");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = useCallback(
        (query: string) => {
            setSearchQuery(query);
            if (!query.trim()) {
                applyFilter(activeFilter, appointments);
                return;
            }
            const filtered = appointments.filter(
                (appointment) =>
                    appointment.patientName
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    appointment.contactNumber.includes(query),
            );
            setFilteredAppointments(filtered);
        },
        [appointments, activeFilter],
    );

    const applyFilter = useCallback(
        (filter: string, appts = appointments) => {
            setActiveFilter(filter);
            let filtered: Appointment[] = [];
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            switch (filter) {
                case "all":
                    filtered = appts;
                    break;
                case "today":
                    filtered = appts.filter((appointment) => {
                        const appointmentDate = new Date(appointment.date);
                        appointmentDate.setHours(0, 0, 0, 0);
                        return appointmentDate.getTime() === today.getTime();
                    });
                    break;
                case "upcoming":
                    filtered = appts.filter((appointment) => {
                        const appointmentDate = new Date(appointment.date);
                        appointmentDate.setHours(0, 0, 0, 0);
                        return appointmentDate.getTime() > today.getTime();
                    });
                    break;
                case "past":
                    filtered = appts.filter((appointment) => {
                        const appointmentDate = new Date(appointment.date);
                        appointmentDate.setHours(0, 0, 0, 0);
                        return appointmentDate.getTime() < today.getTime();
                    });
                    break;
                default:
                    filtered = appts;
            }
            setFilteredAppointments(filtered);
        },
        [appointments],
    );

    const handleDeleteAppointment = useCallback(
        (id: string) => {
            Alert.alert(
                "Delete Appointment",
                "Are you sure you want to delete this appointment?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                            const updatedAppointments = appointments.filter(
                                (appointment) => appointment.id !== id,
                            );
                            setAppointments(updatedAppointments);
                            applyFilter(activeFilter, updatedAppointments);
                        },
                    },
                ],
            );
        },
        [appointments, activeFilter, applyFilter],
    );

    const renderAppointmentItem = useCallback(
        ({ item, index }: { item: Appointment; index: number }) => (
            <Animated.View 
                entering={FadeInRight.delay(index * 50).duration(300)}
                exiting={FadeOutLeft.duration(200)}
            >
                <MemoizedAppointmentCard
                    appointment={item}
                    onPress={() => navigation.navigate("AppointmentDetails", { id: item.id })}
                    onEdit={() => navigation.navigate("EditAppointment", { id: item.id })}
                    onDelete={() => handleDeleteAppointment(item.id)}
                />
            </Animated.View>
        ),
        [navigation, handleDeleteAppointment],
    );

    const renderListHeader = useCallback(
        () => (
            <View className="flex-row mt-4 space-x-2">
                <FilterChip
                    label="All"
                    active={activeFilter === "all"}
                    onPress={() => applyFilter("all")}
                />
                <FilterChip
                    label="Today"
                    active={activeFilter === "today"}
                    onPress={() => applyFilter("today")}
                />
                <FilterChip
                    label="Upcoming"
                    active={activeFilter === "upcoming"}
                    onPress={() => applyFilter("upcoming")}
                />
                <FilterChip
                    label="Past"
                    active={activeFilter === "past"}
                    onPress={() => applyFilter("past")}
                />
            </View>
        ),
        [activeFilter, applyFilter],
    );

    return (
        <SafeAreaView className="flex-1 bg-white px-4">
            <Header title="Appointments" />
            <View className="p-1 mt-5">
                <SearchBar value={searchQuery} onChangeText={handleSearch} />
                {renderListHeader()}
            </View>
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0891b2" />
                    <Text className="mt-2 text-gray-600">Loading appointments...</Text>
                </View>
            ) : (
                <FlatList className="mt-3"
                    data={filteredAppointments}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAppointmentItem}
                    ListEmptyComponent={
                        <EmptyState
                            title="No appointments found"
                            description={
                                searchQuery
                                    ? "Try a different search term"
                                    : "Add your first appointment"
                            }
                            icon={
                                <MaterialCommunityIcons
                                    name="calendar-search"
                                    size={48}
                                    color="#9ca3af"
                                />
                            }
                            actionLabel="Add Appointment"
                            onAction={() => navigation.navigate("NewAppointmentScreen" as never)}
                        />
                    }
                    contentContainerStyle={{
                        paddingBottom: 70,
                        flexGrow: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <TouchableOpacity
                activeOpacity={0.90}
                className="absolute bottom-6 right-6 bg-cyan-600 p-4 rounded-full shadow-lg"
                onPress={() => navigation.navigate("NewAppointmentScreen" as never)}
            >
                <MaterialCommunityIcons name="account-plus" size={28} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AppointmentListScreen;