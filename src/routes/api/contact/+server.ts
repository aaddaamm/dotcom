import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateEmail, validateContactForm, type ContactFormData } from '$lib/validation';
import { isRateLimited } from '$lib/server/rateLimit';
import {
	sendContactNotification,
	logFailedSubmission,
	formatInquirySubject
} from '$lib/server/contactEmail';

const SUCCESS_MESSAGE = "Thank you for your message! I'll respond within 24 hours.";
const FALLBACK_SUCCESS_MESSAGE =
	"Message received — there was a hiccup on our end but your submission was saved. I'll follow up shortly.";

type RequiredContactFields = ContactFormData & {
	name: string;
	email: string;
	project: string;
	message: string;
};

function sanitizeContactData(data: RequiredContactFields): ContactFormData {
	return {
		name: data.name.trim().slice(0, 100),
		email: data.email.trim().slice(0, 100),
		project: data.project.trim().slice(0, 100),
		timeline: data.timeline?.trim().slice(0, 60) || '',
		budget: data.budget?.trim().slice(0, 60) || '',
		message: data.message.trim().slice(0, 2000),
		phone: data.phone?.trim().slice(0, 20) || ''
	};
}

function buildFailedSubmissionBody(
	data: ContactFormData,
	ip: string,
	userAgent: string | null
): string {
	return [
		'New contact form submission from adamrobinson.tech:',
		`Name: ${data.name}`,
		`Email: ${data.email}`,
		`Phone: ${data.phone || 'Not provided'}`,
		`Project Type: ${data.project}`,
		`Timeline: ${data.timeline || 'Not provided'}`,
		`Budget: ${data.budget || 'Not provided'}`,
		'',
		'Message:',
		data.message,
		'---',
		`Submitted at: ${new Date().toISOString()}`,
		`IP: ${ip}`,
		`User-Agent: ${userAgent || 'Unknown'}`
	].join('\n');
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const clientIP = getClientAddress();

	try {
		if (!request.headers.get('content-type')?.includes('application/json')) {
			return json({ error: 'Content-Type must be application/json' }, { status: 400 });
		}

		if (await isRateLimited(clientIP)) {
			return json(
				{
					error: 'Too many submissions. Please wait 15 minutes before trying again.'
				},
				{ status: 429 }
			);
		}

		let data: ContactFormData;
		try {
			data = await request.json();
		} catch {
			return json({ error: 'Invalid JSON body' }, { status: 400 });
		}

		// Honeypot — bots fill fields humans don't see; fail silently
		if (data.website) {
			return json({ success: true, message: SUCCESS_MESSAGE });
		}

		if (!data.name || !data.email || !data.project || !data.message) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		if (!validateEmail(data.email)) {
			return json({ error: 'Invalid email format' }, { status: 400 });
		}

		const sanitized = sanitizeContactData(data as RequiredContactFields);
		const validation = validateContactForm(sanitized);
		if (!validation.isValid) {
			const firstError = Object.values(validation.errors)[0] || 'Invalid form data';
			return json({ error: firstError }, { status: 400 });
		}

		const subject = formatInquirySubject(sanitized.name, sanitized.project || '');

		try {
			await sendContactNotification(sanitized, subject);
			return json({ success: true, message: SUCCESS_MESSAGE });
		} catch (emailError) {
			console.error('📧 Email delivery failed — logging submission to Redis:', emailError);
			const plainBody = buildFailedSubmissionBody(
				sanitized,
				clientIP,
				request.headers.get('user-agent')
			);
			const logged = await logFailedSubmission(sanitized, plainBody, clientIP);
			if (!logged) {
				return json(
					{
						error:
							'Email delivery failed and the submission could not be saved. Please email me directly.'
					},
					{ status: 503 }
				);
			}
			return json({
				success: true,
				message: FALLBACK_SUCCESS_MESSAGE
			});
		}
	} catch (error) {
		console.error('Contact form error:', error);
		return json({ error: 'Failed to process form submission' }, { status: 500 });
	}
};
