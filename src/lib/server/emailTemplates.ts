import { escapeHtml } from '$lib/server/utils';
import type { ContactFormData } from '$lib/validation';

// Email-safe color tokens (CSS custom properties are not supported in email clients)
const ACCENT = '#2a7a7a';
const SURFACE = '#f8f9fa';
const BORDER = '#e9ecef';
const MUTED = '#6c757d';

export function contactNotificationHtml(data: ContactFormData): string {
	return `
		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			<h2 style="color: ${ACCENT};">New Contact Form Submission</h2>

			<div style="background-color: ${SURFACE}; padding: 20px; border-radius: 8px; margin: 20px 0;">
				<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
				<p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
				${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
				<p><strong>Project Type:</strong> ${escapeHtml(data.project ?? '')}</p>
			</div>

			<div style="margin: 20px 0;">
				<h3 style="color: ${ACCENT};">Message:</h3>
				<div style="background-color: #ffffff; padding: 15px; border-left: 4px solid ${ACCENT}; margin: 10px 0;">
					${escapeHtml(data.message).replace(/\n/g, '<br>')}
				</div>
			</div>

			<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid ${BORDER}; font-size: 0.9em; color: ${MUTED};">
				<p>Submitted at: ${new Date().toLocaleString()}</p>
				<p>From: adamrobinson.tech contact form</p>
			</div>
		</div>
	`;
}
