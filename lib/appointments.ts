// lib/appointments.ts
export type AppointmentStatus = "pending" | "confirmed" | "cancelled"

export interface Appointment {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  date: string        // format YYYY-MM-DD
  time: string        // format HH:MM
  service: string
  status: AppointmentStatus
  message?: string
  createdAt?: string
}
