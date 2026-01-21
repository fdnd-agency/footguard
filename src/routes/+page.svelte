<script>
  // https://kit.svelte.dev/docs/load#page-data
  // Data komt van +page.server.js via export let data
  export let data;

  // Components - Alle UI logica zit in deze componenten
  import DashboardHeader from "$lib/components/dashboard/DashboardHeader.svelte";
  import StatsSection from "$lib/components/dashboard/StatsSection.svelte";
  import ContinueGradingSection from "$lib/components/dashboard/ContinueGradingSection.svelte";
  import BottomSection from "$lib/components/dashboard/BottomSection.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import CustomCursor from "$lib/components/CustomCursor.svelte";

  // Custom cursor state - shared tussen header en cursor component
  // https://svelte.dev/docs/svelte-components#script-2-assignments-are-reactive
  let cursorActive = false;
</script>

<!-- Skip to main content link voor keyboard navigation accessibility -->
<!-- https://webaim.org/techniques/skipnav/ -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Main dashboard layout -->
<div class="dashboard">
  <!-- Main content wrapper met semantic HTML -->
  <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main -->
  <main class="content" id="main-content">
    <!-- Header component: Welcome message, search, cursor toggle -->
    <DashboardHeader user={data.currentUser} bind:cursorActive />

    <!-- Stats component: Total papers, graded, not started, finalized -->
    <StatsSection articles={data.articles} />

    <!-- Continue grading component: In-progress papers met deadlines -->
    <ContinueGradingSection articles={data.articles} />

    <!-- Bottom section component: Progress chart + Comparison list -->
    <BottomSection articles={data.articles} />
  </main>

  <!-- Custom cursor overlay (alleen actief als cursorActive = true) -->
  <CustomCursor active={cursorActive} />
</div>

<!-- Footer: Logo, credits, copyright -->
<Footer />

<!-- Progressive Enhancement fallback voor browsers zonder JavaScript -->
<!-- https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement -->
<noscript>
  <style>
    /* Verberg JS-only features als JavaScript uit staat */
    .js-only {
      display: none !important;
    }
  </style>
</noscript>

<style>
  /* Skip link - alleen zichtbaar bij keyboard focus voor accessibility */
  /* https://webaim.org/techniques/skipnav/ */
  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    z-index: 100;
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

  /* Dashboard layout met subtiele gradient background */
  /* https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient */
  .dashboard {
    display: flex;
    min-height: 100vh;
    background: radial-gradient(
      circle at 100% 0%,
      hsla(208, 100%, 32%, 0.12) 0%,
      hsla(217, 100%, 79%, 0.06) 25%,
      hsl(0, 0%, 100%) 35%
    );
  }

  /* Main content wrapper met responsive padding */
  /* https://developer.mozilla.org/en-US/docs/Web/CSS/@media */
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem 0 4rem;
    max-width: 100%;
    gap: 1.5rem;

    @media (min-width: 768px) {
      padding: 2rem 0 5rem;
      gap: 2rem;
    }

    @media (min-width: 1024px) {
      padding: 3rem 0 6rem;
      gap: 2.5rem;
    }
  }
</style>
