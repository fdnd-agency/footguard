<script>
  /**
   * CreateGroupModal component
   * Right-side drawer to create a new group.
   * Parent controls open/onClose from +page.svelte (?create-new-group or the create button).
   */
  import { browser } from '$app/environment'
  import { resolve } from '$app/paths'
  import CloseIcon from '$lib/assets/svg/CloseIcon.svelte'

  /** @type {{ open?: boolean, onClose?: () => void }} */
  let { open = false, onClose } = $props()

  /** @type {HTMLDialogElement | undefined} */
  let dialogEl = $state()

  const groupsPath = resolve('/groups')

  function handleCloseSubmit(event) {
    // With JS: close via dialog → handleDialogClose. Without JS: form navigates to /groups
    if (!browser) return
    event.preventDefault()
    dialogEl.close()
  }

  function handleDialogClose() {
    // Single exit for Escape, backdrop, and close button (when open is still true)
    if (open) onClose?.()
  }

  // Browser: open/close with showModal() — do not use the `open` attribute (conflicts with modal mode)
  $effect(() => {
    if (!dialogEl || !browser) return
    if (open && !dialogEl.open) dialogEl.showModal()
    else if (!open && dialogEl.open) dialogEl.close()
  })
</script>

<!-- Native dialog: backdrop, focus trap, and Escape. SSR uses `open` when JS is off. -->
<dialog
  bind:this={dialogEl}
  class="create-group-modal"
  aria-labelledby="create-group-modal-title"
  open={!browser && open ? true : undefined}
  onclose={handleDialogClose}
  onclick={(event) => {
    if (event.target === dialogEl) dialogEl.close()
  }}
>
  <section class="create-group-modal__panel" aria-label="Create new group">
    <header class="create-group-modal__header">
      <!-- Close: button for screen readers; GET /groups works without JS -->
      <form
        method="GET"
        action={groupsPath}
        class="create-group-modal__close-form"
        onsubmit={handleCloseSubmit}
      >
        <button type="submit" class="create-group-modal__close" aria-label="Close">
          <CloseIcon />
        </button>
      </form>
      <h2 id="create-group-modal-title" class="create-group-modal__title">Create New Group</h2>
    </header>

    <form method="POST" action="?/createGroup" class="create-group-modal__form">
      <label for="create-group-modal-group-name" class="create-group-modal__form-label">
        Group Name
        <span class="create-group-modal__form-required" aria-hidden="true">*</span>
        <span class="sr-only">(required)</span>
      </label>
      <input
        id="create-group-modal-group-name"
        name="groupName"
        type="text"
        class="create-group-modal__form-input"
        placeholder="Name the group"
        required
        autocomplete="off"
      />
      <label for="create-group-modal-condition-label" class="create-group-modal__form-label">
        Condition Label
        <span class="create-group-modal__form-required" aria-hidden="true">*</span>
        <span class="sr-only">(required)</span>
      </label>
      <input
        id="create-group-modal-condition-label"
        name="conditionLabel"
        type="text"
        class="create-group-modal__form-input"
        placeholder="Give The Group A Label"
        required
        autocomplete="off"
      />
      <button
        type="submit"
        class="button button-primary button-medium button-full-width create-group-modal__submit"
      >
        Create Group
      </button>
    </form>
  </section>
</dialog>
