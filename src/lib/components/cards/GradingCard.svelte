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
      <dd class="progress-bar-container blue-bg">
        <span class="progress-bar blue" style="width: {yourProgress}%"></span>
      </dd>
      <dd class="progress-value">{yourProgress}%</dd>
    </dl>

    <dl class="progress-row">
      <dt class="progress-label">Assessor 2</dt>
      <dd class="progress-bar-container green-bg">
        <span class="progress-bar green" style="width: {assessor2Progress}%"
        ></span>
      </dd>
      <dd class="progress-value">{assessor2Progress}%</dd>
    </dl>
  </section>

  <footer class="card-footer">
    <button class="button-continue" type="button">Continue</button>
  </footer>
</article>

<style>
  .grading-card {
    background: var(--background-color-primary);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 12px hsla(210, 12%, 15%, 0.08);
    transition:
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  @media (hover: hover) {
    .grading-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px hsla(210, 12%, 15%, 0.12);
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .card-title {
    color: var(--grey-700);
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 1.4;
    flex: 1;
    margin: 0;
    word-wrap: break-word;
  }

  .badge {
    background: var(--orange-400);
    color: var(--background-color-primary);
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    white-space: nowrap;
  }

  .progress-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .progress-row {
    display: grid;
    grid-template-columns: 70px 1fr 45px;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }

  .progress-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--grey-700);
    margin: 0;
  }

  .progress-bar-container {
    height: 8px;
    border-radius: 9999px;
    overflow: hidden;
    position: relative;
  }

  .blue-bg {
    background: var(--blue-100);
  }

  .green-bg {
    background: var(--green-100);
  }

  .progress-bar {
    display: block;
    height: 100%;
    border-radius: 9999px;
    transition: width 0.3s ease;
  }

  .progress-bar.blue {
    background: var(--blue-500);
  }

  .progress-bar.green {
    background: var(--green-500);
  }

  .progress-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--grey-700);
    text-align: right;
    margin: 0;
    font-variant-numeric: tabular-nums;
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
    font-weight: 700;
    font-size: 1rem;
    transition:
      background 0.2s ease,
      transform 0.1s ease;
  }

  @media (hover: hover) {
    .button-continue:hover {
      background: var(--blue-600);
      transform: translateY(-1px);
    }
  }

  .button-continue:active {
    background: var(--blue-700);
    transform: scale(0.98);
  }

  .button-continue:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
  }
</style>
