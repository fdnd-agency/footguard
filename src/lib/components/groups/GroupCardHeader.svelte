<script>
  import groupHeaderPhoto from "$lib/assets/img/charcot-icon.webp";


  // Dynamic group data passed from GroupCard.svelte
  export let name;
  export let status;
  export let conditionLabel;
  export let image;
  /** Unique id for the group name heading (required when multiple cards on one page). */
  export let nameHeadingId = undefined;
  // When undefined, the section has no aria-labelledby — acceptable for single-card views
  // but should always be provided when rendering multiple GroupCard components on one page.

  // Fallback values keep the header safe while API data is still incomplete
  $: groupName = name ?? "Unnamed group";
  $: groupStatus = status ?? "Unknown";
  $: groupConditionLabel = conditionLabel ?? "General";
  $: groupImage = image ?? groupHeaderPhoto;
</script>

<section aria-labelledby={nameHeadingId}>
  <div class="header-photo" aria-hidden="true">
    <!-- TODO: Replace static header image with group avatar from dynamic group data. -->
    <img src={groupImage} alt="" decoding="async" />
  </div>
  <h2 id={nameHeadingId}>{groupName}</h2>
  <ul>
    <li>{groupConditionLabel}</li>
    <li>{groupStatus}</li>
  </ul>
</section>

<style>
  section {
    position: relative;
    isolation: isolate;
    padding: var(--spacing-xl) var(--spacing-lg);
    color: var(--background-color-primary);
    container-type: inline-size;
    container-name: group-header;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .header-photo {
      position: absolute;
      inset: 0;
      z-index: -1;

      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }

    h2 {
      margin: 0 0 var(--spacing-sm);
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      gap: var(--spacing-xs);
      flex-wrap: wrap;

      li {
        padding: var(--spacing-xs) var(--spacing-sm);
        text-transform: uppercase;
        border-radius: var(--radius-full);
        background: hsla(0, 0%, 100%, 0.3);
  

        &:last-child {
          border: 2px solid hsla(0, 0%, 100%, 0.65);
          background: transparent;
        }
      }
    }
  }

  @container group-header (min-width: 42rem) {
    section {
      padding: var(--spacing-2xl) var(--spacing-xl);
    }
  }

</style>
