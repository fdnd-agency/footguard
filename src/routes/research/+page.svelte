<script>

	// Components
	import Sidebar from "$lib/components/layout/Sidebar.svelte";
	import GradingArticleCard from "$lib/components/Grading-article-card.svelte";
	import FilterButton from "$lib/partials/Filter-button.svelte";
	import SearchBar from "$lib/partials/Search-bar.svelte";
	import Heading from "$lib/partials/Heading.svelte";

    import { text } from "@sveltejs/kit";
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, form, buttonOff } = $props();
	const gradings = data.cardData;

	
	// https://svelte.dev/docs/kit/$app-navigation#goto
	// for changening the url without page refresh
	function updateFilters() {
		goto(`?status=${data.status}&theme=${data.theme}`);
	}

	// adding class to remove submit-button
	onMount(() => {
		buttonOff.classList.add('js-on');
	});


</script>

<div class="main-container">
    <section class="main-container-research">
		<Heading title="Assigned Gradings" subTitle="An overview of all your gradings"/>



		<!-- <form method="get">
  <select name="theme" bind:value={data.filter}>
    <option value="all-themes">All Themes</option>
    <option value="Temperature">Temperature</option>
    <option value="Ulcers">Ulcers</option>
    <option value="High risk ">High-Risk</option>
    <option value="Age">Age</option>
  </select>
  <button type="submit">Filter</button>
</form> -->

		<form method="get">
  <select name="status" bind:value={data.status}>
	<option value="all">Status</option>
    <option value="Not started">Not started</option>
    <option value="Finished">Finished</option>
    <option value="In progress">In progress</option>
  </select>


  <select name="theme" bind:value={data.theme}>
    <option value="all-themes">Themes</option>
    <option value="Temperature">Temperature</option>
    <option value="Ulcers">Ulcers</option>
    <option value="High risk ">High-Risk</option>
    <option value="Age">Age</option>
  </select>


  <button type="submit">Filter</button>
</form>

<!-- <h2> {data.theme}</h2>
<h2>{data.status}</h2> -->


		<!-- <form method="get" filter={data.filter}>
        <button class="filterButton" type="submit" name="filter" value="Age">Alle</button>
        <button class="filterButton" type="submit" name="filter" value="High-risk">Morning</button>
        <button class="filterButton" type="submit" name="filter" value="Ulcers">Evening</button>
    </form> -->

<!-- https://github.com/sveltejs/kit/discussions/8499
		voor het sumbitten van een geselecteerde value in een selectbutton -->
		<!-- <form class="filter-form-container" method="get" bind:this={form} filter={data.filter}> -->
  			<!-- <FilterButton filterLabel_ID="status" labelText="Filter status" selectValues={status}/> -->
			<!-- <FilterButton filterLabel_ID="theme" labelText="Filter theme" selectValues={theme}/> -->
			<!-- <FilterButton {selectValues} filterLabel_ID="theme" labelText="Filter theme"/> -->
		<!-- </form> -->


		{#if data.cardData.length === 0}
			<p class="no-results-text">No gradings found</p>
			{:else}
		<div class="research-cards-container">
  			{#each data.cardData as cardInfo}
                <GradingArticleCard
                name={cardInfo.title}
                article_id={cardInfo.id}
                Publisher={cardInfo.Publisher}
    			publishing_year={new Date(cardInfo.publishing_year).getFullYear()}
				status={cardInfo.status}
            	theme={cardInfo.theme}
                />
            {/each}
        </div>
	{/if}





        <!-- <div class="research-cards-container">
  			{#each data.cardData as cardInfo}
                <GradingArticleCard
                name={cardInfo.title}
                article_id={cardInfo.id}
                Publisher={cardInfo.Publisher}
    			publishing_year={new Date(cardInfo.publishing_year).getFullYear()}
				status={cardInfo.status}
            	theme={cardInfo.theme}
                />
            {/each}
        </div> -->

    </section>
	
</div>

<style>

	@media (min-width: 1024px) {
		.main-container {
			display: flex;
		}
	}

	.main-container-research {
		padding: 1rem 1rem 1rem 1rem;
		width: 100%;
	}

	/* positioning filter form */
	.filter-form-container {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		justify-content: flex-start;

		@media (min-width: 560px) {
			justify-content: flex-end;
		}
	}

	.no-results-text {
		padding: 4rem;
		text-align: center;
		background-color: hsla(197, 7%, 79%, 0.127);
		margin-top: 2rem;
		border-radius: 1rem;
		color: var(--grey-700);

	}

	.research-cards-container {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
