<script>
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import GroupAboutBanner from '$lib/components/groups/GroupAboutBanner.svelte'
  import GroupCard from '$lib/components/groups/GroupCard.svelte'
  import GroupFilter from '$lib/components/groupFilter/GroupFilter.svelte'
  import AddGroupButton from '$lib/components/groups/AddGroupButton.svelte'
  import CreateGroupModal from '$lib/components/groups/CreateGroupModal.svelte'

  /** @type {import('./$types').PageData} */
  let { data, form } = $props()

  // Holds groups created during this session (not yet in server data).
  let extraGroups = $state([])

  // Tracks groups deleted during this session so they disappear without a reload.
  let deletedGroupIds = $state([])

  function handleGroupDeleted(groupId) {
    if (!deletedGroupIds.includes(groupId)) {
      deletedGroupIds = [...deletedGroupIds, groupId]
    }
    extraGroups = extraGroups.filter((g) => g.id !== groupId)
  }

  let showCreateGroupModal = $state(false)

  const createModalOpen = $derived(
    data.isAdmin && (showCreateGroupModal || data.showCreateModal)
  )

  function openCreateModal(event) {
    event?.preventDefault?.()
    showCreateGroupModal = true
    goto(resolve('/groups?create-new-group'), {
      replaceState: true,
      keepFocus: true,
      noScroll: true
    })
  }

  function closeCreateModal() {
    showCreateGroupModal = false
    goto(resolve('/groups'), {
      replaceState: true,
      keepFocus: true,
      noScroll: true
    })
  }

  const groups = $derived(
    [...data.groups, ...extraGroups]
      .filter((g, i, arr) => arr.findIndex((x) => x.id === g.id) === i)
      .filter((g) => !deletedGroupIds.includes(g.id))
  )

  const isLoading = $derived(!data.groups && !data.loadError)

  $effect(() => {
    if (form?.action !== 'createGroup' || !form?.success || !form?.group) return

    const alreadyExists =
      data.groups.some((g) => g.id === form.group.id) ||
      extraGroups.some((g) => g.id === form.group.id)

    if (!alreadyExists) {
      extraGroups = [form.group, ...extraGroups]
    }

    showCreateGroupModal = false
    goto(resolve('/groups'), { replaceState: true, keepFocus: true, noScroll: true })
  })
</script>

<section class="groups-page">
  <h1>Groups</h1>

  <article class="groups-intro">
    <!-- TODO: Move banner content source to directus data fields and remove fallback text. -->
    <!-- TODO: Replace this placeholder banner with dynamic data from the group data. -->
    <GroupAboutBanner>
      Manage members, invite users by email, and quickly update group access.
    </GroupAboutBanner>
    <section class="groups-controls" aria-label="Group filters and actions">
      <GroupFilter />
      {#if data.isAdmin}
        <AddGroupButton onOpen={openCreateModal} />
      {/if}
    </section>
    {#if isLoading}
      <p>Loading groups...</p>
    {:else if data.loadError}
      <p class="groups-status groups-status--error">
        Something went wrong while loading groups.
      </p>
    {:else if groups.length === 0}
      <p class="groups-status">No groups available at the moment. Check back later!</p>
    {:else}
      <div class="groups-cards">
        {#each groups as group (group.id)}
          <GroupCard {group} {form} isAdmin={data.isAdmin} onDeleted={handleGroupDeleted} />
        {/each}
      </div>
    {/if}
  </article>

  {#if data.isAdmin}
    <CreateGroupModal
      open={createModalOpen}
      onClose={closeCreateModal}
      {form}
      memberOptions={data.memberOptions}
    />
  {/if}
</section>

<style>
  .groups-page {
    min-height: 100%;
    display: grid;
    justify-items: stretch;
    gap: var(--spacing-lg);
    padding: var(--spacing-xl) var(--spacing-md);
    container-type: inline-size;
    container-name: groups-page;

    h1 {
      margin: 0;
      text-align: left;
      color: var(--grey-700);
    }

    .groups-intro {
      width: 100%;
      display: grid;
      gap: var(--spacing-md);
    }

    .groups-cards {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--spacing-lg);
      align-items: start;
      justify-items: stretch;
      width: 100%;
    }

    .groups-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-sm);
      width: 100%;
    }

    .groups-status {
      color: var(--grey-500);
      text-align: center;
      padding: var(--spacing-xl) 0;
    }

    .groups-status--error {
      color: var(--red-500);
    }
  }

  @container groups-page (min-width: 60rem) {
    .groups-page {
      padding-top: var(--spacing-2xl);
      padding-inline: var(--spacing-xl);
    }
  }

  @media (min-width: 48rem) {
    .groups-page .groups-cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 75rem) {
    .groups-page .groups-cards {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
