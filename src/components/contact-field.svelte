<script lang="ts">
	type FieldOption = string;
	type FieldKind = 'input' | 'select' | 'textarea';

	let {
		id,
		label,
		value = $bindable(''),
		kind = 'input',
		type = 'text',
		required = false,
		error = '',
		placeholder = '',
		disabled = false,
		rows = 4,
		options = [],
		onFocus
	}: {
		id: string;
		label: string;
		value?: string;
		kind?: FieldKind;
		type?: string;
		required?: boolean;
		error?: string;
		placeholder?: string;
		disabled?: boolean;
		rows?: number;
		options?: FieldOption[];
		onFocus: () => void;
	} = $props();

	const errorId = $derived(error ? `${id}-error` : undefined);
</script>

<div class="form-group">
	<label for={id} class="form-label">{label}</label>
	{#if kind === 'select'}
		<select
			{id}
			bind:value
			{required}
			class="form-input"
			class:field-error={error}
			{disabled}
			onfocus={onFocus}
			aria-describedby={errorId}
		>
			<option value="">{placeholder}</option>
			{#each options as option (option)}
				<option value={option}>{option}</option>
			{/each}
		</select>
	{:else if kind === 'textarea'}
		<textarea
			{id}
			bind:value
			{required}
			{rows}
			class="form-input"
			class:field-error={error}
			{placeholder}
			{disabled}
			onfocus={onFocus}
			aria-describedby={errorId}
		></textarea>
	{:else}
		<input
			{type}
			{id}
			bind:value
			{required}
			class="form-input"
			class:field-error={error}
			{placeholder}
			{disabled}
			onfocus={onFocus}
			aria-describedby={errorId}
		/>
	{/if}
	{#if error}<p id={errorId} class="field-error-msg">{error}</p>{/if}
</div>

<style>
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-label {
		font-weight: 500;
		color: var(--color-text);
		font-size: 0.95rem;
	}

	.form-input {
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		background-color: var(--color-bg);
		color: var(--color-text);
		font-family: inherit;
		font-size: 0.95rem;
		transition:
			border-color 300ms ease,
			box-shadow 300ms ease;
	}

	.form-input:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 15%, transparent);
	}

	.form-input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.form-input::placeholder {
		color: var(--color-muted);
	}

	.form-input.field-error {
		border-color: var(--color-error);
	}

	.field-error-msg {
		font-size: 0.8rem;
		color: var(--color-error);
		margin: 0;
	}
</style>
