<script>
  export let sidebarOpen = false;
  export let navItems = [];
  export let logoSrc;
  export let userName = "User";
  export let userRole = "Lorem Ipsum";
</script>

<!-- Main sidebar navigation -->
<aside class:open={sidebarOpen} id="sidebar">
  <!-- Sidebar header with logo -->
  <header class="sidebar-header">
    <img src={logoSrc} alt="IWGDF Logo" class="logo-img" />
  </header>

  <!-- Navigation menu -->
  <nav class="sidebar-nav">
    {#each navItems as navItem}
      <details class="nav-item">
        <summary class="nav-summary">
          <span class="nav-content">
            <span class="nav-text">{navItem.name}</span>
          </span>
        </summary>
        {#if navItem.subItems && navItem.subItems.length > 0}
          <ul class="nav-sub-list">
            {#each navItem.subItems as subItem}
              <li>
                <a href={subItem.href} class="nav-sub-link">
                  {subItem.name}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </details>
    {/each}
  </nav>

  <!-- User profile footer -->
  <footer class="sidebar-footer">
    <span class="user-avatar">
      <img
        src="https://iwgdfguidelines.org/wp-content/uploads/2023/05/jvn-highres-square-scaled.jpg"
        alt=""
        width="50"
        height="50"
        class="avatar-img"
      />
    </span>
    <div class="user-info">
      <p class="user-name">{userName}</p>
      <p class="user-role">{userRole}</p>
    </div>
  </footer>
</aside>

<style>
  /* Main sidebar container */
  aside {
    position: fixed;
    width: 16rem;
    height: 100vh;
    background: var(--background-color-primary);
    border-right: 1px solid var(--grey-200);
    display: flex;
    flex-direction: column;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0.625rem 1.875rem hsla(213, 12%, 15%, 0.15);

    @media (min-width: 1024px) {
      transform: translateX(0);
      box-shadow: none;
    }
  }

  /* Sidebar open state */
  aside.open {
    transform: translateX(0);
  }

  /* Sidebar header with logo */
  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--grey-200);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--background-color-primary);
  }

  /* Logo image sizing */
  .logo-img {
    width: auto;
    height: 2.5rem;
  }

  /* Navigation container */
  .sidebar-nav {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }

  /* Navigation item container */
  .nav-item {
    margin-bottom: 0.25rem;
    border-radius: 0.5rem;
  }

  /* Navigation summary button */
  .nav-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    list-style: none;
    transition: all 0.2s ease;
    color: var(--grey-700);
    cursor: pointer;
    user-select: none;
  }

  .nav-summary:hover {
    background: var(--grey-100);
    color: var(--blue-500);
  }

  .nav-summary:focus-visible {
    outline: 3px solid var(--blue-500);
    outline-offset: 2px;
  }

  /* Active navigation item */
  .nav-item[open] .nav-summary {
    background: var(--blue-100);
    color: var(--blue-500);
    font-weight: 600;
  }

  /* Navigation content wrapper */
  .nav-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  /* Sub-navigation list */
  .nav-sub-list {
    list-style: none;
    padding: 0.5rem 0;
    margin: 0;
  }

  /* Sub-navigation link */
  .nav-sub-link {
    display: block;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    color: var(--grey-600);
    font-size: 0.875rem;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .nav-sub-link:hover {
    background: var(--grey-100);
    color: var(--grey-700);
  }

  .nav-sub-link:focus-visible {
    outline: 3px solid var(--blue-500);
    outline-offset: 2px;
  }

  /* Sidebar footer with user info */
  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid var(--grey-200);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--background-color-primary);
    transition: background-color 0.2s ease;
    cursor: pointer;
  }

  .sidebar-footer:hover {
    background-color: var(--grey-50);
  }

  /* User avatar container */
  .user-avatar {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Avatar image styling */
  .avatar-img {
    border-radius: 9999px;
  }

  /* User info text container */
  .user-info {
    flex: 1;
    min-width: 0;
  }

  /* User name text */
  .user-name {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--grey-700);
    margin: 0 0 0.125rem 0;
    line-height: 1.4;
  }

  /* User role text */
  .user-role {
    font-size: 0.875rem;
    color: var(--grey-500);
    margin: 0;
    line-height: 1.4;
  }
</style>
