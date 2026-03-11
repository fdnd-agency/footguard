<script>
  import avatar from '$lib/assets/img/profile-avatar.webp';
</script>

<section aria-label="Group members details">
  <ul>
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
