/** @author: Razan Sagheer**/
import { env } from '$env/dynamic/private'

/**
 * Email provider switch.
 * - "console": logs the email contents in the server console (dev fallback)
 * - "resend": sends real emails (requires RESEND_API_KEY and a valid sender)
 */
const EMAIL_PROVIDER = env.EMAIL_PROVIDER ?? 'console'

/**
 * Send the magic link email.
 * NOTE: Keep this function "server-only" (in src/lib/server) so it never runs in the browser.
 */
export async function sendMagicLinkEmail({ to, link }) {
  if (EMAIL_PROVIDER === 'console') {
    console.log('--- MAGIC LINK EMAIL (DEV MODE: console) ---')
    console.log('To:', to)
    console.log('From:', env.MAIL_FROM ?? '(not set)')
    console.log('Link:', link)
    console.log('-------------------------------------------')
    return
  }

  // --- REAL EMAIL VIA RESEND ---
  if (EMAIL_PROVIDER === 'resend') {
    if (!env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is missing (EMAIL_PROVIDER=resend)')
    }
    if (!env.MAIL_FROM) {
      throw new Error('MAIL_FROM is missing (e.g. no-reply@iwgdfguidelines.org)')
    }

    // Lazy import so you dont't need the package in dev consloe mode
    const { Resend } = await import('resend')
    const resend = new Resend(env.RESEND_API_KEY)

    const response = await resend.emails.send({
      from: env.MAIL_FROM,
      to,
      subject: 'Your Magic Login Link(valid for 15 minutes)',
      html: `
            <p>Hello,</p>
            <p>Click the link below to log in (valid for 15 minutes):</p>
            <p><a href="${link}">Sign in</a></p>
            <p>If you did not request this, you can ignore this email.</p>
        `
    })

    console.log('Resend email response:', response)
    return
  }

  throw new Error(`Unsupported EMAIL_PROVIDER: ${EMAIL_PROVIDER}`)
}
