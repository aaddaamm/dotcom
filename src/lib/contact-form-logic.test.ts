import { describe, expect, it, vi } from 'vitest';
import { createEmptyContactFormState, submitContactForm } from '$lib/contact-form-logic';

function validForm() {
	return {
		...createEmptyContactFormState(),
		name: 'Ada Lovelace',
		email: 'ada@example.com',
		intent: 'Contract engagement',
		project: 'Platform modernization',
		message: 'I need help stabilizing a production platform.'
	};
}

function jsonResponse(body: object, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'content-type': 'application/json' }
	});
}

describe('contact form submission', () => {
	it('returns field errors before making a request', async () => {
		const fetcher = vi.fn<typeof fetch>();
		const result = await submitContactForm(createEmptyContactFormState(), { fetcher });

		expect(result).toMatchObject({ ok: false, reason: 'validation' });
		expect(fetcher).not.toHaveBeenCalled();
	});

	it('normalizes a successful submission and preserves optional fields', async () => {
		const fetcher = vi
			.fn<typeof fetch>()
			.mockResolvedValue(jsonResponse({ success: true, message: 'Thank you for your message!' }));
		const result = await submitContactForm(
			{
				...validForm(),
				phone: ' 401-555-0123 '
			},
			{ fetcher }
		);

		expect(result).toMatchObject({
			ok: true,
			normalizedIntent: 'contract',
			outcome: 'success',
			submittedPayload: { phone: '401-555-0123' }
		});
		expect(fetcher).toHaveBeenCalledWith(
			'/api/contact',
			expect.objectContaining({ method: 'POST' })
		);
	});

	it('identifies a successful fallback response', async () => {
		const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
			jsonResponse({
				success: true,
				message: 'There was a hiccup on our end but your submission was saved.'
			})
		);

		await expect(submitContactForm(validForm(), { fetcher })).resolves.toMatchObject({
			ok: true,
			outcome: 'fallback'
		});
	});

	it('maps API and network failures to user-facing states', async () => {
		const apiFailure = vi
			.fn<typeof fetch>()
			.mockResolvedValue(jsonResponse({ error: 'Too many submissions' }, 429));
		const networkFailure = vi.fn<typeof fetch>().mockRejectedValue(new Error('offline'));

		await expect(submitContactForm(validForm(), { fetcher: apiFailure })).resolves.toMatchObject({
			ok: false,
			reason: 'api',
			errorMessage: expect.stringContaining('15 minutes')
		});
		await expect(
			submitContactForm(validForm(), { fetcher: networkFailure })
		).resolves.toMatchObject({
			ok: false,
			reason: 'network',
			errorMessage: expect.stringContaining('Network issue')
		});
	});
});
