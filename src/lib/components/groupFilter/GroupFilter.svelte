<form class="select-wrap" method="GET" action="/groups">
      <select
        name="year"
        aria-label="Select guideline year"
        onchange={(event) => event.currentTarget.form?.requestSubmit()}>
        <option value="" selected disabled hidden>Guidelines</option>
        <option value="2023">Guidelines 2023</option>
        <option value="2027">Guidelines 2027</option>
      </select>
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

    /* Select: custom picker arrow icon */
    select::picker-icon {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='18 15 12 9 6 15'/%3E%3C/svg%3E");
        width: 1rem;
        height: 1rem;
        color: var(--grey-600);
        transform-origin: center;
        transition: transform 220ms ease;
    }

    /* Select: rotate arrow when dropdown is open */
    select:open::picker-icon {
      transform: rotate(180deg);
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
    }

    option:hover,
    option:focus-visible {
        background: var(--grey-50);
  }

    option:checked {
        background: var(--green-100);
        color: var(--green-700);
        font-weight: var(--font-weight-bold);
  }

  /* Select: hide default selected checkmark icon */
    option::checkmark {
        display: none;
    }

</style>