<script>
  export let data = {
    graded: 6,
    finalized: 3,
    inProgress: 4,
    notStarted: 9,
  };

  $: total = data.graded + data.finalized + data.inProgress + data.notStarted;

  // Bereken percentages van 180 graden
  $: gradedPercent = ((data.graded / total) * 100).toFixed(1);
  $: finalizedPercent = ((data.finalized / total) * 100).toFixed(1);
  $: inProgressPercent = ((data.inProgress / total) * 100).toFixed(1);
  $: notStartedPercent = ((data.notStarted / total) * 100).toFixed(1);

  $: gradedDeg = (data.graded / total) * 180;
  $: finalizedDeg = (data.finalized / total) * 180;
  $: inProgressDeg = (data.inProgress / total) * 180;
  $: notStartedDeg = (data.notStarted / total) * 180;

  // Cumulatieve hoeken
  $: angle1 = 180 + gradedDeg;
  $: angle2 = angle1 + finalizedDeg;
  $: angle3 = angle2 + inProgressDeg;
  $: angle4 = 360;

  $: gradientStyle = `
    conic-gradient(
      from 0deg,
      var(--green-200) 0deg ${gradedDeg}deg,
      var(--blue-500) ${gradedDeg}deg ${gradedDeg + finalizedDeg}deg,
      var(--orange-400) ${gradedDeg + finalizedDeg}deg ${gradedDeg + finalizedDeg + inProgressDeg}deg,
      hsl(210, 17%, 90%) ${gradedDeg + finalizedDeg + inProgressDeg}deg 180deg
    )
  `;

  // Bereken posities voor percentages in het midden van elk segment
  function getPosition(startDeg, segmentDeg) {
    const middleDeg = startDeg + segmentDeg / 2;
    const radius = 85; // tussen inner en outer radius
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

<section class="chart">
  <figure class="chart-visual">
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
  .chart {
    width: 100%;
  }

  .chart-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
    margin-bottom: 1.5rem;
    overflow: hidden;

    @media (min-width: 640px) {
      height: 180px;
      margin-bottom: 2rem;
    }
  }

  .donut-container {
    display: block;
    width: 280px;
    height: 140px;
    overflow: hidden;
    position: relative;
    transform: scaleY(-1);

    @media (min-width: 640px) {
      width: 320px;
      height: 160px;
    }
  }

  .donut {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    transform: scaleY(-1);

    @media (min-width: 640px) {
      width: 320px;
      height: 320px;
    }
  }

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

  .percentage {
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    font-weight: 600;
    z-index: 2;
    pointer-events: none;

    @media (min-width: 640px) {
      font-size: 0.875rem;
    }
  }

  .graded-text {
    color: var(--green-400);
  }

  .finalized-text {
    color: var(--blue-400);
  }

  .inprogress-text {
    color: var(--orange-400);
  }

  .notstarted-text {
    color: var(--grey-400);
  }

  .legend {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    list-style: none;
    padding: 0;
    margin: 0;

    @media (min-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--main-text-color);
  }

  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;

    &.graded {
      background: var(--green-200);
    }

    &.finalized {
      background: var(--blue-400);
    }

    &.in-progress {
      background: var(--orange-400);
    }

    &.not-started {
      background: hsl(210, 17%, 90%);
    }
  }
</style>
