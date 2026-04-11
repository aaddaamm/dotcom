import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateEmail, type ContactFormData } from '$lib/validation';
import { isRateLimited } from '$lib/server/rateLimit';
import { sendContactNotification, logFailedSubmission } from '$lib/server/contactEmail';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const clientIP = getClientAddress();

	try {
		if (!request.headers.get('content-type')?.includes('application/json')) {
			return json({ error: 'Content-Type must be application/json' }, { status: 400 });
		}

		if (await isRateLimited(clientIP)) {
			return json(
				{ error: 'Too many submissions. Please wait 15 minutes before trying again.' },
				{ status: 429 }
			);
		}

		const data: ContactFormData = await request.json();

		// Honeypot — bots fill fields humans don't see; fail silently
		if (data.website) {
			return json({ success: true, message: "Thank you for your message! I'll respond within 24 hours." });
		}

		if (!data.name || !data.email || !data.project || !data.message) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		if (!validateEmail(data.email)) {
			return json({ error: 'Invalid email format' }, { status: 400 });
		}

		const sanitized: ContactFormData = {
			name: data.name.trim().slice(0, 100),
			email: data.email.trim().slice(0, 100),
			project: data.project.trim().slice(0, 100),
			message: data.message.trim().slice(0, 2000),
			phone: data.phone?.trim().slice(0, 20) || ''
		};

		if (sanitized.name.length === 0) {
			return json({ error: 'Name must be 1-100 characters' }, { status: 400 });
		}
		if (sanitized.message.length === 0) {
			return json({ error: 'Message must be 1-2000 characters' }, { status: 400 });
		}

		const subject = `New Project Inquiry from ${sanitized.name}`;

		try {
			await sendContactNotification(sanitized, subject);
			return json({ success: true, message: "Thank you for your message! I'll respond within 24 hours." });
		} catch (emailError) {
			console.error('📧 Email delivery failed — logging submission to Redis:', emailError);
			const plainBody = [
				'New contact form submission from adamrobinson.tech:',
				`Name: ${sanitized.name}`,
				`Email: ${sanitized.email}`,
				`Phone: ${sanitized.phone || 'Not provided'}`,
				`Project Type: ${sanitized.project}`,
				'',
				'Message:',
				sanitized.message,
				'---',
				`Submitted at: ${new Date().toISOString()}`,
				`IP: ${clientIP}`,
				`User-Agent: ${request.headers.get('user-agent') || 'Unknown'}`
			].join('\n');
			await logFailedSubmission(sanitized, plainBody, clientIP);
			return json({
				success: true,
				message: "Message received — there was a hiccup on our end but your submission was saved. I'll follow up shortly."
			});
		}
	} catch (error) {
		console.error('Contact form error:', error);
		return json({ error: 'Failed to process form submission' }, { status: 500 });
	}
};
