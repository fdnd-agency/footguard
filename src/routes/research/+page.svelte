<script>
    let sidebarOpen = false;
    let form;

    import IWGDF from "$lib/assets/img/IWGDF-logo.webp";
    import Navbar from "$lib/components/Navbar.svelte";
    import inprogress from "$lib/assets/svg/inprogress-icon.svg";
    import author from "$lib/assets/svg/author-icon.svg";
    import calender from "$lib/assets/svg/calendar-icon.svg";
    import ProgressLabel from "$lib/partials/InprogressLabel.svelte";
    import FinishedLabel from "$lib/partials/FinishedLabel.svelte";
    import NotStarted from "$lib/partials/NotStartedLabel.svelte";

    import finished from "$lib/assets/svg/finished-icon.svg";
    import notStarted from "$lib/assets/svg/notstarted-icon.svg";


    import Selectbutton from "$lib/components/Filter-buttons.svelte"
    import Filters from "$lib/components/Filters.svelte"

    import GradingArticleCard from "$lib/components/Grading-article-card.svelte";

    // filter buttons
    import FinishedButtonFilter from "$lib/partials/Finished-button-filter.svelte";
    import InProgressButtonFilter from "$lib/partials/In-progress-button-filter.svelte";
    import NotStartedButtonFilter from "$lib/partials/Not-started-button-filter.svelte";

    export let data;
    const gradings = data.gradings

</script>

<div class="main-container">

    <Navbar />

    <section class="main-container-research">
        <h1 class="main-container-research-title">Gradings</h1>

        <form method="get" class="filter-form-container">
           <FinishedButtonFilter/>
            <InProgressButtonFilter/>
            <NotStartedButtonFilter/>
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

    .filter-form-container {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: flex-end;
    }

.research-card-title {
	color: var(--blue-700);
}

h2 .research-id {
	color: var(--grey-300);
}

.research-cards-container {
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
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

.research-card-data-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 0.5rem;
}

/* status label styling */
.status-label-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	border: 1px solid var(--orange-400);
	width: fit-content;
	padding: 0.35rem;
	border-radius: 0.5rem;
	color: var(--orange-700);
	background-color: var(--orange-100);
	white-space: nowrap;
}

.research-card-title-label {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	align-items: center;
}

@media (min-width: 700px) {
	.research-card-title-label {
		flex-direction: row;
	}
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
	gap: 0.5rem;
	justify-content: center;
}

.author-name,
.calender-date {
	font-size: clamp(10px, 1.5vw, 12px);
}

.research-card-action-btn {
	background-color: var(--blue-700);
	color: var(--main-text-color-light);
	padding: 0.5rem;
	border-radius: 1rem;
	width: fit-content;
	white-space: nowrap;
	font-size: clamp(10px, 1.5vw, 16px);
}

/* hide elements */
.hide {
	display: none;
}

@media (min-width: 768px) {
	.hide {
		display: flex;
	}
}

.hide-btn {
	display: none;
}

@media (min-width: 1300px) {
	.hide-btn {
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
	.action-container .status-label-container {
		display: none;
	}
}

@media (min-width: 1300px) {
	.action-container .research-card-action-btn {
		display: none;
	}
}

/* colors labels green and red */
.finished-label {
	border: 1px solid var(--green-500);
	color: var(--green-700);
	background-color: var(--green-100);
}

.not-started-label {
	border: 1px solid var(--red-400);
	color: var(--red-400);
	background-color: var(--red-100);
}

</style>
