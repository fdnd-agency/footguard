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

  let { group } = $props();

  let flipped = $state(false);

  const groupId = $derived(group?.id ?? "");
  const frontFaceId = $derived(`group-${groupId}`);
  const membersFaceId = $derived(`group-${groupId}-members`);

  const groupName = $derived(group?.name ?? "Unnamed group");
  const groupStatus = $derived(group?.status ?? "Unknown");
  const conditionLabel = $derived(group?.conditionlabel ?? "General");
  const membersList = $derived(
    Array.isArray(group?.members) ? group.members : []
  );
  const memberCount = $derived(membersList.length);
  const isPlural = $derived(memberCount !== 1);
  const previewMembers = $derived(membersList.slice(0, 3));
</script>

<article class="group-card-root">
  <div class="scene">
    <div class="flipper" class:flipped={flipped}>
      <div
        id={frontFaceId}
        class="face face--front"
        inert={browser && flipped}
        aria-hidden={browser && flipped}
      >
        <header class="group-card-header">
          <SwitchSidesButton
            onclick={() => {
              flipped = true;
            }}
          />
          <GroupCardHeader
            name={groupName}
            status={groupStatus}
            conditionLabel={conditionLabel}
          />
        </header>

        <section class="members-section">
          <h2 class="title">Members</h2>

          {#if previewMembers.length > 0}
            <ul aria-label="Current members preview">
              {#each previewMembers as member (member.id)}
                <li>
                  <img
                    class="members-preview-av"
                    src={member.avatarUrl ?? previewAvatarFallback}
                    alt=""
                    width="48"
                    height="48"
                    decoding="async"
                  />
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
            <span>{memberCount} member{isPlural ? "s" : ""}</span>
            <span class="chevron">
              <DetailsUpIcon />
            </span>
          </summary>
          <UserSectionDropdown />
        </details>
      </div>

      <div
        id={membersFaceId}
        class="face face--back"
        inert={browser && !flipped}
        aria-hidden={browser && !flipped}
      >
        <GroupMemberCard
          {groupId}
          onBack={() => {
            flipped = false;
          }}
        />
      </div>
    </div>
  </div>
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

  .members-section {
    padding: var(--spacing-lg);
    flex: 1;
    min-height: 0;
    overflow-y: auto;

    ul {
      display: flex;
      gap: var(--spacing-xs);
      margin: 0 0 var(--spacing-lg);
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

    &[open] summary .chevron {
      transform: rotate(180deg);
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
