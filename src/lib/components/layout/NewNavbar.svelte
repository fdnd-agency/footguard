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
    
</nav>
