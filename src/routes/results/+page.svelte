<script>
    import { Navbar, MobileNav } from '$lib/';

    let isMobile = $state(false);

    if (typeof window !== "undefined") {
        const check = () => isMobile = window.innerWidth <= 768;
        check();
        window.addEventListener("resize", check);
    }
</script>

{#if isMobile}
    <MobileNav />
{:else}
    <Navbar />
{/if}


<main class="page-content">
	<h1>Hello world</h1>
</main>

<style>
    .page-content {
	padding: 1.5rem;

	@media (max-width: 768px) {
		margin-top: 80px;
	}

	@media (min-width: 769px) {
		margin-left: 256px;
		margin-left: 240px;
		margin-top: 0;
	}
}
</style>