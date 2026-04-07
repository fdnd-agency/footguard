<script>
  let { isEditing = false, formData, onFieldChange } = $props();
</script>

<section>
  <h2>General Information</h2>

  <form class="info-grid" aria-label="Profile details">
    <label for="info-role">
      <span>Role</span>
      <input
        id="info-role"
        type="text"
        readonly
        value={formData?.role ?? ''}
      />
    </label>
    <label for="info-institution">
      <span>Institution</span>
      <input
        id="info-institution"
        type="text"
        readonly={!isEditing}
        value={formData?.institute ?? ''}
        oninput={(event) => onFieldChange?.('institute', event.currentTarget.value)}
      />
    </label>
    <label for="info-profession">
      <span>Profession</span>
      <input
        id="info-profession"
        type="text"
        readonly={!isEditing}
        value={formData?.profession ?? ''}
        oninput={(event) => onFieldChange?.('profession', event.currentTarget.value)}
      />
    </label>
    <label for="info-email">
      <span>Email</span>
      <input
        id="info-email"
        type="email"
        readonly={!isEditing}
        value={formData?.email ?? ''}
        oninput={(event) => onFieldChange?.('email', event.currentTarget.value)}
      />
    </label>
  </form>
</section>

<style>
  section {
    padding: 0 var(--spacing-md) var(--spacing-xl);

    h2 {
      color: var(--blue-700);
      margin-bottom: var(--spacing-md);
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: var(--spacing-md);
      margin-bottom: var(--spacing-xl);
      margin-top: var(--spacing-xl);

      label {
        display: grid;
        gap: var(--spacing-xs);
      }

      span {
        color: var(--grey-300);
      }

      input {
        color: var(--blue-600);
        border: 1px solid var(--grey-200);
        border-radius: var(--radius-sm);
        background: var(--grey-50);
        padding: var(--spacing-sm);
      }

      input[readonly] {
        cursor: default;
      }

      input:not([readonly]) {
        border: 2px solid var(--blue-500);
        background: var(--blue-100);
      }

      input:focus-visible {
        outline: 3px solid var(--blue-500);
        outline-offset: 2px;
      }
    }

  }

  @container profile-card (min-width: 42rem) {
    section {
      padding: 0 var(--spacing-lg) var(--spacing-2xl);

      .info-grid {
        grid-template-columns: 1fr 1fr;
        column-gap: var(--spacing-lg);
        row-gap: var(--spacing-lg);
      }
    }
  }
</style>
