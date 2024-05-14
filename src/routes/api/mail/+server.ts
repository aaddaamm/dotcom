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

// export function GET(req: Request, res: Response) {
export async function POST({ request }: { request: Request }) {
	const payload = await request.json();

	const body = `Name: ${payload.name}\nEmail: ${payload.email}\nMessage: ${payload.message}`;

	console.log(body);

	try {
		const info = await transporter.sendMail({
			from: EMAIL_FROM, // sender address
			to: EMAIL_TO, // list of receivers
			subject: `Hello from ${payload.name}`, // Subject line
			text: body
		});

		console.log('Message sent: %s', info.messageId);
		// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

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
