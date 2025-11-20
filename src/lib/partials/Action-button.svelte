<script>
  // for custom button text
  export let buttonContent = "buttontext";
  // for custom href route
  export let hrefRoute = "/";

  // add class to component
  let className = "";
  export { className as class };
</script>

<a href={hrefRoute} class="action-button paragraph {className}">{buttonContent}</a>

<style>
  .action-button {
    background-color: var(--blue-700);
    color: var(--main-text-color-light);
    padding: 0.5rem;
    border-radius: 1rem;
    width: fit-content;
    white-space: nowrap;
    font-size: clamp(10px, 1.5vw, 16px);
    transition: 0.2s ease-in-out;

    & .action-button:hover {
      background-color: var(--blue-500);

      & .action-button:focus {
        outline: 2px solid var(--orange-400);
      }
    }
  }
</style>
