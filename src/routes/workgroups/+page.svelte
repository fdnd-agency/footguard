<script>
    let sidebarOpen = false;

    // Components
    import Navbar from "$lib/components/Navbar.svelte";
    import MembersLabel from "$lib/partials/Members-label.svelte";

    // stock images members
    import profileImageJaap from "$lib/assets/img/jaap-image.png";
    import profileImageMatilde from "$lib/assets/img/matilde-image.png";
    import profileImageSicco from "$lib/assets/img/sicco-image.png";
</script>

<div class="main-container">
    <Navbar/>

    <section class="main-container-workgroups">

        <h1 class="main-container-workgroups-title">Members workgroups</h1>

        <section class="members-container">
            <h2 class="members-container-title h4">Workgroup - #1</h2>

            <MembersLabel hrefRoute="/profile"/>

            <article class="member-card">
                <figure class="profile-image-container">
                    <img src="{profileImageSicco}" class="profile-image" height="50" width="70" alt="">
                </figure>

                <h3 class="profile-name paragraph"><a href="/profile">Prof.Dr.Sicco A. Bus</a></h3>
            </article>
        </section>

        <section class="members-container">
            <h2 class="members-container-title h4">Workgroup - #2</h2>

            <article class="member-card">
                <figure class="profile-image-container">
                    <img src="{profileImageMatilde}" class="profile-image" height="50" width="70" alt="">
                </figure>

                <h3 class="profile-name paragraph"><a href="/profile">Anne Rasmussen</a></h3>
            </article>

            <MembersLabel hrefRoute="/profile"/>
        </section>

        <section class="members-container">
            <h2 class="members-container-title h4">Workgroup - #3</h2>

            <MembersLabel hrefRoute="/profile"/>

            <article class="member-card">
                <figure class="profile-image-container">
                    <img src="{profileImageMatilde}" class="profile-image" height="50" width="70" alt="">
                </figure>

                <h3 class="profile-name paragraph"><a href="/profile">Dr. Anne Katharine Trocha</a></h3>
            </article>
        </section>
    </section>
</div>

<style>
    :global(body) {
        background-color: var(--background-color-primary);
    }

    /* .main-container-workgroups {
        height: 95vh;
        overflow: scroll;
  } */

    @media (min-width: 1024px) {
        .main-container {
            display: flex;
        }
    }

    .main-container-workgroups {
        padding: 1rem 1rem 1rem 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .main-container-workgroups-title {
        color: var(--blue-700);
        padding-top: 1rem;
        padding-bottom: 2rem;
    }

    /*-----------*/

    .members-container {
        background-color: hsl(200, 900%, 100%);
        padding: 1rem;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .members-container-title {
        padding-bottom: 0.5rem;
    }

    .member-card {
        transition: background-color 0.2s ease;
        border-radius: 8px;
        width: fit-content;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
        padding-right: 5vw;
    }

    .member-card:hover {
        background-color: var(--blue-100);
    }

    .profile-image-container {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;

        height: 3rem;
        width: 3.5rem;
    }

    .profile-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 0.5rem;
    }

    .profile-name a {
        white-space: nowrap;
        color: var(--blue-700);
    }

    .members-container-title {
        color: var(--blue-700);
    }
</style>
