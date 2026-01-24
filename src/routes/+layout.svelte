<script>
  import "$lib/css/styleguide.css";
  import { Navbar, MobileNav } from "$lib/";
  import { isCollapsed } from "$lib/stores/sidebar.js";
  import { PageLoader } from "$lib";
  import { onMount } from "svelte";

  let { children } = $props();

  let isMobile = $state(false);

  if (typeof window !== "undefined") {
    const check = () => (isMobile = window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
  }

  // Verwijder #main-content uit URL na gebruik skip-link 
  onMount(() => {
    if (window.location.hash === "#main-content") {
      // Wacht even zodat de focus correct wordt gezet
      setTimeout(() => {
        history.replaceState(null, "", window.location.pathname);
      }, 100);
    }
  });
</script>

<PageLoader />

<!-- Skip-link als allereerste element -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<div class="app-layout">
  {#if isMobile}
    <MobileNav />
  {:else}
    <Navbar />
  {/if}

  <!-- tabindex="-1" maakt het element focusbaar voor de skip-link -->
  <main
    id="main-content"
    tabindex="-1"
    class="page-content"
    class:collapsed={$isCollapsed}
  >
    {@render children?.()}
  </main>
</div>

<style>
  /* Skip link - alleen zichtbaar bij keyboard focus */
  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    z-index: 10000;
    background: var(--orange-400);
    color: var(--background-color-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    box-shadow: 0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.15);
    transition: all 0.2s ease;
  }

  .skip-link:focus {
    top: 1rem;
    outline: 3px solid var(--blue-500);
    outline-offset: 2px;
  }

  .skip-link:hover {
    background: var(--blue-400);
  }

  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Main page content */
  .page-content {
    padding: 0;
    @media (min-width: 769px) {
      margin-left: 240px;
      margin-top: 0;

      &.collapsed {
        margin-left: 80px;
      }
    }

    @media (max-width: 768px) {
      margin-top: 80px;
      margin-left: 0;
    }
  }
</style>
