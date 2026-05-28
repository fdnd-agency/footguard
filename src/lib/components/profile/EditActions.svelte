<script>
  import { resolve } from '$app/paths'

  let { isEditMode = false, disabled = false, formId = '' } = $props()
</script>

<div class="top-actions">
  {#if !isEditMode}
    <a class="btn btn-edit" href={resolve('/profile?edit')} aria-disabled={disabled || undefined}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      Edit Profile
    </a>
  {:else}
    <a class="btn btn-cancel" href={resolve('/profile')} aria-disabled={disabled || undefined}>Cancel</a>
    <button class="btn btn-save" type="submit" form={formId} {disabled}>
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
      text-decoration: none;

      &:disabled,
      &[aria-disabled='true'] {
        opacity: 0.75;
        cursor: not-allowed;
        pointer-events: none;
      }

      &:focus-visible {
        outline: 2px solid var(--blue-100);
        outline-offset: 2px;
      }
    }

    .btn-edit {
      background: rgb(255 255 255 / 25%);
      color: var(--background-color-primary);

      &:hover:not(:disabled):not([aria-disabled='true']) {
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
      background: var(--red-500);
      color: var(--background-color-primary);

      &:hover:not(:disabled):not([aria-disabled='true']) {
        background: var(--red-600);
      }
    }
  }
</style>
