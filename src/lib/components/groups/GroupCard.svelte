<script>
  import DetailsUpIcon from "$lib/assets/svg/DetailsUpIcon.svelte";
  import GroupCardHeader from "$lib/components/groups/GroupCardHeader.svelte";
  import GroupInviteForm from "$lib/components/groups/GroupInviteForm.svelte";
  import UserSectionDropdown from "$lib/components/groups/UserSectionDropdown.svelte";
  import avatar from "$lib/assets/img/profile-avatar.webp";
</script>

<article>
  <GroupCardHeader />

  <section>
    <p>Members</p>
    <ul aria-label="Current members">
      <li>
        <img src={avatar} alt="User 1 name" />
      </li>
      <li>
        <img src={avatar} alt="User 2 name" />
      </li>
    </ul>
    <GroupInviteForm />
  </section>

  <details>
    <summary>
      <span>2 of 2 members</span>
      <DetailsUpIcon />
    </summary>
    <UserSectionDropdown />
  </details>
</article>
