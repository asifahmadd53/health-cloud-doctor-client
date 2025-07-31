export interface Appointment {
  _id: string;
  staffId: string;
  patientName: string;
  patientCNIC: string;
  patientPhone: string;
  patientAge: number;
  gender: string;
  date: string;
  time: string;
  paymentStatus: string;
  createdAt: string;
}