<script>
  import fallbackAvatar from '$lib/assets/img/profile-avatar.webp';
  import RemoveMemberButton from './RemoveMemberButton.svelte';

  // Members are passed from GroupCard.svelte
  // Each member can have: id, name, email, isEmpty (open slot)
  export let members = [];
</script>

<section class="members-dropdown-panel">
  <h2 class="title">Assessor list</h2>
  <!-- TODO: Replace this static member list with dynamic data from the group members. -->
   <ul>
    {#each members as member (member.id)}
       <li>
        <img src={member.avatarUrl ?? fallbackAvatar} alt={member.name ?? 'Team member'} />

        <div class="member-meta">
          <span class="member-name">{member.name ?? 'Unknown'}</span>
          <span class="member-role">{member.role ?? 'No role assigned'}</span>
        </div>

        <RemoveMemberButton memberId={member.id} />
      </li>
    {/each}

    <!-- Fallback: shown when no members are available yet -->
    {#if members.length === 0}
      <li class="empty-state">No members available yet.</li>
    {/if}
  </ul>
</section>

<style>
  section {
  container-type: inline-size;    
  container-name: members-dropdown;    
  padding: var(--spacing-sm) var(--spacing-lg);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: var(--spacing-sm);
  }

li {
    display: grid;
    /* Avatar | name | remove button */
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-bottom: 1px solid var(--grey-100);

    &:last-child {
      border-bottom: none;
    }
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-full);
    object-fit: cover;
  }

  .member-name {
    color: var(--grey-700);
    font-weight: 500;    
    font-size: var(--font-size-sm);
    text-align: left;
  }

  .member-meta {
    display: grid;
    gap: 0.125rem;
  }

  .member-role {
    color: var(--grey-500);
    font-size: var(--font-size-xs, 0.75rem);
    line-height: 1.2;
    text-align: left;
  }
  /* Fallback empty state message */
  .empty-state {
    display: block;
    color: var(--grey-500);
    font-size: var(--font-size-sm);
    padding: var(--spacing-md) var(--spacing-sm);
    text-align: center;
  }

  @container members-dropdown (min-width: 42rem) {
    li {
      gap: var(--spacing-md);
      padding-inline: var(--spacing-xl);
    }
  }
</style>