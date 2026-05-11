<script>
  import SwitchSidesIcon from "$lib/assets/svg/SwitchSidesIcon.svelte";

  /** Use `onclick` to flip without changing the URL, or `href` for a normal link (optional). */
  let { label = "Members", disabled = false, href, onclick } = $props();
</script>

{#if disabled || (!href && !onclick)}
  <span class="switch-sides-btn" aria-disabled="true">
    <span class="switch-sides-btn__icon" aria-hidden="true">
      <SwitchSidesIcon width={19} height={19} />
    </span>
    <span class="switch-sides-btn__text">{label}</span>
  </span>
{:else if onclick}
  <button type="button" class="switch-sides-btn" {onclick}>
    <span class="switch-sides-btn__icon" aria-hidden="true">
      <SwitchSidesIcon width={19} height={19} />
    </span>
    <span class="switch-sides-btn__text">{label}</span>
  </button>
{:else}
  <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
  <a class="switch-sides-btn" {href}>
    <span class="switch-sides-btn__icon" aria-hidden="true">
      <SwitchSidesIcon width={19} height={19} />
    </span>
    <span class="switch-sides-btn__text">{label}</span>
  </a>
{/if}

<style>
  .switch-sides-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin: 0;
    appearance: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: 10px 0 0 10px;
    background: var(--background-color-primary);
    color: var(--grey-500);
    font: 500 clamp(12px, 2vw, 13px) / 1.2 var(--main-font);
    white-space: nowrap;
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    text-decoration: none;
    transition:
      box-shadow var(--transition-fast),
      color var(--transition-fast),
      transform var(--transition-fast);

    &:hover:not([aria-disabled="true"]) {
      color: var(--grey-600);
      box-shadow: var(--shadow-md);
      transform: translateY(-0.5px);
    }

    &:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }

    &[aria-disabled="true"],
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }

    .switch-sides-btn__icon {
      display: flex;
      flex-shrink: 0;
      color: currentColor;
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;

      &:hover:not([aria-disabled="true"]) {
        transform: none;
      }
    }
  }
</style>
