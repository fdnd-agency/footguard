<script>
  import DetailsUpIcon from "$lib/assets/svg/DetailsUpIcon.svelte";
  import GroupCardHeader from "$lib/components/groups/GroupCardHeader.svelte";
  import GroupInviteForm from "$lib/components/groups/GroupInviteForm.svelte";
  import UserSectionDropdown from "$lib/components/groups/UserSectionDropdown.svelte";
  import avatar from "$lib/assets/img/profile-avatar.webp";
</script>

<article>
  <GroupCardHeader />

  <section class="members-section">
    <h2 class="title">Members</h2>
    <!-- TODO: Replace hardcoded member avatars with dynamic group member data from load/server. -->
    <ul aria-label="Current members preview">
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
      <!-- TODO: Compute this count from dynamic member data once API integration is in place. -->
      <span>2 of 2 members</span>
      <span class="chevron">
        <DetailsUpIcon />
      </span>
    </summary>
    <UserSectionDropdown />
  </details>
</article>

<style>
  article {
    width: min(100%, 24rem);
    border-radius: var(--radius-xl);
    overflow: hidden;
    background: var(--background-color-primary);
    box-shadow: var(--shadow-lg);
    transition: box-shadow var(--transition-slow);
    container-type: inline-size;
    container-name: group-card;
  }

  .members-section {
    padding: var(--spacing-lg);

    ul {
      margin: 0 0 var(--spacing-lg);
      padding: 0;
      list-style: none;
      display: flex;
      gap: var(--spacing-xs);

      li {
        margin-left: 0;
      }

      img {
        width: 3rem;
        height: 3rem;
        border-radius: var(--radius-full);
        border: 2px solid var(--background-color-primary);
        object-fit: cover;
        box-shadow: var(--shadow-sm);
      }
    }
  }

  summary {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    border-top: 1px solid var(--grey-100);
    background: var(--grey-50);
    color: var(--grey-600);
    list-style: none;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }
  }

  .chevron {
    display: inline-flex;
    transition: transform var(--transition-slow);
  }

  details[open] .chevron {
    transform: rotate(180deg);
  }

  @container group-card (min-width: 42rem) {
    .members-section {
      padding: var(--spacing-xl);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    article,
    .chevron {
      transition: none;
    }
  }
</style>
