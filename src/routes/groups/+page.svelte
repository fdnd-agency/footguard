<script>
  import GroupAboutBanner from "$lib/components/groups/GroupAboutBanner.svelte";
  import GroupCard from "$lib/components/groups/GroupCard.svelte";
</script>

<section class="groups-page">
  <h1>Groups</h1>

  <article class="groups-intro">
    <GroupAboutBanner>
      Manage members, invite users by email, and quickly update group access.
    </GroupAboutBanner>
    <div class="groups-cards">
      <GroupCard />
    </div>
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
