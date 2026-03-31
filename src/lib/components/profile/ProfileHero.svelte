<script>
  let { user, isEditing = false, formData, onFieldChange, avatarId, onAvatarUpload } = $props();

  // Show live edited values, and fallback to saved user data when needed.
  const profileName = $derived(formData?.name ?? user?.name ?? 'Unknown user');
  const profession = $derived(formData?.profession ?? user?.profession ?? 'Unknown profession');

  // Build avatar URL from uploaded preview id or existing user photo id.
  const avatarSrc = $derived(
    (avatarId ?? user?.photo)
      ? `https://fdnd-agency.directus.app/assets/${avatarId ?? user?.photo}`
      : 'https://placehold.co/112x112'
  );

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
    {#if isEditing}
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
    {#if isEditing}
      <label class="sr-only" for="profile-name-input">Name</label>
      <input
        id="profile-name-input"
        class="name-input"
        type="text"
        value={formData?.name ?? ''}
        oninput={(event) => onFieldChange?.('name', event.currentTarget.value)}
      />
      <label class="sr-only" for="profile-profession-input">Profession</label>
      <input
        id="profile-profession-input"
        class="profession-input"
        type="text"
        value={formData?.profession ?? ''}
        oninput={(event) => onFieldChange?.('profession', event.currentTarget.value)}
      />
    {:else}
      <h2>{profileName}</h2>
      <p>{profession}</p>
    {/if}
  </div>
</section>

<style>
  .profile-hero {
    display: grid;
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
        width: 6rem;
        height: 6rem;
        border-radius: var(--radius-full);
        border: 3px solid var(--background-color-primary);
        background: linear-gradient(145deg, var(--green-200), var(--blue-300));
        color: var(--background-color-primary);
        display: grid;
        place-items: center;
        box-shadow: var(--shadow-sm);
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
          background: var(--blue-700);
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
      margin-top: 3.5rem;
      text-align: center;
      padding-inline: var(--spacing-md);

      h2 {
        color: var(--blue-700);
      }

      p {
        margin-top: 0.3rem;
        color: var(--grey-400);
      }

      .name-input,
      .profession-input {
        width: min(16rem, 90vw);
        margin: 0 auto;
        border: 2px solid var(--blue-500);
        border-radius: var(--radius-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
        background: var(--blue-100);
        text-align: center;
      }

      .name-input {
        font-weight: 700;
        color: var(--blue-700);
      }

      .profession-input {
        margin-top: var(--spacing-xs);
        color: var(--grey-500);
      }
    }
  }

  @container profile-card (min-width: 42rem) {
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
</style>
