<nav
	id="sidebar"
	class="sidebar"
	class:open={isOpen}
	class:collapsed={isCollapsed}
	aria-label="Sidebar menu"
>
	<div class="top">
		<!-- Logo switches based on collapsed state (desktop sidebar) -->
		{#if isCollapsed}
			<IwgdfLogoCollapsed />
		{:else}
			<IwgdfLogo />
		{/if}

		<!-- Desktop collapse button -->
		<button
			class="collapse-desktop"
			type="button"
			aria-pressed={isCollapsed}
			on:click={() => (isCollapsed = !isCollapsed)}
		>
			<CollapseMenuIcon />
			<span class="sr-only">
				{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
			</span>
		</button>
	</div>

	<div class="main">
		<ul>
			<li>
				<a href="/">
					<span class="icon"><DashboardIcon /></span>
					<span class="label">Dashboard</span>
				</a>
			</li>
			<li>
				<a href="/grading">
					<span class="icon"><GradingIcon /></span>
					<span class="label">Grading</span>
				</a>
			</li>
			<li>
				<a href="/results">
					<span class="icon"><ResultsIcon /></span>
					<span class="label">Results</span>
				</a>
			</li>
			<li>
				<a href="/admin">
					<span class="icon"><AdminIcon /></span>
					<span class="label">Admin</span>
				</a>
			</li>
			<li>
				<a href="/notifications">
					<span class="icon"><NotificationIcon /></span>
					<span class="label">Notifications</span>
				</a>
			</li>
		</ul>
	</div>

	<div class="bottom">
		<ul>
			<li>
				<a href="/settings">
					<span class="icon"><SettingIcon /></span>
					<span class="label">Settings</span>
				</a>
			</li>
		</ul>
	</div>
</nav>
