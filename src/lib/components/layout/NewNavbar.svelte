<script>
  import {
    CollapseMenuIcon,
    DashboardIcon,
    GradingIcon,
    LogoutIcon,
    NotificationIcon,
    ProfileIcon,
    ResultsIcon,
    IwgdfLogo,
    IwgdfLogoCollapsed
  } from '$lib'
  import { resolve } from '$app/paths'
  import { isCollapsed } from '$lib/stores/sidebar.js'

  let { user } = $props()
  const isGuest = user?.role?.toLowerCase() === 'guest'

  const toggleCollapse = () => {
    isCollapsed.update((value) => !value)
  }

  let isOpen = false
  const toggle = () => (isOpen = !isOpen)
</script>

<nav>
  {#if $isCollapsed}
    <IwgdfLogoCollapsed />
  {:else}
    <IwgdfLogo />
  {/if}
  <button class="collapse-btn" onclick={toggleCollapse}>
    <CollapseMenuIcon />
  </button>

  <ul>
    {#if isGuest}
      <li>
        <a href={resolve('/research')}>
          <span class="icon"><GradingIcon /></span>
          <span class="label">Grading</span>
        </a>
      </li>
    {:else}
      <li>
        <a href={resolve('/')}>
          <span class="icon"><DashboardIcon /></span>
          <span class="label">Dashboard</span>
        </a>
      </li>
      <li>
        <a href={resolve('/profile')}>
          <span class="icon"><ProfileIcon /></span>
          <span class="label">Profile</span>
        </a>
      </li>
      <li>
        <a href={resolve('/research')}>
          <span class="icon"><GradingIcon /></span>
          <span class="label">Grading</span>
        </a>
      </li>
      <li>
        <a href={resolve('/results')}>
          <span class="icon"><ResultsIcon /></span>
          <span class="label">Results</span>
        </a>
      </li>
      <li>
        <a href={resolve('/notifications')}>
          <span class="icon"><NotificationIcon /></span>
          <span class="label">Notifications</span>
        </a>
      </li>
    {/if}
  </ul>
  {#if user}
    <div class="logout">
      <a href={resolve('/logout')} aria-label="Log out" class="logout-link">
        <span class="icon"><LogoutIcon /></span>
        <span class="label">Log out</span>
      </a>
    </div>
  {/if}
</nav>

<nav>
  <button
    class="mobile-menu-button"
    onclick={toggle}
    aria-expanded={isOpen}
    aria-label="Toggle mobile menu"
  >
    {#if isOpen}
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <title>close menu</title>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    {:else}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <title>open menu</title>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    {/if}
  </button>

  <ul class:open={isOpen} class="mobile-menu">
    <li>
      <a href={resolve('/')}>
        <span class="icon"><DashboardIcon /></span>
        <span class="label">Dashboard</span>
      </a>
    </li>
    <li>
      <a href={resolve('/profile')}>
        <span class="icon"><ProfileIcon /></span>
        <span class="label">Profile</span>
      </a>
    </li>
    <li>
      <a href={resolve('/research')}>
        <span class="icon"><GradingIcon /></span>
        <span class="label">Grading</span>
      </a>
    </li>
    <li>
      <a href={resolve('/results')}>
        <span class="icon"><ResultsIcon /></span>
        <span class="label">Results</span>
      </a>
    </li>
    <li>
      <a href={resolve('/notifications')}>
        <span class="icon"><NotificationIcon /></span>
        <span class="label">Notifications</span>
      </a>
    </li>
    <li>
      <a href={resolve('/logout')} aria-label="Log out">
        <span class="icon"><LogoutIcon /></span>
        <span class="label">Log out</span>
      </a>
    </li>
  </ul>
</nav>
