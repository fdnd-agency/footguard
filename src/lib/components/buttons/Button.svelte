<script>
  /**
   * Renders a real <button> with shared global classes.
   * All visual styles live in src/lib/css/styleguide.css (search for ".button {").
   * variant → button-primary | button-secondary | button-outline | button-danger
   * size    → button-small | button-medium | button-large
   */
  export let variant = "primary";
  export let size = "medium";
  export let disabled = false;
  export let fullWidth = false;
  export let type = "button";
  export let tabindex = 0;

  // https://svelte.dev/docs/svelte/legacy-export-let
  let className = "";
  export { className as class };
</script>

<button
  class="button button-{variant} button-{size} {className}"
  class:button-full-width={fullWidth}
  {disabled}
  {type}
  {tabindex}
  on:click
>
  <slot />
</button>
