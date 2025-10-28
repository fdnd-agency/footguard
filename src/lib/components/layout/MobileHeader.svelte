<script>
  export let logoSrc;
  export let onMenuClick;
</script>

<!-- Mobile header bar -->
<header class="mobile-header">
  <button class="menu-button" type="button" on:click={onMenuClick}>
    ☰
    <span class="visually-hidden">Toggle menu</span>
  </button>
  <img src={logoSrc} alt="IWGDF Logo" class="mobile-logo" />
</header>

<style>
  /* Main mobile header container */
  .mobile-header {
    border-bottom: 1px solid var(--grey-200);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 30;
    background: var(--background-color-primary);
    box-shadow: 0 0.0625rem 0.1875rem hsla(213, 12%, 15%, 0.05);

    @media (min-width: 1024px) {
      display: none;
    }
  }

  /* Hamburger menu button */
  .menu-button {
    padding: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    color: var(--grey-700);
    transition: all 0.2s ease;
    line-height: 1;
  }

  .menu-button:hover {
    background: var(--grey-100);
    color: var(--blue-500);
  }

  .menu-button:active {
    transform: scale(0.95);
  }

  .menu-button:focus-visible {
    outline: 3px solid var(--blue-500);
    outline-offset: 2px;
  }

  /* Mobile logo styling */
  .mobile-logo {
    width: auto;
    height: 2rem;
  }

  /* Screen reader only text */
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
