<script>
  export let title;
  export let value;
</script>

<article class="stat-card">
  <header class="stat-header">
    <h3 class="stat-title">{title}</h3>
    <button class="icon-button" type="button">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="search-icon-title"
      >
        <title id="search-icon-title">More information</title>
        <path
          d="M13.5858 13.5858C15.3668 11.8047 15.3668 8.99504 13.5858 7.21396C11.8047 5.43288 8.99504 5.43288 7.21396 7.21396C5.43288 8.99504 5.43288 11.8047 7.21396 13.5858C8.99504 15.3668 11.8047 15.3668 13.5858 13.5858Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14 14L18 18"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="visually-hidden">More information about {title}</span>
    </button>
  </header>

  <p class="stat-value">{value}</p>
</article>

<style>
  .stat-card {
    background: linear-gradient(
      135deg,
      var(--blue-100) 0%,
      var(--blue-300) 100%
    );
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.2s;
  }

  @media (min-width: 640px) {
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .stat-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--blue-700);
    margin: 0;
  }

  .icon-button {
    background: transparent;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: var(--blue-500);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    border-radius: 0.25rem;
  }

  .icon-button:hover,
  .icon-button:focus-visible {
    color: var(--blue-700);
  }

  .icon-button:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--blue-700);
    line-height: 1;
    margin: 0;
  }

  @media (min-width: 640px) {
    .stat-value {
      font-size: 2.5rem;
    }
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>