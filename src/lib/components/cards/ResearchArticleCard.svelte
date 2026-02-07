<script>
  // components
  import InProgressLabel from "$lib/components/textual/InProgressLabel.svelte";
  import FinishedLabel from "$lib/components/textual/FinishedLabel.svelte";
  import NotStartedLabel from "$lib/components/textual/NotStartedLabel.svelte";
  import ThemeLabel from "$lib/components/textual/ThemeLabel.svelte";

  // icons
  import authorIcon from "$lib/assets/svg/author-icon.svg";
  import calenderIcon from "$lib/assets/svg/calendar-icon.svg";

  // Dynamic data variables
  let {
    name,
    article_id,
    Publisher,
    publishing_year,
    status,
    className,
    theme,
    Author,
  } = $props();
</script>

<a class="anchor-container-card" href="/research/{article_id}">
  <article class="research-card">
    <div class="research-card-data-container">
      <h2 class="research-card-title h4">
        <span class="research-id">{article_id} # -</span>
        {name}
      </h2>

      <div class="research-card-author-date-container">
        <figure class="author-container">
          <img
            src={authorIcon}
            class="author-icon"
            alt="Author icon"
            height="15"
            width="15"
          />
          <figcaption class="author-name">{Author} — {Publisher}</figcaption>
        </figure>

        <figure class="calender-container">
          <img
            src={calenderIcon}
            class="calender-icon"
            alt=""
            height="15"
            width="15"
          />
          <time class="calender-date">{publishing_year}</time>
        </figure>
      </div>

      <div class="action-container">
        {#if status === "Not started"}
          <NotStartedLabel />
        {:else if status === "In progress"}
          <InProgressLabel />
        {:else if status === "Finished"}
          <FinishedLabel />
        {/if}

        <ThemeLabel themeName={theme} />
      </div>
    </div>
  </article>
</a>

<style>
  .anchor-container-card:focus .research-card,
  .anchor-container-card:focus-visible .research-card {
    outline: 1px solid var(--grey-700);
  }

  .research-card {
    padding: 1rem;
    border-radius: 1rem;
    background: var(--background-color-primary);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    box-shadow:
      0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.12),
      0 0.125rem 0.25rem hsla(213, 12%, 15%, 0.08);
    border: 1px solid hsla(213, 12%, 15%, 0.06);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }

    @media (min-width: 700px) {
      flex-direction: row;
      align-items: center;
    }
  }

  .research-card-data-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    & .research-card-title {
      font-weight: bold;
      color: var(--grey-700);

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    & h2 .research-id {
      color: var(--grey-500);
    }
  }

  .research-card-author-date-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    & .author-container,
    .calender-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.2rem;
      justify-content: center;
      text-align: center;
    }

    & .author-name,
    .calender-date {
      font-size: clamp(10px, 1.5vw, 12px);
      color: var(--grey-700);
    }
  }

  .action-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
</style>
