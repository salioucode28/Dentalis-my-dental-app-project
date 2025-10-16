type WindowRecord = { count: number; expiresAt: number }

const store = new Map<string, WindowRecord>()

function getClientKey(request: Request, key: string) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  return `${key}:${ip}`
}

export async function rateLimit(request: Request, key: string, limit: number, windowMs: number) {
  const k = getClientKey(request, key)
  const now = Date.now()
  const rec = store.get(k)
  if (!rec || rec.expiresAt <= now) {
    store.set(k, { count: 1, expiresAt: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }
  if (rec.count >= limit) {
    return { allowed: false, retryAfterMs: rec.expiresAt - now }
  }
  rec.count += 1
  return { allowed: true, remaining: limit - rec.count }
}
