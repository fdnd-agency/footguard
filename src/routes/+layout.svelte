<script>
	import "$lib/css/styleguide.css";
	import { Navbar, MobileNav } from '$lib/';
	import { isCollapsed } from "$lib/stores/sidebar.js";

	let { children } = $props();
</script>

<div class="app-layout">
	<Navbar />

	<main class="page-content" class:collapsed={$isCollapsed}>
		{@render children?.()}
	</main>
</div>

<style>
	.app-layout {
		min-height: 100vh;
		display: flex;
	}

	.page-content {
		padding: 1.5rem;
		width: 100%;

		@media (min-width: 769px) {
			margin-left: 256px;

			&.collapsed {
				margin-left: 88px;
			}
		}

		@media (max-width: 768px) {
			margin-top: 80px;
		}
	}
</style>
