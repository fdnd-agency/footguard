<script>
	import {
		AdminIcon,
		CollapseMenuIcon,
		DashboardIcon,
		GradingIcon,
		NotificationIcon,
		ResultsIcon,
		SettingIcon,
		IwgdfLogo,
		IwgdfLogoCollapsed
	} from "$lib";

	let isCollapsed = false;

	const toggleCollapse = () => (isCollapsed = !isCollapsed);
</script>

<nav class:collapsed={isCollapsed}>
	<div class="logo">
		{#if isCollapsed}
			<IwgdfLogoCollapsed />
		{:else}
			<IwgdfLogo />
		{/if}

		<button
			type="button"
			class="collapse-btn"
			on:click={toggleCollapse}
			aria-label="Toggle sidebar"
			aria-expanded={!isCollapsed}
		>
			<CollapseMenuIcon />
		</button>
	</div>

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
			<a href="/admin" >
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
    nav{
        position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 240px;
		display: flex;
		flex-direction: column;
        gap: 25px;
		background: var(--background-color-primary);
        padding: 1.5em 0.5em;
		transition: width 0.2s ease;
    }

	nav.collapsed{
		width: 80px;
	}

    nav.collapsed .logo {
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
	

    .logo{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 25px;
    }

	.collapse-btn{
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 4px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.25s ease; 
	}

	nav.collapsed .collapse-btn{
		transform: rotate(180deg);
	}
	

    ul{
        display: flex;
        flex-direction: column;
        gap: 10px;

        li{
            justify-content: center;
            list-style-type: none;
            background: var(--background-color-primary);

            a{
                display: flex;
				align-items: center;
                gap: 10px;
                text-align: center;
                text-decoration: none;
                color: var(--main-svg-icon-color);
                font-weight: 500;
				padding: 10px 25px;
                
                &:hover{
					background: var(--blue-200);
					color:var(--blue-600);
					border-radius: 100px;
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
    }

	.icon{
		display: inline-flex;
	}

	.label{
		white-space: nowrap;
	}

	nav.collapsed .label{
		display: none;
	}

	nav.collapsed ul li a{
		justify-content: center;
	}
</style>
