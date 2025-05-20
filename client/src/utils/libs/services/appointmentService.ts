import axios from "axios";
import { API_URL } from "../constants/api/api";
import type { Appointment } from "../types/appointment"

// Mock data for appointments
const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Ahmed Ali",
    age: 35,
    gender: "male",
    contactNumber: "0300-1234567",
    date: "2025-05-15",
    time: "10:00",
    reason: "Regular checkup",
    paymentMethod: "cash",
    cnic: "12345-6789012-3",
  },
  {
    id: "2",
    patientName: "Fatima Khan",
    age: 28,
    gender: "female",
    contactNumber: "0321-9876543",
    date: "2025-05-10",
    time: "14:30",
    reason: "Fever and cough",
    paymentMethod: "online",
  },
  {
    id: "3",
    patientName: "Muhammad Usman",
    age: 42,
    gender: "male",
    contactNumber: "0333-5556667",
    date: "2025-05-12",
    time: "09:15",
    reason: "Follow-up appointment",
    paymentMethod: "cash",
  },
]

// Fetch all appointments
export const fetchAppointments = async (): Promise<Appointment[]> => {
  // Simulate API call
  const response = await axios.get(`${API_URL}/api/appointment/get-appointments`);
   const data = response.data;
   if (data.success) {
    return data.appointments;
   } else {
    throw new Error(data.message);
   }
   
}

// Get appointment by ID
export const getAppointmentById = async (id: string): Promise<Appointment> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const appointment = mockAppointments.find((a) => a.id === id)
      if (appointment) {
        resolve(appointment)
      } else {
        reject(new Error("Appointment not found"))
      }
    }, 1000)
  })
}

// Create new appointment
export const createAppointment = async (appointmentData: Omit<Appointment, "id">): Promise<Appointment> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAppointment = {
        id: Math.random().toString(36).substring(2, 9),
        ...appointmentData,
      }
      mockAppointments.push(newAppointment)
      resolve(newAppointment)
    }, 1500)
  })
}

// Update appointment
export const updateAppointment = async (id: string, appointmentData: Partial<Appointment>): Promise<Appointment> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockAppointments.findIndex((a) => a.id === id)
      if (index !== -1) {
        mockAppointments[index] = { ...mockAppointments[index], ...appointmentData }
        resolve(mockAppointments[index])
      } else {
        reject(new Error("Appointment not found"))
      }
    }, 1500)
  })
}

// Delete appointment
export const deleteAppointment = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockAppointments.findIndex((a) => a.id === id)
      if (index !== -1) {
        mockAppointments.splice(index, 1)
        resolve()
      } else {
        reject(new Error("Appointment not found"))
      }
    }, 1000)
  })
}
