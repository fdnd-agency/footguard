<script>
  import { resolve } from '$app/paths'
  import PulsIconNoBackground from '$lib/assets/svg/puls-icon-no-background.svelte'

  /**
   * Opens the create-group flow. Uses a real link for no-JS; optional onclick for SPA behaviour.
   *
   * @type {{
   *   label?: string,
   *   disabled?: boolean,
   *   href?: string,
   *   onOpen?: ((event: MouseEvent) => void) | null
   * }}
   */
  let {
    label = 'Create New Group',
    disabled = false,
    href = '/groups?create-new-group',
    onOpen = null
  } = $props()

  let inactive = $derived(disabled || !href)

  function handleClick(event) {
    if (!onOpen) return
    event.preventDefault()
    onOpen(event)
  }
</script>

{#if inactive}
  <span
    class="button button-primary button-medium button-spread button--add-group"
    aria-disabled="true"
  >
    <span class="button__text">{label}</span>
    <span class="button__icon">
      <PulsIconNoBackground width={22} height={22} />
    </span>
  </span>
{:else}
  <a
    class="button button-primary button-medium button-spread button--add-group"
    href={resolve(href)}
    onclick={handleClick}
  >
    <span class="button__text">{label}</span>
    <span class="button__icon">
      <PulsIconNoBackground width={22} height={22} />
    </span>
  </a>
{/if}
