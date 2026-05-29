<script>
  /**
   * CreateGroupModal component
   * Right-side drawer to create a new group.
   * Parent controls open/onClose from +page.svelte (?create-new-group or the create button).
   */
  import { enhance } from '$app/forms'
  import { browser } from '$app/environment'
  import CloseIcon from '$lib/assets/svg/CloseIcon.svelte'
  import DropdownIcon from '$lib/assets/svg/DropdownIcon.svelte'
  import searchIcon from '$lib/assets/svg/search-icon.svg'

  /**
   * @typedef {{ id: number, name: string, email?: string | null }} MemberOption
   */

  /** @type {{
   *   open?: boolean,
   *   onClose?: () => void,
   *   form?: import('@sveltejs/kit').ActionData | null,
   *   memberOptions?: MemberOption[]
   * }} */
  let { open = false, onClose, form = null, memberOptions = [] } = $props()

  let membersFieldEl = $state(/** @type {HTMLElement | null} */ (null))
  let fileInput = $state(/** @type {HTMLInputElement | null} */ (null))

  let memberQuery = $state('')
  /** @type {number[]} */
  let selectedMemberIds = $state([])
  let membersOpen = $state(false)
  let isDragging = $state(false)
  let thumbnailName = $state('')
  let groupNameError = $state('')
  let submitError = $state('')
  let isSubmitting = $state(false)

  const statusOptions = ['active', 'draft', 'inactive']

  const filteredMembers = $derived(
    memberOptions.filter((member) => {
      const query = memberQuery.trim().toLowerCase()
      if (!query) return true
      const haystack = `${member.name ?? ''} ${member.email ?? ''}`.toLowerCase()
      return haystack.includes(query)
    })
  )

  const selectedMembers = $derived(
    memberOptions.filter((member) => selectedMemberIds.includes(member.id))
  )

  // Reset when modal closes
  $effect(() => {
    if (!open) {
      memberQuery = ''
      selectedMemberIds = []
      membersOpen = false
      isDragging = false
      thumbnailName = ''
      groupNameError = ''
      submitError = ''
      isSubmitting = false
      if (fileInput) fileInput.value = ''
    }
  })

  // Sync form errors from server
  $effect(() => {
    if (!form || !open) return
    if (form.action === 'createGroup' && form.error) {
      if (form.field === 'groupName') {
        groupNameError = form.error
      } else {
        submitError = form.error
      }
    }
  })

  // Lock body scroll when open
  $effect(() => {
    if (!browser) return
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  })

  function requestClose() {
    if (isSubmitting) return
    onClose?.()
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) requestClose()
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      requestClose()
    }
  }

  function handleMembersBlur(event) {
    const next = /** @type {HTMLElement | null} */ (event.relatedTarget)
    if (!membersFieldEl?.contains(next)) {
      membersOpen = false
    }
  }

  function toggleMember(memberId) {
    if (selectedMemberIds.includes(memberId)) {
      selectedMemberIds = selectedMemberIds.filter((id) => id !== memberId)
    } else {
      selectedMemberIds = [...selectedMemberIds, memberId]
    }
  }

  function handleFileSelect(file) {
    if (!file?.type?.startsWith('image/')) {
      submitError = 'Please choose an image file for the thumbnail.'
      return
    }
    submitError = ''
    thumbnailName = file.name
  }

  function handleDrop(event) {
    event.preventDefault()
    isDragging = false
    const file = event.dataTransfer?.files?.[0]
    if (!file || !fileInput) return
    const transfer = new DataTransfer()
    transfer.items.add(file)
    fileInput.files = transfer.files
    handleFileSelect(file)
  }

  function handleSubmit() {
    groupNameError = ''
    submitError = ''
    isSubmitting = true

    return async ({ result, update }) => {
      isSubmitting = false

      if (result.type === 'success' && result.data?.action === 'createGroup') {
        requestClose()
      }

      if (result.type === 'failure' && result.data?.action === 'createGroup') {
        if (result.data?.field === 'groupName') {
          groupNameError = result.data?.error || 'Group name is required.'
        } else {
          submitError = result.data?.error || 'Failed to create group. Please try again.'
        }
      }

      await update({ reset: false })
    }
  }
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

