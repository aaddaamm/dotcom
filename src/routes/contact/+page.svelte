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

	function setErrors(...fields: string[]) {
		fields.forEach((field) => {
			if (field === '' || field === undefined || field === null) {
				console.log('error for', { field });
				// document.querySelector(`input[title="${field}"]`).classList.add('error');
			} else {
				console.log('no error for', { field });
				// document.querySelector(`input[title="${field}"]`).classList.remove('error');
			}
		});
	}

	$: setErrors(name, email, message);
</script>

<div class="w-full justify-center">
	<h3 class="h3 font-thin mb-4">&#128679; under construction &#128679;</h3>
	<form class="flex flex-col sm:max-w-96">
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
				placeholder="Tell me what you'd like to discuss."
				bind:value={message}
			/>
		</label>
		<button class="btn variant-filled-primary" on:click={submitForm}>Submit</button>
	</form>
</div>
