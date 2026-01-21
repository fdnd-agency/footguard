<script>
  import Button from "$lib/components/buttons/Button.svelte";
  import DocumentIcon from "$lib/assets/svg/DocumentIcon.svelte";
  import CompareIcon from "$lib/assets/svg/CompareIcon.svelte";

  export let articles = [];

  function calculateDaysLeft(deadline) {
    if (!deadline) return 0;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  $: compareGradingItems = articles
    .filter(
      (article) =>
        article.grading_status === "completed" ||
        article.grading_status === "finalized",
    )
    .map((article) => ({
      id: article.id,
      title: article.title,
      daysLeft: calculateDaysLeft(article.deadline),
    }));
</script>

<article class="card compare-card">
  <header class="card-header">
    <h2 id="comparison-heading" class="section-title">
      Available for comparison
    </h2>
    <p class="section-subtitle body-copy">
      Select a paper to compare with another assessor
    </p>
  </header>

  <!-- https://svelte.dev/docs/logic-blocks#if -->
  {#if compareGradingItems.length > 0}
    <ul class="compare-list">
      {#each compareGradingItems as item (item.id)}
        <li class="compare-item">
          <div class="compare-item-content">
            <div class="compare-icon">
              <CompareIcon />
            </div>

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
    <div class="empty-state">
      <DocumentIcon class="empty-icon" />
      <h3 class="empty-title">No papers available</h3>
      <p class="empty-text">
        Complete grading to unlock comparisons with other assessors.
      </p>
    </div>
  {/if}
</article>

<style>
  .card {
    background: var(--background-color-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  .compare-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-header {
    padding: 1.5rem 1.5rem 0;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      padding: 2rem 2rem 0;
    }
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

    @media (min-width: 1024px) {
      overflow-y: auto;
      max-height: 450px;

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

  .compare-item {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--grey-50);
    border-radius: var(--radius-md);
    border: 1px solid var(--grey-200);
    transition: var(--transition-base);

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

  .compare-item-content {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    flex: 1;
    min-width: 0;
  }

  .compare-icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--blue-50);
    border-radius: var(--radius-sm);
    color: var(--blue-500);
    margin-top: 0.125rem;
  }

  .compare-text-content {
    flex: 1;
    min-width: 0;
  }

  .compare-title {
    font-weight: 500;
    margin: 0 0 0.375rem;
    line-height: 1.4;
    color: var(--grey-700);
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .compare-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .compare-tag {
    font-weight: 500;
    color: var(--blue-600);
    background: var(--blue-50);
    padding: 0.125rem 0.5rem;
    border-radius: var(--radius-full);
  }

  .compare-dot {
    color: var(--grey-400);
    font-size: 0.75rem;
  }

  .compare-date {
    color: var(--grey-600);
  }

  .card-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--grey-200);
    margin-top: 0;

    @media (min-width: 768px) {
      padding: 2rem;
    }
  }

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
    margin: 0 0 0.5rem;
  }

  .empty-text {
    font-size: 0.875rem;
    color: var(--grey-600);
    margin: 0;
    max-width: 20rem;
    line-height: 1.6;
  }
</style>
