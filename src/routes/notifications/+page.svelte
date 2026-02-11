<script>
	import {NotificationItem,EmailFilter,EmailSearchbar} from "$lib/";
	import emails from "$lib/data/demoEmails.json";
</script>
<div class="page-content-notifications">
	<div class="page-title">
		<h2>Notifications</h2>
	</div>

	<div class="notifications-panel">
		<div class="mail-toolbar">
			<EmailSearchbar />
			<EmailFilter />
		</div>

		<div class="notifications-scroll">
			{#each emails as email, i (email.id)}
				<NotificationItem
					index={i}
					sender={email.sender}
					subject={email.subject}
					snippet={email.snippet}
					timeLabel={email.timeLabel}
					timeDate={email.timeDate}
					href={email.href}
					initiallyStarred={email.initiallyStarred}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	:root {
		--toolbar-bg: #ffffff;
		--border-color: #e5e7eb;
		--input-bg: #f3f4f6;
		--icon-bg: #ffffff;
		--icon-hover: #f3f4f6;
		--radius: 999px;
	}

	.page-content-notifications {
		padding: 1rem;

		.page-title {
			margin-bottom: 0.75rem;
		}
	}

	.notifications-panel {
		margin-inline: auto;
		border: 1px solid var(--border-color);
		border-radius: 16px;
		background: #ffffff;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		.mail-toolbar {
			position: sticky;
			top: 0;
			z-index: 5;

			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: 0.75rem;

			padding: 0.75rem;
			background: var(--toolbar-bg);
			border-bottom: 1px solid var(--border-color);

			/* Child component layout control */
			:global(.mail-search) {
				width: 100%;

				input {
					width: 100%;
				}
			}

			:global(.mail-actions) {
				width: 100%;
				justify-content: flex-end;
			}
		}

		.notifications-scroll {
			flex: 1;
			overflow-y: auto;
			padding: 0.75rem;
			max-height: 70vh;
			scrollbar-gutter: stable;
			overscroll-behavior: contain;
		}
	}

	/* Tablet / desktop */
	@media (min-width: 640px) {
		.page-content-notifications {
			padding: 2em;

			.page-title {
				margin-bottom: 1rem;
			}
		}

		.notifications-panel {
			.mail-toolbar {
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				gap: 1rem;
				padding: 0.75rem 1rem;

				:global(.mail-search) {
					width: auto;

					input {
						width: 280px;
					}
				}

				:global(.mail-actions) {
					width: auto;
				}
			}

			.notifications-scroll {
				padding: 0.75rem 1rem;
			}
		}
	}
</style>
