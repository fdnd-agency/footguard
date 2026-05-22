<details class="about-banner" role="status" open>
  <summary>×</summary>
  <p>
    <slot />
  </p>
</details>

<style>
  .about-banner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    background: var(--blue-500);
    color: var(--font-color-card);
    container-type: inline-size;
    container-name: group-about-banner;
  }

  .about-banner:not([open]) {
    display: none;
  }

  p {
    margin: 0;
    order: 1;
    font-weight: 300;
    line-height: 1.6;
  }

  summary {
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    order: 2;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1;
    border-radius: var(--radius-full);
    background: hsla(0, 0%, 100%, 0.2);
    color: var(--font-color-card);
    cursor: pointer;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  @container group-about-banner (min-width: 48rem) {
    p {
      line-height: 1.5;
    }
  }

</style>
