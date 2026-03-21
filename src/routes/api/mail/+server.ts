import nodemailer from 'nodemailer';
import {
	EMAIL_FROM,
	EMAIL_TO,
	EMAIL_HOST,
	EMAIL_PORT,
	EMAIL_USER,
	EMAIL_PASS
} from '$env/static/private';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const config: SMTPTransport.Options = {
	host: EMAIL_HOST,
	port: Number(EMAIL_PORT),
	secure: false,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS
	}
};

const transporter = nodemailer.createTransport(config);

export async function POST({ request }: { request: Request }) {
	const payload = await request.json();

	const body = `Name: ${payload.name}\nEmail: ${payload.email}\nMessage: ${payload.message}`;

	try {
		await transporter.sendMail({
			from: EMAIL_FROM,
			to: EMAIL_TO,
			subject: `Hello from ${payload.name}`,
			text: body
		});

		return new Response('success', {
			status: 200,
			statusText: 'OK',
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	} catch (error) {
		console.error(error);
		return new Response('error', {
			status: 500,
			statusText: 'Internal Server Error',
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	}
}
