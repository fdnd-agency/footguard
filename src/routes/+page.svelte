<script>
  import IWGDF from "$lib/assets/IWGDF-logo.png";

  // Components
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import MobileHeader from "$lib/components/layout/MobileHeader.svelte";
  import DashboardHeader from "$lib/components/layout/DashboardHeader.svelte";
  import Article from "$lib/components/cards/ArticleCard.svelte";
  import GradingCard from "$lib/components/cards/GradingCard.svelte";
  import SectionHeader from "$lib/components/layout/SectionHeader.svelte";
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
      <!-- Dashboard header -->
      <DashboardHeader
        greeting="Welcome back, Admin"
        subtitle="Continue grading and track your progress."
      />

      <!-- Dashboard stats -->
      <section class="stats-grid">
        {#each dashboardStats as stat (stat.id)}
          <StatCard title={stat.title} value={stat.value} />
        {/each}
      </section>

      <!-- Continue grading -->
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
    gap: 2rem;
    margin: 2rem;
    max-width: 100%;

    /* Tablet */
    @media (min-width: 640px) {
      padding: 2rem 2rem;
      gap: 2.5rem;
      max-width: 700px;
      margin: 1rem auto;
    }

    /* Desktop */
    @media (min-width: 1024px) {
      padding: 2rem 3rem;
      max-width: 100%;
      gap: 3rem;
      margin: 0;
      margin-left: 15rem;
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
    box-shadow: var(--shadow-sm);
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
