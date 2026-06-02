<!-- GroupCard.svelte -->
<!-- Front face shows assigned articles + invite form. Back face shows full member list. -->
<script>
  import DetailsUpIcon from "$lib/assets/svg/DetailsUpIcon.svelte";
  import GroupCardHeader from "$lib/components/groups/GroupCardHeader.svelte";
  import GroupInviteForm from "$lib/components/groups/GroupInviteForm.svelte";
  import GroupMemberCard from "$lib/components/groups/GroupMemberCard.svelte";
  import SwitchSidesButton from "$lib/components/groups/SwitchSidesButton.svelte";
  import GroupCardMenu from "$lib/components/groups/GroupCardMenu.svelte";
  import previewAvatarFallback from "$lib/assets/img/profile-avatar.webp";

  // Group data is passed from the groups page; `form` is invite action feedback from +page.svelte
  // `isAdmin` gates admin-only actions (delete); `onDeleted` lets the page drop the card live.
  let { group, form, isAdmin = false, onDeleted = null } = $props();

  let flipped = $state(false);

  function flipToMembers() {
    flipped = true;
  }

  function flipToFront() {
    flipped = false;
  }

  // Fallback values keep the component safe while API data is still incomplete
  const groupId = $derived(group?.id ?? "");
  const groupName = $derived(group?.name ?? "Unnamed group");
  const groupStatus = $derived(group?.status ?? "Unknown");
  const conditionLabel = $derived(group?.conditionlabel ?? "General");
  const groupImage = $derived(group?.image ?? null);

  const faceIdSuffix = $derived(String(group?.id ?? "unknown"));
  const frontFaceId = $derived(`group-${faceIdSuffix}`);
  const membersFaceId = $derived(`group-${faceIdSuffix}-members`);

  // Members array from group data — populated from footguard_group_members
  const members = $derived(Array.isArray(group?.members) ? group.members : []);
  const memberCount = $derived(group?.memberCount ?? members.length);

  // Articles array from group data — populated from footguard_articles
  const articles = $derived(Array.isArray(group?.articles) ? group.articles : []);

  // Sort order for roles on the back face
  // first super admin, then admin, then assessor, then viewer
  const rolePriority = {
    'super admin': 0,
    admin: 1,
    assessor: 2,
    viewer: 3,
    vister: 3
  };

  // Returns sort priority for a given role — unknown roles go to the end
  function getRolePriority(role) {
    const normalizedRole = String(role ?? "").trim().toLowerCase();
    return rolePriority[normalizedRole] ?? 99;
  }

  const membersForBackFace = $derived(
    [...members]
      // Sort members by role priority for consistent display order
      .sort((a, b) => getRolePriority(a?.role) - getRolePriority(b?.role))
      .map((m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        avatarUrl: m.avatarUrl ?? previewAvatarFallback
      }))
  );
</script>

<article class="group-card-root">
  <div class="scene">
    <div class="flipper" class:flipped={flipped}>

      <!-- Front face: group header + articles list + invite form + articles dropdown -->
      <div class="face face--front" id={frontFaceId}>
        <div class="group-card-header">
          <GroupCardHeader
            name={groupName}
            status={groupStatus}
            conditionLabel={conditionLabel}
            image={groupImage}
          />
          <!-- Button to flip card to the members back face -->
          <SwitchSidesButton label="Members" onclick={flipToMembers} />
        </div>

        <section class="members-section">
          <header class="section-title-row">
            <h2 class="title">Articles</h2>
            <!-- Three-dot menu with Edit/Delete: admins/super admins only -->
            {#if isAdmin}
              <GroupCardMenu {groupId} {groupName} {onDeleted} />
            {/if}
          </header>

          {#if articles.length > 0}
            <!-- Article list: shows title of each article assigned to this group -->
            <ul class="articles-list">
              {#each articles as article (article.id)}
                <li class="article-item">
                  <span class="article-title">{article.title}</span>
                </li>
              {/each}
            </ul>
          {:else}
            <!-- Empty state: shown when no articles are assigned to this group -->
            <p class="members-empty">No articles assigned yet.</p>
          {/if}

          <!-- Invite form: label changed from assessor to member per new design -->
          <GroupInviteForm {groupId} {members} {form} />
        </section>

        <!-- Dropdown: shows article count and list of article titles -->
        <details>
          <summary>
            <span>{articles.length} Article{articles.length !== 1 ? "s" : ""}</span>
            <span class="chevron">
              <DetailsUpIcon />
            </span>
          </summary>
          <div class="members-dropdown-panel">
            <!-- Show assigned articles in dropdown instead of assessors -->
            {#if articles.length > 0}
              <ul class="articles-list">
                {#each articles as article (article.id)}
                  <li class="article-item">
                    <span class="article-title">{article.title}</span>
                  </li>
                {/each}
              </ul>
            {:else}
              <p class="articles-empty">No articles assigned yet.</p>
            {/if}
          </div>
        </details>
      </div>

      <!-- Back face: full member list — unchanged -->
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

  .section-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--grey-700);
  }

  /* Empty state for members section */
  .members-empty {
    margin: 0 0 var(--spacing-lg);
    font-size: 0.875rem;
    color: var(--grey-500);
  }

  /* Article list shown in main section and in dropdown */
  .articles-list {
    margin: 0 0 var(--spacing-lg);
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0;
  }

  .article-item {
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid var(--grey-100);

    &:last-child {
      border-bottom: none;
    }
  }

  /* Truncate long article titles to max 2 lines */
  .article-title {
    color: var(--grey-700);
    font-size: var(--font-size-sm);
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Empty state inside the dropdown panel */
  .articles-empty {
    padding: var(--spacing-md) var(--spacing-lg);
    margin: 0;
    color: var(--grey-500);
    font-size: var(--font-size-sm);
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