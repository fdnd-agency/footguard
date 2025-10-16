<script>

    let form;

	  // add class to component
    let className = '';
    export { className as class };

</script>


<!-- https://github.com/sveltejs/kit/discussions/8499
 voor het sumbitten van een geselecteerde value in een selectbutton -->
<form  class="{className}" method="get" bind:this={form}>
<label for="filter-select" class="visually-hidden">Filter status</label>
  <select id="filter-select" class="filter-button" name="filter" on:change={() => form.requestSubmit()}>
    <option value="nofilter">No filter</option>
    <option value="inprogress">In progress</option>
    <option value="finished">Finished</option>
    <option value="notstarted">Not started</option>
  </select>
</form>

<style>
    select {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        appearance: none;
        width: 7.5rem;

        border: 1px solid black;
        border-radius: 0.5rem;
        padding: 0.5rem;

        background-color: var(--blue-700);
        color: var(--main-text-color-light);
        font-size: clamp(13px, 1.5vw, 15px);

        background-image: url('/src/lib/assets/svg/select-button-arrow.svg');
        background-repeat: no-repeat;
        background-position: right 0.5rem center;
        background-size: 1rem;
    }


.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
