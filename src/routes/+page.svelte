<script>
  let sidebarOpen = false;

  import IWGDF from "$lib/assets/IWGDF-logo.png";
</script>

<a href="#main-content" class="skip-link">Skip nagivation</a>

<div class="dashboard">
  <!-- Side nav top -->
  <aside class:open={sidebarOpen} id="sidebar">
    <header class="sidebar-header">
      <img src={IWGDF} alt="IWGDF Logo" class="logo-img" />
    </header>

    <!-- Side nav items -->
    <nav>
      <details>
        <summary>
          <span class="nav-content">
            <!-- <span class="nav-icon">•</span> -->
            <span class="nav-text h5">Dashboard</span>
          </span>
        </summary>
        <div class="nav-sub paragraph">Sub-items here…</div>
      </details>

      <details>
        <summary>
          <span class="nav-content">
            <!-- <span class="nav-icon">•</span> -->
            <span class="nav-text h5">Research</span>
          </span>
        </summary>
        <div class="nav-sub paragraph">Sub-items here…</div>
      </details>

      <details>
        <summary>
          <span class="nav-content">
            <!-- <span class="nav-icon">•</span> -->
            <span class="nav-text h5">Results</span>
          </span>
        </summary>
        <div class="nav-sub paragraph">Sub-items here…</div>
      </details>

      <details>
        <summary>
          <span class="nav-content">
            <span class="nav-text h5">Settings</span>
          </span>
        </summary>
        <div class="nav-sub paragraph">Sub-items here…</div>
      </details>
    </nav>

    <footer class="sidebar-footer">
      <span class="user-avatar">👤</span>
      <div class="user-info">
        <p class="user-name h5">User</p>
        <p class="user-role sub-text">Lorem Ipsum</p>
      </div>
    </footer>
  </aside>

  <!-- Main dashboard -->
  <main>
    <header class="mobile-header">
      <button class="menu-button" on:click={() => (sidebarOpen = !sidebarOpen)}>
        ☰
      </button>
      <img src={IWGDF} alt="IWGDF Logo" class="mobile-logo" />
    </header>

    <section class="content">
      <h1 class="page-title h1">Welcome back, Admin</h1>

      <!-- Continue grading -->
      <section class="section">
        <h2 class="section-title h2">Continue grading</h2>

        <section class="grid grid-lg-2">
          <!-- 1e tile -->
          <article>
            <header class="card-header">
              <h3 class="card-title h3">
                Home Monitoring of Foot Skin Temperatures to Prevent Ulceration
              </h3>
              <span class="badge sub-text">3 days left</span>
            </header>

            <figure class="progress-container">
              <div class="progress-wrapper">
                <progress value="37" max="100"></progress>
                <figcaption class="progress-text paragraph">37%</figcaption>
              </div>
            </figure>

            <footer class="card-footer">
              <p class="card-status sub-text">12 of 25 questions answered</p>
              <button class="button-primary h5">Continue</button>
            </footer>
          </article>

          <!-- ul.lijstje#hoofdgerecht>li.item*2 -->

          <!-- 2e article -->
          <article>
            <header class="card-header">
              <h3 class="card-title h3">
                Home Monitoring of Foot Skin Temperatures to Prevent Ulceration
              </h3>
              <span class="badge sub-text">5 days left</span>
            </header>

            <figure class="progress-container">
              <div class="progress-wrapper">
                <progress value="68" max="100"></progress>
                <figcaption class="progress-text paragraph">68%</figcaption>
              </div>
            </figure>

            <footer class="card-footer">
              <p class="card-status sub-text">20 of 25 questions answered</p>
              <button class="button-primary h5">Continue</button>
            </footer>
          </article>

          <!-- 3e article -->
          <article>
            <header class="card-header">
              <h3 class="card-title h3">
                Home Monitoring of Foot Skin Temperatures to Prevent Ulceration
              </h3>
              <span class="badge sub-text">3 days left</span>
            </header>

            <figure class="progress-container">
              <div class="progress-wrapper">
                <progress value="51" max="100"></progress>
                <figcaption class="progress-text paragraph">51%</figcaption>
              </div>
            </figure>

            <footer class="card-footer">
              <p class="card-status sub-text">17 of 25 questions answered</p>
              <button class="button-primary h5">Continue</button>
            </footer>
          </article>
        </section>
      </section>

      <!-- Start grading -->
      <section class="section">
        <h2 class="section-title h2">Start grading</h2>
        <section class="grid grid-md-2 grid-lg-3">
          <article class="start-grading-card">
            <div class="article-icon svg-style"></div>

            <h3 class="card-title h3">
              Preventing Diabetic Foot Ulcer Recurrence in High-Risk Patients
            </h3>

            <!-- Optioneel: Auteurs -->
            <p class="article-authors">Armstrong DG, Boulton AJM, Bus SA</p>

            <!-- Optioneel: Metadata -->
            <div class="article-meta">
              <span class="article-meta-item">2023</span>
              <span class="article-meta-item">Diabetes Care</span>
              <span class="article-meta-item">RCT</span>
            </div>

            <!-- Optioneel: Aantal vragen badge -->
            <span class="questions-badge">25 questions</span>

            <button class="button-primary h5">Start grading</button>
          </article>

          <article class="start-grading-card">
            <div class="article-icon svg-style"></div>

            <h3 class="card-title h3">
              Preventing Diabetic Foot Ulcer Recurrence in High-Risk Patients
            </h3>

            <!-- Optioneel: Auteurs -->
            <p class="article-authors">Armstrong DG, Boulton AJM, Bus SA</p>

            <!-- Optioneel: Metadata -->
            <div class="article-meta">
              <span class="article-meta-item">2023</span>
              <span class="article-meta-item">Diabetes Care</span>
              <span class="article-meta-item">RCT</span>
            </div>

            <!-- Optioneel: Aantal vragen badge -->
            <span class="questions-badge">25 questions</span>

            <button class="button-primary h5">Start grading</button>
          </article>

          <article class="start-grading-card">
            <div class="article-icon svg-style"></div>

            <h3 class="card-title h3">
              Preventing Diabetic Foot Ulcer Recurrence in High-Risk Patients
            </h3>

            <!-- Optioneel: Auteurs -->
            <p class="article-authors">Armstrong DG, Boulton AJM, Bus SA</p>

            <!-- Optioneel: Metadata -->
            <div class="article-meta">
              <span class="article-meta-item">2023</span>
              <span class="article-meta-item">Diabetes Care</span>
              <span class="article-meta-item">RCT</span>
            </div>

            <!-- Optioneel: Aantal vragen badge -->
            <span class="questions-badge">25 questions</span>

            <button class="button-primary h5">Start grading</button>
          </article>
        </section>
      </section>
    </section>
  </main>
