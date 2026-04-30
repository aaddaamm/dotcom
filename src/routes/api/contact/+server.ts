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

const SUCCESS_MESSAGE = "Thank you for your message! I'll respond within 24 hours.";
const FALLBACK_SUCCESS_MESSAGE =
	"Message received — there was a hiccup on our end but your submission was saved. I'll follow up shortly.";

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const clientIP = getClientAddress();

	try {
		if (!request.headers.get('content-type')?.includes('application/json')) {
			return badRequest('Content-Type must be application/json');
		}

		if (await isRateLimited(clientIP)) {
			return tooManyRequests('Too many submissions. Please wait 15 minutes before trying again.');
		}

		let data: ContactFormData;
		try {
			data = await request.json();
		} catch {
			return badRequest('Invalid JSON body');
		}

		// Honeypot — bots fill fields humans don't see; fail silently
		if (data.website) {
			return ok({ success: true, message: SUCCESS_MESSAGE });
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
