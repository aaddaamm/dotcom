import { Resend } from 'resend';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getRedis } from '$lib/server/redis';
import { EMAIL } from '$lib/constants';
import type { ContactFormData } from '$lib/validation';
import { contactNotificationHtml } from '$lib/server/emailTemplates';
import { logger } from '$lib/server/logger';

export type InquiryIntent = 'full-time' | 'contract' | 'consulting' | 'general';

export function inferInquiryIntent(projectType: string): InquiryIntent {
	const value = projectType.trim().toLowerCase();

	if (value.includes('full-time')) return 'full-time';
	if (value.includes('contract') || value.includes('freelance')) return 'contract';
	if (value.includes('consulting')) return 'consulting';

	return 'general';
}

export function formatInquirySubject(name: string, projectType: string): string {
	const intent = inferInquiryIntent(projectType);
	const labelMap: Record<InquiryIntent, string> = {
		'full-time': 'Full-Time',
		contract: 'Contract',
		consulting: 'Consulting',
		general: 'General'
	};

	return `[${labelMap[intent]}] New inquiry from ${name}`;
}

export async function sendContactNotification(
	data: ContactFormData,
	subject: string
): Promise<void> {
	const resendKey = env.RESEND_API_KEY;
	const hasResendKey = Boolean(resendKey && resendKey.trim().length > 0);

	if (!hasResendKey) {
		if (dev) {
			logger.info('📧 RESEND_API_KEY not configured — email notification skipped', {
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

	logger.info('📧 Email sent successfully via Resend');
}

export async function logFailedSubmission(
	data: ContactFormData,
	body: string,
	ip: string
): Promise<boolean> {
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
		logger.info('📧 Failed submission logged to Redis', { key });
		return true;
	} catch (redisError) {
		logger.error('📧 Redis logging also failed — submission may be lost', redisError, {
			hasBody: Boolean(body),
			project: data.project
		});
		return false;
	}
}
