// src/routes/research/+page.server.js
import { fail } from '@sveltejs/kit'
import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private'
import { uploadPdfToDirectus, createArticleRecord } from '$lib/server/articles.js'

/**
 * Load function — fetches all articles with optional status/theme filtering.
 * Also passes the current user's role so the page can show/hide the upload button.
 */
export async function load({ fetch, url, locals }) {
  // Read filter values from the URL — default to 'all' if not set
  const status = url.searchParams.get('status') || 'all'
  const theme = url.searchParams.get('theme') || 'all'

  const gradingsResponse = await fetch('https://fdnd-agency.directus.app/items/footguard_articles')
  const gradingsData = await gradingsResponse.json()

  let cardData = gradingsData.data

  // Filter by status if a specific value is set
  if (status === 'Not started') {
    cardData = cardData.filter((cardData) => cardData.status === 'Not started')
  } else if (status === 'Finished') {
    cardData = cardData.filter((cardData) => cardData.status === 'Finished')
  } else if (status === 'In progress') {
    cardData = cardData.filter((cardData) => cardData.status === 'In progress')
  }

  // Filter by theme if a specific value is set
  if (theme === 'Temperature') {
    cardData = cardData.filter((cardData) => cardData.theme === 'Temperature')
  } else if (theme === 'Ulcers') {
    cardData = cardData.filter((cardData) => cardData.theme === 'Ulcers')
  } else if (theme === 'High risk') {
    cardData = cardData.filter((cardData) => cardData.theme.trim() === 'High risk')
  } else if (theme === 'Age') {
    cardData = cardData.filter((cardData) => cardData.theme === 'Age')
  }

  return {
    cardData,
    status,
    theme,
    // Pass role to the page so UploadArticleButton knows whether to render
    userRole: locals.user?.role ?? null
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  /**
   * uploadArticle action — handles PDF upload from the UploadArticleButton component.
   *
   * Flow:
   *   1. Verify the user is a super_admin (server-side role guard)
   *   2. Extract and validate the uploaded file
   *   3. Upload PDF to Directus file storage
   *   4. Create an article record linked to the uploaded file
   */
  uploadarticle: async ({ request, locals }) => {
    // --- 1. Role guard: only super_admin may upload articles ---
    if (locals.user?.role?.toLowerCase() !== 'super_admin') {
      return fail(403, { error: 'You do not have permission to upload articles.' })
    }

    const formData = await request.formData()
    const file = /** @type {File} */ (formData.get('file'))

    // --- 2. Validate the uploaded file ---
    if (!file || file.size === 0) {
      return fail(400, { error: 'No file was provided. Please select a PDF.' })
    }

    if (file.type !== 'application/pdf') {
      return fail(400, { error: 'Invalid file type. Only PDF files are accepted.' })
    }

    // Reject files larger than 20 MB to protect Directus storage
    const MAX_BYTES = 20 * 1024 * 1024
    if (file.size > MAX_BYTES) {
      return fail(400, { error: 'File is too large. The maximum size is 20 MB.' })
    }
    try {
      // --- 3. Upload the PDF to Directus file storage ---
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const uploadedFile = await uploadPdfToDirectus(uploadFormData, DIRECTUS_URL, DIRECTUS_TOKEN)

      // --- 4. Create the article record linked to the uploaded file ---
      // Use the original filename (minus .pdf extension) as the article title
      const fallbackTitle = file.name.replace(/\.pdf$/i, '')

      await createArticleRecord(
        { title: fallbackTitle, status: 'published' },
        uploadedFile.id,
        DIRECTUS_URL,
        DIRECTUS_TOKEN
      )

      return { success: true }
    } catch (err) {
      // Log server-side for debugging; return a safe message to the client
      console.error('[uploadArticle action]', err)
      return fail(500, { error: 'Upload failed. Please try again later.' })
    }
  }
}
