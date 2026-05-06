import { Resend } from "resend";
import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import { getRedis } from "$lib/server/redis";
import { EMAIL } from "$lib/constants";
import type { ContactFormData } from "$lib/validation";
import { contactNotificationHtml } from "$lib/server/emailTemplates";
import { logger } from "$lib/server/logger";
import { inferIntent } from "$lib/contact-form";
import type { ContactIntent } from "$lib/analytics";

export type InquiryIntent = ContactIntent;

export function formatInquirySubject(
	name: string,
	intent: string,
	projectType: string,
): string {
	const inferred = inferIntent(intent, projectType);
	const labelMap: Record<InquiryIntent, string> = {
		"full-time": "Full-Time",
		contract: "Contract",
		consulting: "Consulting",
		speaking: "Speaking",
		collaboration: "Collaboration",
		general: "General",
	};

	return `[${labelMap[inferred]}] New inquiry from ${name}`;
}

export async function sendContactNotification(
	data: ContactFormData,
	subject: string,
): Promise<void> {
	const resendKey = env.RESEND_API_KEY;
	const hasResendKey = Boolean(resendKey && resendKey.trim().length > 0);

	if (!hasResendKey) {
		if (dev) {
			logger.info(
				"📧 RESEND_API_KEY not configured — email notification skipped",
				{
					subject,
					to: EMAIL,
				},
			);
			return;
		}
		throw new Error("RESEND_API_KEY is not configured");
	}

	const resend = new Resend(resendKey);
	await resend.emails.send({
		from: "contact@adamrobinson.tech",
		to: EMAIL,
		subject,
		html: contactNotificationHtml(data),
	});

	logger.info("📧 Email sent successfully via Resend");
}

export async function logFailedSubmission(
	data: ContactFormData,
	body: string,
	ip: string,
): Promise<boolean> {
	const redis = getRedis();
	try {
		if (!redis) throw new Error("Redis unavailable");
		const key = `failed_contact:${Date.now()}:${ip}`;
		await redis.set(
			key,
			JSON.stringify({
				name: data.name,
				email: data.email,
				intent: data.intent,
				project: data.project,
				timeline: data.timeline,
				budget: data.budget,
				body,
				ip,
			}),
			{ ex: 30 * 24 * 60 * 60 },
		);
		logger.info("📧 Failed submission logged to Redis", { key });
		return true;
	} catch (redisError) {
		logger.error(
			"📧 Redis logging also failed — submission may be lost",
			redisError,
			{
				hasBody: Boolean(body),
				project: data.project,
			},
		);
		return false;
	}
}
