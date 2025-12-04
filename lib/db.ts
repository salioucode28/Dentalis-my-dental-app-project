import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || ""

type Cached = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

let cached: Cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectToDB() {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable")
  }
  
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}
