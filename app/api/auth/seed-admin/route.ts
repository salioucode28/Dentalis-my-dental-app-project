import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"

function ok(data: any, init?: number) {
  return NextResponse.json({ success: true, data }, { status: init ?? 200 })
}
function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export async function POST(request: Request) {
  try {
    if (process.env.NODE_ENV === "production") {
      return err("Disabled", 403)
    }
    const token = request.headers.get("x-admin-token")
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
      return err("Unauthorized", 401)
    }

    const { email, password } = await request.json().catch(() => ({ email: undefined, password: undefined }))
    const seedEmail = (email || process.env.SEED_ADMIN_EMAIL || "admin@dental.com").toLowerCase()
    const seedPassword = password || process.env.SEED_ADMIN_PASSWORD || "admin123"

    await connectToDB()

    const existing = await User.findOne({ email: seedEmail })
    if (existing) return ok({ created: false, email: existing.email })

    const passwordHash = await bcrypt.hash(seedPassword, 10)
    const user = await User.create({ email: seedEmail, passwordHash, isAdmin: true })

    return ok({ created: true, email: user.email })
  } catch (e: any) {
    return err(e?.message || "Server error", 500)
  }
}
