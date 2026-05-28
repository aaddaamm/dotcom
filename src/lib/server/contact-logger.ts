import { dev } from '$app/environment';
import { inspect } from 'node:util';

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

function writeLine(stream: NodeJS.WriteStream, message: string, parts: unknown[] = []) {
	const tail = parts.length ? ` ${parts.map((part) => inspect(part, { depth: 3 })).join(' ')}` : '';
	stream.write(`${message}${tail}\n`);
}

export const contactLogger = {
	info(message: string, meta?: Meta) {
		if (!dev) return;
		writeLine(process.stdout, message, meta ? [redact(meta)] : []);
	},
	warn(message: string, meta?: Meta) {
		writeLine(process.stderr, message, meta ? [redact(meta)] : []);
	},
	error(message: string, error?: unknown, meta?: Meta) {
		writeLine(process.stderr, message, [error, ...(meta ? [redact(meta)] : [])]);
	}
};
