// --- Rate Limiter (in-memory, per IP) ---

interface RateLimitEntry {
  count: number
  resetAt: number
}

const stores: Map<string, Map<string, RateLimitEntry>> = new Map()

interface RateLimitConfig {
  key: string
  limit: number
  windowMs: number
}

export function rateLimit(config: RateLimitConfig) {
  if (!stores.has(config.key)) {
    stores.set(config.key, new Map())
  }
  const store = stores.get(config.key)!

  return {
    check(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
      const now = Date.now()
      const entry = store.get(ip)

      // Cleanup starych wpisów (co 100 requestów)
      if (store.size > 1000) {
        for (const [key, val] of store) {
          if (val.resetAt < now) store.delete(key)
        }
      }

      if (!entry || entry.resetAt < now) {
        store.set(ip, { count: 1, resetAt: now + config.windowMs })
        return { allowed: true, remaining: config.limit - 1, resetAt: now + config.windowMs }
      }

      if (entry.count >= config.limit) {
        return { allowed: false, remaining: 0, resetAt: entry.resetAt }
      }

      entry.count++
      return { allowed: true, remaining: config.limit - entry.count, resetAt: entry.resetAt }
    },
  }
}

// --- Predefiniowane limity ---
export const clickTrackLimiter = rateLimit({ key: 'click-track', limit: 100, windowMs: 60_000 })
export const reviewLimiter = rateLimit({ key: 'reviews', limit: 5, windowMs: 3600_000 })
export const priceAlertLimiter = rateLimit({ key: 'price-alerts', limit: 10, windowMs: 3600_000 })
export const publicApiLimiter = rateLimit({ key: 'public-api', limit: 60, windowMs: 60_000 })
export const compareLimiter = rateLimit({ key: 'compare', limit: 30, windowMs: 60_000 })
