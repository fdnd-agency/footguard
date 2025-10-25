<script>
  export let sidebarOpen = false;
  export let navItems = [];
  export let logoSrc;
  export let userName = "User";
  export let userRole = "Lorem Ipsum";
</script>

<aside class:open={sidebarOpen} id="sidebar">
  <header class="sidebar-header">
    <img src={logoSrc} alt="IWGDF Logo" class="logo-img" />
  </header>

  <nav>
    {#each navItems as navItem}
      <details>
        <summary>
          <span class="nav-content">
            <span class="nav-text">{navItem.name}</span>
          </span>
        </summary>
        <div class="nav-sub">{navItem.subItems}</div>
      </details>
    {/each}
  </nav>

  <footer class="sidebar-footer">
    <span class="user-avatar"
      ><img
        src="https://iwgdfguidelines.org/wp-content/uploads/2023/05/jvn-highres-square-scaled.jpg"
        alt="IWGDF Logo"
        width="50"
        height="50"
        style="border-radius: 9999px;"
      />
    </span>
    <div class="user-info">
      <p class="user-name">{userName}</p>
      <p class="user-role">{userRole}</p>
    </div>
  </footer>
</aside>

<style>
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
    box-shadow: var(--shadow-lg);
  }

  @media (min-width: 1024px) {
    aside {
      transform: translateX(0);
      box-shadow: none;
    }
  }

  aside.open {
    transform: translateX(0);
  }

  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--grey-200);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--background-color-primary);
  }

  .logo-img {
    width: auto;
    height: 40px;
  }

  nav {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }

  details {
    margin-bottom: 0.25rem;
    border-radius: 0.5rem;
  }

  summary {
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

  summary:hover {
    background: var(--grey-100);
    color: var(--iwgdf-blue);
  }

  details[open] summary {
    background: var(--iwgdf-blue-lighter);
    color: var(--iwgdf-blue);
    font-weight: 600;
  }

  .nav-sub {
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    color: var(--grey-600);
    font-size: 13px;
  }

  .nav-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

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

  .user-avatar {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-info {
    flex: 1;
    min-width: 0;
  }

  .user-name {
    font-weight: 600;
    font-size: 1rem;
    color: var(--grey-800);
    margin-bottom: 2px;
  }

  .user-role {
    font-size: 0.875rem;
    color: var(--grey-500);
  }
</style>
