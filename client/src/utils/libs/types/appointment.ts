export interface Appointment {
  _id: string;
  staffId?: {
    _id: string;
    name: string;
    email: string;
  };
  doctor: string;
  patientId?: {
    _id: string;
    patientNumber: string;
  };
  patientName: string;
  patientCNIC?: string;
  patientPhone: string;
  patientAge?: number;
  age?: number; // Legacy field support
  gender?: string;
  day?: string;
  slotTime?: string;
  clinicScheduleSlotId?: string;
  date: string | Date;
  time?: string;
  contactNumber?: string; // Legacy field support
  paymentStatus: string;
  reason?: string;
  createdAt: string | Date;
}
