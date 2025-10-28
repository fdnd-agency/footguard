<script>
  import IWGDF from "$lib/assets/IWGDF-logo.png";

  // Components
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import MobileHeader from "$lib/components/layout/MobileHeader.svelte";
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

  const navItems = [
    {
      name: "Dashboard",
      subItems: [
        { name: "Overview", href: "/dashboard" },
        { name: "Statistics", href: "/dashboard/stats" },
      ],
    },
    {
      name: "Grading",
      subItems: [
        { name: "Active papers", href: "/grading/active" },
        { name: "Completed papers", href: "/grading/completed" },
        { name: "Pending review", href: "/grading/pending" },
      ],
    },
    {
      name: "Results",
      subItems: [
        { name: "View all", href: "/results" },
        { name: "Export data", href: "/results/export" },
      ],
    },
    {
      name: "Admin",
      subItems: [
        { name: "Users", href: "/admin/users" },
        { name: "Settings", href: "/admin/settings" },
      ],
    },
  ];
</script>

<!-- Skip to main content link (for accessibility) -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Main layout container -->
<div class="dashboard">
  <Sidebar
    bind:sidebarOpen
    {navItems}
    logoSrc={IWGDF}
    userName="Admin"
    userRole="Researcher"
  />

  <main id="main-content">
    <MobileHeader
      logoSrc={IWGDF}
      onMenuClick={() => (sidebarOpen = !sidebarOpen)}
    />

    <!-- Main content area -->
    <section class="content">
      <!-- Page header with title and actions -->
      <header class="dashboard-header">
        <hgroup class="header-content">
          <h1 class="page-title">Welcome back, Admin</h1>
          <p class="page-subtitle">Continue grading and track your progress.</p>
        </hgroup>
        <nav class="header-actions">
          <input
            type="search"
            placeholder="Search..."
            class="search-input"
            aria-label="Search dashboard"
          />
          <button class="button-secondary" type="button"
            >Export dashboard</button
          >
        </nav>
      </header>

      <!-- Dashboard statistics section -->
      <section>
        <h2 class="section-title">Your stats</h2>
        <p class="section-subtitle">View your personal stats below.</p>
        <div class="stats-grid">
          {#each dashboardStats as stat (stat.id)}
            <StatCard
              title={stat.title}
              value={stat.value}
              variant={stat.variant}
            />
          {/each}
        </div>
      </section>

      <!-- Continue grading section -->
      <section>
        <h2 class="section-title">Continue grading</h2>
        <p class="section-subtitle">Pick up where you left off.</p>
        <div class="grading-grid">
          {#each continueGradingItems as item (item.id)}
            <GradingCard {...item} />
          {/each}
        </div>
      </section>

      <!-- Bottom section: Papers progress and Compare grading -->
      <section>
        <div class="bottom-grid">
          <!-- Papers progress card -->
          <article class="card">
            <h2 class="card-title">Papers progress</h2>
            <CircleGraph />
          </article>

          <!-- Compare grading card -->
          <article class="card">
            <h2 class="card-title">Compare grading</h2>
            <div class="compare-list">
              {#each compareGradingItems as item (item.id)}
                <div class="compare-item">
                  <p class="compare-text">{item.title}</p>
                  <button class="button-outline" type="button">Compare</button>
                </div>
              {/each}
            </div>
          </article>
        </div>
      </section>
    </section>
  </main>
</div>

<style>
  /* Skip link for keyboard navigation */
  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    z-index: 100;
    background: var(--orange-400);
    color: var(--background-color-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    transition: top 0.2s ease;
    box-shadow: 0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.15);
  }

  .skip-link:focus {
    top: 1rem;
    outline: 3px solid var(--blue-500);
    outline-offset: 2px;
  }

  .skip-link:hover {
    background: var(--blue-400);
  }

  .skip-link:active {
    transform: scale(0.98);
  }

  /* Main dashboard layout */
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

  /* Main content container */
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* Content wrapper with responsive spacing */
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    max-width: 100%;
    gap: 2rem;

    @media (min-width: 768px) {
      padding: 2rem;
      max-width: 43.75rem;
      margin: 1rem auto;
    }

    @media (min-width: 1024px) {
      padding: 2rem 3rem;
      max-width: 100%;
      margin: 0 0 0 15rem;
    }
  }

  /* Page header container */
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

  /* Header text content area */
  .header-content {
    flex: 1;
    min-width: 0;
  }

  /* Main page title */
  .page-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--grey-700);
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
    letter-spacing: -0.02em;

    @media (min-width: 768px) {
      font-size: 1.75rem;
    }

    @media (min-width: 1024px) {
      font-size: 2rem;
    }
  }

  /* Page subtitle text */
  .page-subtitle {
    font-size: 0.875rem;
    color: var(--grey-600);
    margin: 0;
    line-height: 1.6;
  }

  /* Header actions container */
  .header-actions {
    display: flex;
    gap: 0.75rem;
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
      flex-shrink: 0;
    }
  }

  /* Search input field */
  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    border: 1px solid var(--grey-300);
    background: var(--background-color-primary);
    color: var(--grey-700);
    transition: all 0.2s ease;

    @media (min-width: 768px) {
      flex: 0 0 auto;
      min-width: 15.625rem;
    }
  }

  .search-input::placeholder {
    color: var(--grey-500);
  }

  .search-input:hover {
    border-color: var(--grey-400);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--blue-500);
    box-shadow: 0 0 0 3px hsla(213, 100%, 50%, 0.1);
  }

  /* Secondary button styling */
  .button-secondary {
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
    flex: 1;
    background: var(--background-color-primary);
    color: var(--grey-700);
    border: 1px solid var(--grey-300);
  }

  @media (min-width: 768px) {
    .button-secondary {
      flex: 0 0 auto;
    }
  }

  .button-secondary:hover {
    background: var(--grey-100);
    border-color: var(--grey-400);
    transform: translateY(-1px);
  }

  .button-secondary:active {
    transform: translateY(0);
  }

  .button-secondary:focus-visible {
    outline: 3px solid var(--blue-500);
    outline-offset: 2px;
  }

  /* Section title styling */
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--grey-700);
    margin: 0 0 0.5rem 0;
    line-height: 1.4;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  /* Section subtitle styling */
  .section-subtitle {
    font-size: 0.875rem;
    color: var(--grey-600);
    margin: 0 0 1rem 0;
    line-height: 1.6;
  }

  /* Stats grid layout */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(8.75rem, 10rem));
    gap: 1rem;
    justify-content: start;
    width: 100%;

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, minmax(10rem, 11.25rem));
      gap: 1.25rem;
    }
  }

  /* Grading cards grid layout */
  .grading-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(31.25rem, 1fr));
    }
  }

  /* Bottom section grid layout */
  .bottom-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 1024px) {
      grid-template-columns: 28.125rem 1fr;
      gap: 2rem;
    }
  }

  /* Card container styling */
  .card {
    background: var(--background-color-primary);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.08);
  }

  /* Card title styling */
  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--grey-700);
    margin: 0 0 1.5rem 0;
    line-height: 1.4;

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

  /* Compare list item */
  .compare-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--grey-200);
  }

  .compare-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  /* Compare item text */
  .compare-text {
    flex: 1;
    margin: 0;
    font-size: 0.875rem;
    color: var(--grey-700);
    line-height: 1.5;
  }

  /* Outline button styling */
  .button-outline {
    background: transparent;
    color: var(--blue-500);
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    border: 1.5px solid var(--blue-500);
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .button-outline:hover {
    background: var(--blue-100);
  }

  .button-outline:active {
    transform: scale(0.98);
  }

  .button-outline:focus-visible {
    outline: 3px solid var(--blue-500);
    outline-offset: 2px;
  }
</style>
