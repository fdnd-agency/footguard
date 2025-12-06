<script>
    import { gsap } from "gsap";
    import { onMount } from "svelte";
    import logo from "../assets/img/footguard-icon.webp";
    import LogoCode from "$lib/assets/svg/logo-code.svelte";

    // The whole loader container
    // De footguard logo element
    // The svg component element
    let{ mainContainer, logoFootGuard, svgElement } = $props();

    // Used sources: https://github.com/fdnd-agency/footguard/issues/155#issue-3702085279 

  onMount(() => {
    gsap.set(mainContainer, { opacity: 1 });
    gsap.fromTo(
      svgElement,
      { scale: 1, opacity: 1 },
      {
        scale: 1.6,
        duration: 2,
        ease: "power1.out",
        repeat: -1,
        yoyo: true
      }
    );

    
    setTimeout(() => {
      gsap.to(mainContainer, {
        opacity: 0,
        duration: 0.8,
        pointerEvents: "none"
      });
    }, 2000);
  });
</script>


<figure class="loader" bind:this={mainContainer}>
    <!-- <img bind:this={logoFootGuard} src={logo} alt="Footguard logo" height="70" width="85"> -->
    <LogoCode bind:svgElement />
</figure>

<style>
    .loader {
        position: fixed;
        inset: 0;
        background-color: var(--grey-700);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000000;
        pointer-events: auto;
    }



    
</style>
