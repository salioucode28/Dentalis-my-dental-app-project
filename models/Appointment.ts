import mongoose, { Schema, type Document } from "mongoose"

export interface IAppointment extends Document {
  patientName: string
  patientPhone: string
  patientEmail?: string
  appointmentDate: Date
  appointmentTime: string
  service: string
  status: "pending" | "confirmed" | "cancelled"
  message?: string
  createdAt: Date
}

const AppointmentSchema = new Schema<IAppointment>({
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  patientEmail: { type: String },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  service: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema)
