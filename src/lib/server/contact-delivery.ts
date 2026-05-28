import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { EMAIL } from '$lib/constants';
import type { ContactFormData } from '$lib/validation';
import { contactNotificationHtml } from '$lib/server/emailTemplates';
import { contactLogger } from '$lib/server/contact-logger';
import { dev } from '$app/environment';

export async function sendContactNotification(
	data: ContactFormData,
	subject: string
): Promise<void> {
	const resendKey = env.RESEND_API_KEY;
	const hasResendKey = Boolean(resendKey && resendKey.trim().length > 0);

	if (!hasResendKey) {
		if (dev) {
			contactLogger.info('📧 RESEND_API_KEY not configured — email notification skipped', {
				subject,
				to: EMAIL
			});
			return;
		}
		throw new Error('RESEND_API_KEY is not configured');
	}

	const resend = new Resend(resendKey);
	await resend.emails.send({
		from: 'contact@adamrobinson.tech',
		to: EMAIL,
		subject,
		html: contactNotificationHtml(data)
	});

	contactLogger.info('📧 Email sent successfully via Resend');
}
