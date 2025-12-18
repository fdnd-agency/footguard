<script>
  import { onMount } from "svelte";

  // Components
  import GradingCard from "$lib/components/cards/GradingCard.svelte";
  import StatCard from "$lib/components/cards/StatCard.svelte";
  import CircleGraph from "$lib/components/charts/CircleGraph.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import CustomCursor from "$lib/components/CustomCursor.svelte";

  // Custom cursor state
  let cursorActive = false;

  // Dummy data
  const continueGradingItems = [
    {
      id: 1,
      title: "Home Monitoring of Foot Skin Temperatures to Prevent Ulceration",
      daysLeft: 3,
      yourProgress: 73,
      assessor2Progress: 65,
    },
    {
      id: 2,
      title:
        "Evaluating Smart Insoles for Early Detection of Foot Complications",
      daysLeft: 5,
      yourProgress: 48,
      assessor2Progress: 31,
    },
    {
      id: 3,
      title:
        "Long-term Study on Diabetic Foot Care Interventions in Rural Areas",
      daysLeft: 10,
      yourProgress: 22,
      assessor2Progress: 10,
    },
    {
      id: 4,
      title: "Innovative Approaches to Diabetic Foot Ulcer Prevention",
      daysLeft: 5,
      yourProgress: 42,
      assessor2Progress: 30,
    },
  ];

  const dashboardStats = [
    {
      id: 1,
      title: "Total papers",
      value: "15",
      variant: "primary",
    },
    {
      id: 2,
      title: "Graded papers",
      value: "6",
    },
    {
      id: 3,
      title: "Total Finalized",
      value: "3",
    },
    {
      id: 4,
      title: "Not started",
      value: "9",
    },
  ];

  const compareGradingItems = [
    {
      id: 1,
      title: "Home monitoring of foot skin temperatures to prevent ulceration",
    },
    {
      id: 2,
      title: "Home monitoring of foot skin temperatures to prevent ulceration",
    },
    {
      id: 3,
      title: "Home monitoring of foot skin temperatures to prevent ulceration",
    },
    {
      id: 4,
      title: "Home monitoring of foot skin temperatures to prevent ulceration",
    },
    {
      id: 5,
      title: "Home monitoring of foot skin temperatures to prevent ulceration",
    },
  ];
</script>

