import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"
import { createSession } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { rateLimit } from "@/lib/rateLimit"

function ok(data: any, init?: number) {
  return NextResponse.json({ success: true, data }, { status: init ?? 200 })
}
function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export async function POST(request: Request) {
  try {
    const rl = await rateLimit(request, "auth_login", 5, 60_000)
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: "Trop de tentatives, réessayez plus tard" },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rl.retryAfterMs || 0) / 1000)) } },
      )
    }
    const { email, password } = await request.json()
    if (!email || !password) return err("Email et mot de passe requis", 422)

    await connectToDB()

    const user = await User.findOne({ email: String(email).toLowerCase() })
    if (!user) return err("Identifiants invalides", 401)

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) return err("Identifiants invalides", 401)

    await createSession(user._id.toString())

    return ok({ user: { id: user._id, email: user.email, isAdmin: user.isAdmin } })
  } catch (e: any) {
    return err(e?.message || "Server error", 500)
  }
}
