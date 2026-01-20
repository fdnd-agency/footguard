<script>
  import Button from "$lib/components/buttons/Button.svelte";

  // Props van parent component
  export let articles = [];

  /**
   * Helper functie: bereken aantal dagen tot deadline
   * @param {string|null} deadline - ISO 8601 datum string
   * @returns {number} Aantal dagen tot deadline
   */
  function calculateDaysLeft(deadline) {
    if (!deadline) return 0;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  // Filter articles voor comparison, alleen completed en finalized
  $: compareGradingItems = articles
    .filter(
      (article) =>
        article.grading_status === "completed" ||
        article.grading_status === "finalized"
    )
    .map((article) => ({
      id: article.id,
      title: article.title,
      daysLeft: calculateDaysLeft(article.deadline),
    }));
</script>

<!-- Comparison card HTML -->
<article class="card compare-card">
  <!-- Card header -->
  <header class="card-header">
    <h2 id="comparison-heading" class="section-title">
      Available for comparison
    </h2>
    <p class="section-subtitle body-copy">
      Select a paper to compare with another assessor
    </p>
  </header>

  <!-- Toon lijst met openstaande items of empty state fallback -->
  <!-- https://svelte.dev/docs/logic-blocks#if -->
  {#if compareGradingItems.length > 0}
    <ul class="compare-list">
      {#each compareGradingItems as item (item.id)}
        <li class="compare-item">
          <!-- Item content wrapper -->
          <div class="compare-item-content">
            <!-- Icon -->
            <div class="compare-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 9H15V15H9V9Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <!-- Text content -->
            <div class="compare-text-content">
              <p class="compare-title body-copy">{item.title}</p>
              <div class="compare-meta">
                <span class="compare-tag micro-copy">Research paper</span>
                <span class="compare-dot">•</span>
                <span class="compare-date micro-copy">
                  {item.daysLeft > 0
                    ? `Due in ${item.daysLeft} day${item.daysLeft === 1 ? "" : "s"}`
                    : "No deadline"}
                </span>
              </div>
            </div>
          </div>

          <!-- Compare button -->
          <Button
            variant="outline"
            size="small"
            on:click={() => (window.location.href = `/compare/${item.id}`)}
          >
            Compare
          </Button>
        </li>
      {/each}
    </ul>

    <!-- Card footer met action button -->
    <footer class="card-footer">
      <Button
        variant="primary"
        size="medium"
        on:click={() => (window.location.href = "/research")}
      >
        View all research papers
      </Button>
    </footer>
  {:else}
    <!-- Empty state fallback -->
    <div class="empty-state">
      <svg
        class="empty-icon"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14 2V8H20"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h3 class="empty-title">No papers available</h3>
      <p class="empty-text">
        Complete grading to unlock comparisons with other assessors.
      </p>
    </div>
  {/if}
</article>

<style>
  /* Base card styling */
  .card {
    background: var(--background-color-primary);
    border-radius: 1rem;
    box-shadow:
      0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.12),
      0 0.125rem 0.25rem hsla(213, 12%, 15%, 0.08);
    overflow: hidden;
  }

  /* Compare card met flexbox layout */
  .compare-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* Card header */
  .card-header {
    padding: 1.5rem 1.5rem 0;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      padding: 2rem 2rem 0;
    }
  }

  .section-title {
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
    color: var(--grey-700);
  }

  .section-subtitle {
    margin: 0;
    line-height: 1.6;
    color: var(--grey-600);
  }

  /* Compare list met scrollable container */
  .compare-list {
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
    list-style: none;
    flex: 1;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }

    /* Desktop: scrollable lijst met custom scrollbar */
    @media (min-width: 1024px) {
      overflow-y: auto;
      max-height: 450px;

      /* Custom scrollbar styling voor betere UX */
      /* https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar */
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: var(--grey-100);
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--grey-400);
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: var(--grey-500);
      }
    }
  }

  /* Compare list item */
  .compare-item {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--grey-50);
    border-radius: 0.75rem;
    border: 1px solid var(--grey-200);
    transition: all 0.2s ease;

    /* Tablet: horizontal layout */
    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .compare-item:hover {
    border-color: var(--blue-300);
    background: var(--blue-50);
  }

  /* Item content wrapper */
  .compare-item-content {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    flex: 1;
    min-width: 0;
  }

  /* Compare icon */
  .compare-icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--blue-50);
    border-radius: 0.5rem;
    color: var(--blue-500);
    margin-top: 0.125rem;
  }

  /* Text content wrapper */
  .compare-text-content {
    flex: 1;
    min-width: 0;
  }

  /* Compare title met ellipsis voor lange titels */
  .compare-title {
    font-weight: 500;
    margin: 0 0 0.375rem 0;
    line-height: 1.4;
    color: var(--grey-700);
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Meta info container */
  .compare-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  /* Compare tag */
  .compare-tag {
    font-weight: 500;
    color: var(--blue-600);
    background: var(--blue-50);
    padding: 0.125rem 0.5rem;
    border-radius: 999px;
  }

  /* Separator dot */
  .compare-dot {
    color: var(--grey-400);
    font-size: 0.75rem;
  }

  /* Date text */
  .compare-date {
    color: var(--grey-600);
  }

  /* Card footer */
  .card-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--grey-200);
    margin-top: 0;

    @media (min-width: 768px) {
      padding: 2rem;
    }
  }

  /* Empty state fallback */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    flex: 1;
  }

  .empty-icon {
    color: var(--grey-400);
    margin-bottom: 1rem;
  }

  .empty-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--grey-700);
    margin: 0 0 0.5rem 0;
  }

  .empty-text {
    font-size: 0.875rem;
    color: var(--grey-600);
    margin: 0;
    max-width: 20rem;
    line-height: 1.6;
  }
</style>
