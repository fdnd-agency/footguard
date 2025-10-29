<script>
  export let title;
  export let daysLeft;
  export let yourProgress = 53;
  export let assessor2Progress = 25;
</script>

<article class="grading-card">
  <!-- Card header with title and badge -->
  <header class="card-header">
    <h3 class="card-title">{title}</h3>
    <span class="badge">{daysLeft} days left</span>
  </header>

  <!-- Progress bars section -->
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

  <!-- Card footer with action button -->
  <footer class="card-footer">
    <button class="button-primary" tabindex="0" type="button">Continue</button>
  </footer>
</article>

<style>
  /* Main grading card container */
  .grading-card {
    background: var(--background-color-primary);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.08);
    transition: all 0.2s ease;
  }

  @media (min-width: 768px) {
    .grading-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 0.375rem 1.125rem hsla(213, 12%, 15%, 0.12);
    }
  }

  /* Card header container */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  /* Card title styling */
  .card-title {
    color: var(--grey-700);
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.4;
    flex: 1;
    margin: 0;
    word-wrap: break-word;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  }

  /* Days left badge */
  .badge {
    background: var(--orange-500);
    color: var(--background-color-primary);
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    white-space: nowrap;
  }

  /* Progress bars section container */
  .progress-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  /* Individual progress row layout */
  .progress-row {
    display: grid;
    grid-template-columns: 4.375rem 1fr 2.813rem;
    align-items: center;
    gap: 0.75rem;
    margin: 0;
  }

  /* Progress label text */
  .progress-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--grey-700);
    margin: 0;
  }

  /* Progress bar container/track */
  .progress-bar-container {
    height: 0.5rem;
    border-radius: 9999px;
    overflow: hidden;
    position: relative;
  }

  /* Blue progress track background */
  .blue-bg {
    background: var(--blue-200);
  }

  /* Green progress track background */
  .green-bg {
    background: var(--green-200);
  }

  /* Progress bar fill */
  .progress-bar {
    display: block;
    height: 100%;
    border-radius: 9999px;
    transition: width 0.3s ease;
  }

  /* Blue progress bar fill */
  .progress-bar.blue {
    background: var(--blue-500);
  }

  /* Green progress bar fill */
  .progress-bar.green {
    background: var(--green-500);
  }

  /* Progress percentage value */
  .progress-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--grey-700);
    text-align: right;
    margin: 0;
    font-variant-numeric: tabular-nums;
  }

  /* Card footer container */
  .card-footer {
    display: flex;
    justify-content: flex-start;
  }

  /* Primary action button */
  .button-primary {
    background: var(--blue-500);
    color: var(--background-color-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s ease;
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
