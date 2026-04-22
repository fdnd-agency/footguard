<script>
  import { browser } from '$app/environment'
  import { deserialize, enhance } from '$app/forms'
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import GroupsLink from '$lib/components/profile/GroupsLink.svelte'
  import EditActions from '$lib/components/profile/EditActions.svelte'
  import ProfileHero from '$lib/components/profile/ProfileHero.svelte'
  import ProfileInfo from '$lib/components/profile/ProfileInfo.svelte'

  function formFieldsFromUser(sourceUser = {}) {
    return {
      name: sourceUser?.name ?? '',
      role: Array.isArray(sourceUser?.role) ? sourceUser.role.join(', ') : (sourceUser?.role ?? ''),
      institute: sourceUser?.institute ?? '',
      profession: sourceUser?.profession ?? '',
      email: sourceUser?.email ?? ''
    }
  }

  let { data, form } = $props()

  const profileUser = $derived(data.user)
  const isEditMode = $derived(data.isEditMode)
  const editFormDefaults = $derived(data.editForm ?? null)

  let savePending = $state(false)
  let isUploadingAvatar = $state(false)
  let formData = $state(formFieldsFromUser())
  let currentAvatarId = $state(null)
  let toastMessage = $state('')
  let toastTimer

  function showTransientToast(text) {
    toastMessage = text
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toastMessage = ''
    }, 2200)
  }

  function syncFormDataFromProfile(profileUserRecord) {
    formData = { ...formFieldsFromUser(profileUserRecord) }
  }

  $effect(() => {
    if (!profileUser) return

    if (isEditMode && data.editForm) {
      formData = { ...data.editForm }
      currentAvatarId = null
      return
    }

    syncFormDataFromProfile(profileUser)
    currentAvatarId = null
  })

  /** Hide save banner after 10s by dropping `saved` / `warning` from the URL (client only). */
  $effect(() => {
    if (!browser || !data.saved) return

    const hideBannerTimer = setTimeout(() => {
      goto(resolve('/profile'), { replaceState: true, noScroll: true })
    }, 10_000)

    return () => clearTimeout(hideBannerTimer)
  })

  function onFieldChange(field, value) {
    formData = { ...formData, [field]: value }
  }

  function parseAvatarActionResponse(responseBodyText) {
    const actionResult = deserialize(responseBodyText)
    if (actionResult.type === 'success') return actionResult.data
    if (actionResult.type === 'failure') return actionResult.data
    return null
  }

  async function uploadAvatar(imageFile) {
    if (!browser || isUploadingAvatar || !imageFile) return
    isUploadingAvatar = true
    try {
      const multipartBody = new FormData()
      multipartBody.append('avatar', imageFile)

      const uploadResponse = await fetch('/profile?/uploadAvatar', {
        method: 'POST',
        headers: { accept: 'application/json' },
        body: multipartBody
      })

      const uploadResult = parseAvatarActionResponse(await uploadResponse.text())
      if (!uploadResult?.ok || !uploadResult?.photo) {
        showTransientToast(uploadResult?.message || 'Could not upload profile photo')
        return
      }

      currentAvatarId = uploadResult.photo
    } catch {
      showTransientToast('Could not upload profile photo')
    } finally {
      isUploadingAvatar = false
    }
  }
</script>

<section class="profile-page">
  <h1 class="profile-title">Profile</h1>

  {#if form?.message}
    <p class="form-error" role="alert">{form.message}</p>
  {/if}

  {#if data.saved}
    <p class="save-banner" role="status">
      Profile changes saved.
      {#if data.saveWarning}
        {data.saveWarning}
      {/if}
    </p>
  {/if}

  <article class="profile-card">
    {#if isEditMode}
      <form
        id="profile-edit-form"
        class="profile-edit-form"
        method="POST"
        action="?/saveProfile"
        use:enhance={() => {
          savePending = true
          return async ({ update }) => {
            await update()
            savePending = false
          }
        }}
      >
        <EditActions isEditMode={true} formId="profile-edit-form" disabled={savePending} />
        <input type="hidden" name="photo" value={currentAvatarId ?? ''} />
        <div class="profile-body">
          <ProfileHero
            user={profileUser}
            isEditMode={true}
            {formData}
            draft={editFormDefaults}
            {onFieldChange}
            avatarId={currentAvatarId}
            onAvatarUpload={uploadAvatar}
          />
          <ProfileInfo
            user={profileUser}
            isEditMode={true}
            {formData}
            draft={editFormDefaults}
            {onFieldChange}
          />
        </div>
      </form>
    {:else}
      <EditActions isEditMode={false} />
      <div class="profile-body">
        <ProfileHero
          user={profileUser}
          isEditMode={false}
          {formData}
          draft={null}
          {onFieldChange}
          avatarId={null}
          onAvatarUpload={uploadAvatar}
        />
        <ProfileInfo user={profileUser} isEditMode={false} {formData} draft={null} {onFieldChange} />
      </div>
    {/if}
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

    .form-error {
      max-width: 42rem;
      margin: 0 auto var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-sm);
      background: var(--red-100);
      color: var(--red-700);
    }

    .save-banner {
      max-width: 42rem;
      margin: 0 auto var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-sm);
      background: var(--blue-100);
      color: var(--blue-700);
    }

    .profile-card {
      position: relative;
      background: var(--background-color-primary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      overflow: visible;
      container-type: inline-size;
      container-name: profile-card;
    }

    .profile-edit-form {
      margin: 0;
      padding: 0;
      border: none;
    }

    .profile-body {
      display: flow-root;
      min-width: 0;
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
