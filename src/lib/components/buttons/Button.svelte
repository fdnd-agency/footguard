<script>
  export let variant = "primary";
  export let size = "medium";
  export let disabled = false;
  export let fullWidth = false;
  export let type = "button";
  export let tabindex = 0;
</script>

<!-- https://svelte.dev/docs/svelte/legacy-export-let -->

<button
  class="button button-{variant} button-{size}"
  class:button-full-width={fullWidth}
  {disabled}
  {type}
  {tabindex}
  on:click
>
  <slot />
</button>

<!-- https://sveltebyexample.com/class-and-style-directives/ -->

<style>
  /* Base button styling */
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    font-family: var(--main-font);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    border: none;
    text-decoration: none;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:disabled:hover {
      transform: none;
    }
  }

  /* Size variants */
  .button-small {
    padding: 0.5rem 1rem;
    font-size: clamp(10px, 1.5vw, 12px);
    font-weight: 500;
  }

  .button-medium {
    padding: 0.75rem 1.25rem;
    font-size: clamp(12px, 2vw, 14px);
    font-weight: 500;
  }

  .button-large {
    padding: 1rem 1.5rem;
    font-size: clamp(12px, 2vw, 16px);
    font-weight: 500;
  }

  /* Primary button (blue) */
  .button-primary {
    background: var(--blue-500);
    color: var(--background-color-primary);
    border: 1.5px solid var(--blue-500);

    &:hover:not(:disabled) {
      background: var(--blue-600);
      border-color: var(--blue-600);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: 3px solid var(--blue-500);
      outline-offset: 2px;
    }
  }

  /* Secondary button (grey) */
  .button-secondary {
    background: var(--background-color-primary);
    color: var(--grey-700);
    border: 1px solid var(--grey-300);
    width: 100%;

    &:hover:not(:disabled) {
      background: var(--grey-100);
      border-color: var(--grey-400);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: 3px solid var(--blue-500);
      outline-offset: 2px;
    }

    @media (min-width: 768px) {
      width: auto;
    }
  }

  /* Outline button (blue outline) */
  .button-outline {
    background: transparent;
    color: var(--blue-500);
    border: 1.5px solid var(--blue-500);

    &:hover:not(:disabled) {
      background: var(--blue-100);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 3px solid var(--blue-500);
      outline-offset: 2px;
    }
  }

  /* Danger button (red) */
  .button-danger {
    background: var(--red-500);
    color: var(--background-color-primary);
    border: 1.5px solid var(--red-500);

    &:hover:not(:disabled) {
      background: var(--red-600);
      border-color: var(--red-600);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: 3px solid var(--red-500);
      outline-offset: 2px;
    }
  }

  .button-full-width {
    width: 100%;
  }
</style>
