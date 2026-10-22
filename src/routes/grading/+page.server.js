// src/routes/research/+page.server.js
import { fail } from '@sveltejs/kit'
import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private'
import { uploadPdfToDirectus, createArticleRecord } from '$lib/server/articles.js'

export async function load({ fetch, url, locals }) {
  const status = url.searchParams.get('status') || 'all'
  const theme = url.searchParams.get('theme') || 'all'

  // Fetch articles and unique themes in parallel for better performance
  // now uses a free-text input instead of a dropdown populated from Directus
  const gradingsResponse = await fetch('https://fdnd-agency.directus.app/items/footguard_articles')

  const gradingsData = await gradingsResponse.json()

  let cardData = gradingsData.data

  // Filter by status if a specific status is selected
  if (status === 'Not started') {
    cardData = cardData.filter((item) => item.status === 'Not started')
  } else if (status === 'Finished') {
    cardData = cardData.filter((item) => item.status === 'Finished')
  } else if (status === 'In progress') {
    cardData = cardData.filter((item) => item.status === 'In progress')
  }

  // Filter by theme if a specific theme is selected.
  // Existing hardcoded theme values (Temperature, Ulcers, High risk, Age)
  // still work correctly — custom themes typed by Super Admins also filter
  // correctly because we now do a generic string match instead of hardcoded checks
  if (theme !== 'all') {
    cardData = cardData.filter((item) => item.theme?.trim() === theme.trim())
  }

  return {
    cardData,
    status,
    theme,
    userRole: locals.user?.role ?? null
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  /**
   * uploadArticle action — uploads only the PDF file to Directus file storage.
   * Does NOT create an article record because required fields (Publisher, Theme,
   * Author) are not available at upload time — those must be filled in Directus.
   *
   * Flow:
   *   1. Verify the user is a Super Admin (server-side role guard)
   *   2. Validate the uploaded file (type + size)
   *   3. Upload PDF to Directus file storage
   */
  uploadArticle: async ({ request, locals }) => {
    // --- 1. Role guard ---
    if (locals.user?.role?.toLowerCase() !== 'super admin') {
      return fail(403, { error: 'You do not have permission to upload articles.' })
    }

    const formData = await request.formData()
    const file = /** @type {File} */ (formData.get('file'))
    const title = formData.get('title')?.toString().trim()
    const author = formData.get('author')?.toString().trim()
    const publisher = formData.get('publisher')?.toString().trim()
    // Theme is optional — Super Admin can leave it blank or type any custom value
    const theme = formData.get('theme')?.toString().trim() ?? ''

    // --- 2. Validate required fields ---
    if (!title || !author || !publisher) {
      return fail(400, { error: 'Title, author and publisher are required.' })
    }

    if (!file || file.size === 0) {
      return fail(400, { error: 'No file was provided. Please select a PDF.' })
    }

    if (file.type !== 'application/pdf') {
      return fail(400, { error: 'Invalid file type. Only PDF files are accepted.' })
    }

    const MAX_BYTES = 20 * 1024 * 1024
    if (file.size > MAX_BYTES) {
      return fail(400, { error: 'File is too large. The maximum size is 20 MB.' })
    }

    try {
      // --- 3. Upload PDF to Directus file storage ---
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      const uploadedFile = await uploadPdfToDirectus(uploadFormData, DIRECTUS_URL, DIRECTUS_TOKEN)

      // --- 4. Create the article record with all required fields ---
      await createArticleRecord(
        { title, author, publisher, theme, status: 'Not started' },
        uploadedFile.id,
        DIRECTUS_URL,
        DIRECTUS_TOKEN
      )

      return { success: true }
    } catch (err) {
      console.error('[uploadArticle action]', err)
      return fail(500, { error: 'Upload failed. Please try again later.' })
    }
  }
}
