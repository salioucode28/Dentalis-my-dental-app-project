import { z } from "zod"

export const appointmentBaseSchema = z.object({
  patientName: z.string().trim().min(1, "Nom requis"),
  patientPhone: z.string().trim().min(3, "Téléphone requis"),
  patientEmail: z.string().trim().email().optional().or(z.literal("")),
  appointmentDate: z.union([z.string().min(1), z.date()]),
  appointmentTime: z.string().trim().regex(/^\d{2}:\d{2}$/),
  service: z.string().trim().min(1),
  status: z.enum(["pending", "confirmed", "cancelled"]),
  message: z.string().optional(),
})

export const createAppointmentSchema = appointmentBaseSchema
export const updateAppointmentSchema = appointmentBaseSchema.partial()

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>
