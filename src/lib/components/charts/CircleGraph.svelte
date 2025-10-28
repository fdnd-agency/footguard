<script>
  export let data = {
    graded: 6,
    finalized: 3,
    inProgress: 4,
    notStarted: 9,
  };

  // Calculate total and percentages
  $: total = data.graded + data.finalized + data.inProgress + data.notStarted;
  $: gradedPercent = ((data.graded / total) * 100).toFixed(1);
  $: finalizedPercent = ((data.finalized / total) * 100).toFixed(1);
  $: inProgressPercent = ((data.inProgress / total) * 100).toFixed(1);
  $: notStartedPercent = ((data.notStarted / total) * 100).toFixed(1);

  // Calculate degrees for semicircle (180 degrees total)
  $: gradedDeg = (data.graded / total) * 180;
  $: finalizedDeg = (data.finalized / total) * 180;
  $: inProgressDeg = (data.inProgress / total) * 180;
  $: notStartedDeg = (data.notStarted / total) * 180;

  // Gradient style for donut chart
  $: gradientStyle = `
    conic-gradient(
      from 0deg,
      var(--green-500) 0deg ${gradedDeg}deg,
      var(--blue-500) ${gradedDeg}deg ${gradedDeg + finalizedDeg}deg,
      var(--orange-500) ${gradedDeg + finalizedDeg}deg ${gradedDeg + finalizedDeg + inProgressDeg}deg,
      var(--grey-200) ${gradedDeg + finalizedDeg + inProgressDeg}deg 180deg
    )
  `;

  // Calculate positions for percentage labels
  function getPosition(startDeg, segmentDeg) {
    const middleDeg = startDeg + segmentDeg / 2;
    const radius = 85;
    const angleRad = (middleDeg * Math.PI) / 180;
    const x = 50 + radius * Math.cos(angleRad);
    const y = 50 + radius * Math.sin(angleRad);
    return { x: `${x}%`, y: `${y}%` };
  }

  $: gradedPos = getPosition(0, gradedDeg);
  $: finalizedPos = getPosition(gradedDeg, finalizedDeg);
  $: inProgressPos = getPosition(gradedDeg + finalizedDeg, inProgressDeg);
  $: notStartedPos = getPosition(
    gradedDeg + finalizedDeg + inProgressDeg,
    notStartedDeg
  );
</script>

<!-- Chart container -->
<section class="chart">
  <!-- Donut chart visual -->
  <figure class="chart-visual">
    <figcaption class="visually-hidden">Paper progress distribution</figcaption>
    <span class="donut-container">
      <span class="donut" style="background: {gradientStyle};">
        <span
          class="percentage graded-text"
          style="left: {gradedPos.x}; top: {gradedPos.y};"
        >
          {gradedPercent}%
        </span>
        <span
          class="percentage finalized-text"
          style="left: {finalizedPos.x}; top: {finalizedPos.y};"
        >
          {finalizedPercent}%
        </span>
        <span
          class="percentage inprogress-text"
          style="left: {inProgressPos.x}; top: {inProgressPos.y};"
        >
          {inProgressPercent}%
        </span>
        <span
          class="percentage notstarted-text"
          style="left: {notStartedPos.x}; top: {notStartedPos.y};"
        >
          {notStartedPercent}%
        </span>
      </span>
    </span>
  </figure>

  <!-- Chart legend -->
  <ul class="legend">
    <li class="legend-item">
      <span class="legend-dot graded"></span>
      <span>Graded ({data.graded})</span>
    </li>
    <li class="legend-item">
      <span class="legend-dot finalized"></span>
      <span>Finalized ({data.finalized})</span>
    </li>
    <li class="legend-item">
      <span class="legend-dot in-progress"></span>
      <span>In progress ({data.inProgress})</span>
    </li>
    <li class="legend-item">
      <span class="legend-dot not-started"></span>
      <span>Not started ({data.notStarted})</span>
    </li>
  </ul>
</section>

<style>
  /* Main chart container */
  .chart {
    width: 100%;
  }

  /* Chart visual container */
  .chart-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 9.375rem;
    margin: 0 0 1.5rem 0;
    overflow: hidden;

    @media (min-width: 768px) {
      height: 11.25rem;
      margin-bottom: 2rem;
    }
  }
  
  .visually-hidden {
    display: none;
  }

  /* Donut container wrapper */
  .donut-container {
    display: block;
    width: 17.5rem;
    height: 8.75rem;
    overflow: hidden;
    position: relative;
    transform: scaleY(-1);

    @media (min-width: 768px) {
      width: 20rem;
      height: 10rem;
    }
  }

  /* Donut chart element */
  .donut {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 17.5rem;
    height: 17.5rem;
    border-radius: 50%;
    transform: scaleY(-1);

    @media (min-width: 768px) {
      width: 20rem;
      height: 20rem;
    }
  }

  /* Donut inner circle (cutout) */
  .donut::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    background: var(--background-color-primary);
    border-radius: 50%;
    z-index: 1;
  }

  /* Percentage labels on donut */
  .percentage {
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: 0.875rem;
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
    padding: 0;
    margin: 0;

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

  /* Legend dot colors */
  .legend-dot.graded {
    background: var(--green-500);
  }

  .legend-dot.finalized {
    background: var(--blue-500);
  }

  .legend-dot.in-progress {
    background: var(--orange-500);
  }

  .legend-dot.not-started {
    background: var(--grey-200);
  }
</style>
