<script>
  let sidebarOpen = false;
</script>

<div class="dashboard">
  <!-- Side nav top -->
  <aside class:open={sidebarOpen} id="sidebar">
    <header class="sidebar-header">
      <img src="/IWGDF.png" alt="IWGDF Logo" class="logo-img" />
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
            <!-- <span class="nav-icon">•</span> -->
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
      <img src="/IWGDF.png" alt="IWGDF Logo" class="mobile-logo" />
    </header>

    <section class="content">
      <h1 class="page-title h1">Welcome back, Admin</h1>

      <!-- Continue grading -->
      <section class="section">
        <h2 class="section-title h2">Continue grading</h2>

        <section class="grid grid-lg-2">
          <!-- Eerste tile -->
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
        </section>
      </section>

      <!-- Start grading -->
      <section class="section">
        <h2 class="section-title h2">Start grading</h2>
        <section class="grid grid-md-2 grid-lg-3">
          <article>
            <h3 class="card-title h3">
              Preventing Diabetic Foot Ulcer Recurrence in High-Risk Patients
            </h3>
            <button class="button-primary h5">Start grading</button>
          </article>
          <article>
            <h3 class="card-title h3">
              Preventing Diabetic Foot Ulcer Recurrence in High-Risk Patients
            </h3>
            <button class="button-primary h5">Start grading</button>
          </article>
          <article>
            <h3 class="card-title h3">
              Preventing Diabetic Foot Ulcer Recurrence in High-Risk Patients
            </h3>
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

  /* volledige page */
  .dashboard {
    display: flex;
  }

  /* side nav volledig */
  aside {
    position: fixed;
    width: 15rem;
    height: 100vh;
    background: var(--background-color-primary);
    border-right: 0.8px solid var(--grey-100);
    display: flex;
    flex-direction: column;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    aside.open {
      transform: translateX(0);
    }

    /* side nav top */
    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 0.8px solid var(--grey-100);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* logo */
    .logo-img {
      width: 40px;
      height: 40px;
    }
  }

  /* Side nav items */
  nav {
    flex: 1;
    padding: 1rem;

    /* nav item title */
    details {
      margin-bottom: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;

      /* nav item content */
      summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        font-size: 14px;
        list-style: none;
        transition: background-color 0.3s ease;
      }

      summary:hover {
        background-color: var(--blue-100);
      }

      /* nav item sub text */
      .nav-sub {
        padding: 1rem;
      }
    }

    /* Nav content lay-out */
    .nav-content {
      display: flex;
      align-items: center;
      gap: 1rem;

      /* .nav-icon {
        font-size: 20px;
      } */
    }
  }

  /* User in aside onderaan */
  .sidebar-footer {
    padding: 1rem;
    border-top: 0.8px solid var(--grey-100);
    display: flex;
    align-items: center;
    gap: 1rem;

    /* profile icon (rondje) */
    .user-avatar {
      width: 2rem;
      height: 2rem;
      background-color: var(--blue-100);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  /* Main content lay-out dashboard */
  main {
    flex: 1;
    width: 100%;
    background-color: var(--background-color-secondary);
  }

  /* Mobile nav */
  .mobile-header {
    border-bottom: 0.8px solid var(--grey-100);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 30;
    background-color: var(--background-color-primary);

    /* Mobile hamburger menu */
    .menu-button {
      padding: 1rem;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 0.5rem;
      font-size: 20px;
      transition: background-color 0.3s ease;
    }

    .menu-button:hover {
      background-color: var(--blue-100);
    }

    /* Logo img */
    .mobile-logo {
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
    }
  }

  /* Dashboard content in main */
  .content {
    padding: 1rem;
  }

  /* H1 */
  .page-title {
    margin: 1rem;
    font-weight: 600;
  }

  /* H2 */
  .section-title {
    margin: 1rem;
    font-weight: 500;
  }

  /* Grid lay-out tiles */
  .grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
    margin: 2rem 1rem;

    /* tile */
    article {
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 0.8px solid var(--grey-100);
      padding: 2rem;
      background-color: var(--background-color-primary);

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 1rem;
        gap: 0.5rem;
      }

      .card-title {
        color: var(--grey-600);
        font-weight: 600;
        line-height: 1.4;
      }

      /* days badge */
      .badge {
        background-color: var(--blue-100);
        color: var(--blue-500);
        font-size: 12px;
        font-weight: bold;
        padding: 0.8rem;
        width: fit-content;
        border-radius: 20rem;
        white-space: nowrap;
      }
    }
    .progress-container {
      margin-bottom: 1rem;

      /* progressbar styling */
      .progress-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
        padding: 1rem 0;
      }

      /* progress bar */
      progress {
        flex: 1;
        height: 10px;
        border-radius: 9999px;
        appearance: none;
      }

      progress::-webkit-progress-bar {
        background-color: var(--blue-200);
        border-radius: 9999px;
      }

      progress::-webkit-progress-value {
        background-color: var(--blue-400);
        border-radius: 9999px;
      }

      progress::-moz-progress-bar {
        background-color: var(--blue-400);
        border-radius: 9999px;
      }
    }

    /* How many questions answerd layout */
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-status {
      font-size: 14px;
      color: var(--blue-700);
    }
  }

  .button-primary {
    background-color: var(--blue-100);
    color: var(--blue-700);
    padding: 0.8rem;
    border-radius: 20rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    width: fit-content;
  }

  .button-primary:hover {
    background-color: var(--orange-100);
    color: var(--orange-700);
  }

  @media (min-width: 768px) {
    .content {
      padding: 2rem;
    }
    .grid-md-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    .button-primary {
      width: auto;
    }
  }

  @media (min-width: 1024px) {
    aside {
      position: static;
      transform: translateX(0);
    }
    .mobile-header {
      display: none;
    }
    .overlay {
      display: none;
    }
    .grid-lg-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    .grid-lg-3 {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
