<script>
  import GroupAboutBanner from "$lib/components/groups/GroupAboutBanner.svelte";
  import GroupCard from "$lib/components/groups/GroupCard.svelte";
  import GroupFilter from "$lib/components/groupFilter/GroupFilter.svelte"

  // `data` is injected by SvelteKit from +page.server.js
  // It contains the groups array fetched from Directus
  export let data;

  // Extract groups safely (fallback to empty array)
  const groups = data.groups ?? [];
  const loadError = data.loadError ?? null;
</script>

<section class="groups-page">
  <h1>Groups</h1>

  <article class="groups-intro">
      <!-- TODO: Move banner content source to directus data fields and remove fallback text. --> 
      <!-- TODO: Replace this placeholder banner with dynamic data from the group data. -->   
    <GroupAboutBanner>
      Manage members, invite users by email, and quickly update group access.
    </GroupAboutBanner>
    <GroupFilter />
    {#if loadError}
  <!-- Error state -->
  <p>Something went wrong while loading groups.</p>

{:else if groups.length === 0}
  <!-- Empty state (VERY IMPORTANT for your situation) -->
  <p>No groups found yet. Directus connection works, but there is no data in the database.</p>

{:else}
  <!-- Success state -->
  <div class="groups-cards">
    {#each groups as group (group.id)}
      <GroupCard
        groupId={group.id}
        name={group.name}
        status={group.status}
        conditionLabel={group.conditionlabel}
        memberCount={group.memberCount}
      />
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
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-lg);
      justify-content: flex-start;
    }
  }

  @container groups-page (min-width: 48rem) {
    .groups-page {
      padding-top: var(--spacing-2xl);
      padding-inline: var(--spacing-xl);
    }
  }
</style>
