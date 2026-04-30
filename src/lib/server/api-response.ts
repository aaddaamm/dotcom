import { json } from '@sveltejs/kit';

export function ok<T>(body: T, status = 200) {
	return json(body, { status });
}

export function badRequest(error: string) {
	return json({ error }, { status: 400 });
}

export function tooManyRequests(error: string) {
	return json({ error }, { status: 429 });
}

export function serviceUnavailable(error: string) {
	return json({ error }, { status: 503 });
}

export function serverError(error: string) {
	return json({ error }, { status: 500 });
}
