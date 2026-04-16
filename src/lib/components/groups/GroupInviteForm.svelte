<script>
  /**
   * GroupInviteForm component
   * Handles email input, form submission via SvelteKit enhance,
   * and displays success/error feedback and pending invites.
   */
  import { enhance } from '$app/forms'

   /** @type {string} - The ID of the group this form belongs to */
  export let groupId

  /** @type {Array} - List of pending invites loaded from the server */
  export let pendingInvites = []

  /** @type {object|null} - Form action result passed down from +page.svelte */
  export let form = null

  // Local state for the email input
  let email = ''
  let isSubmitting = false
  let localError = ''
  let localSuccess = false

  // Local copy of pending invites so we can update the UI instantly
  // without waiting for a full page reload
  let localPendingInvites = [...pendingInvites]

   /**
   * Client-side email validation before the form is submitted.
   * Returns an error string, or empty string if the email is valid.
   *
   * @param {string} value - The email address to validate
   * @returns {string} Error message or empty string
   */
  function validateEmail(value) {
    if (!value.trim()) return 'Email address is required.'
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(value)) return 'Please enter a valid email address.'
    return ''
  }

   /**
   * Progressive enhancement handler for the invite form.
   * Runs client-side validation first, then handles the server response
   * to update the UI without a full page reload.
   */
  function handleSubmit() {
    // Reset feedback state on every new submission
    localError = ''
    localSuccess = false
    
  // Run client-side validation before sending to the server
    const validationError = validateEmail(email)
    if (validationError) {
      localError = validationError
      // Cancel the form submission if client-side validation fails
      return ({ cancel }) => cancel()
    }

    isSubmitting = true

    return async ({ result, update }) => {
      isSubmitting = false

      if (result.type === 'success' && result.data?.groupId === groupId) {
        // Add the newly invited email to the local pending list immediately
        // so the user sees the update without waiting for a page reload
        localPendingInvites = [
          ...localPendingInvites,
          {
            id: Date.now(), // temporary ID until the page reloads
            email: result.data.email,
            invite_status: 'pending'
          }
        ]
        localSuccess = true
        email = '' // Clear the input field after a successful invite

          // Auto-hide the success message after 3 seconds
        setTimeout(() => (localSuccess = false), 3000)
      }

      if (result.type === 'failure' && result.data?.groupId === groupId) {
        // Show the error message returned from the server action
        localError = result.data?.error || 'Something went wrong. Please try again.'
      }

      // Update the form store but keep the input values (don't reset the whole page)
      await update({ reset: false })
    }
  }
  </script>


<label for="invite-email">Invite via email</label>
<form method="POST" action="?/inviteUser" use:enhance={handleSubmit}>
  <!-- Hidden field to tell the server action which group this invite belongs to -->
  <input type="hidden" name="groupId" value={groupId} />

    <input
    id="invite-email"
    name="email"
    type="email"
    placeholder="Enter email address"
    bind:value={email}
    disabled={isSubmitting}
    required
  />
    <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Sending...' : 'Invite'}
  </button>
</form>

<!-- Error feedback: shown when validation fails or the server returns an error -->
{#if localError}
  <p class="feedback error" role="alert">{localError}</p>
{/if}

<!-- Success feedback: shown briefly after a successful invite -->
{#if localSuccess}
  <p class="feedback success" role="status">✓ Invite sent successfully!</p>
{/if}

<!-- Pending invites list: shows all invites that are still waiting to be accepted -->
{#if localPendingInvites.length > 0}
  <ul class="pending-list">
    {#each localPendingInvites as invite (invite.id)}
      <li class="pending-item">
        <span class="pending-email">{invite.email}</span>
        <span class="pending-badge">Pending</span>
      </li>
    {/each}
  </ul>
{/if}

<style>
  label {
    display: block;
    margin-bottom: var(--spacing-xs);
    color: var(--grey-700);
  }

  form {
    display: flex;
    border-radius: var(--radius-md);
    border: 1px solid var(--grey-200);
    overflow: hidden;
    container-type: inline-size;
    container-name: invite-form;

    input {
      flex: 1;
      padding: var(--spacing-sm) var(--spacing-md);
      border: 0;
    }

    button {
      padding: var(--spacing-sm) var(--spacing-md);
      background: var(--blue-500);
      color: var(--font-color-card);
      transition: background-color var(--transition-base);

      /* Dim the button while the invite is being sent */
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
  }
}
 /* Feedback messages for success and error states */
  .feedback {
    font-size: 0.8rem;
    margin: var(--spacing-xs) 0 0;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
  }

  .feedback.error {
    color: var(--red-700, #b91c1c);
    background: var(--red-50, #fef2f2);
  }

   .feedback.success {
    color: var(--green-700, #15803d);
    background: var(--green-50, #f0fdf4);
  }

   /* Pending invites list below the form */
  .pending-list {
    list-style: none;
    padding: 0;
    margin: var(--spacing-sm) 0 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .pending-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    padding: var(--spacing-xs) var(--spacing-sm);
    background: var(--grey-50, #f9fafb);
    border-radius: var(--radius-sm);
  }
  .pending-email {
    color: var(--grey-700);
  }
  .pending-badge {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--orange-700, #c2410c);
    background: var(--orange-50, #fff7ed);
    padding: 2px var(--spacing-xs);
    border-radius: var(--radius-full, 9999px);
  }

  @container invite-form (min-width: 42rem) {
    form {
      input,
      button {
        padding: var(--spacing-md);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    form {
      button {
        transition: none;
      }
    }
  }
</style>
