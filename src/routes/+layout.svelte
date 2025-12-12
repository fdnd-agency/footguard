<script>
	import "$lib/css/styleguide.css";
	import { Navbar, MobileNav } from "$lib/";
	import { isCollapsed } from "$lib/stores/sidebar.js";

	let { children } = $props();

	let isMobile = $state(false);

	if (typeof window !== "undefined") {
		const check = () => (isMobile = window.innerWidth <= 768);
		check();
		window.addEventListener("resize", check);
	}
</script>

<div class="app-layout">
	{#if isMobile}
		<MobileNav />
	{:else}
		<Navbar />
	{/if}

	<main class="page-content" class:collapsed={$isCollapsed}>
		{@render children?.()}
	</main>
</div>

<style>
	.app-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column; /* MobileNav staat bovenaan */
	}

	/* Main page content */
	.page-content {
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--grey-700);
		height: 100vh;
		padding: 1rem;
		@media (min-width: 769px) {
			margin-left: 240px;
			margin-top: 0;

			&.collapsed {
				margin-left: 80px;
			}
		}

		@media (max-width: 768px) {
			margin-top: 80px; /* hoogte mobile nav */
			margin-left: 0;
		}
	}
</style>
