<script>
	// components
	import InprogressLabel from "$lib/partials/In-progress-label.svelte";
	import FinishedLabel from "$lib/partials/Finished-label.svelte";
	import NotStartedLabel from "$lib/partials/Not-started-label.svelte";
	import CardButton from "$lib/partials/Action-button.svelte";
	import ThemeLabel from "$lib/partials/Theme-label.svelte";


	// icons
	import authorIcon from "$lib/assets/svg/author-icon.svg";
	import calenderIcon from "$lib/assets/svg/calendar-icon.svg";
    import InProgressLabel from "$lib/partials/In-progress-label.svelte";

	// Dynamic data variables
	export let name;
	export let article_id;
	export let Publisher;
	export let publishing_year;
	export let status;


	// add class to component
    let className = '';
    export { className as class };
</script>

<a class="anchor-container-card" href="/checklist">
	<article class="research-card">
		<div class="research-card-data-container">
			<h2 class="research-card-title h4">
				<span class="research-id">{article_id} # -</span>
				{name}
			</h2>

			<div class="research-card-author-date-container">
				<figure class="author-container">
					<img src="{authorIcon}" class="author-icon" alt="" height="15" width="15">
					<figcaption class="author-name">{Publisher}</figcaption>
				</figure>

				<figure class="calender-container">
					<img src="{calenderIcon}" class="calender-icon" alt="" height="15" width="15">
					<time class="calender-date">{publishing_year}</time>
				</figure>
			</div>

			<div class="action-container">
				<InProgressLabel/>
				<ThemeLabel themeName="Temperature"/>
			</div>
		</div>
	</article>
</a>



<style>
	h2 .research-id {
		color: var(--grey-500);
	}

	.research-card {
		padding: 1rem;
		border-radius: 1rem;
		background-color: var(--background-color-primary);
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&:hover {
			background-color: hsl(200, 90%, 96%);
		}
	}

	@media (min-width: 700px) {
		.research-card {
			flex-direction: row;
			align-items: center;
		}
	}

	.research-card-title {
		font-weight: bold;
		color: var(--grey-700);
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
		color: var(--grey-700);
	}

	.action-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}

	.anchor-container-card {
		transition: transform 0.3s ease;

		&:hover {
			transform: translateY(-2px);
		}
	}
	
</style>
