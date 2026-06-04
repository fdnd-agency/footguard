<script>
    // Components
    import QuestionFieldset from "$lib/components/form/QuestionFieldset.svelte";
    import questionIcon from "$lib/assets/svg/round-question-icon.svg";

    let { article, questions } = $props();
</script>

<article class="questions-container">
    <h2 class="h3"><span class="">{article.id} # - </span> {article.title}</h2>

    <figure class="anwsered-questions-count-container">
        <img src="{questionIcon}" alt="" height="25" width="25">
        <p class="h5 answered-questions"><span>0 of 25</span> questions answered</p>
    </figure>

	<form class="questions-form" method="post">
        <div class="questions-scroll-container">
            {#each questions as question (question.id)}
                <QuestionFieldset questionId={question.id} questionName={'question-' + question.id} questionTitle={question.question_title}/>
            {/each}
        </div>

        <div class="buttons-container">
            <button class="form-save-button paragraph" type="button">Save</button>
            <button class="form-submit-button paragraph" type="submit">Submit</button>
        </div>
    </form>
</article>

<style>
  .questions-container {
    height: min(75vh, 800px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--background-color-primary);
    padding: 1rem;
    border-radius: 1rem;
    box-shadow:
      0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.12),
      0 0.125rem 0.25rem hsla(213, 12%, 15%, 0.08);
    border: 1px solid hsla(213, 12%, 15%, 0.06);
    transition: transform 0.3s ease;
    overflow: hidden;
  }

  h2 span,
  .answered-questions span {
    color: var(--grey-500);
  }

  .anwsered-questions-count-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      font-weight: 700;
    }
  }

  .questions-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    flex: 1;
    min-height: 0;

    .questions-scroll-container {
      flex: 1;
      overflow-y: auto;
      gap: 1rem;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
  }

  .buttons-container {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 0.1rem;
    flex-shrink: 0;

    .form-submit-button,
    .form-save-button {
      color: var(--font-color-card);
      padding: 0.5rem;
      border-radius: 1rem;
      width: fit-content;
      white-space: nowrap;
      font-size: clamp(10px, 1.5vw, 16px);
      transition: 0.2s ease-in-out;
      cursor: pointer;
    }

    .form-save-button {
      background-color: var(--blue-600);
    }

    .form-submit-button {
      background-color: var(--green-600);
    }
  }
</style>