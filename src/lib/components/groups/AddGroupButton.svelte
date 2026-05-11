<script>
  import PulsIconNoBackground from "$lib/assets/svg/puls-icon-no-background.svelte";

  /**
   * Simple props:
   * - label: text inside the button
   * - href: go to another page
   * - disabled: show disabled button style
   */
  let { label = "Create New Group", disabled = false, href = "/groups/new" } = $props();
</script>

<!-- If disabled (or no action), show non-clickable version -->
{#if disabled || !href}
  <span class="add-group-btn" aria-disabled="true">
    <span class="add-group-btn__text">{label}</span>
    <span class="add-group-btn__icon">
      <PulsIconNoBackground width={22} height={22} />
    </span>
  </span>
{:else}
  <!-- Link-first for progressive enhancement -->
  <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
  <a class="add-group-btn" {href}>
    <span class="add-group-btn__text">{label}</span>
    <span class="add-group-btn__icon">
      <PulsIconNoBackground width={22} height={22} />
    </span>
  </a>
{/if}

<style>
  /* Same look for span, button, and link versions */
  .add-group-btn {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-lg);
    min-width: min(90%, 10rem);
    margin: 0;
    appearance: none;
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: var(--radius-md);
    background: var(--blue-500);
    color: var(--background-color-primary);
    font-family: var(--main-font);
    font-size: clamp(14px, 2vw, 16px);
    font-weight: 500;
    line-height: 1.2;
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
    transition:
      background var(--transition-fast),
      transform var(--transition-fast),
      box-shadow var(--transition-fast);

    &:hover:not([aria-disabled="true"]) {
      background: var(--blue-600);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    &:focus-visible {
      outline: 2px solid var(--grey-50, #fff);
      outline-offset: 2px;
    }

    &[aria-disabled="true"],
    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }

    .add-group-btn__text {
      /* Keep long text from breaking layout */
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .add-group-btn__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: inherit;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .add-group-btn {
      transition: none;

      &:hover:not([aria-disabled="true"]) {
        transform: none;
      }
    }
  }
</style>