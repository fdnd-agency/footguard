<script>
  import StatCard from "$lib/components/cards/StatCard.svelte";
  import { generateDashboardStats } from "$lib/helpers/dashboardStats.js";

  export let articles = [];

  $: dashboardStats = generateDashboardStats(articles);
</script>

<section class="stats-section">
  <h2 id="stats-heading" class="section-title">Your personal stats</h2>
  <p class="section-subtitle body-copy">View your personal stats below.</p>

  <div class="stats-grid">
    {#each dashboardStats as stat (stat.id)}
      <StatCard title={stat.title} value={stat.value} variant={stat.variant} />
    {/each}
  </div>
</section>

<style>
  .stats-section {
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

  .section-title {
    margin: 0 0 0.5rem;
    line-height: 1.4;
    color: var(--grey-700);
  }

  .section-subtitle {
    margin: 0 0 1rem;
    line-height: 1.6;
    color: var(--grey-600);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      gap: 1rem;
      align-items: stretch;
    }

    @media (min-width: 1024px) {
      gap: 1.25rem;
    }
  }
</style>
