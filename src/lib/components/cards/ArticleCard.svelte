<script>
  export let title;
  export let authors;
  export let year;
  export let journal;
</script>

<article class="article-card">
  <!-- Card header with icon and title -->
  <header class="card-header">
    <div class="article-icon"></div>
    <h3 class="card-title">{title}</h3>
  </header>

  <!-- Article metadata -->
  <div class="article-meta">
    <span>{authors}</span>
    <span>{year}</span>
    <span>{journal}</span>
  </div>

  <!-- Start grading button -->
  <button class="button-primary" type="button" on:click>Start grading</button>
</article>

<style>
  /* Main article card container */
  .article-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--background-color-primary);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.2s ease;
    box-shadow: 0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.08);
    border: 1px solid var(--grey-200);
  }

  @media (min-width: 768px) {
    .article-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 0.375rem 1.125rem hsla(213, 12%, 15%, 0.12);
      border-color: var(--blue-200);
    }
  }

  /* Card header container */
  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  /* Card title styling */
  .card-title {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
    color: var(--grey-700);
    font-weight: 600;

    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }

  /* Article icon with document styling */
  .article-icon {
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
    position: relative;
    background: var(--orange-100);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Document icon border */
  .article-icon::before {
    content: "";
    position: absolute;
    width: 1.25rem;
    height: 1.6rem;
    border: 2px solid var(--orange-500);
    border-radius: 0.15rem;
  }

  /* Document icon lines */
  .article-icon::after {
    content: "";
    position: absolute;
    width: 0.7rem;
    height: 2px;
    background: var(--orange-500);
    box-shadow:
      0 -0.25rem 0 var(--orange-500),
      0 0.25rem 0 var(--orange-500);
  }

  /* Article metadata container */
  .article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--grey-500);
  }

  /* Bullet separator between metadata items */
  .article-meta span:not(:first-child)::before {
    content: "•";
    margin-right: 0.5rem;
    color: var(--grey-400);
  }

  /* Primary action button */
  .button-primary {
    background: var(--blue-500);
    color: var(--background-color-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    .button-primary:hover {
      background: var(--blue-400);
      transform: translateY(-1px);
    }
  }

  .button-primary:active {
    transform: scale(0.98);
  }

  .button-primary:focus-visible {
    outline: 3px solid var(--blue-500);
    outline-offset: 2px;
  }
</style>
