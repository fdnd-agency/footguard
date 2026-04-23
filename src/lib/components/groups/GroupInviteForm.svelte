<script>
  /**
   * GroupInviteForm component
   * Allows an admin to add an existing Directus user to a group by email.
   * No invite email is sent — the user is directly added as an active member.
   */
  import { enhance } from '$app/forms'

   /** @type {string} - The ID of the group this form belongs to */
  export let groupId

  // Local state for the email input
  let email = ''
  let isSubmitting = false
  let localError = ''
  let localSuccess = false

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
   * Progressive enhancement handler for the add member form.
   * Validates on the client first, then handles the server response
   * to update the member list instantly without a page reload.
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
        localSuccess = true
        email = '' // Clear the input field after a successful invite

          // Auto-hide the success message after 3 seconds
        setTimeout(() => (localSuccess = false), 3000)
      }

      // Show error for this specific group OR any general error without groupId
      if (result.type === 'failure') {
    if (!result.data?.groupId || String(result.data?.groupId) === String(groupId)) {
      localError = result.data?.error || 'Something went wrong. Please try again.'
    }
  }

      // Update the form store but keep the input values (don't reset the whole page)
      await update({ reset: false })
    }
  }
  </script>


<label for="add-member-email">Add assessor by email</label>

<!-- Form uses addMember action — no email is sent, user is directly added -->
<form method="POST" action="?/addMember" use:enhance={handleSubmit}>
  <!-- Hidden field so the server knows which group to add the member to -->
  <input type="hidden" name="groupId" value={groupId} />

   <input
    id="add-member-email"
    name="email"
    type="email"
    placeholder="Enter email address"
    bind:value={email}
    disabled={isSubmitting}
    required
  />
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Adding...' : 'Add'}
  </button>
</form>

<!-- Error feedback: shown when validation fails or the server returns an error -->
{#if localError}
  <p class="feedback error" role="alert">{localError}</p>
{/if}

<!-- Success feedback: shown briefly after a member is successfully added -->
{#if localSuccess}
  <p class="feedback success" role="status">✓ Member added successfully!</p>
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
/* Feedback messages for error and success states */
.feedback {
  font-size: 0.8rem;
  margin: var(--spacing-xs) 0 0;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);

  /* Nested CSS instead of repeating .feedback every time */
  &.error {
    color: var(--red-700, #b91c1c);
    background: var(--red-50, #fef2f2);
  }

  &.success {
    color: var(--green-700, #15803d);
    background: var(--green-50, #f0fdf4);
  }
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
