<label for="invite-email">Invite via email</label>
<form method="POST" action="?/invite">
  <input id="invite-email" name="email" type="email" placeholder="Enter email address" required />
  <button type="submit">Invite</button>
</form>

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
