import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { Appointment } from "@/models/Appointment"
import { createAppointmentSchema } from "@/lib/validators/appointment"
import { getSession } from "@/lib/auth"
import { rateLimit } from "@/lib/rateLimit"

function ok(data: any, init?: number, meta?: any) {
  const body: any = { success: true, data }
  if (meta !== undefined) body.meta = meta
  return NextResponse.json(body, { status: init ?? 200 })
}
function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export async function GET(request: Request) {
  try {
    await connectToDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const date = searchParams.get("date")
    const pageParam = searchParams.get("page")
    const limitParam = searchParams.get("limit")
    const sortParam = searchParams.get("sort") // e.g. "createdAt:desc" or "appointmentDate:asc"
    const format = searchParams.get("format") // e.g. csv

    const filter: any = {}

    if (status && ["pending", "confirmed", "cancelled"].includes(status)) {
      filter.status = status
    }

    if (search) {
      const regex = new RegExp(search, "i")
      filter.$or = [
        { patientName: regex },
        { patientPhone: regex },
        { patientEmail: regex },
      ]
    }

    if (date) {
      const start = new Date(date)
      const end = new Date(date)
      end.setDate(end.getDate() + 1)
      filter.appointmentDate = { $gte: start, $lt: end }
    }

    // Pagination & sorting
    const page = Math.max(1, Number(pageParam) || 1)
    const limit = Math.min(100, Math.max(1, Number(limitParam) || 20))
    const skip = (page - 1) * limit

    let sort: Record<string, 1 | -1> = { createdAt: -1 }
    if (sortParam) {
      const [field, dir] = sortParam.split(":")
      if (field) {
        sort = { [field]: dir === "asc" ? 1 : -1 } as any
      }
    }

    // CSV export: ignore pagination, return all matching rows
    if (format === "csv") {
      const docs = await Appointment.find(filter).sort(sort).lean()

      const escapeCsv = (val: any) => {
        if (val === null || val === undefined) return ""
        const s = String(val)
        if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"'
        return s
      }

      const header = [
        "patientName",
        "patientPhone",
        "patientEmail",
        "appointmentDate",
        "appointmentTime",
        "service",
        "status",
        "message",
        "createdAt",
      ]
      const rows = docs.map((d: any) => [
        escapeCsv(d.patientName),
        escapeCsv(d.patientPhone),
        escapeCsv(d.patientEmail || ""),
        escapeCsv(new Date(d.appointmentDate).toISOString()),
        escapeCsv(d.appointmentTime),
        escapeCsv(d.service),
        escapeCsv(d.status),
        escapeCsv(d.message || ""),
        escapeCsv(new Date(d.createdAt).toISOString()),
      ].join(","))

      const csv = [header.join(","), ...rows].join("\n")
      const filename = `appointments_${new Date().toISOString().slice(0,10)}.csv`
      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-store",
        },
      })
    }

    const [docs, total] = await Promise.all([
      Appointment.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Appointment.countDocuments(filter),
    ])
    const pages = Math.max(1, Math.ceil(total / limit))
    return ok(docs, 200, { page, limit, total, pages })
  } catch (e: any) {
    return err(e?.message || "Server error", 500)
  }
}

async function requireAdmin(request: Request) {
  // Prefer session cookie
  const session = await getSession()
  if (session) return true

  // Fallback: header token (legacy)
  const token = request.headers.get("x-admin-token")
  if (process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN) return true
  return false
}

export async function POST(request: Request) {
  try {
    if (!(await requireAdmin(request))) return err("Unauthorized", 401)

    const rl = await rateLimit(request, "appointments_write", 20, 60_000)
    if (!rl.allowed) {
      return err("Trop de requêtes, réessayez plus tard", 429)
    }

    const body = await request.json()
    const parse = createAppointmentSchema.safeParse(body)
    if (!parse.success) return err(parse.error.issues[0]?.message || "Validation error", 422)

    await connectToDB()

    const data = parse.data
    const appointmentDate = data.appointmentDate instanceof Date
      ? data.appointmentDate
      : new Date(data.appointmentDate)

    // Conflict check: same day + same time (+ same service)
    const dayStart = new Date(appointmentDate)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayStart)
    dayEnd.setDate(dayEnd.getDate() + 1)

    const conflict = await Appointment.findOne({
      appointmentDate: { $gte: dayStart, $lt: dayEnd },
      appointmentTime: data.appointmentTime,
      service: data.service,
    }).lean()
    if (conflict) return err("Un rendez-vous existe déjà pour ce créneau", 422)

    const created = await Appointment.create({
      patientName: data.patientName,
      patientPhone: data.patientPhone,
      patientEmail: data.patientEmail || undefined,
      appointmentDate,
      appointmentTime: data.appointmentTime,
      service: data.service,
      status: data.status,
      message: data.message,
    })

    return ok(created, 201)
  } catch (e: any) {
    return err(e?.message || "Server error", 500)
  }
}

