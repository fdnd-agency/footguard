<script>
  export let title;
  export let authors;
  export let year;
  export let journal;
</script>

<article class="start-grading-card">
  <div class="card-header">
    <div class="article-icon svg-style"></div>
    <h3 class="card-title">{title}</h3>
  </div>

  <div class="article-meta">
    <span>{authors}</span>
    <span>{year}</span>
    <span>{journal}</span>
  </div>

  <button class="button-primary" on:click>Start grading →</button>
</article>

<style>
  .start-grading-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--background-color-primary);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px hsla(210, 12%, 15%, 0.08); /* subtiel shadow */
    border: 1px solid var(--grey-200);
  }

  .start-grading-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px hsla(210, 12%, 15%, 0.12);
    border-color: var(--blue-200);
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .card-title {
    margin: 0;
    font-size: clamp(14px, 2vw, 16px);
    line-height: 1.4;
    color: var(--grey-700);
    font-weight: 600;
  }

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

  .article-icon.svg-style::before {
    content: "";
    position: absolute;
    width: 1.25rem;
    height: 1.6rem;
    border: 2px solid var(--orange-500);
    border-radius: 0.15rem;
  }

  .article-icon.svg-style::after {
    content: "";
    position: absolute;
    width: 0.7rem;
    height: 2px;
    background: var(--orange-500);
    box-shadow:
      0 -4px 0 var(--orange-500),
      0 4px 0 var(--orange-500);
  }

  .article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--grey-500);
  }

  .article-meta span:not(:first-child)::before {
    content: "•";
    margin-right: 0.5rem;
    color: var(--grey-400);
  }

  .button-primary {
    background: linear-gradient(135deg, var(--blue-500), var(--blue-600));
    color: var(--background-color-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 6px hsla(203, 80%, 42%, 0.25);
    flex-shrink: 0;
  }

  .button-primary:hover {
    background: linear-gradient(135deg, var(--blue-600), var(--blue-700));
    box-shadow: 0 4px 12px hsla(203, 80%, 42%, 0.35);
    transform: translateY(-2px);
  }

  .button-primary:active {
    transform: translateY(0);
  }
</style>
