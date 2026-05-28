import { getRedis } from '$lib/server/redis';
import type { ContactFormData } from '$lib/validation';
import { contactLogger } from '$lib/server/contact-logger';

export async function logFailedSubmission(
	data: ContactFormData,
	body: string,
	ip: string
): Promise<boolean> {
	const redis = getRedis();
	try {
		if (!redis) throw new Error('Redis unavailable');
		const key = `failed_contact:${Date.now()}:${ip}`;
		await redis.set(
			key,
			JSON.stringify({
				name: data.name,
				email: data.email,
				intent: data.intent,
				project: data.project,
				timeline: data.timeline,
				budget: data.budget,
				body,
				ip
			}),
			{ ex: 30 * 24 * 60 * 60 }
		);
		contactLogger.info('📧 Failed submission logged to Redis', { key });
		return true;
	} catch (redisError) {
		contactLogger.error('📧 Redis logging also failed — submission may be lost', redisError, {
			hasBody: Boolean(body),
			project: data.project
		});
		return false;
	}
}
