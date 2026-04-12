import { fail, redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/public'
import { env as privateEnv } from '$env/dynamic/private'

function formFieldsFromUser(sourceUser = {}) {
  return {
    name: sourceUser?.name ?? '',
    role: Array.isArray(sourceUser?.role) ? sourceUser.role.join(', ') : (sourceUser?.role ?? ''),
    institute: sourceUser?.institute ?? '',
    profession: sourceUser?.profession ?? '',
    email: sourceUser?.email ?? ''
  }
}

// This is my Directus base url.
const DIRECTUS_URL = env.PUBLIC_DIRECTUS_URL || 'https://fdnd-agency.directus.app'
// This token i use on server to update Directus data.
const DIRECTUS_TOKEN = privateEnv.DIRECTUS_TOKEN

// This load run when profile page open.
// Here i get current user data from Directus by email,
// so page show real latest profile info.
export async function load({ fetch, locals, url }) {
  const sessionUser = locals.user
  const isEditMode = url.searchParams.has('edit')
  const saved = url.searchParams.get('saved') === '1'
  const saveWarning = url.searchParams.get('warning') ?? ''

  // Get user by exact email from session.
  const usersResponse = await fetch(
    `${DIRECTUS_URL}/items/footguard_users?` +
      `filter[email][_eq]=${encodeURIComponent(sessionUser.email)}&limit=1`
  )

  // If request fail, i fallback to session user.
  if (!usersResponse.ok) {
    const user = sessionUser
    return {
      user,
      isEditMode,
      saved,
      saveWarning,
      ...(isEditMode ? { editForm: formFieldsFromUser(user) } : {})
    }
  }

  // Directus return user list in data array.
  const usersResult = await usersResponse.json()
  const [user] = usersResult?.data ?? []
  const resolvedUser = user ?? sessionUser

  // If user found use it, else use session user.
  return {
    user: resolvedUser,
    isEditMode,
    saved,
    saveWarning,
    ...(isEditMode ? { editForm: formFieldsFromUser(resolvedUser) } : {})
  }
}

// Small helper so i can PATCH user fields without repeating same code.
const patchUser = ({ fetch, userId, payload }) =>
  fetch(`${DIRECTUS_URL}/items/footguard_users/${userId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

export const actions = {
  // This action save text fields from edit form.
  // Called from: /profile?/saveProfile
  saveProfile: async ({ request, fetch, locals }) => {
    const sessionUser = locals.user
    // Must be logged in.
    if (!sessionUser) return fail(401, { message: 'Unauthorized' })
    // Token must exist on server.
    if (!DIRECTUS_TOKEN) return fail(500, { message: 'Server config missing' })

    // Read JSON body from frontend.
    const form = await request.formData().catch(() => null)
    if (!form) return fail(400, { message: 'Invalid request body' })

    // I use session user id for secure update.
    const userId = sessionUser.id
    if (!userId) return fail(400, { message: 'Could not resolve user id for update' })

    // Fields that can be edited in profile form.
    const name = String(form.get('name') ?? '')
    const institute = String(form.get('institute') ?? '')
    const profession = String(form.get('profession') ?? '')
    const email = String(form.get('email') ?? '')
    // Main fields save first.
    const corePayload = {
      name: String(name).trim(),
      institute: String(institute).trim(),
      profession: String(profession).trim()
    }

    // Update main fields in Directus.
    const updateResponse = await patchUser({ fetch, userId, payload: corePayload })
    if (!updateResponse.ok) {
      const details = await updateResponse.text().catch(() => '')
      return fail(400, { message: 'Failed to save core profile fields', details })
    }

    // Optional warnings list (for non blocking fields).
    const warnings = []
    // Email update separated, so if email fail core fields still saved.
    if (String(email).trim()) {
      const emailResponse = await patchUser({
        fetch,
        userId,
        payload: { email: String(email).trim() }
      })
      if (!emailResponse.ok) warnings.push('Email could not be updated')
    }

    await updateResponse.json().catch(() => ({}))

    const warn = warnings[0]
    if (warn) {
      throw redirect(303, `/profile?saved=1&warning=${encodeURIComponent(warn)}`)
    }
    throw redirect(303, '/profile?saved=1')
  },

  // This action upload avatar photo file.
  // Called from: /profile?/uploadAvatar
  uploadAvatar: async ({ request, fetch, locals }) => {
    const sessionUser = locals.user
    // Must be logged in.
    if (!sessionUser) return { ok: false, message: 'Unauthorized' }
    // Token must exist on server.
    if (!DIRECTUS_TOKEN) return { ok: false, message: 'Server config missing' }

    // I use session user id for secure update.
    const userId = sessionUser.id
    if (!userId) return { ok: false, message: 'Could not resolve user id for update' }

    // Read form-data and get uploaded avatar file.
    const form = await request.formData().catch(() => null)
    const avatar = form?.get('avatar')
    if (!(avatar instanceof File)) return { ok: false, message: 'No avatar file uploaded' }

    // Upload file first to Directus files endpoint.
    const uploadBody = new FormData()
    uploadBody.append('file', avatar)
    const uploadResponse = await fetch(`${DIRECTUS_URL}/files`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
      body: uploadBody
    })

    if (!uploadResponse.ok) {
      const details = await uploadResponse.text().catch(() => '')
      return { ok: false, message: 'Avatar upload failed', details }
    }

    const uploadData = await uploadResponse.json().catch(() => null)
    const photoId = uploadData?.data?.id
    if (!photoId) return { ok: false, message: 'Upload succeeded but file id missing' }

    // Then save returned file id into user photo field.
    const photoResponse = await patchUser({ fetch, userId, payload: { photo: photoId } })
    if (!photoResponse.ok) {
      const details = await photoResponse.text().catch(() => '')
      return { ok: false, message: 'Avatar uploaded but profile photo update failed', details }
    }

    // Return photo id so frontend can show new image directly.
    return { ok: true, photo: photoId }
  }
}
