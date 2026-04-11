import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import type { RequestHandler } from './$types';
import { validateEmail, type ContactFormData } from '$lib/validation';
import { escapeHtml } from '$lib/server/utils';

const RATE_LIMIT_WINDOW = 15 * 60; // 15 minutes in seconds
const RATE_LIMIT_MAX = 3;

// In-memory fallback for when Redis is unavailable. Per-instance, resets on cold start,
// but ensures some protection even if Upstash is down or env vars are missing.
const memoryRateLimit = new Map<string, { count: number; resetAt: number }>();

function checkMemoryRateLimit(ip: string): boolean {
	const now = Date.now();
	const entry = memoryRateLimit.get(ip);
	if (!entry || now > entry.resetAt) {
		memoryRateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW * 1000 });
		return false;
	}
	entry.count++;
	return entry.count > RATE_LIMIT_MAX;
}

async function isRateLimited(ip: string): Promise<boolean> {
	try {
		const redis = new Redis({
			url: env.KV_REST_API_URL,
			token: env.KV_REST_API_TOKEN
		});
		const key = `rate_limit:contact:${ip}`;
		const [count] = (await redis.pipeline().incr(key).expire(key, RATE_LIMIT_WINDOW).exec()) as [
			number,
			number
		];
		return count > RATE_LIMIT_MAX;
	} catch {
		console.warn('Rate limit Redis unavailable — using in-memory fallback');
		return checkMemoryRateLimit(ip);
	}
}

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

		const sanitizedData = {
			name: data.name.trim().slice(0, 100),
			email: data.email.trim().slice(0, 100),
			project: data.project.trim().slice(0, 100),
			message: data.message.trim().slice(0, 2000),
			phone: data.phone?.trim().slice(0, 20) || ''
		};

		if (sanitizedData.name.length === 0) {
			return json({ error: 'Name must be 1-100 characters' }, { status: 400 });
		}
		if (sanitizedData.message.length === 0) {
			return json({ error: 'Message must be 1-2000 characters' }, { status: 400 });
		}

		const emailSubject = `New Project Inquiry from ${sanitizedData.name}`;
		const emailBody = `
New contact form submission from adamrobinson.tech:

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone || 'Not provided'}
Project Type: ${sanitizedData.project}

Message:
${sanitizedData.message}

---
Submitted at: ${new Date().toISOString()}
IP: ${clientIP}
User-Agent: ${request.headers.get('user-agent') || 'Unknown'}
`.trim();

		try {
			await sendEmailNotification(sanitizedData, emailSubject, emailBody);
			return json({ success: true, message: "Thank you for your message! I'll respond within 24 hours." });
		} catch (emailError) {
			console.error('📧 Email delivery failed — logging submission to Redis:', emailError);
			await logFailedSubmission(sanitizedData, emailBody, clientIP);
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

async function logFailedSubmission(data: ContactFormData, body: string, ip: string): Promise<void> {
	try {
		const redis = new Redis({
			url: env.KV_REST_API_URL,
			token: env.KV_REST_API_TOKEN
		});
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

async function sendEmailNotification(data: ContactFormData, subject: string, body: string) {
	const RESEND_API_KEY = env.RESEND_API_KEY;
	if (!RESEND_API_KEY) {
		console.log('📧 RESEND_API_KEY not configured - email notification skipped');
		console.log('📧 Email would send:', { subject, to: 'adam@adamrobinson.tech' });
		return;
	}

	const resend = new Resend(RESEND_API_KEY);

	await resend.emails.send({
		from: 'contact@adamrobinson.tech',
		to: 'adam@adamrobinson.tech',
		subject: subject,
		html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #2a7a7a;">New Contact Form Submission</h2>

					<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
						<p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
						${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ''}
						<p><strong>Project Type:</strong> ${escapeHtml(data.project ?? '')}</p>
					</div>

					<div style="margin: 20px 0;">
						<h3 style="color: #2a7a7a;">Message:</h3>
						<div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #2a7a7a; margin: 10px 0;">
							${escapeHtml(data.message).replace(/\n/g, '<br>')}
						</div>
					</div>

					<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 0.9em; color: #6c757d;">
						<p>Submitted at: ${new Date().toLocaleString()}</p>
						<p>From: adamrobinson.tech contact form</p>
					</div>
				</div>
			`
	});

	console.log('📧 Email sent successfully via Resend');
}
