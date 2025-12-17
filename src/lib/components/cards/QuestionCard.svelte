<script>
    // custom variables for reuse
    const { questionAnswer, question, questionIcon, questionNumber, color } = $props();
</script>

<div class="card-container" style="background-color: {color};">
    <figure>
        <img src={questionIcon} alt="" height="22" width="22" />
    </figure>

    <p class="paragraph">{question}</p>

    <span>{questionNumber}</span>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        border-radius: 0.6rem;
        padding: 0.5rem;
    }

    figure {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        justify-content: center;
        align-items: center;
        width: fit-content;

        figcaption {
            justify-self: center;
            font-size: clamp(9px, 1.9vw, 10px);
        }

        img {
            align-self: center;
        }
    }

    p {
        font-size: clamp(11px, 2vw, 12px);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: var(--font-color-card);
    }

    span {
        margin-left: auto;
        color: var(--font-color-card);
    }
</style>
