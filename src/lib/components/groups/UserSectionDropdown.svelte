<script>
  import avatar from '$lib/assets/img/profile-avatar.webp';
</script>

<section>
  <!-- TODO: Replace this static member list with dynamic data from the group members. -->
  <ul >
    <li>
      <img src={avatar} alt="User 1 name" />
      <span>User 1 name</span>
      <form method="POST" action="?/remove">
        <input type="hidden" name="memberId" value="1" />
        <button type="submit">Remove</button>
      </form>
    </li>
    <li>
      <img src={avatar} alt="User 2 name" />
      <span>User 2 name</span>
      <form method="POST" action="?/remove">
        <input type="hidden" name="memberId" value="2" />
        <button type="submit">Remove</button>
      </form>
    </li>
  </ul>
</section>

<style>
  section {
    container-type: inline-size;
    container-name: members-dropdown;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: var(--spacing-sm);

      li {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
        width: 100%;
      }
    }

    img {
      width: 2rem;
      height: 2rem;
      border-radius: var(--radius-full);
      object-fit: cover;
    }

    span {
      color: var(--grey-700);
      text-align: left;
    }

    button {
      border: 0;
      background: transparent;
      color: var(--red-500);
      justify-self: end;
    }
  }

  @container members-dropdown (min-width: 42rem) {
    section {
      ul {
        li {
          gap: var(--spacing-md);
        }
      }
    }
  }
</style>
