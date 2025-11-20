<script>
  export let form;

  // add class to component
  let className = "";
  export { className as class };

  // dynamic data select button to reuse
  export let labelText = "";
  export let selectValues = [];
  export let filterLabel_ID = "";
</script>

<!-- https://github.com/sveltejs/kit/discussions/8499
 voor het sumbitten van een geselecteerde value in een selectbutton -->
<label for="{filterLabel_ID}" class="visually-hidden">{labelText}</label>
  <select id="{filterLabel_ID}" class="filter-button" name="filter">

  {#each selectValues as selectValue}
    <option value={selectValue.value}>{selectValue.text}</option>
  {/each}
</select>

<style>
  select {
    background: none;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    appearance: none;
    width: 7.5rem;

    border-radius: 0.5rem;
    padding: 0.5rem;

    background-color: var(--blue-700);
    color: var(--background-color-secondary);
    font-size: clamp(13px, 1.5vw, 15px);

    background-image: url("/src/lib/assets/svg/select-button-arrow.svg");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1rem;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: var(--blue-500);
    }

    &:focus {
      outline: 2px solid var(--orange-400);
    }
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