</div>

<style>
  body {
    font-family: var(--main-font);
    background-color: var(--background-color-primary);
  }

  .skip-link {
    position: absolute;
    top: -100px;
    left: 0;
    background: var(--blue-100);
    color: var(--grey-700);
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    z-index: 1000;
    transition: top 0.3s;
  }

  .skip-link:focus {
    top: 1rem;
  }

  :focus-visible {
    outline: 3px solid var(--blue-400);
    outline-offset: 2px;
  }

  .dashboard {
    display: flex;
  }

  aside {
    position: fixed;
    width: 15rem;
    height: 100vh;
    background: linear-gradient(
      180deg,
      var(--background-color-primary) 0%,
      hsl(201, 62%, 98%) 100%
    );
    border-right: 1px solid var(--blue-200);
    display: flex;
    flex-direction: column;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    @media (min-width: 1024px) {
      position: static;
      transform: translateX(0);
    }
  }

  aside.open {
    transform: translateX(0);
  }

  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--blue-200);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--background-color-primary);
  }

  .logo-img {
    width: auto;
    height: 40px;
  }

  nav {
    flex: 1;
    padding: 1rem;
  }

  details {
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    list-style: none;
    transition: all 0.2s ease;
    color: var(--grey-600);
  }

  summary:hover {
    background: linear-gradient(135deg, var(--blue-100), var(--blue-200));
    color: var(--blue-600);
    transform: translateX(2px);
  }

  details[open] summary {
    background-color: var(--blue-100);
    color: var(--blue-600);
  }

  .nav-sub {
    padding: 1rem;
    color: var(--grey-500);
    font-size: 13px;
  }

  .nav-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-content svg,
  .nav-content i {
    color: var(--blue-500);
    transition: color 0.2s ease;
  }

  summary:hover .nav-content svg,
  summary:hover .nav-content i {
    color: var(--blue-600);
  }

  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid var(--blue-200);
    display: flex;
    align-items: center;
    gap: 1rem;
    background: var(--background-color-primary);
    transition: background-color 0.2s ease;
  }

  .sidebar-footer:hover {
    background-color: hsl(201, 62%, 95%);
  }

  .user-avatar {
    width: 2rem;
    height: 2rem;
    background: linear-gradient(135deg, var(--blue-400), var(--blue-500));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
  }

  main {
    flex: 1;
    width: 100%;
    background-color: var(--background-color-secondary);
  }

  /* Mobile Header */
  .mobile-header {
    border-bottom: 1px solid var(--blue-200);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 30;
    background: linear-gradient(
      180deg,
      var(--background-color-primary) 0%,
      hsl(201, 62%, 98%) 100%
    );
    box-shadow: 0 1px 3px hsla(201, 99%, 19%, 0.05);

    @media (min-width: 1024px) {
      display: none;
    }
  }

  .menu-button {
    padding: 0.75rem;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 20px;
    color: var(--blue-600);
    transition: all 0.2s ease;
  }

  .menu-button:hover {
    background: linear-gradient(135deg, var(--blue-100), var(--blue-200));
    color: var(--blue-700);
  }

  .menu-button:active {
    transform: scale(0.95);
  }

  .mobile-logo {
    width: auto;
    height: 32px;
    border-radius: 0.5rem;
  }

  .content {
    padding: 1rem;
  }

  .page-title {
    margin: 1rem;
    font-weight: 600;
    font-size: 2rem;
  }

  .section-title {
    margin: 2rem 1rem;
    font-weight: 400;
    font-size: 1.4rem;
  }

  .grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
    margin: 2rem 1rem;

    @media (min-width: 768px) {
      &.grid-md-2 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      &.grid-lg-2 {
        grid-template-columns: repeat(2, 1fr);
      }

      &.grid-lg-3 {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  article {
    border-radius: 1rem;
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.08),
      0 0 0 1px var(--blue-200);
    padding: 1.25rem;
    background: linear-gradient(
      135deg,
      var(--background-color-primary) 0%,
      hsl(0, 0%, 99%) 100%
    );
    transition: all 0.3s ease;

    @media (min-width: 768px) {
      padding: 1.75rem;
    }

    @media (min-width: 1024px) {
      padding: 2rem;
    }
  }

  article:hover {
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.1),
      0 0 0 1px var(--blue-300);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.25rem;
    gap: 0.75rem;
    flex-wrap: wrap;

    @media (min-width: 768px) {
      flex-wrap: nowrap;
    }
  }

  .card-title {
    color: var(--grey-700);
    font-weight: 600;
    font-size: clamp(16px, 3vw, 18px);
    line-height: 1.5;
    flex: 1;
    min-width: 0;
  }

  .badge {
    background: linear-gradient(135deg, hsl(21, 99%, 48%), hsl(21, 99%, 58%));
    color: white;
    border: 1px solid hsl(21, 99%, 65%);
    box-shadow:
      0 2px 8px hsla(21, 99%, 38%, 0.25),
      0 0 0 1px hsla(21, 99%, 70%, 0.1) inset;
    font-size: clamp(11px, 2vw, 13px);
    font-weight: 600;
    letter-spacing: 0.025em;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    padding: 0.4rem 0.9rem;
    width: fit-content;
    border-radius: 9999px;
    white-space: nowrap;
    user-select: none;
    flex-shrink: 0;
  }

  .progress-container {
    margin-bottom: 1.25rem;
  }

  .progress-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;

    @media (min-width: 1024px) {
      gap: 1rem;
    }
  }

  .progress-text {
    font-size: clamp(13px, 2vw, 14px);
    font-weight: 600;
    color: var(--blue-600);
    min-width: 3rem;
    text-align: right;
    flex-shrink: 0;
  }

  progress {
    flex: 1;
    height: 12px;
    border-radius: 9999px;
    appearance: none;
    box-shadow: 0 0 0 1px var(--blue-200) inset;
    min-width: 0;

    @media (min-width: 768px) {
      height: 14px;
    }
  }

  progress::-webkit-progress-bar {
    background-color: var(--blue-100);
    border-radius: 9999px;
    overflow: hidden;
  }

  progress::-webkit-progress-value {
    background: linear-gradient(
      90deg,
      var(--blue-700),
      var(--blue-500),
      var(--blue-300)
    );
    border-radius: 9999px;
    transition: width 0.3s ease-in-out;
  }

  progress::-moz-progress-bar {
    background: linear-gradient(
      90deg,
      var(--blue-700),
      var(--blue-500),
      var(--blue-300)
    );
    border-radius: 9999px;
    transition: width 0.3s ease-in-out;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  progress.active::-webkit-progress-value {
    background: linear-gradient(
      90deg,
      var(--blue-700) 0%,
      var(--blue-500) 30%,
      var(--blue-300) 50%,
      var(--blue-500) 70%,
      var(--blue-700) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s ease-in-out infinite;
  }

  progress.active::-moz-progress-bar {
    background: linear-gradient(
      90deg,
      var(--blue-700) 0%,
      var(--blue-500) 30%,
      var(--blue-300) 50%,
      var(--blue-500) 70%,
      var(--blue-700) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s ease-in-out infinite;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    @media (min-width: 768px) {
      flex-wrap: nowrap;
    }
  }

  .card-status {
    font-size: clamp(13px, 2vw, 14px);
    font-weight: 500;
    color: var(--grey-600);
    flex: 1;
    min-width: 0;
  }

  .card-status strong {
    color: var(--blue-600);
    font-weight: 600;
  }

  .button-primary {
    background: linear-gradient(135deg, var(--blue-400), var(--blue-500));
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: 600;
    font-size: clamp(13px, 2vw, 14px);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    width: fit-content;
    box-shadow:
      0 2px 6px hsla(201, 99%, 38%, 0.2),
      0 0 0 1px hsla(201, 99%, 60%, 0.1) inset;
    flex-shrink: 0;
  }

  .button-primary:hover {
    background: linear-gradient(135deg, var(--blue-500), var(--blue-600));
    box-shadow:
      0 4px 10px hsla(201, 99%, 38%, 0.3),
      0 0 0 1px hsla(201, 99%, 70%, 0.2) inset;
    transform: translateY(-1px);
  }

  .button-primary:active {
    transform: translateY(0);
    box-shadow:
      0 1px 3px hsla(201, 99%, 38%, 0.25),
      0 0 0 1px hsla(201, 99%, 60%, 0.15) inset;
  }

  .start-grading-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: hsl(201, 45%, 96%);
    border: 1px solid hsl(201, 40%, 88%);
  }

  .start-grading-card:hover {
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.1),
      0 0 0 1px var(--blue-200);
    background: hsl(201, 48%, 95%);
  }

  .start-grading-card .card-title {
    margin-bottom: 0;
    flex: 1;
  }

  .article-icon {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 2rem;
  }

  .article-icon::before {
    content: "📄";
  }

  .article-icon.svg-style {
    position: relative;
    font-size: 0;
  }

  .article-icon.svg-style::before {
    content: "";
    position: absolute;
    width: 1.75rem;
    height: 2.25rem;
    border: 2px solid var(--blue-500);
    border-radius: 0.2rem;
    background: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .article-icon.svg-style::after {
    content: "";
    position: absolute;
    width: 1rem;
    height: 1.5px;
    background: var(--blue-500);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow:
      0 -5px 0 var(--blue-500),
      0 5px 0 var(--blue-500);
  }

  .article-authors {
    font-size: clamp(12px, 1.8vw, 13px);
    color: var(--grey-500);
    font-style: italic;
    line-height: 1.4;
  }

  .article-meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
    font-size: clamp(12px, 1.8vw, 13px);
    color: var(--grey-500);
  }

  .article-meta-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .article-meta-item::before {
    content: "•";
    color: var(--blue-400);
    font-weight: bold;
  }

  .article-meta-item:first-child::before {
    content: "";
  }

  .questions-badge {
    background: var(--blue-200);
    color: var(--blue-700);
    padding: 0.35rem 0.75rem;
    border-radius: 0.5rem;
    font-size: clamp(11px, 1.8vw, 12px);
    font-weight: 600;
    width: fit-content;
  }
</style>
