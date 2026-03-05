<script>
  let { user } = $props();
  const profileName = user?.name ?? "Unknown user";
  const profession = user?.profession ?? "Unknown profession";
  const avatarSrc = user?.photo
    ? `https://fdnd-agency.directus.app/assets/${user.photo}`
    : "https://placehold.co/112x112";
</script>

<section class="profile-hero">
  <img class="profile-avatar" src={avatarSrc} alt={`Avatar of ${profileName}`} />
  <div class="profile-info">
    <h2>{profileName}</h2>
    <p>{profession}</p>
  </div>
</section>

<style>
  .profile-hero {
    display: grid;
    justify-items: center;
    padding: 0 0 var(--spacing-lg);

    &::before {
      content: "";
      width: 100%;
      min-height: 8.5rem;
      background: var(--blue-500);
      border-radius: 0;
      grid-column: 1;
      grid-row: 1;
    }

    .profile-avatar {
      width: 6rem;
      height: 6rem;
      border-radius: var(--radius-full);
      border: 3px solid var(--background-color-primary);
      background: linear-gradient(145deg, var(--green-200), var(--blue-300));
      color: var(--background-color-primary);
      display: grid;
      place-items: center;
      box-shadow: var(--shadow-sm);
      grid-column: 1;
      grid-row: 1;
      align-self: end;
      transform: translateY(50%);
    }

    .profile-info {
      margin-top: 3.5rem;
      text-align: center;
      padding-inline: var(--spacing-md);

      h2 {
        color: var(--blue-700);
      }

      p {
        margin-top: 0.3rem;
        color: var(--grey-400);
      }
    }
  }

  @container profile-card (min-width: 42rem) {
    .profile-hero {
      padding: 0 0 var(--spacing-xl);

      &::before {
        min-height: 10rem;
        border-radius: 0;
      }

      .profile-avatar {
        width: 7rem;
        height: 7rem;
      }

      .profile-info {
        margin-top: 4rem;
        padding-inline: var(--spacing-lg);
      }
    }
  }
</style>
