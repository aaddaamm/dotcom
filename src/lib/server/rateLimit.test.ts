import { beforeEach, describe, expect, it, vi } from 'vitest';

async function loadRateLimit(redis: unknown) {
	vi.doMock('$lib/server/redis', () => ({
		getRedis: () => redis
	}));

	return import('./rateLimit');
}

describe('isRateLimited', () => {
	beforeEach(() => {
		vi.resetModules();
		vi.clearAllMocks();
	});

	it('uses the in-memory limiter when Redis fails', async () => {
		const redis = {
			incr: vi.fn().mockRejectedValue(new Error('Redis unavailable')),
			expire: vi.fn()
		};
		const { isRateLimited } = await loadRateLimit(redis);
		const ip = '203.0.113.42';

		expect(await isRateLimited(ip)).toBe(false);
		expect(await isRateLimited(ip)).toBe(false);
		expect(await isRateLimited(ip)).toBe(false);
		expect(await isRateLimited(ip)).toBe(true);
		expect(redis.expire).not.toHaveBeenCalled();
	});
});
