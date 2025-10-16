import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/User"

function ok(data: any, init?: number) {
  return NextResponse.json({ success: true, data }, { status: init ?? 200 })
}
function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export async function GET() {
  try {
    const session = await getSession()
    if (!session) return err("Unauthorized", 401)

    await connectToDB()
    const user = (await User.findById(session.userId).lean()) as
      | { _id: string; email: string; isAdmin: boolean }
      | null
    if (!user) return err("Unauthorized", 401)

    return ok({ id: user._id, email: user.email, isAdmin: user.isAdmin })
  } catch (e: any) {
    return err(e?.message || "Server error", 500)
  }
}
