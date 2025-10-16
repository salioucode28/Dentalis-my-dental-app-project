import mongoose, { Schema, type Document } from "mongoose"

export interface ISession extends Document {
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
}

const SessionSchema = new Schema<ISession>({
  userId: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
})

export const Session = mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema)
