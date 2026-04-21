import { getRedis } from '$lib/server/redis';

const RATE_LIMIT_WINDOW = 15 * 60; // 15 minutes in seconds
const RATE_LIMIT_MAX = 3;

// In-memory fallback for when Redis is unavailable. Per-instance, resets on cold start,
// but ensures some protection even if Upstash is down or env vars are missing.
const memoryRateLimit = new Map<string, { count: number; resetAt: number }>();

function checkMemoryRateLimit(ip: string): boolean {
	const now = Date.now();
	const entry = memoryRateLimit.get(ip);
	if (!entry || now > entry.resetAt) {
		memoryRateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW * 1000 });
		return false;
	}
	entry.count++;
	return entry.count > RATE_LIMIT_MAX;
}

export async function isRateLimited(ip: string): Promise<boolean> {
	const redis = getRedis();
	if (!redis) {
		console.warn('Rate limit Redis unavailable — using in-memory fallback');
		return checkMemoryRateLimit(ip);
	}
	try {
		const key = `rate_limit:contact:${ip}`;
		const count = await redis.incr(key);
		if (count === 1) await redis.expire(key, RATE_LIMIT_WINDOW);
		return count > RATE_LIMIT_MAX;
	} catch {
		console.warn('Rate limit Redis error — using in-memory fallback');
		return checkMemoryRateLimit(ip);
	}
}
