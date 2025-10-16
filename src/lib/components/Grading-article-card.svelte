<script>
	// components
	import ProgressLabel from "$lib/partials/In-progress-label.svelte";
	import FinishedLabel from "$lib/partials/Finished-label.svelte";
	import NotStartedLabel from "$lib/partials/Not-started-label.svelte";
	import CardButton from "$lib/partials/Card-button.svelte";

	// icons
	import authorIcon from "$lib/assets/svg/author-icon.svg";
	import calenderIcon from "$lib/assets/svg/calendar-icon.svg";

	// Dynamic data variables
	export let name;
	export let article_id;
	export let Publisher;
	export let publishing_year;
	export let status;
</script>

<article class="research-card">
	<div class="research-card-data-container">

		<div class="research-card-title-label">
			<h2 class="research-card-title h4">
				<span class="research-id">{article_id} # -</span>
				{name}
			</h2>
		</div>

		<div class="research-card-author-date-container">
			<figure class="author-container">
				<img src="{authorIcon}" class="author-icon" alt="" height="15" width="15">
				<figcaption class="author-name">{Publisher}</figcaption>
			</figure>

			<figure class="calender-container">
				<img src="{calenderIcon}" class="calender-icon" alt="" height="15" width="15">
				<figcaption class="calender-date">{publishing_year}</figcaption>
			</figure>
		</div>

		<div class="action-container">
			<ProgressLabel/>
			<CardButton buttonContent="Continue" hrefRoute="/" class="display-none"/>
		</div>

	</div>
		<CardButton buttonContent="Continue" hrefRoute="/" class="hide-btn"/>
</article>

<style>
	h2 .research-id {
		color: var(--grey-300);
	}

	.research-card {
		padding: 1rem;
		border-radius: 1rem;
		background-color: hsl(200, 900%, 100%);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (min-width: 700px) {
		.research-card {
			flex-direction: row;
			align-items: center;
		}
	}

	.research-card-title {
		font-weight: bold;
		color: var(--blue-700);
	}

	.research-card-data-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
	}

	.research-card-author-date-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}

	.author-container,
	.calender-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.2rem;
		justify-content: center;
		text-align: center;
	}

	.author-name,
	.calender-date {
		font-size: clamp(10px, 1.5vw, 12px);
	}

	:global(.hide-btn) {
		display: none;
	}

	@media (min-width: 768px) {
		:global(.hide-btn) {
			display: flex;
			margin-left: auto;
			margin-right: 1rem;
		}
	}

	.action-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}

	@media (min-width: 768px) {
		:global(.action-container .display-none) {
			display: none;
		}
	}

	@media (min-width: 1300px) {
		:global(.action-container .display-none) {
			display: none;
		}
	}
</style>
