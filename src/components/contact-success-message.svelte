<script lang="ts">
	import { EMAIL } from '$lib/constants';

	let {
		message,
		onSendAnother
	}: {
		message: string;
		onSendAnother: () => void;
	} = $props();
</script>

<div role="status" aria-live="polite" class="success-message p-6 rounded-lg text-center">
	<h3 class="text-xl font-semibold mb-2">Thanks — your message is in.</h3>
	<p class="body-text mb-4">{message}</p>
	<p class="text-sm muted-text mb-2">What happens next:</p>
	<ul class="next-steps mb-4" aria-label="Next steps">
		<li>I review your message and reply within 24 hours.</li>
		<li>We align on goals, timeline, and constraints.</li>
		<li>If it’s a fit, I’ll propose clear next steps.</li>
	</ul>
	<p class="text-sm muted-text mb-4">
		If you need to reach me urgently, you can also email me directly at
		<a href="mailto:{EMAIL}" class="accent-link">{EMAIL}</a>
	</p>
	<button class="text-sm accent-link underline" onclick={onSendAnother}>
		Send another message
	</button>
</div>

<style>
	.success-message {
		background-color: color-mix(in srgb, var(--color-accent) 10%, var(--color-bg));
		border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
	}

	.success-message h3 {
		color: var(--color-text);
	}

	.next-steps {
		text-align: left;
		list-style: disc;
		padding-left: 1.25rem;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.next-steps li + li {
		margin-top: 0.25rem;
	}
</style>
