/** @author: Razan Sagheer**/
/**
 * Uploads a PDF file to Directus file storage.
 *
 * @param {FormData} fileFormData - FormData with a 'file' field containing the PDF
 * @param {string} directusUrl - Base URL of the Directus instance
 * @param {string} directusToken - Server-side Directus token
 * @returns {Promise<Object>} The uploaded file object from Directus (includes .id)
 */
export async function uploadPdfToDirectus(fileFormData, directusUrl, directusToken) {
  const response = await fetch(`${directusUrl}/files`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${directusToken}`
    },
    body: fileFormData
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(
      error?.errors?.[0]?.message ?? `Directus file upload failed (${response.status})`
    )
  }

  const { data } = await response.json()
  return data
}

/**
 * Creates an article record in the Directus 'iwgdf_articles' collection,
 * linking it to an already-uploaded file via its UUID.
 *
 * @param {{ title: string, status?: string }} meta - Article metadata
 * @param {string} fileId - UUID of the uploaded file in Directus
 * @param {string} directusUrl - Base URL of the Directus instance
 * @param {string} directusToken - Server-side Directus token
 * @returns {Promise<Object>} The created article record
 */

export async function createArticleRecord(meta, fileId, directusUrl, directusToken) {
  const response = await fetch(`${directusUrl}/items/footguard_articles`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${directusToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Title: meta.title, // exact field names from Directus
      Author: meta.author,
      Publisher: meta.publisher,
      theme: meta.theme,
      status: meta.status ?? 'Not started',
      paper_file: fileId // relation to directus_files
    })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error?.errors?.[0]?.message ?? `Failed to create article (${response.status})`)
  }

  const { data } = await response.json()
  return data
}
