import { NextResponse } from "next/server"
import { destroySession } from "@/lib/auth"

function ok(data: any, init?: number) {
  return NextResponse.json({ success: true, data }, { status: init ?? 200 })
}
function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export async function POST() {
  try {
    await destroySession()
    return ok({ loggedOut: true })
  } catch (e: any) {
    return err(e?.message || "Server error", 500)
  }
}
