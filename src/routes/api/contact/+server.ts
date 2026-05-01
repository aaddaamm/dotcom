import type { RequestHandler } from './$types';
import type { ContactFormData } from '$lib/validation';
import { isRateLimited } from '$lib/server/rateLimit';
import {
	sendContactNotification,
	logFailedSubmission,
	formatInquirySubject
} from '$lib/server/contactEmail';
import {
	badRequest,
	forbidden,
	ok,
	serverError,
	serviceUnavailable,
	tooManyRequests
} from '$lib/server/api-response';
import {
	buildFailedSubmissionBody,
	getContactValidationError,
	hasRequiredContactFields,
	isValidContactEmail,
	sanitizeContactData
} from '$lib/server/contactSubmission';
import { SITE_URL } from '$lib/constants';
import { dev } from '$app/environment';

const SUCCESS_MESSAGE = "Thank you for your message! I'll respond within 24 hours.";
const FALLBACK_SUCCESS_MESSAGE =
	"Message received — there was a hiccup on our end but your submission was saved. I'll follow up shortly.";

function isAllowedOrigin(origin: string | null): boolean {
	if (!origin) return true;

	const allowedOrigins = new Set([SITE_URL]);
	if (SITE_URL.startsWith('https://') && !SITE_URL.includes('://www.')) {
		allowedOrigins.add(SITE_URL.replace('https://', 'https://www.'));
	}

	if (allowedOrigins.has(origin)) return true;
	if (!dev) return false;
	return origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:');
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const clientIP = getClientAddress();

	try {
		if (!request.headers.get('content-type')?.includes('application/json')) {
			return badRequest('Content-Type must be application/json');
		}

		if (!isAllowedOrigin(request.headers.get('origin'))) {
			return forbidden('Invalid request origin');
		}

		let data: ContactFormData;
		try {
			data = await request.json();
		} catch {
			return badRequest('Invalid JSON body');
		}

		// Honeypot — bots fill fields humans don't see; fail silently and do not consume rate-limit quota
		if (data.website) {
			return ok({ success: true, message: SUCCESS_MESSAGE });
		}

		if (await isRateLimited(clientIP)) {
			return tooManyRequests('Too many submissions. Please wait 15 minutes before trying again.');
		}

		if (!hasRequiredContactFields(data)) {
			return badRequest('Missing required fields');
		}

		if (!isValidContactEmail(data.email)) {
			return badRequest('Invalid email format');
		}

		const sanitized = sanitizeContactData(data);
		const validationError = getContactValidationError(sanitized);
		if (validationError) {
			return badRequest(validationError);
		}

		const subject = formatInquirySubject(sanitized.name, sanitized.project || '');

		try {
			await sendContactNotification(sanitized, subject);
			return ok({ success: true, message: SUCCESS_MESSAGE });
		} catch (emailError) {
			console.error('📧 Email delivery failed — logging submission to Redis:', emailError);
			const plainBody = buildFailedSubmissionBody(
				sanitized,
				clientIP,
				request.headers.get('user-agent')
			);
			const logged = await logFailedSubmission(sanitized, plainBody, clientIP);
			if (!logged) {
				return serviceUnavailable(
					'Email delivery failed and the submission could not be saved. Please email me directly.'
				);
			}
			return ok({
				success: true,
				message: FALLBACK_SUCCESS_MESSAGE
			});
		}
	} catch (error) {
		console.error('Contact form error:', error);
		return serverError('Failed to process form submission');
	}
};
