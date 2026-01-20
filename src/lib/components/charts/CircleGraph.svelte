<script>
  import { onMount } from "svelte";

  // Props van parent component
  export let articles = [];

  // Bereken sections dynamisch op basis van articles
  $: sections = [
    {
      key: "notStarted",
      label: "Not started",
      value: articles.filter((a) => a.grading_status === "not_started").length,
      color: "var(--grey-200)",
    },
    {
      key: "inProgress",
      label: "In progress",
      value: articles.filter((a) => a.grading_status === "in_progress").length,
      color: "var(--orange-500)",
    },
    {
      key: "graded",
      label: "Graded",
      value: articles.filter((a) => a.grading_status === "completed").length,
      color: "var(--green-500)",
    },
    {
      key: "finalized",
      label: "Finalized",
      value: articles.filter((a) => a.grading_status === "finalized").length,
      color: "var(--blue-500)",
    },
  ].filter((s) => s.value > 0);

  // Total value for computing percentages
  $: total = sections.reduce((sum, s) => sum + s.value, 0);

  // Radius percent for label positioning based on screen size
  let radiusPercent = 70;

  function updateRadius() {
    radiusPercent = window.innerWidth < 768 ? 40 : 70;
  }

  onMount(() => {
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  });

  // Compute position of labels based on slice degrees
  function getPosition(startDeg, segmentDeg, radiusPercent = 70) {
    const middleDeg = startDeg + segmentDeg / 2;
    const angleRad = ((middleDeg - 90) * Math.PI) / 180;
    return {
      x: `${50 + radiusPercent * Math.cos(angleRad)}%`,
      y: `${50 + radiusPercent * Math.sin(angleRad)}%`,
    };
  }

  // Compute percentage, slice degrees, start deg, and positions for each section
  $: sectionsWithCalc = sections.map((s, i) => {
    const percent = total > 0 ? ((s.value / total) * 100).toFixed(1) : 0;
    const deg = total > 0 ? (s.value / total) * 360 : 0;
    const startDeg = sections
      .slice(0, i)
      .reduce((sum, x) => sum + (total > 0 ? (x.value / total) * 360 : 0), 0);
    return {
      ...s,
      percent,
      deg,
      startDeg,
      pos: getPosition(startDeg, deg, radiusPercent),
    };
  });

  // Build conic-gradient CSS string for chart background
  $: gradientStyle =
    total > 0
      ? `conic-gradient(
        from 0deg,
        ${sectionsWithCalc
          .map((s) => `${s.color} ${s.startDeg}deg ${s.startDeg + s.deg}deg`)
          .join(",")}
      )`
      : "var(--grey-200)";
</script>

<!-- Chart container -->
<section class="chart">
  <!-- Circle chart visual -->
  <figure class="chart-visual">
    <figcaption class="visually-hidden">Paper progress distribution</figcaption>
    <span class="circle-container">
      <span class="circle" style="background: {gradientStyle};">
        {#each sectionsWithCalc as section}
          <span
            class="percentage"
            style="
        left: {section.pos.x};
        top: {section.pos.y};
        color: {section.color};
      "
          >
            {section.percent}%
          </span>
        {/each}
      </span>
    </span>
  </figure>

  <!-- Chart legend -->
  <ul class="legend">
    {#each sections as section}
      <li class="legend-item">
        <span class="legend-dot" style="background: {section.color};"></span>
        <span>{section.label} ({section.value})</span>
      </li>
    {/each}
  </ul>
</section>

<style>
  /* Main chart container */
  .chart {
    width: 100%;
    margin-top: 4rem;
  }

  /* Chart visual container */
  .chart-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12.5rem;
    margin: 0 0 1.5rem 0;

    @media (min-width: 768px) {
      height: 15rem;
      margin-bottom: 2rem;
    }
  }

  .visually-hidden {
    display: none;
  }

  /* Circle container wrapper with responsive aspect ratio */
  .circle-container {
    width: 100%;
    max-width: 15rem;
    height: auto;
    aspect-ratio: 1 / 1;
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio */

    @media (min-width: 768px) {
      width: 15rem;
      height: 15rem;
    }
  }

  /* Circle chart element */
  .circle {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
  }

  /* Percentage labels on circle */
  .percentage {
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--grey-700);
    z-index: 2;
    pointer-events: none;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }

  /* Legend list container */
  .legend {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    list-style: none;
    padding: 1rem;
    margin-top: 5rem;
    justify-items: center;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  /* Individual legend item */
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--grey-700);
  }

  /* Legend color dot */
  .legend-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    flex-shrink: 0;
  }
</style>
