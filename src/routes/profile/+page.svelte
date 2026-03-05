<script>
  import ProfileHero from "$lib/components/profile/ProfileHero.svelte";
  import ProfileInfo from "$lib/components/profile/ProfileInfo.svelte";
  let { data } = $props();
</script>



<section class="profile-page">
  <h1 class="profile-title">Profile</h1>

  <article class="profile-card">
    <ProfileHero {user} />
    <ProfileInfo {user} />
  </article>
</section>

<style>
  .profile-page {
    min-height: 100vh;
    background: var(--grey-100);
    padding: var(--spacing-lg) var(--spacing-md) var(--spacing-2xl);

    .profile-title {
      color: var(--blue-700);
      margin-bottom: var(--spacing-md);
    }

    .profile-card {
      background: var(--background-color-primary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      container-type: inline-size;
      container-name: profile-card;
    }
  }

  @media (min-width: 42rem) {
    .profile-page {
      padding: var(--spacing-xl);

      .profile-card {
        max-width: 100%;
        margin-inline: auto;
      }
    }
  }
</style>
