<script>
	import '$lib/css/styleguide.css'
	import logo from '$lib/assets/img/footguard-icon.webp'
	import Navbar from "$lib/components/Navbar.svelte";



	let { children } = $props();
</script>

<svelte:head>
	<title>Footguard</title>
	<link rel="icon" href="{logo}">
</svelte:head>

{@render children?.()}

<Navbar/>