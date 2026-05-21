/** @author: Razan Sagheer**/
/**
 * Uploads a PDF file to Directus file storage.
 * Uses the server-side DIRECTUS_TOKEN for authorization.
 *
 * @param {FormData} fileFormData - FormData with a 'file' field containing the PDF
 * @param {string} directusUrl - Base URL of the Directus instance (from env)
 * @param {string} directusToken - Server-side Directus token (from env)
 * @returns {Promise<Object>} The uploaded file object from Directus (includes .id)
 */

export async function uploadPdfToDirectus(fileFormData, directusUrl, directusToken) {
  const response = await fetch(`${directusUrl}/files`, {
    method: 'POST',
    headers: {
      // Use the server token — no Content-Type header; fetch sets it for FormData
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
  const response = await fetch(`${directusUrl}/items/iwgdf_articles`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${directusToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: meta.title,
      status: meta.status ?? 'published',
      pdf_file: fileId // Relation field pointing to directus_files
    })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(
      error?.errors?.[0]?.message ?? `Failed to create article record (${response.status})`
    )
  }

  const { data } = await response.json()
  return data
}
