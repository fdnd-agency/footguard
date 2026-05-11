<script>
  let { user, isEditMode = false, formData, draft = null, onFieldChange, avatarId, onAvatarUpload } = $props();

  // Use `||` so empty formData (SSR / no-JS before $effect) still shows user.* ; `??` would keep "".
  const profileName = $derived(formData?.name || user?.name || 'Unknown user');
  const profession = $derived(formData?.profession || user?.profession || 'Unknown profession');

  const avatarSrc = $derived(
    (avatarId ?? user?.photo)
      ? `https://fdnd-agency.directus.app/assets/${avatarId ?? user?.photo}`
      : 'https://placehold.co/112x112'
  )

  // Reference to hidden file input used by "Change photo" button.
  let fileInput = $state();

  // Open the hidden file input when "Change photo" is clicked.
  function openFilePicker() {
    fileInput?.click();
  }

  // Read selected image file and pass it up to parent upload handler.
  function handleFileChange(event) {
    const file = event.currentTarget.files?.[0];
    if (file) onAvatarUpload?.(file);
    // Clear input so selecting the same file again still triggers change.
    event.currentTarget.value = '';
  }
</script>

<section class="profile-hero">
  <div class="avatar-wrap">
    <img class="profile-avatar" src={avatarSrc} alt={`Avatar of ${profileName}`} />
    {#if isEditMode}
      <button class="avatar-upload" type="button" onclick={openFilePicker}>Change photo</button>
      <input
        bind:this={fileInput}
        class="avatar-input"
        type="file"
        accept="image/*"
        onchange={handleFileChange}
      />
    {/if}
  </div>
  <div class="profile-info">
    {#if isEditMode}
      <label class="sr-only" for="profile-name-input">Name</label>
      <input
        id="profile-name-input"
        class="name-input"
        type="text"
        name="name"
        value={formData?.name ?? draft?.name ?? user?.name ?? ''}
        oninput={(event) => onFieldChange?.('name', event.currentTarget.value)}
      />
      <p class="profession-hero-note">
        {formData?.profession ?? draft?.profession ?? user?.profession ?? '—'}
      </p>
      <span class="profession-hero-hint">Profession is edited under General information.</span>
    {:else}
      <h2>{profileName}</h2>
      <p>{profession}</p>
    {/if}
  </div>
</section>

<style>
  .profile-hero {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    justify-items: center;
    padding: 0 0 var(--spacing-lg);

    &::before {
      content: "";
      width: 100%;
      min-height: 8.5rem;
      background: var(--blue-500);
      border-radius: 0;
      grid-column: 1;
      grid-row: 1;
    }

    .avatar-wrap {
      grid-column: 1;
      grid-row: 1;
      align-self: end;
      transform: translateY(50%);
      position: relative;

      .profile-avatar {
        display: block;
        width: 6rem;
        height: 6rem;
        border-radius: var(--radius-full);
        object-fit: cover;
        object-position: center;
      }

      .avatar-upload {
        position: absolute;
        inset: auto 0 0 0;
        margin: 0 auto;
        transform: translateY(10%);
        width: max-content;
        border: none;
        border-radius: var(--radius-full);
        background: var(--blue-700);
        color: var(--background-color-primary);
        font-size: 0.875rem;
        padding: var(--spacing-xs) var(--spacing-sm);
        cursor: pointer;

        &:hover {
          background: var(--blue-400);
        }

        &:focus-visible {
          outline: 3px solid var(--blue-100);
          outline-offset: 2px;
        }
      }

      .avatar-input {
        display: none;
      }

    }

    .profile-info {
      grid-column: 1;
      grid-row: 2;
      margin-top: 3.5rem;
      text-align: center;
      padding-inline: var(--spacing-md);
      position: relative;
      z-index: 1;

      h2 {
        color: var(--blue-700);
      }

      p {
        margin-top: 0.3rem;
        color: var(--grey-400);
      }

      .name-input {
        width: min(16rem, 90vw);
        margin: 0 auto;
        border: 2px solid var(--blue-500);
        border-radius: var(--radius-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
        background: var(--blue-100);
        text-align: center;
        font-weight: 700;
        color: var(--blue-700);
      }

      .profession-hero-note {
        margin-top: var(--spacing-xs);
        color: var(--grey-500);
        font-size: 1rem;
      }

      .profession-hero-hint {
        display: block;
        margin-top: 0.25rem;
        font-size: 0.75rem;
        color: var(--grey-400);
        max-width: 18rem;
      }
    }
  }

  /* tablet layout */
  @container profile-card (min-width: 42rem) and (max-width: 63.99rem) {
    .profile-hero {
      padding: 0 0 var(--spacing-xl);

      &::before {
        min-height: 10rem;
        border-radius: 0;
      }

      .avatar-wrap {
        .profile-avatar {
          width: 7rem;
          height: 7rem;
        }
      }

      .profile-info {
        margin-top: 4rem;
        padding-inline: var(--spacing-lg);
      }
    }
  }

  /* desktop layout */
  @container profile-card (min-width: 64rem) {
    .profile-hero {
      padding: 0 0 var(--spacing-2xl);

      &::before {
        min-height: 11rem;
        border-radius: 0;
      }

      .avatar-wrap {
        .profile-avatar {
          width: 7.5rem;
          height: 7.5rem;
        }
      }

      .profile-info {
        margin-top: 4.25rem;
        padding-inline: var(--spacing-xl);
      }
    }
  }
</style>
