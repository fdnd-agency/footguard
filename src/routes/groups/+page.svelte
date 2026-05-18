<script>
  import GroupAboutBanner from "$lib/components/groups/GroupAboutBanner.svelte";
  import GroupCard from "$lib/components/groups/GroupCard.svelte";
  import GroupFilter from "$lib/components/groupFilter/GroupFilter.svelte";
  import AddGroupButton from "$lib/components/groups/AddGroupButton.svelte";

  // `data` is injected by SvelteKit from +page.server.js
  // It contains the groups array fetched from Directus
  export let data;
  export let form;

  // Extract groups safely (fallback to empty array)
  // Reactive statement: automatically updates `groups` whenever `data.groups` changes.
  // Uses a fallback empty array to prevent errors when no data is available yet.
  $: groups = data.groups ?? [];
  $: loadError = data.loadError ?? null;

  // Loading state is true until groups or an error value is available
  $: isLoading = !data?.groups && !data?.loadError;
</script>

<section class="groups-page">
  <h1>Groups</h1>

  <article class="groups-intro">
      <!-- TODO: Move banner content source to directus data fields and remove fallback text. --> 
      <!-- TODO: Replace this placeholder banner with dynamic data from the group data. -->   
    <GroupAboutBanner>
      Manage members, invite users by email, and quickly update group access.
    </GroupAboutBanner>
    <div class="groups-controls">
      <GroupFilter />
      <AddGroupButton href="/groups/new" />
    </div>
  {#if isLoading}
  <!-- Loading state -->
  <p>Loading groups...</p>

{:else if loadError}
  <!-- Error state -->
  <p class="groups-status groups-status--error">Something went wrong while loading groups.</p>

{:else if groups.length === 0}
      <!-- Empty state -->
      <p class="groups-status">No groups available at the moment. Check back later!</p>

{:else}
  <!-- Success state -->
  <div class="groups-cards">
    {#each groups as group (group.id)}
      <GroupCard {group} {form} />
    {/each}
  </div>
{/if}
  </article>
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
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
      align-items: start;
    }

    .groups-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .groups-status {
      color: var(--grey-500);
      text-align: center;
      padding: var(--spacing-xl) 0;
    }

    .groups-status--error {
      color: var(--color-danger, #dc2626);
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
