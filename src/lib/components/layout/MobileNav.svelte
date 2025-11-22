<script>
	import {
		AdminIcon,
		DashboardIcon,
		GradingIcon,
		NotificationIcon,
		ResultsIcon,
		SettingIcon,
		IwgdfLogo,
	} from "$lib";

	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<div class="fixed-logo">
	<IwgdfLogo />
</div>

<button
	class="mobile-menu-button"
	on:click={toggle}
	aria-expanded={isOpen}
	aria-label="Toggle mobile menu">
	{#if isOpen}
		<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	{:else}
		<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<line x1="3" y1="6" x2="21" y2="6" />
			<line x1="3" y1="12" x2="21" y2="12" />
			<line x1="3" y1="18" x2="21" y2="18" />
		</svg>
	{/if}
</button>

<nav class:open={isOpen} class="mobile-menu" aria-label="Mobile navigation">
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
		<li class="admin-item">
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
		<li>
			<a href="/settings">
				<span class="icon"><SettingIcon /></span>
				<span class="label">Settings</span>
			</a>
		</li>
	</ul>
</nav>

<style>
	.fixed-logo {
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 2100;
		display: flex;
		align-items: center;
	}

	.mobile-menu-button {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 2200;
		background: transparent;
		border: none;
		padding: 0.5rem;
		border-radius: 8px;
		cursor: pointer;
		color: var(--main-svg-icon-color);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.8;
		}
	}

	.mobile-menu {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 0;
		overflow: hidden;
		background: var(--background-color-primary);
		transition: height 0.25s ease;
		z-index: 2000;
		padding: 0 1.5rem;
		padding-top: 5rem;
		display: flex;
		flex-direction: column;
	}

	.mobile-menu.open {
		height: fit-content;
		padding-bottom: 2rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		
		li a {
			display: flex;
			align-items: center;
			gap: 12px;
			text-decoration: none;
			font-size: 1.1rem;
			font-weight: 500;
			padding: 0.8rem 1.5rem;
			border-radius: 100px;
			color: var(--main-svg-icon-color);

			&:hover {
				background: var(--blue-200);
				color: var(--blue-600);
			}
		}
	}
	
	.admin-item{
			a{
				color:var(--secondary-svg-icon-color);

				&:hover{
					color:var(--secondary-svg-icon-color);
					background: var(--secondary-svg-icon-hover-color);
				}
			}
		}

	.icon {
		display: inline-flex;
	}
</style>
