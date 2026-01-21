<script>
  import GradingCard from "$lib/components/cards/GradingCard.svelte";
  import Button from "$lib/components/buttons/Button.svelte";

  export let articles = [];

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  function calculateDaysLeft(deadline) {
    if (!deadline) return Infinity;

    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // https://svelte.dev/docs/svelte-components#script-3-$-marks-a-statement-as-reactive
  $: continueGradingItems = (articles || [])
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    .filter((article) => article.grading_status === "in_progress")
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    .map((article) => ({
      id: article.id,
      title: article.title ?? "Untitled",
      daysLeft: calculateDaysLeft(article.deadline),
      yourProgress: article.your_progress ?? 0,
      assessor2Progress: article.assessor_2_progress ?? 0,
      assignedToName: article.assigned_to?.name ?? "Unknown",
      assessor2Name: article.assessor_2?.name ?? "Unknown",
    }))
    .filter((item) => item.daysLeft >= 0);
</script>

<section class="grading-section">
  <div class="section-header">
    <div>
      <h2 id="grading-heading" class="section-title">Continue grading</h2>
      <p class="section-subtitle body-copy">Pick up where you left off.</p>
    </div>
  </div>

  <!-- https://svelte.dev/docs/logic-blocks#if -->
  {#if continueGradingItems.length > 0}
    <div class="grading-grid">
      <!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice -->
      {#each continueGradingItems.slice(0, 3) as item (item.id)}
        <GradingCard {...item} />
      {/each}

      {#if continueGradingItems.length > 3}
        <article class="view-all-card">
          <div class="view-all-content">
            <p class="view-all-text large-copy">
              Oops... looks like you have {continueGradingItems.length - 3} more
              research paper{continueGradingItems.length - 3 === 1 ? "" : "s"} to
              continue.
            </p>
            <Button
              variant="secondary"
              size="medium"
              on:click={() => (window.location.href = "/research")}
            >
              View all your research papers
            </Button>
          </div>
        </article>
      {/if}
    </div>
  {:else}
    <div class="empty-state">
      <svg
        class="empty-icon"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M9 11L12 14L22 4"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 12V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h3 class="empty-title">All caught up!</h3>
      <p class="empty-text">You have no papers in progress at the moment.</p>
      <Button
        variant="primary"
        size="medium"
        on:click={() => (window.location.href = "/research")}
      >
        Start grading
      </Button>
    </div>
  {/if}
</section>

<style>
  .grading-section {
    padding: 0 1rem;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }

    @media (min-width: 1024px) {
      padding: 0 3rem;
    }

    @media (min-width: 1440px) {
      padding: 0 4rem;
    }
  }

  .section-header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .section-title {
    margin: 0 0 0.5rem;
    line-height: 1.4;
    color: var(--grey-700);
  }

  .section-subtitle {
    margin: 0;
    line-height: 1.6;
    color: var(--grey-600);
  }

  .grading-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
      /* https://developer.mozilla.org/en-US/docs/Web/CSS/repeat */
      /* https://developer.mozilla.org/en-US/docs/Web/CSS/minmax */
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 31rem), 1fr));
    }
  }

  .view-all-card {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--blue-200), var(--blue-300));
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-lg);
    color: var(--blue-700);
    text-align: center;
  }

  .view-all-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .view-all-text {
    max-width: 18rem;
    margin: 0;
    font-weight: 600;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    background: var(--background-color-primary);
    border-radius: var(--radius-lg);
    border: 2px dashed var(--grey-300);
    min-height: 20rem;
  }

  .empty-icon {
    color: var(--blue-500);
    margin-bottom: 1rem;
  }

  .empty-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--grey-700);
    margin: 0 0 0.5rem;
  }

  .empty-text {
    font-size: 0.875rem;
    color: var(--grey-600);
    margin: 0 0 1.5rem;
    max-width: 25rem;
    line-height: 1.6;
  }
</style>
