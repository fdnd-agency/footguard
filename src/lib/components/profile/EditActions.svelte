<script>
  let { isEditing = false, disabled = false, onStartEdit, onSave, onCancel } = $props();
</script>

<div class="top-actions">
  {#if !isEditing}
    <button class="btn btn-edit" type="button" onclick={onStartEdit} {disabled}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      Edit Profile
    </button>
  {:else}
    <button class="btn btn-cancel" type="button" onclick={onCancel} {disabled}>Cancel</button>
    <button class="btn btn-save" type="button" onclick={onSave} {disabled}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Save Changes
    </button>
  {/if}
</div>

<style>
  .top-actions {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-md);
    display: flex;
    gap: var(--spacing-xs);
    z-index: 2;

    .btn {
      border: none;
      border-radius: var(--radius-sm);
      padding: var(--spacing-xs) var(--spacing-md);
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-xs);
      transition: background var(--transition-base);

      &:disabled {
        opacity: 0.75;
        cursor: not-allowed;
      }

      &:focus-visible {
        outline: 3px solid var(--blue-100);
        outline-offset: 2px;
      }
    }

    .btn-edit {
      background: rgb(255 255 255 / 25%);
      color: var(--background-color-primary);

      &:hover:not(:disabled) {
        background: rgb(255 255 255 / 40%);
      }
    }

    .btn-save {
      background: var(--background-color-primary);
      color: var(--blue-500);
      font-weight: 700;
      box-shadow: var(--shadow-sm);

      &:hover:not(:disabled) {
        background: var(--blue-100);
      }
    }

    .btn-cancel {
      background: rgb(255 255 255 / 15%);
      border: 1.5px solid rgb(255 255 255 / 50%);
      color: var(--background-color-primary);

      &:hover:not(:disabled) {
        background: rgb(255 255 255 / 28%);
      }
    }
  }
</style>
