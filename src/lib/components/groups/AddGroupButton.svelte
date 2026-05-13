<script>
  import { resolve } from "$app/paths";
  import PulsIconNoBackground from "$lib/assets/svg/puls-icon-no-background.svelte";

  /**
   * Create-new-group control for the groups page.
   *
   * Props:
   * - label — visible text (default: “Create New Group”).
   * - href — app path (default: /groups/new); passed through resolve() when the control is a link.
   * - disabled — with no href, shows an inactive control (not a fake link).
   *
   * Renders `<span aria-disabled>` when there is no real link, otherwise `<a href={resolve(href)}>`.
   * Label + icon are written once using `<svelte:element>` (DRY).
   */
  let { label = "Create New Group", disabled = false, href = "/groups/new" } = $props();

  let inactive = $derived(disabled || !href);
  let rootTag = $derived(inactive ? "span" : "a");
  let rootAttrs = $derived(
    inactive ? { "aria-disabled": "true" } : { href: resolve(href) }
  );
</script>

<svelte:element this={rootTag} class="add-group-btn" {...rootAttrs}>
  <span class="add-group-btn__text">{label}</span>
  <span class="add-group-btn__icon">
    <PulsIconNoBackground width={22} height={22} />
  </span>
</svelte:element>

