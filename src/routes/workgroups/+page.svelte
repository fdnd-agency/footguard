<script>
    let sidebarOpen = false;

    // Components
    import Navbar from "$lib/components/Navbar.svelte";
    import MembersLabel from "$lib/partials/Members-label.svelte";
    import WorkgroupCard from "$lib/components/Workgroup-card.svelte";

    // stock images members
    import profileImageJaap from "$lib/assets/img/jaap-image.webp";
    import profileImageMatilde from "$lib/assets/img/matilde-image.webp";
    import profileImageSicco from "$lib/assets/img/sicco-image.webp";
</script>

<div class="main-container">
    <Navbar/>

    <section class="main-container-workgroups">
        <h1 class="main-container-workgroups-title">Members workgroups</h1>
        <WorkgroupCard groupNumber="Workgroup - #1"/>
        <WorkgroupCard groupNumber="Workgroup - #2"/>
        <WorkgroupCard groupNumber="Workgroup - #3"/>
    </section>
</div>

<style>
    :global(body) {
        background-color: var(--background-color-primary);
    }

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
</style>
