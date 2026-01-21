<script>
    import questionIcon from "$lib/assets/svg/round-question-icon.svg";
    import question from "$lib/assets/svg/question.svg";
    import plus from "$lib/assets/svg/plus-icon.svg";
    import minus from "$lib/assets/svg/minus-icon.svg";

    // Components
    import QuestionFieldset from "$lib/components/form/QuestionFieldset.svelte";
    import Heading from "$lib/components/textual/Heading.svelte";
    import QuestionCard from "$lib/components/cards/QuestionCard.svelte";
    import QuestionsForm from "$lib/components/form/QuestionsForm.svelte";
    import GradingValue from "../textual/GradingValue.svelte";

    let { questions } = $props();
</script>

<div class="assessment-table-container">
    <table class="assessment-table">
        <thead>
            <tr>
                <th class="paragraph">Question</th>
                <th class="paragraph">Assessor 1</th>
                <th class="paragraph">Assessor 2</th>
            </tr>
        </thead>
        <tbody>
            {#each questions as question}
                <tr>
                    <td class="question-cell">
                        <QuestionCard
                            question={question.question_title}
                            questionIcon={minus}
                            questionNumber={question.id}
                        />
                    </td>
                    <td class="assessor-cell paragraph">
                        <GradingValue value="No" color="var(--red-600)"/>                    
                    </td>
                    <td class="assessor-cell paragraph">
                        <GradingValue value="Yes" color="var(--green-700)"/>                    
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .assessment-table-container {
        height: 75vh;
        background: var(--background-color-primary);
        padding: 1rem;
        border-radius: 1rem;
        box-shadow:
            0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.12),
            0 0.125rem 0.25rem hsla(213, 12%, 15%, 0.08);
        border: 1px solid hsla(213, 12%, 15%, 0.06);
        transition: transform 0.3s ease;
        overflow-y: auto;
    }

    .assessment-table {
        width: 100%;
        border-spacing: 0 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        background-color: var(--background-color-primary);

        & th,
        td {
            padding: 1rem;
            vertical-align: middle;
        }
    }

    .assessment-table thead th {
        background-color: var(--background-color-primary);
        text-align: left;
        font-weight: 500;
        border-bottom: 2px solid var(--grey-200);
    }

    tbody tr {
        background-color: var(--background-color-primary);
        transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;

        &:hover {
            transform: translateY(-0.2rem);
        }
    }

    .question-cell {
        width: 68%;
    }

    .assessor-cell {
        width: 17.5%;
        text-align: center;
        font-weight: 300;
        color: var(--grey-700);
    }

    tbody tr:nth-child(even) {
        background-color: var(--grey-100);
    }
</style>
