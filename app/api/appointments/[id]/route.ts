import { NextResponse } from "next/server"
import { isValidObjectId } from "mongoose"
import { connectToDB } from "@/lib/db"
import { Appointment } from "@/models/Appointment"
import { updateAppointmentSchema } from "@/lib/validators/appointment"
import { getSession } from "@/lib/auth"
import { rateLimit } from "@/lib/rateLimit"

function ok(data: any, init?: number) {
  return NextResponse.json({ success: true, data }, { status: init ?? 200 })
}
function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

async function requireAdmin(request: Request) {
  const session = await getSession()
  if (session) return true
  const token = request.headers.get("x-admin-token")
  if (process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN) return true
  return false
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    if (!isValidObjectId(id)) return err("Invalid id", 400)

    await connectToDB()
    const doc = await Appointment.findById(id).lean()
    if (!doc) return err("Not found", 404)
    return ok(doc)
  } catch (e: any) {
    return err(e?.message || "Server error", 500)
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin(request))) return err("Unauthorized", 401)
    const rl = await rateLimit(request, "appointments_write", 20, 60_000)
    if (!rl.allowed) {
      return err("Trop de requêtes, réessayez plus tard", 429)
    }

    const { id } = await params
    if (!isValidObjectId(id)) return err("Invalid id", 400)

    const body = await request.json()
    const parse = updateAppointmentSchema.safeParse(body)
    if (!parse.success) return err(parse.error.issues[0]?.message || "Validation error", 422)

    await connectToDB()

    const data = parse.data
    const update: any = { ...data }

    if (data.appointmentDate) {
      update.appointmentDate = data.appointmentDate instanceof Date
        ? data.appointmentDate
        : new Date(data.appointmentDate)
    }

    // Conflict check prior to update: compute effective date/time/service
    type ExistingAppointment = {
      appointmentDate: Date
      appointmentTime: string
      service: string
    }
    const existing = await Appointment.findById(id).lean<ExistingAppointment>()
    if (!existing) return err("Not found", 404)

    const effectiveDate: Date = update.appointmentDate ?? new Date(existing.appointmentDate)
    const effectiveTime: string = update.appointmentTime ?? existing.appointmentTime
    const effectiveService: string = update.service ?? existing.service

    const dayStart = new Date(effectiveDate)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayEnd.getDate() + 1)

    const conflict = await Appointment.findOne({
      _id: { $ne: id },
      appointmentDate: { $gte: dayStart, $lt: dayEnd },
      appointmentTime: effectiveTime,
      service: effectiveService,
    }).lean()
    if (conflict) return err("Un rendez-vous existe déjà pour ce créneau", 422)

    const updated = await Appointment.findByIdAndUpdate(id, update, { new: true }).lean()
    if (!updated) return err("Not found", 404)
    return ok(updated)
  } catch (e: any) {
    return err(e?.message || "Server error", 500)
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin(request))) return err("Unauthorized", 401)
    const rl = await rateLimit(request, "appointments_write", 20, 60_000)
    if (!rl.allowed) {
      return err("Trop de requêtes, réessayez plus tard", 429)
    }

    const { id } = await params
    if (!isValidObjectId(id)) return err("Invalid id", 400)

    await connectToDB()
    const res = await Appointment.findByIdAndDelete(id)
    if (!res) return err("Not found", 404)
    return ok({ deleted: true })
  } catch (e: any) {
    return err(e?.message || "Server error", 500)
  }
}