{#if open}
  <div class="modal-backdrop" role="presentation" onclick={handleBackdropClick}>
    <section
      class="create-group-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-group-modal-title"
      onclick={(e) => e.stopPropagation()}
    >
      <header class="create-group-modal__header">
        <h2 id="create-group-modal-title" class="create-group-modal__title">Create New Group</h2>
        <button
          type="button"
          class="button button-medium create-group-modal__close"
          aria-label="Close"
          onclick={requestClose}
        >
          <CloseIcon width={16} height={16} />
        </button>
      </header>

      <form
        method="POST"
        action="?/createGroup"
        enctype="multipart/form-data"
        class="create-group-modal__form"
        use:enhance={handleSubmit}
      >
        <label for="create-group-modal-group-name" class="create-group-modal__form-label">
          Group Name
          <span class="create-group-modal__form-required" aria-hidden="true">*</span>
        </label>
        <input
          id="create-group-modal-group-name"
          name="groupName"
          type="text"
          class="create-group-modal__form-input"
          placeholder="Name the group"
          required
          disabled={isSubmitting}
          aria-invalid={groupNameError ? 'true' : undefined}
          aria-describedby={groupNameError ? 'create-group-name-error' : undefined}
        />
        {#if groupNameError}
          <p id="create-group-name-error" class="create-group-modal__form-error" role="alert">
            {groupNameError}
          </p>
        {/if}

        <label for="create-group-modal-condition-label" class="create-group-modal__form-label">
          Condition Label
        </label>
        <input
          id="create-group-modal-condition-label"
          name="conditionLabel"
          type="text"
          class="create-group-modal__form-input"
          placeholder="Give the group a label"
          disabled={isSubmitting}
        />

        <div class="create-group-modal__members" bind:this={membersFieldEl}>
          <span class="create-group-modal__form-label" id="create-group-members-label">
            Add Members
          </span>
          <div class="create-group-modal__member-search">
            <img
              class="create-group-modal__member-search-icon"
              src={searchIcon}
              alt=""
              aria-hidden="true"
            />
            <input
              id="create-group-members"
              type="search"
              class="create-group-modal__form-input create-group-modal__member-search-input"
              placeholder="Search members"
              bind:value={memberQuery}
              disabled={isSubmitting}
              role="combobox"
              aria-autocomplete="list"
              aria-controls="create-group-members-list"
              aria-expanded={membersOpen}
              onfocus={() => (membersOpen = true)}
              onblur={handleMembersBlur}
            />
            <button
              type="button"
              class="create-group-modal__member-toggle"
              aria-label={membersOpen ? 'Close members list' : 'Open members list'}
              aria-expanded={membersOpen}
              aria-controls="create-group-members-list"
              disabled={isSubmitting || memberOptions.length === 0}
              onclick={() => (membersOpen = !membersOpen)}
            >
              <DropdownIcon />
            </button>
          </div>

          {#if membersOpen && filteredMembers.length > 0}
            <ul
              id="create-group-members-list"
              class="create-group-modal__member-list"
              role="listbox"
              aria-labelledby="create-group-members-label"
            >
              {#each filteredMembers as member (member.id)}
                <li role="option" aria-selected={selectedMemberIds.includes(member.id)}>
                  <button
                    type="button"
                    class="create-group-modal__member-option"
                    class:create-group-modal__member-option--selected={selectedMemberIds.includes(member.id)}
                    onmousedown={(e) => e.preventDefault()}
                    onclick={() => toggleMember(member.id)}
                  >
                    <span>{member.name}</span>
                    {#if member.email}
                      <span class="create-group-modal__member-option-email">{member.email}</span>
                    {/if}
                  </button>
                </li>
              {/each}
            </ul>
          {/if}

          {#if selectedMembers.length > 0}
            <ul class="create-group-modal__member-chips" aria-label="Selected members">
              {#each selectedMembers as member (member.id)}
                <li class="create-group-modal__member-chip">
                  {member.name}
                  <button
                    type="button"
                    class="create-group-modal__member-chip-remove"
                    aria-label={`Remove ${member.name}`}
                    onclick={() => toggleMember(member.id)}
                  >
                    &times;
                  </button>
                </li>
              {/each}
            </ul>
          {/if}
        </div>

        {#each selectedMemberIds as memberId (memberId)}
          <input type="hidden" name="memberIds" value={memberId} />
        {/each}

        <label for="create-group-modal-status" class="create-group-modal__form-label">
          Status
        </label>
        <div class="create-group-modal__select-wrap">
          <select
            id="create-group-modal-status"
            name="status"
            class="create-group-modal__form-input create-group-modal__select"
            disabled={isSubmitting}
          >
            <option value="">Status</option>
            {#each statusOptions as option (option)}
              <option value={option}>{option}</option>
            {/each}
          </select>
          <span class="create-group-modal__select-chevron" aria-hidden="true">
            <DropdownIcon />
          </span>
        </div>

        <span class="create-group-modal__form-label" id="create-group-thumbnail-label">
          Upload a thumbnail
        </span>
        <label
          class="create-group-modal__upload"
          class:create-group-modal__upload--dragging={isDragging}
          for="create-group-thumbnail"
          ondragover={(e) => { e.preventDefault(); isDragging = true }}
          ondragleave={() => (isDragging = false)}
          ondrop={handleDrop}
        >
          <p>
            Drag and drop your file here, or
            <span class="create-group-modal__upload-browse">browse</span>
          </p>
          {#if thumbnailName}
            <p class="create-group-modal__upload-filename">{thumbnailName}</p>
          {/if}
        </label>
        <input
          bind:this={fileInput}
          id="create-group-thumbnail"
          class="sr-only"
          type="file"
          name="thumbnail"
          accept="image/*"
          disabled={isSubmitting}
          onchange={(e) => handleFileSelect(e.currentTarget.files?.[0])}
        />

        {#if submitError}
          <p class="create-group-modal__form-error" role="alert">{submitError}</p>
        {/if}

        <div class="create-group-modal__actions">
          <button
            type="button"
            class="button button-outline button-medium"
            disabled={isSubmitting}
            onclick={requestClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="button button-primary button-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating…' : 'Create Group'}
          </button>
        </div>
      </form>
    </section>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    pointer-events: all;
  }

  .create-group-modal {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 100dvh;
    overflow-y: auto;
    padding: var(--spacing-lg);
    background: var(--background-color-primary);
    box-shadow: 0 0 16px rgb(0 0 0 / 0.1);
    pointer-events: all;
  }

  /* Desktop: right-side drawer */
  @container groups-page (min-width: 48rem) {
    .modal-backdrop {
      justify-content: flex-end;
    }

    .create-group-modal {
      width: min(100%, 28rem);
      padding: var(--spacing-xl);
      border-radius: var(--radius-lg) 0 0 var(--radius-lg);
      box-shadow: -4px 0 16px rgb(0 0 0 / 0.1);
    }
  }
</style>
