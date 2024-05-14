<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	let name: string;
	let email: string;
	let message: string;
	let errors: boolean = false;
	let isSubmitting: boolean = false;

	const toastStore = getToastStore();

	async function submitForm() {
		isSubmitting = true;
		if (!name || !email || !message) {
			errors = true;
			toastStore.trigger({
				message: 'please fill out all fields.',
				background: 'variant-filled-error',
				hideDismiss: true,
				timeout: 5000
			});
			isSubmitting = false;
			return;
		}

		try {
			await fetch('/api/mail', {
				method: 'POST',
				body: JSON.stringify({ name, email, message })
			});
			toastStore.trigger({
				message: 'Message sent! I will get back to you as soon as possible.',
				background: 'variant-filled-success',
				hideDismiss: true,
				timeout: 5000
			});

			name = '';
			email = '';
			message = '';
		} catch (error) {
			console.error('Error sending message:', error);

			toastStore.trigger({
				message: 'There was an error sending your message. Please try again later.',
				background: 'variant-filled-error',
				hideDismiss: true,
				timeout: 5000
			});
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="w-full justify-center">
	<h2 class="text-2xl font-bold mb-4">Contact Me</h2>
	<form class="flex flex-col sm:max-w-96">
		<label class="label mb-4">
			<span>Name</span>
			<input class="input" title="Name" type="text" bind:value={name} disabled={isSubmitting} />
		</label>
		<label class="label mb-4">
			<span>Email</span>
			<input class="input" title="email" type="email" bind:value={email} disabled={isSubmitting} />
		</label>
		<label class="label mb-4">
			<span>Message</span>
			<textarea
				class="textarea"
				rows="4"
				placeholder="Tell me what you'd like to discuss."
				disabled={isSubmitting}
				bind:value={message}
			/>
		</label>
		<button class="btn variant-filled-primary" disabled={isSubmitting} on:click={submitForm}>
			Submit
		</button>
	</form>
</div>
