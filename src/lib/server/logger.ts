import { dev } from '$app/environment';

type Meta = Record<string, unknown>;

function redact(meta: Meta): Meta {
	const clone = { ...meta };
	for (const key of Object.keys(clone)) {
		if (key.toLowerCase().includes('email')) clone[key] = '[redacted]';
		if (key.toLowerCase().includes('name')) clone[key] = '[redacted]';
		if (key.toLowerCase().includes('ip')) clone[key] = '[redacted]';
	}
	return clone;
}

export const logger = {
	info(message: string, meta?: Meta) {
		if (!dev) return;
		console.log(message, meta ? redact(meta) : undefined);
	},
	error(message: string, error?: unknown, meta?: Meta) {
		console.error(message, error, meta ? redact(meta) : undefined);
	}
};
