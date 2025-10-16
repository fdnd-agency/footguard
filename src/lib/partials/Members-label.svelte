<script>

    // stock images members
    import profileImageJaap from "$lib/assets/img/jaap-image.png";
    import profileImageMatilde from "$lib/assets/img/matilde-image.png";
    import profileImageSicco from "$lib/assets/img/sicco-image.png";


    // for custom button text
	export let profileImage = profileImageJaap;

	// for custom href route
	export let hrefRoute = "/";

	// add class to component
	let className = "";
	export { className as class };

</script>


<article class="member-card {className}">
    <figure class="profile-image-container">
        <img src="{profileImage}" class="profile-image" height="50" width="70" alt="">
    </figure>

    <h3 class="profile-name paragraph"><a href="{hrefRoute}">Dr.Jaap J van Netten</a></h3>
</article>

            
<style>
    :global(body) {
        background-color: var(--background-color-primary);
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

</style>
