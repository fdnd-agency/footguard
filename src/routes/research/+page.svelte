<script>
	// voor performance enhancement :https://svelte.dev/docs/kit/page-options
	export const csr = true;
	export const prerender = false;

	let sidebarOpen = false;
	let form;

	// Components
	import Navbar from "$lib/components/Navbar.svelte";
	import GradingArticleCard from "$lib/components/Grading-article-card.svelte";
	import FilterButton from "$lib/partials/Filter-button.svelte";

	// fetch data
	let { data } = $props();
	const gradings = data.gradings;
	const filter = data.filter;

	// values for status
	let status = [
		{ value: "allstatus", text: "Status" },
		{ value: "inprogress", text: "In progress" },
		{ value: "finished", text: "Finished" },
		{ value: "notstarted", text: "Not started" },
	];

	// custom value moeten uit theme komen van elk onderzoek uit database
	let theme = [
		{ value: "alltheme", text: "Theme" },
		{ value: "tempature", text: "Tempature" },
		{ value: "color", text: "Color" },
		{ value: "numbness", text: "Numbness" },
		{ value: "age", text: "Age" },
	];
</script>

<div class="main-container">

    <Navbar/>

    <section class="main-container-research">

        <h1 class="main-container-research-title">Gradings</h1>

		<!-- https://github.com/sveltejs/kit/discussions/8499
		voor het sumbitten van een geselecteerde value in een selectbutton -->
		<form class="filter-form-container" method="get" bind:this={form}>
  			<FilterButton labelText="Filter status" selectValues={status}/>
			<FilterButton labelText="Filter theme" selectValues={theme}/>
		</form>

        <div class="research-cards-container">
            {#each gradings as grading}
                <GradingArticleCard
                name={grading.name}
                article_id={grading.article_id}
                Publisher={grading.Publisher}
                publishing_year={grading.publishing_year}
                />
            {/each}
        </div>

    </section>
	
</div>

<style>
	:global(body) {
		background-color: var(--background-color-primary);
	}

	@media (min-width: 1024px) {
		.main-container {
			display: flex;
		}
	}

	.main-container-research {
		padding: 1rem 1rem 1rem 1rem;
		width: 100%;
	}

	.main-container-research-title {
		color: var(--blue-700);
		padding-top: 1.5rem;
		padding-bottom: 2rem;
	}

	/* positioning filter form */
	:global(.filter-form-container) {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		justify-content: flex-start;

		@media (min-width: 560px) {
			justify-content: flex-end;
		}
	}

	.research-cards-container {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
