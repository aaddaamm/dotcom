import type { RequestHandler } from './$types';
import { validateEmail, type ContactFormData } from '$lib/validation';
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
	sanitizeContactData
} from '$lib/server/contactSubmission';
import { SITE_URL } from '$lib/constants';
import { dev } from '$app/environment';
import { contactLogger } from '$lib/server/contact-logger';

const SUCCESS_MESSAGE = "Thank you for your message! I'll respond within 24 hours.";
const FALLBACK_SUCCESS_MESSAGE =
	"Message received — there was a hiccup on our end but your submission was saved. I'll follow up shortly.";

type ValidatedContactSubmission = {
	sanitized: ContactFormData;
	subject: string;
};

function isAllowedOrigin(origin: string | null): boolean {
	if (!origin) return false;

	const allowedOrigins = new Set([SITE_URL]);
	if (SITE_URL.startsWith('https://') && !SITE_URL.includes('://www.')) {
		allowedOrigins.add(SITE_URL.replace('https://', 'https://www.'));
	}

	if (allowedOrigins.has(origin)) return true;
	if (!dev) return false;
	return origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:');
}

function validateAndParseRequest(request: Request): Promise<ContactFormData> {
	if (!request.headers.get('content-type')?.includes('application/json')) {
		throw badRequest('Content-Type must be application/json');
	}

	if (!isAllowedOrigin(request.headers.get('origin'))) {
		throw forbidden('Invalid request origin');
	}

	return request.json().catch(() => {
		throw badRequest('Invalid JSON body');
	});
}

function buildValidatedSubmission(data: ContactFormData): ValidatedContactSubmission {
	if (!hasRequiredContactFields(data)) {
		throw badRequest('Missing required fields');
	}

	if (!validateEmail(data.email)) {
		throw badRequest('Invalid email format');
	}

	const sanitized = sanitizeContactData(data);
	const validationError = getContactValidationError(sanitized);
	if (validationError) {
		throw badRequest(validationError);
	}

	return {
		sanitized,
		subject: formatInquirySubject(sanitized.name, sanitized.intent || '', sanitized.project || '')
	};
}

async function deliverContactSubmission(
	submission: ValidatedContactSubmission,
	request: Request,
	clientIP: string
) {
	const { sanitized, subject } = submission;
	try {
		await sendContactNotification(sanitized, subject);
		return ok({ success: true, message: SUCCESS_MESSAGE });
	} catch (emailError) {
		contactLogger.error('📧 Email delivery failed — logging submission to Redis:', emailError);
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
		return ok({ success: true, message: FALLBACK_SUCCESS_MESSAGE });
	}
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const clientIP = getClientAddress();

	try {
		const data = await validateAndParseRequest(request);

		// Honeypot — bots fill fields humans don't see; fail silently and do not consume rate-limit quota
		if (data.website) {
			return ok({ success: true, message: SUCCESS_MESSAGE });
		}

		if (await isRateLimited(clientIP)) {
			return tooManyRequests('Too many submissions. Please wait 15 minutes before trying again.');
		}

		const submission = buildValidatedSubmission(data);
		return deliverContactSubmission(submission, request, clientIP);
	} catch (error) {
		if (error instanceof Response) return error;
		contactLogger.error('Contact form error:', error);
		return serverError('Failed to process form submission');
	}
};
