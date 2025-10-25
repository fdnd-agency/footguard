<script>
  export let logoSrc;
  export let onMenuClick;
</script>

<header class="mobile-header">
  <button class="menu-button" on:click={onMenuClick}>
    ☰
  </button>
  <img src={logoSrc} alt="IWGDF Logo" class="mobile-logo" />
</header>

<style>
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
    box-shadow: var(--shadow-sm);
  }

  @media (min-width: 1024px) {
    .mobile-header {
      display: none;
    }
  }

  .menu-button {
    padding: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 2rem;
    color: var(--grey-700);
    transition: all 0.2s ease;
    line-height: 1;
  }

  .menu-button:hover {
    background: var(--grey-100);
    color: var(--iwgdf-blue);
  }

  .menu-button:active {
    transform: scale(0.95);
  }

  .mobile-logo {
    width: auto;
    height: 32px;
  }
</style>