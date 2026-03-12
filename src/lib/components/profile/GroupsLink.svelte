<script>
  import { resolve } from '$app/paths'
</script>

<a href={resolve('/groups')}>Groups</a>

<style>
  a {
    display: block;
    width: fit-content;
    margin-inline: auto;
    padding: var(--spacing-sm) var(--spacing-xl);
    border-radius: var(--radius-full);
    background: var(--orange-400);
    color: var(--background-color-primary);
    text-align: center;
  
    &:focus-visible {
      outline: 3px solid var(--blue-500);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }
  }
</style>
