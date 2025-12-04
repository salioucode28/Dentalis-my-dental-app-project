import { cookies } from "next/headers"
import { randomBytes } from "crypto"
import { Session } from "@/models/Session"
import { connectToDB } from "@/lib/db"

const COOKIE_NAME = "admin_session"
const SESSION_TTL_DAYS = 7

export async function createSession(userId: string) {
  await connectToDB()
  const token = randomBytes(32).toString("hex")
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + SESSION_TTL_DAYS)

  await Session.create({ userId, token, expiresAt })

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  })

  return { token, expiresAt }
}

export async function destroySession() {
  await connectToDB()
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  if (cookie) {
    await Session.deleteOne({ token: cookie.value })
    cookieStore.delete(COOKIE_NAME)
  }
}

export interface SessionRecord {
  userId: any
  token: string
  expiresAt: Date
}

export async function getSession(): Promise<SessionRecord | null> {
  await connectToDB()
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  if (!cookie) return null
  const session = (await Session.findOne({ token: cookie.value, expiresAt: { $gt: new Date() } }).lean()) as
    | SessionRecord
    | null
  return session
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session
}
