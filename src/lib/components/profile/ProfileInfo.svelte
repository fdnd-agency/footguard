<script>
  import { resolve } from '$app/paths'
  let { user } = $props();
  const role = user?.role;
  const roleText = Array.isArray(role) ? role.join(", ") : (role ?? "Unknown");
</script>

<section>
  <h2>General Information</h2>
  <p>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
    of type and scrambled it to make a type specimen book.
  </p>

  <form class="info-grid" aria-label="Profile details">
    <label for="info-role">
      <span>Role</span>
      <input id="info-role" type="text" readonly value={roleText} />
    </label>
    <label for="info-institution">
      <span>Institution</span>
      <input id="info-institution" type="text" readonly value={user?.institute ?? "Unknown"} />
    </label>
    <label for="info-profession">
      <span>Profession</span>
      <input id="info-profession" type="text" readonly value={user?.profession ?? "Unknown"} />
    </label>
    <label for="info-email">
      <span>Email</span>
      <input id="info-email" type="text" readonly value={user?.email ?? "Unknown"} />
    </label>
  </form>

  <a href={resolve('/')}>Groups</a>

</section>

<style>
  section {
    padding: 0 var(--spacing-md) var(--spacing-xl);

    h2 {
      color: var(--blue-700);
      margin-bottom: var(--spacing-md);
    }

    p {
      color: var(--grey-400);
      line-height: 1.7;
      margin-bottom: var(--spacing-lg);
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: var(--spacing-md);
      margin-bottom: var(--spacing-xl);
      margin-top: var(--spacing-xl);

      label {
        display: grid;
        gap: var(--spacing-xs);
      }

      span {
        color: var(--grey-300);
      }

      input {
        color: var(--blue-600);
        border: 1px solid var(--grey-200);
        border-radius: var(--radius-sm);
        background: var(--grey-50);
        padding: var(--spacing-sm);
      }

      input:focus-visible {
        outline: 3px solid var(--blue-500);
        outline-offset: 2px;
      }
    }

    a {
      display: block;
      width: fit-content;
      margin-inline: auto;
      padding: var(--spacing-sm) var(--spacing-xl);
      border-radius: var(--radius-full);
      background: var(--orange-400);
      color: var(--background-color-primary);
      text-align: center;
    }

    a:focus-visible {
      outline: 3px solid var(--blue-500);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }
  }

  @container profile-card (min-width: 42rem) {
    section {
      padding: 0 var(--spacing-lg) var(--spacing-2xl);

      .info-grid {
        grid-template-columns: 1fr 1fr;
        column-gap: var(--spacing-lg);
        row-gap: var(--spacing-lg);
      }
    }
  }
</style>
