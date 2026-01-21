<script>
  export let title;
  export let value;
  export let variant = "default";
</script>

<article
  class="stat-card"
  class:primary={variant === "primary"}
  class:progress={variant === "progress"}
  class:not-started={variant === "not-started"}
  class:graded={variant === "graded"}
  class:finalized={variant === "finalized"}
>
  <h3 class="stat-title">{title}</h3>
  <p class="stat-value">{value}</p>
</article>

<style>
  /* Mobile-first table row */
  .stat-card {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    box-shadow:
      0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.12),
      0 0.125rem 0.25rem hsla(213, 12%, 15%, 0.08);
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .stat-title {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0;
  }

  .stat-value {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    font-variant-numeric: tabular-nums;
  }

  /* Tablet+ card layout */
  @media (min-width: 768px) {
    .stat-card {
      width: auto;
      min-width: 8.5rem;
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      border-radius: 1rem;
      box-shadow:
        0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.12),
        0 0.125rem 0.25rem hsla(213, 12%, 15%, 0.08);
    }

    .stat-title {
      font-size: 1rem;
    }

    .stat-value {
      font-size: 2.25rem;
    }
  }

  /* Variants */
  .stat-card.primary {
    background: linear-gradient(135deg, var(--blue-200), var(--blue-300));
    border: none;
    color: var(--blue-700);
  }

  .stat-card.progress {
    background: linear-gradient(135deg, var(--orange-200), var(--orange-300));
    border: none;
    color: var(--orange-700);
  }

  .stat-card.not-started {
    background: linear-gradient(135deg, var(--grey-100), var(--grey-200));
    color: var(--grey-600);
  }

  .stat-card.graded {
    background: linear-gradient(135deg, var(--green-200), var(--green-300));
    color: var(--green-800);
  }

  .stat-card.finalized {
    background: var(--grey-100);
    border: 2px solid var(--grey-200);
    color: var(--grey-600);
  }

  .stat-card.not-started .stat-title,
  .stat-card.not-started .stat-value {
    color: var(--grey-500);
  }

  .stat-card.graded .stat-title,
  .stat-card.graded .stat-value {
    color: var(--green-700);
  }

  .stat-card.finalized .stat-title,
  .stat-card.finalized .stat-value {
    color: var(--grey-500);
  }
</style>