<!-- Skip to main content link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Main layout container -->
<div class="dashboard">
  <!-- Main content area -->
  <main class="content" id="main-content">
    <!-- Header section -->
    <header class="dashboard-header">
      <hgroup class="header-content">
        <h1 class="page-title h1">Welcome back, Admin</h1>
        <p class="page-subtitle body-copy">
          Continue your research and track your progress.
        </p>
      </hgroup>

      <nav class="header-actions" aria-label="Dashboard actions">
        <input
          type="search"
          placeholder="Search..."
          class="search-input"
          aria-label="Search dashboard"
        />
        <Button
          class="js-only"
          variant="primary"
          on:click={() => (cursorActive = !cursorActive)}
          aria-pressed={cursorActive}
        >
          {cursorActive ? "Disable" : "Enable"} custom cursor
        </Button>
      </nav>
    </header>

    <!-- Stats section -->
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading" class="section-title h2">Your personal stats</h2>
      <p class="section-subtitle body-copy">View your personal stats below.</p>

      <div class="stats-grid" role="list">
        {#each dashboardStats as stat (stat.id)}
          <div role="listitem">
            <StatCard
              title={stat.title}
              value={stat.value}
              variant={stat.variant}
            />
          </div>
        {/each}
      </div>
    </section>

    <!-- Grading section -->
    <section aria-labelledby="grading-heading">
      <div class="section-header">
        <div>
          <h2 id="grading-heading" class="section-title h2">
            Continue grading
          </h2>
          <p class="section-subtitle body-copy">Pick up where you left off.</p>
        </div>
      </div>

      <div class="grading-grid">
        {#each continueGradingItems.slice(0, 3) as item (item.id)}
          <GradingCard {...item} />
        {/each}

        {#if continueGradingItems.length > 3}
          <article
            class="view-all-card"
            role="complementary"
            aria-label="View more papers"
          >
            <div class="view-all-content">
              <p class="view-all-text large-copy">
                Oops... looks like you have more research papers to continue.
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
    </section>

    <!-- Comparison section -->
    <section aria-labelledby="comparison-heading" class="bottom-section">
      <div class="bottom-grid">
        <!-- Progress card -->
        <article class="card progress-card">
          <header class="card-header">
            <h2 id="progress-heading" class="section-title h2">
              Progress overview
            </h2>
            <p class="section-subtitle body-copy">
              Completion status of your papers
            </p>
          </header>

          <div class="graph-container">
            <CircleGraph />
          </div>

          <footer class="card-footer">
            <Button variant="primary" size="medium">
              View detailed breakdown
            </Button>
          </footer>
        </article>

        <!-- Compare card -->
        <article class="card compare-card">
          <header class="card-header">
            <h2 id="comparison-heading" class="section-title h2">
              Available for comparison
            </h2>
            <p class="section-subtitle body-copy">
              Select a paper to compare with another assessor
            </p>
          </header>

          <ul class="compare-list">
            {#each compareGradingItems as item (item.id)}
              <li class="compare-item">
                <div class="compare-item-content">
                  <div class="compare-icon" aria-hidden="true">
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
                  <div class="compare-text-content">
                    <p class="compare-title body-copy">{item.title}</p>
                    <div class="compare-meta">
                      <span class="compare-tag micro-copy">Research paper</span>
                      <span class="compare-dot" aria-hidden="true">•</span>
                      <span class="compare-date micro-copy">Due in 5 days</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="small">Compare</Button>
              </li>
            {/each}
          </ul>

          <footer class="card-footer">
            <Button variant="primary" size="medium" fullWidth>
              View all research papers
            </Button>
          </footer>
        </article>
      </div>
    </section>
  </main>

  <CustomCursor active={cursorActive} />
</div>

<Footer />

<!-- Progressive Enhancement fallback -->
<noscript>
  <style>
    .js-only {
      display: none !important;
    }

    [aria-pressed] {
      display: none;
    }
  </style>
</noscript>

<style>
  /* Dashboard layout */
  .dashboard {
    display: flex;
    background: radial-gradient(
      circle at 100% 0%,
      hsla(208, 100%, 32%, 0.12) 0%,
      hsla(217, 100%, 79%, 0.06) 25%,
      hsl(0, 0%, 100%) 35%
    );
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem 0 4rem 0;
    max-width: 100%;
    gap: 1.5rem;
    background: radial-gradient(
      circle at 100% 0%,
      hsla(208, 100%, 32%, 0.12) 0%,
      hsla(217, 100%, 79%, 0.06) 25%,
      hsl(0, 0%, 100%) 35%
    );

    @media (min-width: 768px) {
      padding: 2rem 0 5rem 0;
      gap: 2rem;
    }

    @media (min-width: 1024px) {
      padding: 3rem 0 6rem 0;
      gap: 2.5rem;
    }
  }

  /* Section horizontal padding */
  .content > section,
  .content > .dashboard-header {
    padding-left: 1rem;
    padding-right: 1rem;

    @media (min-width: 768px) {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    @media (min-width: 1024px) {
      padding-left: 3rem;
      padding-right: 3rem;
    }

    @media (min-width: 1440px) {
      padding-left: 4rem;
      padding-right: 4rem;
    }
  }

  /* Header */
  .dashboard-header {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding-bottom: 1.25rem;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--grey-200);
    }
  }

  .header-content {
    flex: 1;
    min-width: 0;
  }

  .page-title {
    margin-bottom: 0.5rem;
  }

  .page-subtitle {
    margin: 0;
  }

  .header-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
      flex-shrink: 0;
    }
  }

  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    border: 1px solid var(--grey-300);
    background: var(--background-color-primary);
    color: var(--grey-700);

    &::placeholder {
      color: var(--grey-500);
    }

    &:hover {
      border-color: var(--grey-400);
    }

    &:focus {
      outline: none;
      border-color: var(--blue-500);
      box-shadow: 0 0 0 3px hsla(213, 100%, 50%, 0.1);
    }

    @media (min-width: 768px) {
      flex: 0 0 auto;
      min-width: 15.625rem;
    }
  }

  /* Sections */
  .section-title {
    margin-bottom: 0.5rem;
  }

  .section-subtitle {
    margin-bottom: 1rem;
  }

  .section-header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    & .section-title {
      margin-bottom: 0.5rem;
    }

    & .section-subtitle {
      margin-bottom: 0;
    }

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: start;
    }
  }

  /* Stats card */
  .stats-grid {
    display: flex;
    gap: 1rem;
    width: 100%;
    flex-wrap: wrap;

    @media (min-width: 640px) {
      gap: 1.25rem;
    }

    @media (min-width: 1024px) {
      gap: 1.5rem;
    }
  }

  /* Grading card */
  .grading-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(31.25rem, 1fr));
    }
  }

  .view-all-card {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--blue-200), var(--blue-300));
    border-radius: 1rem;
    padding: 2rem;
    box-shadow:
      0 0.5rem 1rem hsla(213, 12%, 15%, 0.15),
      0 0.25rem 0.5rem hsla(213, 12%, 15%, 0.1);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    color: var(--background-color-primary);
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
  }

  /* Bottom section */
  .bottom-section {
    width: 100%;
  }

  .bottom-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    @media (min-width: 1440px) {
      grid-template-columns: 1.2fr 1fr;
      gap: 2.5rem;
    }
  }

  /* Cards */
  .card {
    background: var(--background-color-primary);
    border-radius: 1rem;
    box-shadow:
      0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.12),
      0 0.125rem 0.25rem hsla(213, 12%, 15%, 0.08);
    overflow: hidden;

    @media (min-width: 1024px) {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .card-header {
    padding: 1.5rem 1.5rem 0 1.5rem;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      padding: 2rem 2rem 0 2rem;
    }
  }

  .card-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--grey-200);
    margin-top: 0;

    @media (min-width: 768px) {
      padding: 2rem;
    }
  }

  /* Progress card */
  .progress-card {
    @media (min-width: 1024px) {
      display: flex;
      flex-direction: column;
    }
  }

  .graph-container {
    padding: 0 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;

    @media (min-width: 768px) {
      padding: 0 2rem;
      min-height: 240px;
    }

    @media (min-width: 1024px) {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  /* Compare section */
  .compare-card {
    @media (min-width: 1024px) {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .compare-list {
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
    list-style: none;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }

    @media (min-width: 1024px) {
      flex: 1;
      overflow-y: auto;
      max-height: 450px;

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
    }
  }

  .compare-item {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--grey-50);
    border-radius: 0.75rem;
    border: 1px solid var(--grey-200);
    transition: all 0.2s ease;

    @media (min-width: 640px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .compare-item-content {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    flex: 1;
  }

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

  .compare-text-content {
    flex: 1;
    min-width: 0;
  }

  .compare-title {
    font-weight: 500;
    margin: 0 0 0.375rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
    border-radius: 999px;
  }

  .compare-dot {
    color: var(--grey-400);
    font-size: 0.75rem;
  }

  .compare-date {
    color: var(--grey-600);
  }
</style>
