<script>
    export let sender;
    export let subject;
    export let snippet;
    export let timeLabel;
    export let timeDate;
    export let href = "#";
    export let initiallyStarred = false;

    let isStarred = initiallyStarred;

    function toggleStar() {
        isStarred = !isStarred;
    }
</script>
<section>
    <ul>
        <li class="email-item">
            <span class="email-select">
                <input
                    class="email-checkbox"
                    type="checkbox"
                    aria-label="Selecteer e-mail"
                />

                <button
                    class="email-star-btn"
                    type="button"
                    aria-label={isStarred
                        ? "Verwijder als favoriet"
                        : "Markeer als favoriet"}
                    aria-pressed={isStarred}
                    on:click={toggleStar}
                >
                    <span aria-hidden="true" class="email-star-icon">★</span>
                </button>
            </span>

            <a class="email-item-link" {href}>
                <span class="email-content">
                    <span class="email-sender">{sender}</span>

                    <span class="email-text">
                        <span class="email-subject">{subject}</span>
                        <span class="email-snippet">{snippet}</span>
                    </span>
                </span>

                <time class="email-time" datetime={timeDate}>
                    {timeLabel}
                </time>
            </a>
        </li>
    </ul>
</section> 

<style>
	.email-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1.35rem 0.75rem;
		background-color: hsla(197, 7%, 79%, 0.127);
		border-radius: 10px;
		margin-bottom: 10px;
		border: 1px solid var(--grey-200);

		&:hover {
			background-color: var(--grey-200);
		}

		.email-select {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			.email-checkbox {
				width: 1rem;
				height: 1rem;
			}

			.email-star-btn {
				border: none;
				background: transparent;
				padding: 0.125rem;
				line-height: 1;
				cursor: pointer;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				border-radius: 999px;

				&:focus-visible {
					outline: 2px solid var(--email-focus);
					outline-offset: 2px;
				}

				.email-star-icon {
					font-size: 2rem;
				}

				&[aria-pressed="true"] {
					.email-star-icon {
						color: var(--favorite-notification-color);
					}
				}
			}
		}

		.email-item-link {
			text-decoration: none;
			color: inherit;
			display: contents;
		}

		.email-content {
			display: flex;
			align-items: center;
			flex: 1 1 auto;
			gap: 0.75rem;
			min-width: 0;

			.email-sender {
				font-weight: 600;
				white-space: nowrap;
			}

			.email-text {
				flex: 1 1 auto;
				min-width: 0;
				color: var(--email-text-muted);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				.email-subject {
					font-weight: 500;
					color: var(--email-text-main);
				}

				.email-snippet {
					&::before {
						content: " • ";
					}
				}
			}
		}
	}

	@media (min-width: 768px) {
		.email-item {
			padding: 1.6rem 1rem;
		}
	}
</style>
