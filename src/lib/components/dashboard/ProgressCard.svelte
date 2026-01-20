<script>
  import CircleGraph from "$lib/components/charts/CircleGraph.svelte";
  import Button from "$lib/components/buttons/Button.svelte";

  // Props van parent component
  export let articles = [];
</script>

<!-- Progress overview card HTML -->
<article class="card progress-card">
  <!-- Card header met title en subtitle -->
  <header class="card-header">
    <h2 id="progress-heading" class="section-title">Progress overview</h2>
    <p class="section-subtitle body-copy">Completion status of your papers</p>
  </header>

  <!-- Graph container met circle graph component -->
  <div class="graph-container">
    <CircleGraph {articles} />
  </div>

  <!-- Card footer met action button -->
  <footer class="card-footer">
    <Button
      variant="primary"
      size="medium"
      on:click={() => (window.location.href = "/research")}
    >
      View detailed breakdown
    </Button>
  </footer>
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

  /* Progress card met flexbox verticale layout */
  .progress-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-header {
    padding: 1.5rem 1.5rem 0 1.5rem;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      padding: 2rem 2rem 0 2rem;
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

  /* Graph container flexbox centering */
  .graph-container {
    padding: 0 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/flex */
    flex: 1;

    @media (min-width: 768px) {
      padding: 0 2rem;
      min-height: 240px;
    }
  }

  .card-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--grey-200);
    margin-top: auto; 

    @media (min-width: 768px) {
      padding: 2rem;
    }
  }
</style>
