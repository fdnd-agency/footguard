<script>
  import PulsIconNoBackground from "$lib/assets/svg/puls-icon-no-background.svelte";

  /**
   * “Create new group” control for the groups page.
   *
   * Props:
   * - label — visible text (default: “Create New Group”).
   * - href  — where the link goes (default: /groups/new). Works without JS (real <a>).
   * - disabled — if true (or href missing), renders a <span> with aria-disabled so it is not a fake link.
   *
   * Styling: global classes in styleguide.css — .button .button-primary .button-large .button-spread,
   * plus .button-text / .button-icon for layout. Same pattern as Button.svelte + docs in styleguide.
   */
  let { label = "Create New Group", disabled = false, href = "/groups/new" } = $props();
</script>

<!-- If disabled (or no action), show non-clickable version -->
{#if disabled || !href}
  <span
    class="button button-primary button-large button-spread"
    aria-disabled="true"
  >
    <span class="button-text">{label}</span>
    <span class="button-icon">
      <PulsIconNoBackground width={24} height={24} />
    </span>
  </span>
{:else}
  <!-- Real link: works with JS off;  -->
  <a class="button button-primary button-large button-spread" {href}>
    <span class="button-text">{label}</span>
    <span class="button-icon">
      <PulsIconNoBackground width={24} height={24} />
    </span>
  </a>
{/if}
