import { Resend } from 'resend';
import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';
import type { ContactFormData } from '$lib/validation';
import { contactNotificationHtml } from '$lib/server/emailTemplates';

export async function sendContactNotification(
	data: ContactFormData,
	subject: string
): Promise<void> {
	if (!env.RESEND_API_KEY) {
		console.log('📧 RESEND_API_KEY not configured — email notification skipped');
		console.log('📧 Email would send:', { subject, to: 'adam@adamrobinson.tech' });
		return;
	}

	const resend = new Resend(env.RESEND_API_KEY);
	await resend.emails.send({
		from: 'contact@adamrobinson.tech',
		to: 'adam@adamrobinson.tech',
		subject,
		html: contactNotificationHtml(data)
	});

	console.log('📧 Email sent successfully via Resend');
}

export async function logFailedSubmission(
	data: ContactFormData,
	body: string,
	ip: string
): Promise<void> {
	try {
		if (!env.KV_REST_API_URL || !env.KV_REST_API_TOKEN) throw new Error('Redis env vars not set');
		const redis = new Redis({ url: env.KV_REST_API_URL, token: env.KV_REST_API_TOKEN });
		const key = `failed_contact:${Date.now()}:${ip}`;
		await redis.set(
			key,
			JSON.stringify({ name: data.name, email: data.email, project: data.project, body, ip }),
			{ ex: 30 * 24 * 60 * 60 }
		);
		console.log(`📧 Failed submission logged to Redis under key: ${key}`);
	} catch (redisError) {
		console.error('📧 Redis logging also failed — submission may be lost:', redisError);
		console.log('📧 Submission data:', { name: data.name, email: data.email });
	}
}
