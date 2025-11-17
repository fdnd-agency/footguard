<script>
  export let title;
  export let value;
  export let variant = "default";
</script>

<article class="stat-card" class:primary={variant === "primary"}>
  <h3 class="stat-title">{title}</h3>
  <p class="stat-value">{value}</p>
</article>

<style>
  /* Main stat card container */
  .stat-card {
    background: var(--background-color-primary);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.2s ease;
    box-shadow: 0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    aspect-ratio: 1;
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio */
  }

  /* Primary variant with gradient background */
  .stat-card.primary {
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient */
    background: linear-gradient(
      135deg,
      var(--blue-200) 0%,
      var(--blue-300) 100%
    );
  }

  /* Arrow icon in top right corner */
  .stat-card::after {
    content: "";
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%23003d82' stroke-width='1.5'/%3E%3Cpath d='M9 15L15 9M15 9H11M15 9V13' stroke='%23003d82' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transition: transform 0.2s ease;
  }

  @media (min-width: 768px) {
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 0.375rem 1.125rem hsla(213, 12%, 15%, 0.12);
    }

    .stat-card:hover::after {
      transform: scale(1.1);
    }
  }

  /* Stat card title */
  .stat-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--blue-700);
    margin: 0;
    padding-right: 2rem;
    line-height: 1.4;
  }

  /* Stat card value (large number) */
  .stat-value {
    font-size: 3rem;
    font-weight: 700;
    color: var(--blue-700);
    line-height: 1;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 3.5rem;
    }

    @media (min-width: 1024px) {
      font-size: 4rem;
    }
  }
</style>
