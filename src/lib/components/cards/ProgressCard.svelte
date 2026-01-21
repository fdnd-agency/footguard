<script>
  import CircleGraph from "$lib/components/charts/CircleGraph.svelte";
  import Button from "$lib/components/buttons/Button.svelte";

  export let articles = [];
</script>

<article class="card progress-card">
  <header class="card-header">
    <h2 id="progress-heading" class="section-title">Progress overview</h2>
    <p class="section-subtitle body-copy">Completion status of your papers</p>
  </header>

  <div class="graph-container">
    <CircleGraph {articles} />
  </div>

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
  .card {
    background: var(--background-color-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  .progress-card {
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

  /* https://developer.mozilla.org/en-US/docs/Web/CSS/flex */
  .graph-container {
    padding: 0 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
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
