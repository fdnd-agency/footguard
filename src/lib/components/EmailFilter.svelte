<script>
	export let onUpload = () => {};
	export let onInfo = () => {};
	export let onSettings = () => {};
</script>

<div class="mail-actions">
	<button type="button" aria-label="Upload" on:click={onUpload}>
		<svg viewBox="0 0 24 24" >
			<path d="M12 3v12m0-12l-4 4m4-4l4 4M4 15v4h16v-4" />
		</svg>
	</button>

	<button type="button" aria-label="Info" on:click={onInfo}>
		<svg viewBox="0 0 24 24" >
			<circle cx="12" cy="12" r="10" />
			<line x1="12" y1="10" x2="12" y2="16" />
			<circle cx="12" cy="7" r="1" />
		</svg>
	</button>

	<button type="button" aria-label="Settings" on:click={onSettings}>
		<svg viewBox="0 0 24 24" >
			<path d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
			<path d="M2 12h3m14 0h3M12 2v3m0 14v3" />
		</svg>
	</button>
</div>

<style>
	.mail-actions {
		display: flex;
		gap: 0.5rem;

		button {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			border: 1px solid var(--border-color);
			background: var(--icon-bg);
			display: grid;
			place-items: center;
			cursor: pointer;

			&:hover {
				background: var(--icon-hover);
			}
		}

		svg {
			width: 18px;
			height: 18px;
			stroke: #374151;
			fill: none;
			stroke-width: 1.5;
		}
	}
</style>
