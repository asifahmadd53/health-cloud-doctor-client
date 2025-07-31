import axios from 'axios';
import { API_URL } from '../../../api/api';
import type { Appointment } from '../types/appointment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Helper function to get auth headers
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all appointments for current staff member
export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const headers = await getAuthHeaders();
    const staffId = await AsyncStorage.getItem('staffId');

    const response = await axios.get(
      `${API_URL}/api/appointment/get-appointments`,
      {
        headers,
        params: { staffId },
      },
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch appointments');
    }
    return response.data.appointments;
  } catch (error: any) {
    console.error('Error fetching appointments:', error.message);
    if (error.response?.status === 401) {
      Alert.alert('Session Expired', 'Please login again');
    }
    throw new Error(
      error.response?.data?.message || 'Failed to fetch appointments',
    );
  }
};

// Get appointment by ID with ownership check
export const getAppointmentById = async (id: string): Promise<Appointment> => {
  try {
    const headers = await getAuthHeaders(); // optional, only if your API needs it

    const response = await axios.get(
      `${API_URL}/api/appointment/get-appointment/${id}`,
      {
        headers,
      },
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Appointment not found');
    }

    return response.data.appointment;
  } catch (error: any) {
    console.error('Error fetching appointment:', error.message);
    if (error.response?.status === 404) {
      throw new Error('Appointment not found');
    }
    throw new Error(
      error.response?.data?.message || 'Failed to fetch appointment',
    );
  }
};

// Create new appointment
export const createAppointment = async (
  appointmentData: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<Appointment> => {
  try {
    const headers = await getAuthHeaders();
    const staffId = await AsyncStorage.getItem('staffId');

    if (!staffId) {
      throw new Error('Staff ID not found. Please login again.');
    }

    const response = await axios.post(
      `${API_URL}/api/appointment/create-appointment`,
      { ...appointmentData, staffId },
      { headers },
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.appointment;
  } catch (error: any) {
    console.error('Error creating appointment:', error.message);
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Failed to create appointment',
    );
  }
};

// Update appointment with ownership check
export const updateAppointment = async (id: string, appointmentData: Partial<Appointment>): Promise<Appointment> => {
  try {
    const headers = await getAuthHeaders();
    const staffId = await AsyncStorage.getItem('staffId');

    const response = await axios.put(
      `${API_URL}/api/appointment/update-appointment/${id}`,
      { ...appointmentData, staffId },
      { headers },
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.appointment;
  } catch (error: any) {
    console.error('Error updating appointment:', error.message);
    if (error.response?.status === 404) {
      throw new Error('Appointment not found');
    }
    throw new Error(
      error.response?.data?.message || 'Failed to update appointment',
    );
  }
};

// Delete appointment with ownership check
export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    const staffId = await AsyncStorage.getItem('staffId');

    const response = await axios.delete(
      `${API_URL}/api/appointment/delete-appointment/${id}`,
      {
        headers,
        data: { staffId }, // Send staffId in request body for delete
      },
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error: any) {
    console.error('Error deleting appointment:', error.message);
    if (error.response?.status === 404) {
      throw new Error('Appointment not found');
    }
    throw new Error(
      error.response?.data?.message || 'Failed to delete appointment',
    );
  }
};
