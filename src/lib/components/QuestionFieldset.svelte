<script>
    // custom variables for reuse
    const { questionId, questionName, questionTitle } = $props()
    
</script>

<fieldset class="form-item">
    <legend class="visually-hidden"><span class="question-id">{questionId} # - </span> {questionTitle}</legend>
    <h3 class="question-title h5"><span class="question-id">{questionId} # - </span> {questionTitle}</h3>

    <div class="radio-buttons">
        <label  class="question-label paragraph">
            <input type="radio" name={questionName} value="Yes" required>
            Yes (+)
        </label>

        <label class="question-label paragraph">
            <input type="radio" name={questionName} value="No">
            No (-)
        </label>

        <label  class="question-label paragraph">
            <input type="radio" name={questionName} value="Unclear">
            Unclear (?)
        </label>
    </div>

    <details>
        <summary class="paragraph">Add a note...</summary>
            <textarea class="paragraph" rows="3" cols="10" placeholder="Notes..."></textarea>
    </details>
</fieldset>

<style>
   fieldset {
        border: none;
        padding: 0;
        margin: 0;
    }

    .form-item {
        display: flex;
        flex-direction: column;
        gap: 1rem;
		background-color: var(--grey-100);
        padding: 1rem;
        border-radius: 1rem;
    }

    h2 .question-id {
        color: var(--grey-300);
    }

    /* for hiding legend */
    .visually-hidden {
        position: absolute;
        left: -9999em;
    }

    .question-title {
        color: var(--blue-700);
        font-weight: 400;
        background-color: var(--blue-100);
        padding: 0.6rem;
        border-radius: 1rem;
    }

    textarea {
        resize: none;
        border-radius: 1rem;
        padding: 0.6rem;
        border: 1.5px solid var(--blue-300);
        margin-top: 0.5rem;
    }

    .question-label {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        color: var(--blue-700);
        cursor: pointer;
        padding-left: 0.5rem;
        padding: 0.5rem;
    }

    .question-label:hover {
        color: var(--main-text-color-light);
        border-radius: 1rem;
        background-color: var(--grey-200);
        padding: 0.5rem;
    }

    .radio-buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
        background-color: var(--blue-100);
        padding: 0.5rem;
        border-radius: 1rem;
    }

    .radio-buttons input[type="radio"] {
        accent-color: var(--orange-700);
        height: 15px;
        width: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .radio-buttons label:has(input[type="radio"]:checked) {
        color: var(--main-text-color-light);
        border-radius: 1rem;
        background-color: var(--orange-400);
        padding: 0.5rem;
    }

     details textarea {
        width: 100%;
    }

    details > summary {
        list-style: none;
        cursor: pointer;
        color: var(--blue-700);
    }

    details summary {
        padding: 0.6rem;
        background-color: var(--orange-100);
        border-radius: 1rem;

        &:hover {
            background-color: var(--orange-400);
            color: var(--main-text-color-light);
        }
    }
</style>
