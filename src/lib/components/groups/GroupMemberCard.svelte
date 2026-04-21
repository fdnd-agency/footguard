<script>
  /*
   * GroupMemberCard — back face of the flipped group card.
   * Shows a title bar, a “Back” control, and a scrollable list of members.
   */

  // Builds correct app URLs when the site uses a base path (SvelteKit `resolve`).
  import { resolve } from '$app/paths'

  /**
   * @typedef {{ id: number | string; name: string; role?: string; avatarUrl?: string }} MemberRow
   */

  // With `onBack` from GroupCard, “Back” is a button (no URL change). Without it, `groupId` builds an optional hash link.
  let {
    groupId = '',
    onBack,
    groupName = '',
    /** @type {MemberRow[]} */
    members = []
  } = $props()

  const backHref = $derived(
    onBack
      ? ''
      : groupId !== '' && groupId != null
        ? `${resolve('/groups')}#group-${groupId}`
        : ''
  )
</script>

<!-- Root: full-height column; header fixed style, list grows and scrolls -->
<div class="card">
  <header class="header">
    <span class="group-name">{groupName || 'Unnamed group'}</span>
    {#if onBack}
      <button type="button" class="back" onclick={onBack}>Back</button>
    {:else if backHref}
      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
      <a class="back" href={backHref}>Back</a>
    {:else}
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

      &:is(a):focus-visible,
      &:focus-visible {
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
