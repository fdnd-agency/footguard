<script>
  /**
   * RemoveMemberButton component
   * Submits the remove action for a single member record.
   * Uses SvelteKit form enhancement so the page URL does not visibly change.
   */
  import { enhance } from '$app/forms'

  /** @type {string|number} - footguard_group_members record id */
  export let memberId
</script>

<!-- Named action: remove this member from the current group -->
<form method="POST" action="?/remove" use:enhance>
  <!-- Hidden id sent to +page.server.js actions.remove -->
  <input type="hidden" name="memberId" value={memberId} />
  <button type="submit" class="btn-remove" aria-label="Remove member">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  </button>
</form>

<style>
  .btn-remove {
    border: none;
    background: var(--grey-100);
    color: var(--grey-500);
    border-radius: var(--radius-full);
    width: 1.75rem;
    height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background var(--transition-fast), color var(--transition-fast);

    svg {
      width: 1rem;
      height: 1rem;
    }

    &:hover {
      background: var(--red-500, #ef4444);
      color: var(--grey-50, #ffffff);
    }
  }
</style>
