<script>
  import Button from "$lib/components/buttons/Button.svelte";

  // Props van parent component (+page.svelte)
  export let user = null;
  export let cursorActive = false;

  // Fallback voor user naam met optional chaining
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  $: userName = user?.name || "Guest";
</script>

<!-- Dashboard header HTML -->
<header class="dashboard-header">
  <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup -->
  <hgroup class="header-content">
    <h1 class="page-title h1">Welcome back, {userName}</h1>
    <p class="page-subtitle body-copy">
      Continue your research and track your progress.
    </p>
  </hgroup>
  <nav class="header-actions">
    <input
      type="search"
      placeholder="Search..."
      class="search-input"
    />

    <!-- Custom cursor toggle button (alleen zichtbaar met JavaScript) -->
    <!-- https://svelte.dev/docs/element-directives#bind-property -->
    <Button
      class="js-only"
      variant="primary"
      on:click={() => (cursorActive = !cursorActive)}
      aria-pressed={cursorActive}
    >
      {cursorActive ? "Disable" : "Enable"} custom cursor
    </Button>
  </nav>
</header>

<style>
  .dashboard-header {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 0 1rem 1.25rem 1rem;

    /* Horizontal layout met border */
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.5rem;
      padding: 0 2rem 1.5rem 2rem;
      border-bottom: 1px solid var(--grey-200);
    }

    @media (min-width: 1024px) {
      padding: 0 3rem 1.5rem 3rem;
    }

    @media (min-width: 1440px) {
      padding: 0 4rem 1.5rem 4rem;
    }
  }

  /* Header text content wrapper */
  .header-content {
    flex: 1;
    min-width: 0;
  }

  /* Page title styling */
  .page-title {
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
  }

  /* Page subtitle styling */
  .page-subtitle {
    margin: 0;
    line-height: 1.6;
    color: var(--grey-600);
  }

  /* Header actions container */
  .header-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
      flex-shrink: 0;
    }
  }

  /* Search input styling met focus states */
  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    border: 1px solid var(--grey-300);
    background: var(--background-color-primary);
    color: var(--grey-700);
    transition: all 0.2s ease;
  }

  .search-input::placeholder {
    color: var(--grey-500);
  }

  .search-input:hover {
    border-color: var(--grey-400);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--blue-500);
    box-shadow: 0 0 0 3px hsla(213, 100%, 50%, 0.1);
  }

  /* Fixed width voor search */
  @media (min-width: 768px) {
    .search-input {
      flex: 0 0 auto;
      min-width: 15.625rem;
    }
  }
</style>
