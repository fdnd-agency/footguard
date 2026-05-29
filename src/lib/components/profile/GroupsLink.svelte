<script>
  import { resolve } from '$app/paths'
</script>

<a href={resolve('/groups')}>Groups</a>

<style>
  a {
    display: block;
    width: max-content;
    margin: 0 auto var(--spacing-xl);
    padding: var(--spacing-sm) var(--spacing-xl);
    border-radius: var(--radius-full);
    background: var(--orange-400);
    color: var(--background-color-primary);
    text-align: center;
    text-decoration: none;
  
    &:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }
  }
</style>
