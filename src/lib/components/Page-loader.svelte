<script>
    import { gsap } from "gsap";
    import { onMount } from "svelte";
    import logo from "../assets/img/footguard-icon.webp";

    // The whole loader container
    let mainContainer;

    // De footguard logo element
    let logoFootGuard;

    // Used sources: https://github.com/fdnd-agency/footguard/issues/155#issue-3702085279 

    onMount(() => {
        gsap.set(mainContainer, { opacity: 1 });
        gsap.fromTo(
            logoFootGuard,
            { scale: 1, opacity: 1 },
            {
                scale: 5,
                duration: 1.8,
                ease: "power1.out",
                repeat: -1,
                yoyo: true,
            },
        );

        setTimeout(() => {
            gsap.to(mainContainer, {
                opacity: 0,
                duration: 0.5,
                pointerEvents: "none",
            });
        }, 2000);
    });
</script>

<figure class="loader" bind:this={mainContainer}>
    <img bind:this={logoFootGuard} src={logo} alt="Footguard logo" height="70" width="85">
</figure>

<style>
    .loader {
        position: fixed;
        inset: 0;
        background-color: rgb(0, 0, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000000;
        pointer-events: auto;
    }



    
</style>
