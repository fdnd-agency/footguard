<script>
	export let placeholder = "Search mail";
	export let ariaLabel = "Search mail";
</script>

<div class="mail-search">
	<input
		type="search"
		{placeholder}
		aria-label={ariaLabel}
	/>
</div>

<style>
	.mail-search {
		input {
			width: 280px;
			padding: 0.55rem 0.9rem;
			border-radius: 999px;
			border: 1px solid var(--border-color);
			background: var(--input-bg);
			font-size: 0.9rem;

			&:focus {
				outline: none;
				border-color: #9ca3af;
				background: #ffffff;
			}
		}
	}
</style>

