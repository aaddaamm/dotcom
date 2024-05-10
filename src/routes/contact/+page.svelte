<script>
	import Button from '../../components/button.svelte';
</script>

<div>
	<h1>Contact</h1>
	<form class="flex flex-col max-w-80">
		<label for="name">Name</label>
		<input type="text" id="name" name="name" />
		<label for="email">Email</label>
		<input type="email" id="email" name="email" />
		<label for="message">Message</label>
		<textarea id="message" name="message"></textarea>
		<Button type="submit">Click me</Button>
	</form>
</div>
