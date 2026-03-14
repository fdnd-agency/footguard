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
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background-color: #f9f9f9; border-radius: 8px;">
    
    <h2 style="color: #1a1a1a; margin-bottom: 8px;">Sign in to IWGDF Guidelines</h2>
    
    <p style="color: #444; font-size: 15px; line-height: 1.6;">
      You requested a sign-in link for your IWGDF account. Click the button below to log in.
      This link is valid for <strong>15 minutes</strong> and can only be used once.
    </p>
       <div style="text-align: center; margin: 32px 0;">
      <a href="${link}" style="background-color: #1a6fc4; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: bold;">
        Sign in to IWGDF
      </a>
    </div>

    <p style="color: #888; font-size: 13px; line-height: 1.6;">
      If you did not request this email, you can safely ignore it. Your account remains secure.
    </p>

    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />
    
    <p style="color: #aaa; font-size: 12px; text-align: center;">
      &copy; IWGDF Guidelines &nbsp;|&nbsp; This is an automated message, please do not reply.
    </p>

  </div>
        `
    })

    console.log('Resend email response:', response)
    return
  }

  throw new Error(`Unsupported EMAIL_PROVIDER: ${EMAIL_PROVIDER}`)
}
