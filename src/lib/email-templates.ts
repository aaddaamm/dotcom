// Email template utilities

export interface ContactFormData {
	name: string;
	email: string;
	phone?: string;
	budget?: string;
	message: string;
}

function escapeHtml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export function generateNotificationEmail(data: ContactFormData): string {
	const { name, email, phone, budget, message } = data;
	
	return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>New Contact Form Submission</title>
	<style>
		body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
		.header { background: #2a7a7a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
		.content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
		.field { margin-bottom: 15px; }
		.label { font-weight: bold; color: #2a7a7a; }
		.value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #3aafa9; }
		.message { white-space: pre-wrap; }
	</style>
</head>
<body>
	<div class="header">
		<h2>New Contact Form Submission</h2>
	</div>
	<div class="content">
		<div class="field">
			<div class="label">Name:</div>
			<div class="value">${escapeHtml(name)}</div>
		</div>
		<div class="field">
			<div class="label">Email:</div>
			<div class="value">${escapeHtml(email)}</div>
		</div>
		${phone ? `
		<div class="field">
			<div class="label">Phone:</div>
			<div class="value">${escapeHtml(phone)}</div>
		</div>
		` : ''}
		${budget ? `
		<div class="field">
			<div class="label">Budget:</div>
			<div class="value">${escapeHtml(budget)}</div>
		</div>
		` : ''}
		<div class="field">
			<div class="label">Message:</div>
			<div class="value message">${escapeHtml(message)}</div>
		</div>
	</div>
</body>
</html>
	`.trim();
}

export function generateAutoReplyEmail(name: string): string {
	return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Thanks for reaching out!</title>
	<style>
		body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
		.header { background: #2a7a7a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
		.content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
		.signature { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
	</style>
</head>
<body>
	<div class="header">
		<h2>Thanks for reaching out!</h2>
	</div>
	<div class="content">
		<p>Hi ${escapeHtml(name)},</p>
		
		<p>Thanks for getting in touch! I've received your message and will get back to you within 24 hours.</p>
		
		<p>In the meantime, feel free to check out my <a href="https://adamrobinson.tech/work" style="color: #2a7a7a;">recent work</a> or <a href="https://adamrobinson.tech/blog" style="color: #2a7a7a;">blog posts</a> about software development for small businesses.</p>
		
		<p>Looking forward to discussing your project!</p>
		
		<div class="signature">
			<p><strong>Adam Robinson</strong><br>
			Software Consultant & Freelancer<br>
			Cranston, RI<br>
			<a href="mailto:adam@adamrobinson.tech" style="color: #2a7a7a;">adam@adamrobinson.tech</a></p>
		</div>
	</div>
</body>
</html>
	`.trim();
}