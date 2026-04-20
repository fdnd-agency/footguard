<script>
  /*
   * GroupMemberCard — back face of the flipped group card.
   * Shows a title bar, a “Back” control, and a scrollable list of members.
   */

  // Builds correct app URLs when the site uses a base path (SvelteKit `resolve`).
  import { resolve } from '$app/paths'

  // TODO(groups): Swap the constants below for real `groupName` and `members` from props when the API is ready.
  const PLACEHOLDER_AVATAR = 'https://placehold.co/96x96/e2e8f0/64748b?text=%20'

  const groupName = 'Prevention'
  const members = [
    { id: 701, name: 'Yamen Al Sharabi', role: 'Super Admin', avatarUrl: PLACEHOLDER_AVATAR },
    { id: 702, name: 'Alex ', role: 'Member', avatarUrl: PLACEHOLDER_AVATAR },
    { id: 703, name: 'Sam ', role: 'Member', avatarUrl: PLACEHOLDER_AVATAR }
  ]

  // Only input from the parent: which card we belong to, so “Back” can open the front face (`#group-7`, etc.).
  let { groupId = '' } = $props()

  // Recomputes whenever `groupId` changes. Empty string → no link (button only).
  const backHref = $derived(
    groupId !== '' && groupId != null ? `${resolve('/groups')}#group-${groupId}` : ''
  )
</script>

<!-- Root: full-height column; header fixed style, list grows and scrolls -->
<div class="card">
  <header class="header">
    <span class="group-name">{groupName}</span>
    {#if backHref}
      <!-- Real URL: eslint rule skipped because href is already built with `resolve()` above -->
      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
      <a class="back" href={backHref}>Back</a>
    {:else}
      <!-- No `groupId`: still show Back visually, but it cannot navigate -->
      <button type="button" class="back">Back</button>
    {/if}
  </header>

  <!-- `(member.id)` = Svelte key so rows reconcile correctly when the list changes later -->
  <ul class="members" aria-label="Group members">
    {#each members as member (member.id)}
      <li class="row">
        <img
          class="avatar"
          src={member.avatarUrl}
          alt={`Avatar of ${member.name}`}
          width="32"
          height="32"
          decoding="async"
        />
        <div class="meta">
          <span class="name">{member.name}</span>
          <span class="role">{member.role}</span>
        </div>
      </li>
    {:else}
      <li class="row empty">No members in this group yet.</li>
    {/each}
  </ul>
</div>

<style>
  /* Card fills the flip face; min-height 0 lets the inner list scroll inside flex layouts */
  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    background: var(--background-color-primary);

    /* Top bar: group title left, Back right */
    & .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-sm);
      padding: var(--spacing-md) var(--spacing-lg);
      background: hsl(292.04deg 45.75% 51.57%);
      color: var(--font-color-card);
    }

    /* Group title in the purple bar */
    & .group-name {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.25;
    }

    /* Same look for `<a>` and `<button>`; keyboard users get a clear focus ring on the link */
    & .back {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: var(--radius-md);
      padding: 0.5rem 0.75rem;
      background: var(--background-color-primary);
      color: hsl(263, 70%, 50%);
      font: inherit;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;

      /* Visible keyboard focus only on the real link (not the button fallback) */
      &:is(a):focus-visible {
        outline: 2px solid var(--background-color-primary);
        outline-offset: 2px;
      }
    }

    /* Member list takes remaining height; scrolls if there are many rows */
    & .members {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    /* One member row: avatar + text; empty state is a single full-width message */
    & .row {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-lg);
      border-bottom: 1px solid var(--grey-100);

      /* Avoid a double line under the last item */
      &:last-child {
        border-bottom: none;
      }

      /* Shown when the members array is empty (not used with current static demo) */
      &.empty {
        display: block;
        padding: var(--spacing-lg);
        color: var(--grey-500);
        font-size: 1rem;
      }
    }

    /* Square image cropped to a circle; grey background shows while the image loads */
    & .avatar {
      flex-shrink: 0;
      width: 2rem;
      height: 2rem;
      border-radius: var(--radius-full);
      object-fit: cover;
      object-position: center;
      background: var(--grey-100);
    }

    /* Stacks name + role; min-width 0 stops long names from breaking the flex row */
    & .meta {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    /* Member display name */
    & .name {
      font-size: 1rem;
      font-weight: 500;
      color: var(--grey-700);
    }

    /* Role / status line, slightly smaller and muted */
    & .role {
      font-size: 0.75rem;
      color: var(--grey-400);
    }
  }
</style>
