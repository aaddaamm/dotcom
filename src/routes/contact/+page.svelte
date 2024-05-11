<script lang="ts">
	let name: string;
	let email: string;
	let message: string;
	let errors: boolean = false;

	async function submitForm() {
		if (!name || !email || !message) {
			errors = true;
			alert('Please fill out all fields.');
			return;
		}

		const response = await fetch('/api/mail', {
			method: 'POST',
			body: JSON.stringify({ name, email, message })
		});

		console.log('Form submitted!', { name, email, message, response });
	}
</script>

<div>
	<form class="flex flex-col max-w-80">
		<label class="label mb-4">
			<span>Name</span>
			<input class="input" title="Name" type="text" bind:value={name} />
		</label>
		<label class="label mb-4">
			<span>Email</span>
			<input class="input" title="email" type="email" bind:value={email} />
		</label>
		<label class="label mb-4">
			<span>Message</span>
			<textarea
				class="textarea"
				rows="4"
				placeholder="Enter some long form content."
				bind:value={message}
			/>
		</label>
		<button class="btn variant-filled-primary" on:click={submitForm}>Submit</button>
	</form>
</div>
