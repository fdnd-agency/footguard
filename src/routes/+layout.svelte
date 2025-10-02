<script>
    import favicon from '$lib/assets/favicon.svg';
	import styleguide from '$lib/css/styleguide.css';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
