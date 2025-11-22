type RateLimitStore = {
    [key: string]: { count: number; lastReset: number }
}

const store: RateLimitStore = {}

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 10000) {
    const now = Date.now()
    const record = store[ip] || { count: 0, lastReset: now }

    if (now - record.lastReset > windowMs) {
        record.count = 0
        record.lastReset = now
    }

    if (record.count >= limit) {
        return false
    }

    record.count++
    store[ip] = record
    return true
}
