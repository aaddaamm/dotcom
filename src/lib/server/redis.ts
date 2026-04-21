import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';

let client: Redis | null | undefined;

export function getRedis(): Redis | null {
	if (client !== undefined) return client;
	if (!env.KV_REST_API_URL || !env.KV_REST_API_TOKEN) return (client = null);
	try {
		return (client = new Redis({ url: env.KV_REST_API_URL, token: env.KV_REST_API_TOKEN }));
	} catch {
		return (client = null);
	}
}
