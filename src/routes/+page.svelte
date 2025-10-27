<script>
  import IWGDF from "$lib/assets/IWGDF-logo.png";

  // Components
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import MobileHeader from "$lib/components/layout/MobileHeader.svelte";
  import Article from "$lib/components/cards/ArticleCard.svelte";
  import GradingCard from "$lib/components/cards/GradingCard.svelte";
  import StatCard from "$lib/components/cards/StatCard.svelte";
  import CircleGraph from "$lib/components/charts/CircleGraph.svelte";

  // Sidebar toggle state
  let sidebarOpen = false;

  // Dummy data
  const continueGradingItems = [
    {
      id: 1,
      title: "Home Monitoring of Foot Skin Temperatures to Prevent Ulceration",
      daysLeft: 3,
      yourProgress: 53,
      assessor2Progress: 25,
    },
    {
      id: 2,
      title: "Home Monitoring of Foot Skin Temperatures to Prevent Ulceration",
      daysLeft: 3,
      yourProgress: 53,
      assessor2Progress: 25,
    },
  ];

  const dashboardStats = [
    {
      id: 1,
      title: "Total papers",
      value: "15",
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

  const navItems = [
    { name: "Dashboard", subItems: "Sub-items here…" },
    { name: "Grading", subItems: "Sub-items here…" },
    { name: "Results", subItems: "Sub-items here…" },
    { name: "Admin", subItems: "Sub-items here…" },
  ];
</script>

<!-- <a href="#main-content" class="skip-link">Skip navigation</a> -->

<div class="dashboard">
  <!-- Sidebar -->
  <Sidebar
    bind:sidebarOpen
    {navItems}
    logoSrc={IWGDF}
    userName="Admin"
    userRole="Researcher"
  />

  <!-- Main content -->
  <main id="main-content">
    <!-- Mobile header -->
    <MobileHeader
      logoSrc={IWGDF}
      onMenuClick={() => (sidebarOpen = !sidebarOpen)}
    />

    <section class="content">
      <header class="dashboard-header">
        <hgroup class="header-content">
          <h1 class="page-title">Welcome back, Admin</h1>
          <p class="page-subtitle">Continue grading and track your progress.</p>
        </hgroup>
        <nav class="header-actions">
          <button class="button-secondary" type="button">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </button>
          <button class="button-primary" type="button">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
              ></polygon>
            </svg>
            Filter
          </button>
        </nav>
      </header>

      <!-- Dashboard stats -->
      <h2 class="sub-title">Your stats</h2>
      <p class="page-subtitle">View your personal stats below.</p>
      <section class="stats-grid">
        {#each dashboardStats as stat (stat.id)}
          <StatCard title={stat.title} value={stat.value} />
        {/each}
      </section>

      <!-- Continue grading -->
      <h2 class="sub-title">Continue grading</h2>
      <p class="page-subtitle">Pick up where you left off.</p>
      <section class="section">
        <div class="grading-grid">
          {#each continueGradingItems as item (item.id)}
            <GradingCard {...item} />
          {/each}
        </div>
      </section>

      <!-- Papers progress section -->
      <section class="section">
        <div class="bottom-grid">
          <!-- Papers progress -->
          <section class="papers-progress-card">
            <h2 class="section-title">Papers progress</h2>
            <CircleGraph />
          </section>

          <!-- Compare grading -->
          <div class="compare-grading-card">
            <h2 class="section-title">Compare grading</h2>
            <div class="compare-list">
              {#each compareGradingItems as item (item.id)}
                <div class="compare-item">
                  <p class="compare-text">{item.title}</p>
                  <button class="button-compare">Compare</button>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </section>
    </section>
  </main>
</div>

<style>
  /* Dashboard layout */
  .dashboard {
    display: flex;
    min-height: 100vh;
    background: radial-gradient(
      circle at 100% 0%,
      hsla(208, 100%, 32%, 0.35) 0%,
      hsla(217, 100%, 79%, 0.15) 35%,
      hsl(0, 0%, 100%) 85%
    );
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* Content */
  .content {
    flex: 1;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    margin: 2rem;
    max-width: 100%;

    /* Tablet */
    @media (min-width: 640px) {
      padding: 2rem 2rem;
      max-width: 700px;
      margin: 1rem auto;
    }

    /* Desktop */
    @media (min-width: 1024px) {
      padding: 2rem 3rem;
      max-width: 100%;
      gap: 2rem;
      margin: 0;
      margin-left: 15rem;
    }
  }

  .dashboard-header {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--grey-200);

    @media (min-width: 640px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.5rem;
      margin-bottom: 0;
      padding-bottom: 1.5rem;
    }
  }

  .header-content {
    flex: 1;
    min-width: 0;
  }

  .page-title {
    font-weight: 700;
    color: var(--grey-700);
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
    letter-spacing: -0.02em;

    @media (min-width: 640px) {
      font-size: 1.75rem;
    }

    @media (min-width: 1024px) {
      font-size: 2rem;
    }
  }

  .page-subtitle {
    font-size: 1rem;
    color: var(--grey-600);
    margin: 0;
    line-height: 1.6;

    @media (min-width: 640px) {
      font-size: 0.9rem;
    }
  }

  .header-actions {
    display: flex;
    gap: 0.75rem;
    width: 100%;

    @media (min-width: 640px) {
      width: auto;
      flex-shrink: 0;
    }
  }

  .button-secondary,
  .button-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    border: none;
    flex: 1;

    @media (min-width: 640px) {
      flex: 0 0 auto;
      padding: 0.625rem 1.125rem;
    }

    svg {
      flex-shrink: 0;
    }
  }

  .button-secondary {
    background: var(--background-color-primary);
    color: var(--grey-700);
    border: 1px solid var(--grey-300);

    &:hover {
      background: var(--grey-100);
      border-color: var(--grey-400);
      color: var(--grey-600);
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    &:active {
      transform: translateY(0);
      box-shadow: none;
    }
  }

  .button-primary {
    background: var(--blue-500);
    color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    &:hover {
      background: var(--blue-400);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
    }

    &:active {
      background: var(--blue-600);
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
  }

  .sub-title {
    font-size: 1.3rem;
    color: var(--grey-700);
    margin: 0;
    line-height: 1.6;
    margin-bottom: 0;

    @media (min-width: 640px) {
      font-size: 1.5rem;
    }
  }

  /* Dashboard stats grid */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
  }

  /* Grading cards grid */
  .grading-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    }
  }

  /* Bottom section grid */
  .bottom-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 1024px) {
      grid-template-columns: 450px 1fr;
      gap: 2rem;
    }
  }

  /* Cards styling */
  .compare-grading-card,
  .papers-progress-card {
    background: var(--background-color-primary);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, 0.08);
  }

  /* Section title */
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--main-text-color);
    margin-bottom: 1.5rem;

    @media (min-width: 1024px) {
      font-size: 1.5rem;
    }
  }

  /* Compare grading list */
  .compare-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .compare-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid hsl(210, 17%, 90%);
  }

  .compare-item:last-child {
    border-bottom: none;
  }

  .compare-text {
    flex: 1;
    margin: 0;
    font-size: 0.875rem;
    color: var(--main-text-color);
    line-height: 1.5;
  }

  .button-compare {
    background: transparent;
    color: var(--blue-500);
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    border: 1.5px solid var(--blue-500);
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .button-compare:hover {
    background: var(--blue-100);
  }
</style>
