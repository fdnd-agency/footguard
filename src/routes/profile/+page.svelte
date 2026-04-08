<script>
  import { deserialize } from '$app/forms'
  import GroupsLink from '$lib/components/profile/GroupsLink.svelte'
  import EditActions from '$lib/components/profile/EditActions.svelte'
  import ProfileHero from "$lib/components/profile/ProfileHero.svelte";
  import ProfileInfo from "$lib/components/profile/ProfileInfo.svelte";
  let { data } = $props();
  const user = $derived(data.user);

  // Build a safe UI model from the user object (prevents undefined values in inputs).
  const createFormData = (sourceUser = {}) => ({
    name: sourceUser?.name ?? '',
    role: Array.isArray(sourceUser?.role) ? sourceUser.role.join(', ') : (sourceUser?.role ?? ''),
    institute: sourceUser?.institute ?? '',
    profession: sourceUser?.profession ?? '',
    email: sourceUser?.email ?? ''
  });

  // UI mode flags for edit/save/avatar-upload actions.
  let isEditing = $state(false);
  let isSaving = $state(false);
  let isUploadingAvatar = $state(false);
  // Last saved values and currently edited values.
  let savedProfile = $state(createFormData());
  let formData = $state(createFormData());
  // Local avatar id so uploaded photo appears immediately.
  let currentAvatarId = $state(null);
  // Toast state and timer for temporary feedback messages.
  let toastMessage = $state('');
  let toastTimer;

  // Sync local editable state from a user source.
  function resetFromUser(sourceUser) {
    const nextData = createFormData(sourceUser);
    savedProfile = { ...nextData };
    formData = { ...nextData };
  }

  // Initialize profile state once user data is available.
  $effect(() => {
    if (!savedProfile.email && user) {
      resetFromUser(user);
    }
    if (!currentAvatarId && user?.photo) {
      currentAvatarId = user.photo;
    }
  });

  // Update one field in the editable form state.
  function onFieldChange(field, value) {
    formData = { ...formData, [field]: value };
  }

  // Show temporary feedback at the bottom of the page.
  function showToast(message) {
    toastMessage = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMessage = '';
    }, 2200);
  }

  function parseActionResponse(responseText) {
    const result = deserialize(responseText);
    if (result.type === 'success') return result.data;
    if (result.type === 'failure') return result.data;
    return null;
  }

  // Enter edit mode and restore draft from last saved profile.
  function startEdit() {
    formData = { ...savedProfile };
    isEditing = true;
  }

  // Exit edit mode without persisting changes.
  function cancelEdit() {
    formData = { ...savedProfile };
    isEditing = false;
    showToast('Editing cancelled');
  }

  // Persist profile fields to server and keep local state in sync.
  async function saveEdit() {
    if (isSaving) return;
    isSaving = true;

    try {
      const body = new URLSearchParams({
        name: formData.name ?? '',
        institute: formData.institute ?? '',
        profession: formData.profession ?? '',
        email: formData.email ?? ''
      });

      const response = await fetch('/profile?/saveProfile', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        },
        body
      });

      const result = parseActionResponse(await response.text());
      if (!result?.ok) {
        showToast(result?.message || 'Could not save profile');
        return;
      }

      savedProfile = { ...formData };
      isEditing = false;
      if (result?.warnings?.length) {
        showToast(`Saved with warning: ${result.warnings[0]}`);
        return;
      }

      showToast('Profile changes saved');
    } catch {
      showToast('Could not save profile');
    } finally {
      isSaving = false;
    }
  }

  // Upload avatar through the same /profile endpoint.
  async function uploadAvatar(file) {
    if (isUploadingAvatar || !file) return;
    isUploadingAvatar = true;

    try {
      const payload = new FormData();
      payload.append('avatar', file);

      const response = await fetch('/profile?/uploadAvatar', {
        method: 'POST',
        headers: { accept: 'application/json' },
        body: payload
      });

      const result = parseActionResponse(await response.text());
      if (!result?.ok || !result?.photo) {
        showToast(result?.message || 'Could not upload profile photo');
        return;
      }

      currentAvatarId = result.photo;
      showToast('Profile photo updated');
    } catch {
      showToast('Could not upload profile photo');
    } finally {
      isUploadingAvatar = false;
    }
  }

</script>



<section class="profile-page">
  <h1 class="profile-title">Profile</h1>

  <article class="profile-card">
    <EditActions {isEditing} disabled={isSaving} onStartEdit={startEdit} onSave={saveEdit} onCancel={cancelEdit} />
    <ProfileHero
      {user}
      {isEditing}
      {formData}
      {onFieldChange}
      avatarId={currentAvatarId}
      onAvatarUpload={uploadAvatar}
    />
    <ProfileInfo {isEditing} {formData} {onFieldChange} />
    <GroupsLink />
  </article>

  {#if toastMessage}
    <div class="toast" role="status" aria-live="polite">{toastMessage}</div>
  {/if}
</section>

<style>
  .profile-page {
    min-height: 100vh;
    background: var(--grey-100);
    padding: var(--spacing-lg) var(--spacing-md) var(--spacing-2xl);

    .profile-title {
      color: var(--blue-700);
      margin-bottom: var(--spacing-md);
    }

    .profile-card {
      position: relative;
      background: var(--background-color-primary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      container-type: inline-size;
      container-name: profile-card;
    }

    .toast {
      position: fixed;
      bottom: 1.8rem;
      left: 50%;
      transform: translateX(-50%);
      background: var(--blue-500);
      color: var(--background-color-primary);
      padding: 0.55rem 1rem;
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-sm);
      z-index: 10;
    }
  }

  @media (min-width: 42rem) {
    .profile-page {
      padding: var(--spacing-xl);

      .profile-card {
        max-width: 100%;
        margin-inline: auto;
      }
    }
  }
</style>
