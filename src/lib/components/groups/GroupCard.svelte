<script>
  /*
   * SwitchSidesButton uses `onclick`; GroupMemberCard uses `onBack` to return to the front.
   */
  import { browser } from "$app/environment";
  import DetailsUpIcon from "$lib/assets/svg/DetailsUpIcon.svelte";
  import GroupCardHeader from "$lib/components/groups/GroupCardHeader.svelte";
  import GroupInviteForm from "$lib/components/groups/GroupInviteForm.svelte";
  import GroupMemberCard from "$lib/components/groups/GroupMemberCard.svelte";
  import SwitchSidesButton from "$lib/components/groups/SwitchSidesButton.svelte";
  import UserSectionDropdown from "$lib/components/groups/UserSectionDropdown.svelte";
  import previewAvatarFallback from "$lib/assets/img/profile-avatar.webp";

  // Group data is passed from the groups page
  export let group;
  export let form; // Form action result passed down from +page.svelte for invite form feedback

  // Fallback values keep the component safe while API data is still incomplete
  $: groupId = group?.id;
  $: groupName = group?.name ?? "Unnamed group";
  $: groupStatus = group?.status ?? "Unknown";
  $: conditionLabel = group?.conditionlabel ?? "General";

// Members array from group data — now populated from footguard_group_members
  $: members = group?.members ?? [];
  $: memberCount = members.length > 0 ? members.length : (group?.memberCount ?? 0);

  const groupId = $derived(group?.id ?? "");
  const frontFaceId = $derived(`group-${groupId}`);
  const membersFaceId = $derived(`group-${groupId}-members`);

 // Max number of member avatars to show in the preview
  const MAX_PREVIEW_MEMBERS = 2;

  // Reactive plural check to avoid magic numbers in the template
  $: isPlural = memberCount !== 1;

  // Create temporary preview items with stable ids for rendering
  $: previewMembers =
     memberCount > 0
      ? Array.from({ length: Math.min(memberCount, MAX_PREVIEW_MEMBERS) }, (_, index) => ({
          id: index + 1,
          // Use the real member name if available
          name: members[index]?.name ?? null
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

    <!-- Member avatar preview row with add button -->
    <div class="members-preview">
      {#if previewMembers.length > 0}
        <ul aria-label="Current members preview">
          {#each previewMembers as member (member.id)}
            <li>
              <!-- Avatar image is managed via Directus, no changes needed here -->
              <img src={avatar} alt={member.name ?? `Group member ${member.id}`} />
            </li>
          {/each}
        </ul>
      {/if}

  <!-- Dashed circle add button next to avatars -->
<button class="btn-add" type="button" aria-label="Add team member">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
</button>
    </div>

    {#if previewMembers.length === 0}
      <!-- Empty state: shown when group has no members yet -->
      <p class="members-empty">No members available yet.</p>
    {/if}

    <!--
      GroupInviteForm handles adding existing Directus users by email.
      Passes members so the form can show the current member list locally.
      Passes form for server action result feedback per group.
    -->
    <GroupInviteForm
      groupId={groupId}
      members={members}
      {form}
    />
  </section>

  <!-- Expandable dropdown showing the full member list with details -->
  <details>
    <summary>
      <span>{memberCount} member{isPlural ? 's' : ''}</span>
      <span class="chevron">
        <DetailsUpIcon />
      </span>
    </summary>
    <!-- Pass members array down to the dropdown component -->
<UserSectionDropdown {members} />
  </details>
</article>

<style>
  .group-card-root {
    width: min(100%, 24rem);
    container-type: inline-size;
    container-name: group-card;
    perspective: 1000px;
  }

  .scene {
    position: relative;
    min-height: 28rem;
  }

  .flipper {
    position: relative;
    min-height: 28rem;
    transform-style: preserve-3d;
    transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .flipper.flipped {
    transform: rotateY(180deg);
  }

  .face {
    position: absolute;
    inset: 0;
    border-radius: var(--radius-xl);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    overflow: hidden;
    background: var(--background-color-primary);
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
  }

  .face--back {
    transform: rotateY(180deg);
  }

  .group-card-header {
    position: relative;

    & :global(.switch-sides-btn) {
      position: absolute;
      top: var(--spacing-xl);
      right: 0;
      z-index: 10;
    }
  }

    .members-preview {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-lg);

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }

  .members-preview-av {
    width: 3rem;
    height: 3rem;
    border-radius: var(--radius-full);
    border: 2px solid var(--background-color-primary);
    object-fit: cover;
    object-position: center;
    background: var(--grey-100);
    box-shadow: var(--shadow-sm);
  }

  .title {
    margin: 0 0 var(--spacing-sm);
    font-size: 1rem;
    font-weight: 600;
    color: var(--grey-700);
  }

  .members-empty {
    margin: 0 0 var(--spacing-lg);
    font-size: 0.875rem;
    color: var(--grey-500);
  }

  details {
    flex-shrink: 0;

    summary {
      display: flex;
      width: 100%;
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

      .chevron {
        display: inline-flex;
        transition: transform var(--transition-slow);

        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }
      }
    }

    /* Dashed circle add button next to avatars */
  .btn-add {
    width: 3rem;
    height: 3rem;
    border-radius: var(--radius-full);
    border: 2px dashed var(--grey-300);
    background: transparent;
    color: var(--grey-400);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color var(--transition-fast), color var(--transition-fast);
    flex-shrink: 0;

    svg {
    width: 1.25rem;
    height: 1.25rem;

    }
  }

  .members-section {
    padding: var(--spacing-lg);
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

  @container group-card (min-width: 42rem) {
    .members-section {
      padding: var(--spacing-xl);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .flipper {
      transition: none;
    }

    details summary .chevron {
      transition: none;
    }
  }
</style>
