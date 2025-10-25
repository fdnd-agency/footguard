<script>
  export let title;
  export let daysLeft;
  export let yourProgress = 53;
  export let assessor2Progress = 25;
</script>

<article class="grading-card">
  <header class="card-header">
    <h3 class="card-title">{title}</h3>
    <span class="badge">{daysLeft} days left</span>
  </header>

  <section class="progress-section">
    <dl class="progress-row">
      <dt class="progress-label">You</dt>
      <dd class="progress-bar-container">
        <span class="progress-bar" style="width: {yourProgress}%"></span>
      </dd>
      <dd class="progress-value">{yourProgress}%</dd>
    </dl>

    <dl class="progress-row">
      <dt class="progress-label">Assessor 2</dt>
      <dd class="progress-bar-container">
        <span class="progress-bar assessor" style="width: {assessor2Progress}%"
        ></span>
      </dd>
      <dd class="progress-value">{assessor2Progress}%</dd>
    </dl>
  </section>

  <footer class="card-footer">
    <button class="button-continue" on:click type="button">Continue</button>
  </footer>
</article>

<style>
  .grading-card {
    background: var(--background-color-primary);
    border-radius: 0.75rem;
    padding: 1.25rem;
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.2s ease;

    @media (min-width: 640px) {
      border-radius: 1rem;
      padding: 1.75rem;
    }

    @media (hover: hover) {
      &:hover {
        box-shadow: var(--shadow-md);
      }
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.25rem;
    gap: 0.75rem;

    @media (min-width: 640px) {
      margin-bottom: 1.5rem;
      gap: 1rem;
    }
  }

  .card-title {
    color: var(--main-text-color);
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 1.4;
    flex: 1;
    min-width: 0;
    margin: 0;
    word-wrap: break-word;

    @media (min-width: 640px) {
      font-size: 1.25rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.3rem;
    }
  }

  .badge {
    background: var(--orange-400);
    color: var(--background-color-primary);
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    white-space: nowrap;
    flex-shrink: 0;

    @media (min-width: 640px) {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
    }
  }

  .progress-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.25rem;

    @media (min-width: 640px) {
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }
  }

  .progress-row {
    display: grid;
    grid-template-columns: 70px 1fr 45px;
    align-items: center;
    gap: 0.5rem;
    margin: 0;

    @media (min-width: 480px) {
      grid-template-columns: 80px 1fr 50px;
      gap: 0.75rem;
    }

    @media (min-width: 640px) {
      grid-template-columns: 100px 1fr 60px;
      gap: 1rem;
    }
  }

  .progress-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--main-text-color);
    margin: 0;

    @media (min-width: 640px) {
      font-size: 1rem;
    }
  }

  .progress-bar-container {
    height: 8px;
    background: var(--grey-100);
    border-radius: 9999px;
    overflow: hidden;
    margin: 0;
    position: relative;

    @media (min-width: 640px) {
      height: 10px;
    }
  }

  .progress-bar {
    display: block;
    height: 100%;
    background: var(--blue-400);
    border-radius: 9999px;
    transition: width 0.3s ease;
    will-change: width;

    &.assessor {
      background: var(--green-300);
    }
  }

  .progress-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--main-text-color);
    text-align: right;
    margin: 0;
    font-variant-numeric: tabular-nums;

    @media (min-width: 640px) {
      font-size: 1rem;
    }
  }

  .card-footer {
    display: flex;
    justify-content: flex-start;
  }

  .button-continue {
    background: var(--blue-500);
    color: var(--background-color-primary);
    padding: 0.875rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      transform 0.1s ease;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;

    @media (min-width: 640px) {
      padding: 0.75rem 1.5rem;
      font-weight: 800;
      font-size: 1rem;
    }

    @media (hover: hover) {
      &:hover {
        background: var(--blue-600);
      }
    }

    &:active {
      transform: scale(0.98);
      background: var(--blue-700);
    }

    &:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }
  }
</style>
