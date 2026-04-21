<script>
  import fallbackAvatar from '$lib/assets/img/profile-avatar.webp';

  // Members are passed from GroupCard.svelte
  // Each member can have: id, name, email, isEmpty (open slot)
  export let members = [];
</script>

<section>
  <h2 class="title">Group members details</h2>
  <!-- TODO: Replace this static member list with dynamic data from the group members. -->
   <ul>
    {#each members as member (member.id)}
       <li>
        <img src={member.avatarUrl ?? fallbackAvatar} alt={member.name ?? 'Team member'} />

        <!-- Member name -->
        <span class="member-name">{member.name ?? 'Unknown'}</span>

        <!-- Remove button: grey circle with minus icon only — no text, no red -->
        <form method="POST" action="?/remove">
          <input type="hidden" name="memberId" value={member.id} />
          <button type="submit" class="btn-remove" aria-label="Remove member">
            <!-- Minus icon inside the button -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
        </form>
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

  /* Remove button: grey circle background with minus icon — no red */
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
    transition: background var(--transition-fast);

    svg {
      width: 1rem;
      height: 1rem;
    }

    /* Slightly darker grey on hover */
    &:hover {
      background: var(--red-200);
      color: var(--grey-700);
    }
  }

  .btn-remove svg {
    width: 1rem;
    height: 1rem;
  }

  /* Slightly darker on hover — still no red */
  .btn-remove:hover {
    color: var(--red-600);
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