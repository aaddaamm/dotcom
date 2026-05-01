import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './+server';
import { isRateLimited } from '$lib/server/rateLimit';
import { logFailedSubmission, sendContactNotification } from '$lib/server/contactEmail';

vi.mock('$lib/server/rateLimit', () => ({
	isRateLimited: vi.fn()
}));

vi.mock('$lib/server/contactEmail', () => ({
	sendContactNotification: vi.fn(),
	logFailedSubmission: vi.fn(),
	formatInquirySubject: vi.fn((name: string) => `[Consulting] New inquiry from ${name}`)
}));

const mockIsRateLimited = vi.mocked(isRateLimited);
const mockSendContactNotification = vi.mocked(sendContactNotification);
const mockLogFailedSubmission = vi.mocked(logFailedSubmission);

function postContact(
	body: string,
	contentType = 'application/json',
	extraHeaders?: Record<string, string>
) {
	return POST({
		request: new Request('https://adamrobinson.tech/api/contact', {
			method: 'POST',
			headers: {
				'content-type': contentType,
				...extraHeaders
			},
			body
		}),
		getClientAddress: () => '203.0.113.10'
	} as Parameters<typeof POST>[0]);
}

function validPayload() {
	return {
		name: 'Ada Lovelace',
		email: 'ada@example.com',
		project: 'Technical consulting',
		message: 'I need help stabilizing a SvelteKit application.'
	};
}

describe('/api/contact POST', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockIsRateLimited.mockResolvedValue(false);
		mockSendContactNotification.mockResolvedValue(undefined);
		mockLogFailedSubmission.mockResolvedValue(true);
	});

	it('returns 400 for malformed JSON', async () => {
		const response = await postContact('{bad json');
		const body = await response.json();

		expect(response.status).toBe(400);
		expect(body).toEqual({ error: 'Invalid JSON body' });
		expect(mockIsRateLimited).not.toHaveBeenCalled();
		expect(mockSendContactNotification).not.toHaveBeenCalled();
	});

	it('does not consume rate-limit quota for honeypot submissions', async () => {
		const response = await postContact(
			JSON.stringify({
				...validPayload(),
				website: 'https://spam.example'
			})
		);
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body.success).toBe(true);
		expect(mockIsRateLimited).not.toHaveBeenCalled();
		expect(mockSendContactNotification).not.toHaveBeenCalled();
	});

	it('returns 403 for invalid cross-site origin', async () => {
		const response = await postContact(JSON.stringify(validPayload()), 'application/json', {
			origin: 'https://evil.example'
		});
		const body = await response.json();

		expect(response.status).toBe(403);
		expect(body).toEqual({ error: 'Invalid request origin' });
		expect(mockSendContactNotification).not.toHaveBeenCalled();
	});

	it('allows trusted www origin', async () => {
		const response = await postContact(JSON.stringify(validPayload()), 'application/json', {
			origin: 'https://www.adamrobinson.tech'
		});
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body.success).toBe(true);
		expect(mockSendContactNotification).toHaveBeenCalledOnce();
	});

	it('returns success when email delivery succeeds', async () => {
		const response = await postContact(JSON.stringify(validPayload()));
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body.success).toBe(true);
		expect(mockSendContactNotification).toHaveBeenCalledWith(
			expect.objectContaining({ project: 'Technical consulting' }),
			'[Consulting] New inquiry from Ada Lovelace'
		);
		expect(mockLogFailedSubmission).not.toHaveBeenCalled();
	});

	it('returns success when email delivery fails but fallback logging succeeds', async () => {
		mockSendContactNotification.mockRejectedValue(new Error('resend unavailable'));
		mockLogFailedSubmission.mockResolvedValue(true);

		const response = await postContact(JSON.stringify(validPayload()));
		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body.success).toBe(true);
		expect(body.message).toContain('submission was saved');
		expect(mockLogFailedSubmission).toHaveBeenCalledOnce();
	});

	it('returns 503 when email delivery and fallback logging both fail', async () => {
		mockSendContactNotification.mockRejectedValue(new Error('resend unavailable'));
		mockLogFailedSubmission.mockResolvedValue(false);

		const response = await postContact(JSON.stringify(validPayload()));
		const body = await response.json();

		expect(response.status).toBe(503);
		expect(body.error).toContain('could not be saved');
		expect(mockLogFailedSubmission).toHaveBeenCalledOnce();
	});
});
