<script>
	// for custom button text
	export let buttonContent = "buttontext";
	// for custom href route
	export let hrefRoute = "/";

	// add class to component
	let className = "";
	export { className as class };
</script>

<a href="/" class="card-button paragraph {className}">{buttonContent}</a>

<style>
	.card-button {
		background-color: var(--blue-700);
		color: var(--main-text-color-light);
		padding: 0.5rem;
		border-radius: 1rem;
		width: fit-content;
		white-space: nowrap;
		font-size: clamp(10px, 1.5vw, 16px);
	}
</style>
