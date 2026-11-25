<script>
  // custom variables for reuse
  const { questionNumber } = $props()
</script>

<div class="card-container">
  <span>{questionNumber}.</span>
</div>

<style>
    div {
        display: flex;
        align-items: center;
        padding: var(--radius-sm);
        transition: transform 0.3s ease;
        min-height: 4.5rem;

    &:hover {
      transform: translateY(-1.6px);
    }

    span {
      color: var(--font-color-card);
    }
  }
</style>
