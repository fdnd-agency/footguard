<script>
  // custom variables for reuse
  const { question, questionNumber } = $props()
</script>

<div class="card-container">
  <span>{questionNumber}.</span>
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

    &:hover {
      transform: translateY(-0.1rem);
    }

    span {
      color: var(--font-color-card);
      padding-left: 0.2rem;
    }
  }
</style>
