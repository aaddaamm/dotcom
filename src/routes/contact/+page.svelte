<script lang="ts">
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let status: 'idle' | 'success' | 'error' = $state('idle');
	let statusMessage = $state('');

	async function submitForm() {
		isSubmitting = true;
		status = 'idle';

		if (!name || !email || !message) {
			status = 'error';
			statusMessage = 'Please fill out all fields.';
			isSubmitting = false;
			return;
		}

		try {
			const response = await fetch('/api/mail', {
				method: 'POST',
				body: JSON.stringify({ name, email, message })
			});

			if (!response.ok) {
				throw new Error('Failed to send message');
			}

			status = 'success';
			statusMessage = 'Message sent! I will get back to you as soon as possible.';
			name = '';
			email = '';
			message = '';
		} catch (error) {
			console.error('Error sending message:', error);
			status = 'error';
			statusMessage = 'There was an error sending your message. Please try again later.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact — Adam Robinson</title>
	<meta name="description" content="Get in touch with Adam Robinson, Lead Software Engineer specializing in backend systems and workflow-driven platforms." />
	<meta property="og:title" content="Contact — Adam Robinson" />
	<meta property="og:description" content="Get in touch with Adam Robinson, Lead Software Engineer specializing in backend systems and workflow-driven platforms." />
	<meta property="og:image" content="https://adamrobinson.tech/og-card.png" />
	<meta property="og:url" content="https://adamrobinson.tech/contact" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href="https://adamrobinson.tech/contact" />
</svelte:head>

<div class="max-w-3xl mx-auto px-6 pt-20 sm:pt-28 pb-16">
	<a
		href="/"
		class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors"
	>
		<span aria-hidden="true">&larr;</span>
		Back
	</a>
	<h1 class="page-title text-3xl font-semibold tracking-tight mb-8">Contact Me</h1>

	{#if status !== 'idle'}
		<div
			class="mb-6 rounded-lg px-4 py-3 text-sm {status === 'success'
				? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
				: 'bg-red-500/10 text-red-400 border border-red-500/20'}"
		>
			{statusMessage}
		</div>
	{/if}

	<form class="flex flex-col sm:max-w-md" onsubmit={(e) => { e.preventDefault(); submitForm(); }}>
		<label class="block mb-5">
			<span class="form-label text-sm mb-1.5 block">Name</span>
			<input
				class="form-input w-full rounded-lg border bg-white/[0.03] px-3 py-2.5 text-sm transition-colors"
				type="text"
				bind:value={name}
				disabled={isSubmitting}
			/>
		</label>
		<label class="block mb-5">
			<span class="form-label text-sm mb-1.5 block">Email</span>
			<input
				class="form-input w-full rounded-lg border bg-white/[0.03] px-3 py-2.5 text-sm transition-colors"
				type="email"
				bind:value={email}
				disabled={isSubmitting}
			/>
		</label>
		<label class="block mb-5">
			<span class="form-label text-sm mb-1.5 block">Message</span>
			<textarea
				class="form-input w-full rounded-lg border bg-white/[0.03] px-3 py-2.5 text-sm transition-colors resize-none"
				rows="4"
				placeholder="Tell me what you'd like to discuss."
				disabled={isSubmitting}
				bind:value={message}
			></textarea>
		</label>
		<button
			type="submit"
			class="submit-button rounded-lg px-5 py-2.5 text-sm font-medium disabled:opacity-50 transition-colors"
			disabled={isSubmitting}
		>
			{isSubmitting ? 'Sending...' : 'Send Message'}
		</button>
	</form>
</div>

<style>
	.back-link {
		color: var(--color-muted);
	}
	.back-link:hover {
		color: var(--color-accent);
	}
	.page-title {
		color: var(--color-text);
	}
	.form-label {
		color: var(--color-muted);
	}
	.form-input {
		color: var(--color-text);
		border-color: rgba(255, 255, 255, 0.08);
	}
	.form-input::placeholder {
		color: var(--color-muted);
	}
	.form-input:focus {
		border-color: color-mix(in srgb, var(--color-accent) 50%, transparent);
		outline: 1px solid color-mix(in srgb, var(--color-accent) 30%, transparent);
	}
	.submit-button {
		background-color: var(--color-accent);
		color: white;
	}
	.submit-button:hover {
		background-color: color-mix(in srgb, var(--color-accent) 85%, white);
	}
</style>
