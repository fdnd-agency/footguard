<script>
  import ProgressCard from "$lib/components/dashboard/ProgressCard.svelte";
  import ComparisonCard from "$lib/components/dashboard/ComparisonCard.svelte";

  // Props van parent component
  export let articles = [];
</script>

<!-- Bottom section met 2-column grid layout -->
<section class="bottom-section">
  <div class="bottom-grid">
    <!-- Progress overview card met CircleGraph -->
    <ProgressCard {articles} />

    <!-- Comparison card met lijst van completed papers -->
    <ComparisonCard {articles} />
  </div>
</section>

<style>
  /* Bottom section wrapper met responsive padding */
  .bottom-section {
    width: 100%;
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

  /* Bottom grid met CSS Grid voor responsive 2-kolom layout */
  .bottom-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    /* 2 kolommen naast elkaar */
    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    /* Asymmetrische kolommen (progress iets breder) */
    @media (min-width: 1440px) {
      grid-template-columns: 1.2fr 1fr;
      gap: 2.5rem;
    }
  }
</style>
