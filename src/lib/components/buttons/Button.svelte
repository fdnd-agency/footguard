<script>
  /**
   * Shared button component. Styles live in src/lib/css/styleguide.css (`.button`).
   *
   * Applies: `.button` + `.button-{variant}` + `.button-{size}` (+ optional `.button-full-width`).
   * Prefer this component in Svelte; for raw HTML use the same class names on `<button>` or `<a>`.
   *
   * variant: primary | secondary | outline | danger
   * size: small | medium | large
   *
   * Full API, global classes, and examples: docs/components.md (Button component).
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
