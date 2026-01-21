<script>
    // custom variables for reuse
    const { questionAnswer, question, questionIcon, questionNumber, color } = $props();
</script>

<div class="card-container" style="background-color: {color};">
    <span>{questionNumber}.</span>
    <p class="paragraph">{question}</p>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        border-radius: 0.6rem;
        padding: 0.5rem;
        transition: transform 0.3s ease;
        min-height: 4.5rem;
        background-color: var(--grey-700);

        &:hover {
            transform: translateY(-0.1rem);
        }

        span {
            color: var(--font-color-card);
            padding-left: 0.2rem;
        }

        p {
            font-size: clamp(11px, 2vw, 12px);
            color: var(--font-color-card);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: auto;

            @media (min-width: 920px) {
                -webkit-line-clamp: 3;
                -webkit-box-orient: normal;
                overflow: scroll;
            }
        }
    }
</style>
