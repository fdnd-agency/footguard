<script>
  import DetailsUpIcon from "$lib/assets/svg/DetailsUpIcon.svelte";
  import GroupCardHeader from "$lib/components/groups/GroupCardHeader.svelte";
  import GroupInviteForm from "$lib/components/groups/GroupInviteForm.svelte";
  import UserSectionDropdown from "$lib/components/groups/UserSectionDropdown.svelte";
  import avatar from "$lib/assets/img/profile-avatar.webp";

  // Group data is passed from the groups page
  export let group;

  // Fallback values keep the component safe while API data is still incomplete
  $: groupName = group?.name ?? "Unnamed group";
  $: groupStatus = group?.status ?? "Unknown";
  $: conditionLabel = group?.conditionlabel ?? "General";
  $: memberCount = group?.memberCount ?? 0;


 // Max number of member avatars to show in the preview
  const MAX_PREVIEW_MEMBERS = 2;

  // Reactive plural check to avoid magic numbers in the template
  $: isPlural = memberCount !== 1;

  // Create temporary preview items with stable ids for rendering
  $: previewMembers =
    memberCount > 0
      ? Array.from({ length: Math.min(memberCount, MAX_PREVIEW_MEMBERS) }, (_, index) => ({
          id: index + 1,
          name: null // Name is not available yet until member API data is connected
        }))
      : [];
</script>

<article>
  <GroupCardHeader
  name={groupName}
  status={groupStatus}
  conditionLabel={conditionLabel}
/>

  <section class="members-section">
    <h2 class="title">Members</h2>

    <!-- Temporary member preview until real member data is available -->
  {#if previewMembers.length > 0}
      <ul aria-label="Current members preview">
        {#each previewMembers as member (member.id)}
          <li>
    <img src={avatar} alt={`Group member ${member.id}`} />
  </li>
{/each}
  </ul>
{:else}
  <p class="members-empty">No members available yet.</p>
{/if}

    <GroupInviteForm />
  </section>

  <details>
    <summary>
       <!-- Member count is currently based on fallback data -->
       <span>{memberCount} member{isPlural ? 's' : ''}</span>
      <span class="chevron">
        <DetailsUpIcon />
      </span>
    </summary>
    <UserSectionDropdown />
  </details>
</article>

<style>
  article {
    width: min(100%, 24rem);
    border-radius: var(--radius-xl);
    overflow: hidden;
    background: var(--background-color-primary);
    box-shadow: var(--shadow-lg);
    transition: box-shadow var(--transition-slow);
    container-type: inline-size;
    container-name: group-card;
  }

  .members-section {
    padding: var(--spacing-lg);

    ul {
      margin: 0 0 var(--spacing-lg);
      padding: 0;
      list-style: none;
      display: flex;
      gap: var(--spacing-xs);

      li {
        margin-left: 0;
      }

      img {
        width: 3rem;
        height: 3rem;
        border-radius: var(--radius-full);
        border: 2px solid var(--background-color-primary);
        object-fit: cover;
        box-shadow: var(--shadow-sm);
      }
    }
  }

  summary {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    border-top: 1px solid var(--grey-100);
    background: var(--grey-50);
    color: var(--grey-600);
    list-style: none;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }
  }

  .chevron {
    display: inline-flex;
    transition: transform var(--transition-slow);
  }

  details[open] .chevron {
    transform: rotate(180deg);
  }

  @container group-card (min-width: 42rem) {
    .members-section {
      padding: var(--spacing-xl);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    article,
    .chevron {
      transition: none;
    }
  }
</style>
