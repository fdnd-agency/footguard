<script>
  import DetailsUpIcon from "$lib/assets/svg/DetailsUpIcon.svelte";
  import GroupCardHeader from "$lib/components/groups/GroupCardHeader.svelte";
  import GroupInviteForm from "$lib/components/groups/GroupInviteForm.svelte";
  import GroupMemberCard from "$lib/components/groups/GroupMemberCard.svelte";
  import SwitchSidesButton from "$lib/components/groups/SwitchSidesButton.svelte";
  import UserSectionDropdown from "$lib/components/groups/UserSectionDropdown.svelte";
  import previewAvatarFallback from "$lib/assets/img/profile-avatar.webp";

  // Group data is passed from the groups page; `form` is invite action feedback from +page.svelte
  let { group, form } = $props();

  let flipped = $state(false);

  function flipToMembers() {
    flipped = true;
  }

  function flipToFront() {
    flipped = false;
  }

  // Max number of member avatars to show in the preview
  const MAX_PREVIEW_MEMBERS = 2;

  // Fallback values keep the component safe while API data is still incomplete
  const groupId = $derived(group?.id ?? "");
  const groupName = $derived(group?.name ?? "Unnamed group");
  const groupStatus = $derived(group?.status ?? "Unknown");
  const conditionLabel = $derived(group?.conditionlabel ?? "General");

  // Members array from group data — now populated from footguard_group_members
  const members = $derived(Array.isArray(group?.members) ? group.members : []);
  const memberCount = $derived(group?.memberCount ?? members.length);

  const faceIdSuffix = $derived(String(group?.id ?? "unknown"));
  const frontFaceId = $derived(`group-${faceIdSuffix}`);
  const membersFaceId = $derived(`group-${faceIdSuffix}-members`);
  const groupImage = $derived(group?.image ?? null);

  // make clear order for roles in back face list
  // first super admin, then admin, then assessor, then viewer
  const rolePriority = {
    'super admin': 0,
    admin: 1,
    assessor: 2,
    viewer: 3,
    vister: 3
  };

  // if role not known keep it in the end
  function getRolePriority(role) {
    const normalizedRole = String(role ?? "").trim().toLowerCase();
    return rolePriority[normalizedRole] ?? 99;
  }

  const membersForBackFace = $derived(
    [...members]
      // sort members by role order we need in design
      .sort((a, b) => getRolePriority(a?.role) - getRolePriority(b?.role))
      .map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        avatarUrl: m.avatarUrl ?? previewAvatarFallback
      }))
  );

  const isPlural = $derived(memberCount !== 1);

  const previewMembers = $derived(members.slice(0, MAX_PREVIEW_MEMBERS));
</script>

<article class="group-card-root">
  <div class="scene">
    <div class="flipper" class:flipped={flipped}>
      <!-- Front: summary + invite + details -->
      <div class="face face--front" id={frontFaceId}>
        <div class="group-card-header">
          <GroupCardHeader
            name={groupName}
            status={groupStatus}
            conditionLabel={conditionLabel}
            image={groupImage}
          />
          <SwitchSidesButton label="Members" onclick={flipToMembers} />
        </div>

        <section class="members-section">
          <h2 class="title">Assessors</h2>

          <!-- Member avatar preview row with add button -->
          <div class="members-preview">
            {#if previewMembers.length > 0}
              <ul aria-label="Current members preview">
                {#each previewMembers as member (member.id)}
                  <li>
                    <img
                      class="members-preview-av"
                      src={member.avatarUrl ?? previewAvatarFallback}
                      alt={member.name ?? `Group member ${member.id}`}
                    />
                  </li>
                {/each}
              </ul>
            {/if}

            <!-- Dashed circle add button next to avatars -->
            <button class="btn-add" type="button" aria-label="Add team member">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
          </div>

          {#if previewMembers.length === 0}
            <p class="members-empty">No members available yet.</p>
          {/if}

          <GroupInviteForm {groupId} {members} {form} />
        </section>

        <details>
          <summary>
            <span>{memberCount} Assessor{isPlural ? "s" : ""}</span>
            <span class="chevron">
              <DetailsUpIcon />
            </span>
          </summary>
          <div class="members-dropdown-panel">
            <UserSectionDropdown {members} />
          </div>
        </details>
      </div>

      <!-- Back: full member list -->
      <div class="face face--back" id={membersFaceId}>
        <GroupMemberCard
          {groupId}
          {groupName}
          {memberCount}
          memberLimit={group?.maxMembers ?? null}
          members={membersForBackFace}
          onBack={flipToFront}
        />
      </div>
    </div>
  </div>
</article>

<style>
  .group-card-root {
    position: relative;
    width: 100%;
    max-width: 24rem;
    justify-self: start;
    container-type: inline-size;
    container-name: group-card;
    perspective: 1000px;
  }

  .group-card-root:has(.face--front details[open]) {
    z-index: 30;
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

  .face--front {
    overflow: visible;
    border-radius: var(--radius-xl);
  }

  .group-card-header {
    position: relative;
    flex-shrink: 0;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    overflow: hidden;

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
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      margin: 0;
      padding: 0;
      list-style: none;
    }

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
      transition:
        border-color var(--transition-fast),
        color var(--transition-fast);
      flex-shrink: 0;

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
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
    position: relative;
    flex-shrink: 0;
    overflow: visible;

    & > .members-dropdown-panel {
      display: none;
    }

    &[open] > .members-dropdown-panel {
      display: block;
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      z-index: 40;
      max-height: 16rem;
      overflow-y: auto;
      background: var(--background-color-primary);
      border-bottom: 1px solid var(--grey-100);
      border-radius: var(--radius-xl) var(--radius-xl) 0 0;
      box-shadow: none;
    }

    &[open] summary .chevron {
      transform: rotate(180deg);
    }

    &[open] summary {
      border-radius: 0;
    }

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
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);

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
  }

  .members-section {
    flex: 1;
    min-height: 0;
    padding: var(--spacing-lg);
    overflow-y: auto;
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
