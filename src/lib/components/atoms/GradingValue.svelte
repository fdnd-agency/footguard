<script>
  let { value, color } = $props()
</script>

<div class="wrapper"><p class="paragraph" style="background-color:{color};">{value}</p></div>

<style>
  .wrapper {
    container-type: inline-size;
    container-name: valueCell;
  }

  p {
    border-radius: var(--radius-sm);
    color: var(--grey-100);
    
  }

  @container valueCell (min-width: 80px) {
    p {
        width: 5rem;
    }
  }
</style>
