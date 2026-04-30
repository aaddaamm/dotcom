import { Resend } from "resend";
import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import { getRedis } from "$lib/server/redis";
import { EMAIL } from "$lib/constants";
import type { ContactFormData } from "$lib/validation";
import { contactNotificationHtml } from "$lib/server/emailTemplates";

export type InquiryIntent = "full-time" | "contract" | "consulting" | "general";

export function inferInquiryIntent(projectType: string): InquiryIntent {
	const value = projectType.trim().toLowerCase();

	if (value.includes("full-time")) return "full-time";
	if (value.includes("contract") || value.includes("freelance"))
		return "contract";
	if (value.includes("consulting")) return "consulting";

	return "general";
}

export function formatInquirySubject(
	name: string,
	projectType: string,
): string {
	const intent = inferInquiryIntent(projectType);
	const labelMap: Record<InquiryIntent, string> = {
		"full-time": "Full-Time",
		contract: "Contract",
		consulting: "Consulting",
		general: "General",
	};

	return `[${labelMap[intent]}] New inquiry from ${name}`;
}

export async function sendContactNotification(
	data: ContactFormData,
	subject: string,
): Promise<void> {
	if (!env.RESEND_API_KEY) {
		if (dev) {
			console.log(
				"📧 RESEND_API_KEY not configured — email notification skipped",
			);
			console.log("📧 Email would send:", { subject, to: EMAIL });
			return;
		}
		throw new Error("RESEND_API_KEY is not configured");
	}

	const resend = new Resend(env.RESEND_API_KEY);
	await resend.emails.send({
		from: "contact@adamrobinson.tech",
		to: EMAIL,
		subject,
		html: contactNotificationHtml(data),
	});

	console.log("📧 Email sent successfully via Resend");
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
				project: data.project,
				timeline: data.timeline,
				budget: data.budget,
				body,
				ip,
			}),
			{ ex: 30 * 24 * 60 * 60 },
		);
		console.log(`📧 Failed submission logged to Redis under key: ${key}`);
		return true;
	} catch (redisError) {
		console.error(
			"📧 Redis logging also failed — submission may be lost:",
			redisError,
		);
		console.log("📧 Submission data:", { name: data.name, email: data.email });
		return false;
	}
}
