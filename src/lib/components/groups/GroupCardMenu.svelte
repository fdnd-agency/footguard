<script>
  /**
   * GroupCardMenu component
   * A three-dot (kebab) trigger shown next to the card section heading.
   * Opens a small overlay with "Edit Group" and "Delete Group" actions.
   *
   * The overlay is rendered as a fixed-position element (not an absolutely
   * positioned dropdown) so it is never clipped by the card's scrollable
   * sections. "Delete Group" reveals an inline confirmation step so a group is
   * never removed by an accidental click; on success it calls `onDeleted` so the
   * parent can drop the card without a full page reload.
   */
  import { enhance } from '$app/forms'
  import { browser } from '$app/environment'
  import { tick } from 'svelte'
  import ThreeDotIcon from '$lib/assets/svg/ThreeDotIcon.svelte'

  /**
   * @type {{
   *   groupId: string | number,
   *   groupName?: string,
   *   onEdit?: ((groupId: string | number) => void) | null,
   *   onDeleted?: ((groupId: string | number) => void) | null
   * }}
   */
  let { groupId, groupName = 'this group', onEdit = null, onDeleted = null } = $props()

  // 'closed' = hidden, 'menu' = actions list, 'confirm' = delete confirmation
  let view = $state('closed')
  let isDeleting = $state(false)
  let errorMessage = $state('')
  let triggerEl = $state(/** @type {HTMLButtonElement | null} */ (null))
  let panelEl = $state(/** @type {HTMLElement | null} */ (null))

  const FOCUSABLE =
    'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'

  function getFocusable() {
    return panelEl ? [.../** @type {NodeListOf<HTMLElement>} */ (panelEl.querySelectorAll(FOCUSABLE))] : []
  }

  // Move focus into the panel once it has rendered so keyboard users land inside it.
  async function focusPanel() {
    await tick()
    const items = getFocusable()
    ;(items[0] ?? panelEl)?.focus()
  }

  function openMenu() {
    errorMessage = ''
    view = 'menu'
    focusPanel()
  }

  // Toggle from the trigger: clicking again while open closes the menu.
  function toggleMenu() {
    if (view !== 'closed') {
      close()
      return
    }
    openMenu()
  }

  function close() {
    if (isDeleting) return
    view = 'closed'
    // Return focus to the trigger so keyboard users don't lose their place.
    tick().then(() => triggerEl?.focus())
  }

  function handleEdit() {
    onEdit?.(groupId)
    close()
  }

  function openConfirm() {
    errorMessage = ''
    view = 'confirm'
    focusPanel()
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) close()
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      close()
      return
    }

    // Trap focus inside the open panel so Tab cannot reach the page behind it.
    if (event.key === 'Tab') {
      const items = getFocusable()
      if (items.length === 0) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = browser ? document.activeElement : null
      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  // Lock body scroll only for the blocking confirm dialog — a simple action
  // menu shouldn't prevent the user from scrolling the page.
  $effect(() => {
    if (!browser) return
    document.body.style.overflow = view === 'confirm' ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  })

  function handleSubmit() {
    isDeleting = true
    errorMessage = ''

    return async ({ result, update }) => {
      isDeleting = false

      if (result.type === 'success' && result.data?.action === 'deleteGroup') {
        view = 'closed'
        onDeleted?.(groupId)
        return
      }

      if (result.type === 'failure' && result.data?.action === 'deleteGroup') {
        errorMessage = result.data?.error || 'Failed to delete group. Please try again.'
      }

      await update({ reset: false })
    }
  }
</script>

<svelte:window onkeydown={view === 'closed' ? undefined : handleKeydown} />

<button
  type="button"
  class="group-menu__trigger"
  aria-label={`Actions for ${groupName}`}
  aria-haspopup="menu"
  aria-expanded={view !== 'closed'}
  onclick={toggleMenu}
  bind:this={triggerEl}
>
  <!-- Three horizontal dots (kebab) — 22:6 matches the icon's 11:3 viewBox exactly -->
  <ThreeDotIcon width={22} height={6} />
</button>

{#if view !== 'closed'}
  <!-- Transparent full-screen layer: clicking anywhere outside the panel closes the menu -->
  <div class="group-menu__backdrop" role="presentation" onclick={handleBackdropClick}>
    {#if view === 'menu'}
      <div class="group-menu__panel" role="menu" tabindex="-1" bind:this={panelEl}>
        {#if onEdit}
          <button type="button" class="group-menu__item" role="menuitem" onclick={handleEdit}>
            Edit Group
          </button>
        {/if}
        <button
          type="button"
          class="group-menu__item group-menu__item--danger"
          role="menuitem"
          onclick={openConfirm}
        >
          Delete Group
        </button>
      </div>
    {:else if view === 'confirm'}
      <div
        class="group-menu__panel group-menu__panel--confirm"
        role="dialog"
        aria-modal="true"
        aria-label={`Delete ${groupName}`}
        tabindex="-1"
        bind:this={panelEl}
      >
        <p class="group-menu__title">Delete group</p>
        <p class="group-menu__message">
          Are you sure you want to delete <strong>{groupName}</strong>? This cannot be undone.
        </p>

        {#if errorMessage}
          <p class="group-menu__error" role="alert">{errorMessage}</p>
        {/if}

        <div class="group-menu__actions">
          <button type="button" class="group-menu__cancel" onclick={close} disabled={isDeleting}>
            Cancel
          </button>

          <form method="POST" action="?/deleteGroup" use:enhance={handleSubmit}>
            <input type="hidden" name="groupId" value={groupId} />
            <button type="submit" class="group-menu__confirm-btn" disabled={isDeleting}>
              {isDeleting ? 'Deleting…' : 'Delete'}
            </button>
          </form>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .group-menu__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--grey-500);
    cursor: pointer;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);
  }

  .group-menu__trigger:hover,
  .group-menu__trigger:focus-visible {
    background: var(--grey-100);
    color: var(--grey-700);
  }

  .group-menu__backdrop {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
  }

  .group-menu__panel {
    width: min(100%, 20rem);
    background: var(--background-color-primary);
    border: 1px solid var(--grey-200);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    text-align: left;
  }

  .group-menu__item {
    display: block;
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    border: none;
    background: transparent;
    font: inherit;
    font-size: var(--font-size-md, 1rem);
    color: var(--grey-700);
    text-align: left;
    cursor: pointer;
    transition: background var(--transition-fast);

    /* Divider between the menu items, matching the design */
    &:not(:last-child) {
      border-bottom: 1px solid var(--grey-100);
    }

    &:hover,
    &:focus-visible {
      background: var(--grey-100);
    }
  }

  .group-menu__item--danger {
    color: var(--red-600);
  }

  .group-menu__item--danger:hover,
  .group-menu__item--danger:focus-visible {
    /* No --red-50 token in the design system yet; literal tint is intentional. */
    background: var(--red-50, #fef2f2);
  }

  .group-menu__panel--confirm {
    width: 18rem;
    padding: var(--spacing-lg);
  }

  .group-menu__title {
    margin: 0 0 var(--spacing-xs);
    font-size: var(--font-size-md, 1rem);
    font-weight: 600;
    color: var(--grey-700);
  }

  .group-menu__message {
    margin: 0 0 var(--spacing-md);
    font-size: var(--font-size-sm);
    color: var(--grey-600);
  }

  .group-menu__error {
    margin: 0 0 var(--spacing-md);
    font-size: var(--font-size-xs, 0.75rem);
    color: var(--red-700);
  }

  .group-menu__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
  }

  .group-menu__cancel,
  .group-menu__confirm-btn {
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-sm);
    font: inherit;
    font-size: var(--font-size-sm);
    cursor: pointer;
    border: 1px solid transparent;
  }

  .group-menu__cancel {
    background: var(--grey-100);
    color: var(--grey-700);
    border-color: var(--grey-200);
  }

  .group-menu__confirm-btn {
    background: var(--red-500);
    color: var(--grey-50);
  }

  .group-menu__cancel:disabled,
  .group-menu__confirm-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    .group-menu__trigger,
    .group-menu__item {
      transition: none;
    }
  }
</style>
