<script>
  const { data } = $props()
</script>

<main class="confirm-page">
  <form method="POST">
    <input type="hidden" name="token" value={data.token} />
    <button class="button" type="submit">Sign in to IWGDF</button>
  </form>
</main>

<style>
  .confirm-page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
  }

  .button {
    padding: 1rem 2.5rem;
    border-radius: 14px;
    border: none;
    background: var(--blue-500);
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.2);
  }

  .button:hover {
    opacity: 0.9;
  }
</style>