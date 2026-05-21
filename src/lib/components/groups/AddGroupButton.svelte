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
   *   onclick?: (event: MouseEvent) => void
   * }}
   */
  let {
    label = 'Create New Group',
    disabled = false,
    href = '/groups?create-new-group',
    onclick = null
  } = $props()

  let inactive = $derived(disabled || !href)

  function handleClick(event) {
    if (!onclick) return
    event.preventDefault()
    onclick(event)
  }

  /** resolve() only accepts pathnames — query strings are appended after. */
  function toAppHref(path) {
    const queryIndex = path.indexOf('?')
    let pathname = queryIndex === -1 ? path : path.slice(0, queryIndex)
    const search = queryIndex === -1 ? '' : path.slice(queryIndex)

    if (pathname.startsWith('.')) {
      pathname = pathname.replace(/^\.\//, '/')
    }

    if (!pathname.startsWith('/')) {
      pathname = `/${pathname}`
    }

    return `${resolve(pathname)}${search}`
  }

  const linkHref = $derived(toAppHref(href))
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
    href={linkHref}
    onclick={handleClick}
  >
    <span class="button__text">{label}</span>
    <span class="button__icon">
      <PulsIconNoBackground width={22} height={22} />
    </span>
  </a>
{/if}
