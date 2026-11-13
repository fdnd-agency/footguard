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
    margin: 0.7rem;
    border-radius: 0.5rem;
    color: var(--grey-100);
    width: 3rem;
  }

  @container valueCell (min-width: 80px) {
    p {
        width: 5rem;
    }
  }
</style>
