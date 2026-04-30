// --- In-memory LRU Cache ---

interface CacheEntry<T> {
  data: T
  expiresAt: number
}

class LRUCache {
  private cache: Map<string, CacheEntry<any>> = new Map()
  private maxSize: number

  constructor(maxSize = 500) {
    this.maxSize = maxSize
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null
    if (entry.expiresAt < Date.now()) {
      this.cache.delete(key)
      return null
    }
    // Move to end (most recently used)
    this.cache.delete(key)
    this.cache.set(key, entry)
    return entry.data as T
  }

  set<T>(key: string, data: T, ttlMs: number): void {
    // Evict oldest if full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey) this.cache.delete(firstKey)
    }
    this.cache.set(key, { data, expiresAt: Date.now() + ttlMs })
  }

  invalidate(pattern?: string): void {
    if (!pattern) {
      this.cache.clear()
      return
    }
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    }
  }

  get size(): number {
    return this.cache.size
  }
}

// --- Singleton ---
export const appCache = new LRUCache(500)

// --- TTL presets (milliseconds) ---
export const CacheTTL = {
  PLANS: 5 * 60_000,       // 5 min
  OPERATORS: 10 * 60_000,  // 10 min
  CITIES: 60 * 60_000,     // 1h
  CATEGORIES: 60 * 60_000, // 1h
  REVIEWS: 5 * 60_000,     // 5 min
  STATS: 30 * 60_000,      // 30 min
  SITEMAP: 60 * 60_000,    // 1h
} as const

// --- Helper: cached query ---
export async function cachedQuery<T>(
  key: string,
  ttl: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const cached = appCache.get<T>(key)
  if (cached) return cached
  const data = await fetcher()
  appCache.set(key, data, ttl)
  return data
}
