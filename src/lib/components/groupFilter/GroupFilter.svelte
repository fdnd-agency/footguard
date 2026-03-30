<script>
  import DetailsUpIcon from "$lib/assets/svg/DetailsUpIcon.svelte";
</script>

<form class="select-wrap" method="GET" action="/groups">
      <select
        name="year"
        aria-label="Select guideline year"
        onchange={(event) => event.currentTarget.form?.requestSubmit()}>
        <option value="" selected disabled hidden>Guidelines</option>
        <option value="2023">Guidelines 2023</option>
        <option value="2027">Guidelines 2027</option>
      </select>
      <span class="chevron" aria-hidden="true">
        <DetailsUpIcon />
      </span>
</form>

<style>
    .select-wrap {
        width: min(100%, 20rem);
        position: relative;
        display: inline-flex;
        align-items: center;
    }

    /* Select: field styles */
    select {
        width: 100%;
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-md);
        color: var(--grey-700);
        font-size: var(--font-size-base);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.10);
    }

    /* Select: enable customizable picker UI */
    select,
    ::picker(select) {
        appearance: base-select;
    }

    /* Select: hide native picker icon (we render shared icon in markup) */
    select::picker-icon {
      display: none;
    }

    .chevron {
      position: absolute;
      right: var(--spacing-sm);
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      color: var(--grey-600);
      pointer-events: none;
      transition: transform 220ms ease;
    }

    /* Select: rotate arrow when dropdown is open */
    .select-wrap:has(select:open) .chevron {
      transform: translateY(-50%) rotate(180deg);
    }

    @media (prefers-reduced-motion: reduce) {
      .chevron {
        transition: none;
      }
    }

    /* Keep text clear from custom chevron */
    select {
      padding-right: calc(var(--spacing-sm) * 2 + 1rem);
    }

    /* Select: dropdown panel styles */
    ::picker(select) {
        border: none;
        border-radius: var(--radius-md);
        background: var(--background-color-primary);
        box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.12);
        margin-top: var(--spacing-xxs);
        padding: var(--spacing-xxs);
    }

    /* Select: option styles to match field */
  option {
    border: none;
    border-radius: var(--radius-sm);
    color: var(--grey-700);
    background: var(--background-color-primary);
    padding: var(--spacing-xs) var(--spacing-sm);

    &:hover,
    &:focus-visible {
      background: var(--grey-50);
    }

    &:checked {
      background: var(--green-100);
      color: var(--green-700);
      font-weight: var(--font-weight-bold);
    }

  /* Select: hide default selected checkmark icon */
    &::checkmark {
      display: none;
    }
}


</style>
