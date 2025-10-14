<script>
  let sidebarOpen = false;

  import IWGDF from "$lib/assets/img/IWGDF-logo.webp";
</script>


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

  <!-- mobile navigation -->
    <header class="mobile-header">
      <button class="menu-button" on:click={() => (sidebarOpen = !sidebarOpen)}>
        ☰
      </button>
      <img src={IWGDF} alt="IWGDF Logo" class="mobile-logo" />
    </header>

<style>
  body {
    font-family: var(--main-font);
    background-color: var(--background-color-primary);
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
      width: auto;
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
      width: auto;
      height: 32px;
      border-radius: 0.5rem;
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