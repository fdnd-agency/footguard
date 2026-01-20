<script>
	import { fly } from "svelte/transition";
</script>


<p class="no-results-text" transition:fly={{ y:600, duration:700 }}>No items found</p>

<style>
	.no-results-text {
		padding: 4rem;
		text-align: center;
		background-color: var(--grey-100);
		margin-top: 2rem;
		border-radius: 1rem;
		color: var(--grey-700);
	}

</style>