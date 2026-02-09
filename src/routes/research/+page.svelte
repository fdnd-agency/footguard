<script>
  // Components
  import GradingArticleCard from "$lib/components/cards/ResearchArticleCard.svelte";
  import Heading from "$lib/components/textual/Heading.svelte";
  import FilterForm from "$lib/components/form/FilterForm.svelte";
  import NoItemsFoundNote from "$lib/components/textual/NoItemsFoundNote.svelte";

  // Sveltekit helpers
  import { fly } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";

  let { data } = $props();

  function updateFilters(event) {
    const { status, theme } = event.detail;

    // https://svelte.dev/docs/kit/$app-navigation#goto
    goto(resolve("?status=" + status + "&theme=" + theme), {
      noscroll: true,
      replaceState: true,
    });
  }
</script>

<section class="main-container-research">
  <Heading
    title="Assigned Gradings"
    subTitle="An overview of all your gradings"
  />
  <FilterForm
    bind:status={data.status}
    bind:theme={data.theme}
    on:change={updateFilters}
  />

  <!-- https://dev.to/a1guy/svelte-motion-theming-guide-transitions-animations-and-dark-mode-explained-4e3h: svelktekit animations -->
  {#if data.cardData.length === 0}
    <NoItemsFoundNote />
  {:else}
    <div class="research-cards-container">
      {#each data.cardData as cardInfo (cardInfo.id)}
        <div transition:fly={{ y: 600, duration: 700 }}>
          <GradingArticleCard
            name={cardInfo.title}
            article_id={cardInfo.id}
            Author={cardInfo.Author}
            Publisher={cardInfo.Publisher}
            publishing_year={new Date(cardInfo.publishing_year).getFullYear()}
            status={cardInfo.status}
            theme={cardInfo.theme}
          />
        </div>
      {/each}
    </div>
  {/if}
</section>

<style>
  .main-container-research {
    max-width: 100rem;
    margin: 0 auto;
    padding: 1rem 1rem 1rem 1rem;
    width: 100%;

    @media (min-width: 720px) {
      padding: 1rem 2rem 1rem 2rem;
    }
  }

  .research-cards-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
