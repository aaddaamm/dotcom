import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { getRedis } from '$lib/server/redis';
import { EMAIL } from '$lib/constants';
import type { ContactFormData } from '$lib/validation';
import { contactNotificationHtml } from '$lib/server/emailTemplates';

export async function sendContactNotification(
	data: ContactFormData,
	subject: string
): Promise<void> {
	if (!env.RESEND_API_KEY) {
		console.log('📧 RESEND_API_KEY not configured — email notification skipped');
		console.log('📧 Email would send:', { subject, to: EMAIL });
		return;
	}

	const resend = new Resend(env.RESEND_API_KEY);
	await resend.emails.send({
		from: 'contact@adamrobinson.tech',
		to: EMAIL,
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
	const redis = getRedis();
	try {
		if (!redis) throw new Error('Redis unavailable');
		const key = `failed_contact:${Date.now()}:${ip}`;
		await redis.set(
			key,
			JSON.stringify({
				name: data.name,
				email: data.email,
				project: data.project,
				timeline: data.timeline,
				budget: data.budget,
				body,
				ip
			}),
			{ ex: 30 * 24 * 60 * 60 }
		);
		console.log(`📧 Failed submission logged to Redis under key: ${key}`);
	} catch (redisError) {
		console.error('📧 Redis logging also failed — submission may be lost:', redisError);
		console.log('📧 Submission data:', { name: data.name, email: data.email });
	}
}
