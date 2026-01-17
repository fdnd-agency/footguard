<script>

	// Components
	import Sidebar from "$lib/components/layout/Sidebar.svelte";
	import GradingArticleCard from "$lib/components/cards/ResearchArticleCard.svelte";
	import FilterButton from "$lib/components/buttons/FilterButton.svelte";
	import SearchBar from "$lib/components/form/SearchBar.svelte";
	import Heading from "$lib/components/textual/Heading.svelte"
	import { fly } from 'svelte/transition';
	import { fade } from 'svelte/transition';


    import { text } from "@sveltejs/kit";
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, form } = $props();
	const gradings = data.cardData;

	// https://svelte.dev/docs/kit/$app-navigation#goto
	// for changening the url without page refresh
	function updateFilters() {
		goto(`?status=${data.status}&theme=${data.theme}`);
	}

</script>

<div class="main-container">
    <section class="main-container-research">
		<Heading title="Assigned Gradings" subTitle="An overview of all your gradings"/>

		<form method="get" class="filter-form-container" id="myForm">
			<label for="status" class="visually-hidden">filter status</label>
			<select class="filter-button" id="status" name="status" bind:value={data.status} on:change={updateFilters}>
				<option value="all">Status</option>
				<option value="Not started">Not started</option>
				<option value="Finished">Finished</option>
				<option value="In progress">In progress</option>
			</select>

			<label for="theme" class="visually-hidden">filter theme</label>
			<select class="filter-button" id="theme" name="theme" bind:value={data.theme} on:change={updateFilters}>
				<option value="all">Themes</option>
				<option value="Temperature">Temperature</option>
				<option value="Ulcers">Ulcers</option>
				<option value="High risk">High-Risk</option>
				<option value="Age">Age</option>
			</select>

			<noscript>
				<button class="submit-button"  type="submit">Filter</button>
			</noscript>
		</form>

         <!-- https://dev.to/a1guy/svelte-motion-theming-guide-transitions-animations-and-dark-mode-explained-4e3h: svelktekit animations -->
		{#if data.cardData.length === 0}
			<p class="no-results-text" in:fade>No gradings found</p>
		{:else}
			<div class="research-cards-container">
				{#each data.cardData as cardInfo}
					<div  transition:fly={{y: 100, duration: 400}}>
						<GradingArticleCard
							name={cardInfo.title}
							article_id={cardInfo.id}
							Publisher={cardInfo.Publisher}
							publishing_year={new Date(cardInfo.publishing_year).getFullYear()}
							status={cardInfo.status}
							theme={cardInfo.theme}
						/>
					</div>
				{/each}
			</div>
		{/if}
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
		background-color: var(--grey-100);
		margin-top: 2rem;
		border-radius: 1rem;
		color: var(--grey-700);
		/* animation: fadeIn 0.4s ease-out; */
	}

	.research-cards-container {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		/* animation: fadeIn 0.4s ease-out; */
	}

	/* @keyframes fadeIn {
		from { 
			opacity: 0;
			transform: translateX(30rem);

		} to {
			opacity: 1;
			transform: translateX(0);
		}
	} */

	.filter-button {
		background: none;
		color: inherit;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
		appearance: none;
		width: 8rem;

		border-radius: 0.5rem;
		padding: 0.5rem;

		background-color: var(--blue-700);
		color: var(--background-color-secondary);
		font-size: clamp(13px, 1.5vw, 15px);

		background-image: url("/src/lib/assets/svg/select-button-arrow.svg");
		background-repeat: no-repeat;
		background-position: right 0.5rem center;
		background-size: 1rem;
		transition: 0.2s ease-in-out;

		&:hover {
		background-color: var(--blue-500);
		}

		&:focus {
		outline: 2px solid var(--orange-400);
		}
	}

	.visually-hidden {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.submit-button {
		background: none;
		color: inherit;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
		appearance: none;

		border-radius: 0.5rem;
		padding: 0.5rem;

		background-color: var(--red-500);
		color: var(--background-color-secondary);
		font-size: clamp(13px, 1.5vw, 15px);
	}
</style>



