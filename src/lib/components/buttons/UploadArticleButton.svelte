<script>
	/**
	 * UploadArticleButton.svelte
	 *
	 * Renders an "Upload Article" button exclusively for Super Admins.
	 * Opens a modal form where the user fills in article metadata and
	 * selects a PDF — on submit the article is created in Directus and
	 * appears immediately in the research overview.
	 *
	 * Props:
	 *   userRole {string|null} — role string from locals.user.role
	 */

	import { enhance } from '$app/forms';

	/** @type {string | null} */
	export let userRole = null;

	// ── Modal state ───────────────────────────────────────────────────────────
	let isModalOpen = false;
	let isUploading = false;
	let errorMessage = '';

	/** Selected file name shown in the custom file input label */
	let selectedFileName = '';

	/** Bound to the hidden <input type="file"> */
	let fileInput;

	// ── Theme options matching the Directus dropdown ──────────────────────────
	const THEMES = ['Temperature', 'High risk', 'Ulcers', 'Age'];

	// ── Helpers ───────────────────────────────────────────────────────────────

	/** Opens the modal and resets all state */
	function openModal() {
		isModalOpen = true;
		errorMessage = '';
		selectedFileName = '';
	}

	/** Closes the modal */
	function closeModal() { 
		isModalOpen = false;
		errorMessage = '';
	}

	/**
	 * Closes modal when clicking the backdrop (outside the dialog).
	 * @param {MouseEvent} event
	 */
	function handleBackdropClick(event) {
		if (event.target === event.currentTarget) closeModal();
	}

	/**
	 * Closes modal on Escape key.
	 * @param {KeyboardEvent} event
	 */
	function handleKeydown(event) {
		if (event.key === 'Escape') closeModal();
	}

	/**
	 * Updates the visible file name label when a file is selected.
	 * @param {Event & { currentTarget: HTMLInputElement }} event
	 */
	function handleFileSelect(event) {
		const file = event.currentTarget.files?.[0];
		if (!file) return;

		// Client-side PDF check — server validates independently too
		if (file.type !== 'application/pdf') {
			errorMessage = 'Only PDF files are accepted.';
			event.currentTarget.value = '';
			selectedFileName = '';
			return;
		}

		errorMessage = '';
		selectedFileName = file.name;
	}

	/**
	 * SvelteKit enhance callback — manages loading state and server response.
	 */
	function handleEnhance() {
		isUploading = true;
		errorMessage = '';

		return async ({ result, update }) => {
			isUploading = false;

			if (result.type === 'success') {
				// Close modal and refresh the articles list
				isModalOpen = false;
				selectedFileName = '';
				await update();
			} else if (result.type === 'failure') {
				errorMessage = result.data?.error ?? 'Upload failed. Please try again.';
			} else if (result.type === 'error') {
				errorMessage = 'An unexpected error occurred. Please try again.';
			}
		};
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if userRole?.toLowerCase() === 'super admin'}

	<!-- Upload Article trigger button -->
	<button
		type="button"
		class="button button-primary button-medium"
		on:click={openModal}
		aria-label="Upload a new PDF research article"
	>
		<span class="button__icon" aria-hidden="true">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
				fill="none" stroke="currentColor" stroke-width="2.5"
				stroke-linecap="round" stroke-linejoin="round">
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
				<polyline points="17 8 12 3 7 8" />
				<line x1="12" y1="3" x2="12" y2="15" />
			</svg>
		</span>
		<span class="button__text">Upload Article</span>
	</button>

	<!-- ── Modal ─────────────────────────────────────────────────────────── -->
	{#if isModalOpen}
		<!-- Backdrop — clicking outside closes the modal -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
    on:click={handleBackdropClick}
>
			<div class="modal">
				<!-- Modal header -->
				<div class="modal__header">
					<h2 class="modal__title" id="modal-title">Upload Article</h2>
					<button
						type="button"
						class="modal__close"
						aria-label="Close upload modal"
						on:click={closeModal}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
							viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				<!--
					Upload form — sends all article fields + PDF to the
					?/uploadArticle server action in +page.server.js
				-->
				<form
					method="POST"
					action="?/uploadArticle"
					enctype="multipart/form-data"
					use:enhance={handleEnhance}
					class="modal__form"
				>
					<!-- Title field -->
					<div class="form-field">
						<label for="article-title" class="form-field__label">
							Title <span class="form-field__required" aria-hidden="true">*</span>
						</label>
						<input
							id="article-title"
							type="text"
							name="title"
							class="form-field__input"
							placeholder="Article title"
							required
						/>
					</div>

					<!-- Author field -->
					<div class="form-field">
						<label for="article-author" class="form-field__label">
							Author <span class="form-field__required" aria-hidden="true">*</span>
						</label>
						<input
							id="article-author"
							type="text"
							name="author"
							class="form-field__input"
							placeholder="e.g. David G"
							required
						/>
					</div>

					<!-- Publisher field -->
					<div class="form-field">
						<label for="article-publisher" class="form-field__label">
							Publisher <span class="form-field__required" aria-hidden="true">*</span>
						</label>
						<input
							id="article-publisher"
							type="text"
							name="publisher"
							class="form-field__input"
							placeholder="e.g. The American Journal of Medicine"
							required
						/>
					</div>

					<!-- Theme dropdown -->
					<div class="form-field">
						<label for="article-theme" class="form-field__label">
							Theme <span class="form-field__required" aria-hidden="true">*</span>
						</label>
						<select id="article-theme" name="theme" class="form-field__select" required>
							<option value="" disabled selected>Select a theme</option>
							{#each THEMES as theme (theme)}
								<option value={theme}>{theme}</option>
							{/each}
						</select>
					</div>

					<!-- PDF file picker -->
					<div class="form-field">
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="form-field__label">
							PDF File <span class="form-field__required" aria-hidden="true">*</span>
						</label>
						<!-- Hidden native input -->
						<input
							bind:this={fileInput}
							type="file"
							name="file"
							accept="application/pdf"
							aria-hidden="true"
							tabindex="-1"
							class="file-input-hidden"
							on:change={handleFileSelect}
							required
						/>
						<!-- Styled file picker trigger -->
						<button
							type="button"
							class="file-picker-btn"
							on:click={() => fileInput?.click()}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
								viewBox="0 0 24 24" fill="none" stroke="currentColor"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
								aria-hidden="true">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
								<polyline points="17 8 12 3 7 8" />
								<line x1="12" y1="3" x2="12" y2="15" />
							</svg>
							{selectedFileName ? selectedFileName : 'Choose PDF file'}
						</button>
					</div>

					<!-- Error message -->
					{#if errorMessage}
						<p class="form-feedback form-feedback--error" role="alert" aria-live="assertive">
							{errorMessage}
						</p>
					{/if}

					<!-- Form actions -->
					<div class="modal__actions">
						<button
							type="button"
							class="button button-secondary button-medium"
							on:click={closeModal}
							disabled={isUploading}
						>
							<span class="button__text">Cancel</span>
						</button>

						<button
							type="submit"
							class="button button-primary button-medium"
							disabled={isUploading}
						>
							<span class="button__icon" aria-hidden="true">
								{#if isUploading}
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
										viewBox="0 0 24 24" fill="none" stroke="currentColor"
										stroke-width="2.5" stroke-linecap="round" class="spinning">
										<path d="M21 12a9 9 0 1 1-6.219-8.56" />
									</svg>
								{:else}
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
										viewBox="0 0 24 24" fill="none" stroke="currentColor"
										stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
										<polyline points="17 8 12 3 7 8" />
										<line x1="12" y1="3" x2="12" y2="15" />
									</svg>
								{/if}
							</span>
							<span class="button__text">{isUploading ? 'Uploading…' : 'Upload'}</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

{/if}

<style>
	/* Hide the native file input */
	.file-input-hidden {
		display: none;
	}

	/* ── Modal backdrop ───────────────────────────────────────────────────── */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background-color: hsla(210, 12%, 15%, 0.6);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: flex-end; /* Mobile: sheet from bottom */
		justify-content: center;
		z-index: 1000;
		padding: 0;

		@media (min-width: 768px) {
			align-items: center; /* Desktop: centered dialog */
			padding: var(--spacing-xl);
		}
	}

	/* ── Modal dialog ─────────────────────────────────────────────────────── */
	.modal {
		background: var(--background-color-primary);
		border-radius: var(--radius-lg) var(--radius-lg) 0 0; /* Mobile: bottom sheet */
		box-shadow: var(--shadow-lg);
		width: 100%;
		max-height: 92dvh;
		overflow-y: auto;
		padding: var(--spacing-lg);

		@media (min-width: 768px) {
			border-radius: var(--radius-lg);
			width: min(100%, 36rem);
			max-height: 90dvh;
		}
	}

	/* ── Modal header ─────────────────────────────────────────────────────── */
	.modal__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-lg);
	}

	.modal__title {
		font-size: clamp(16px, 3vw, 20px);
		font-weight: 700;
		color: var(--grey-700);
		margin: 0;
	}

	.modal__close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: var(--radius-sm);
		background: var(--grey-100);
		color: var(--grey-500);
		border: none;
		cursor: pointer;
		transition: background var(--transition-base), color var(--transition-base);

		&:hover {
			background: var(--grey-200);
			color: var(--grey-700);
		}
	}

	/* ── Form layout ──────────────────────────────────────────────────────── */
	.modal__form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.form-field__label {
		font-size: clamp(12px, 1.5vw, 13px);
		font-weight: 600;
		color: var(--grey-600);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.form-field__required {
		color: var(--red-500);
	}

	.form-field__input,
	.form-field__select {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		border: 1.5px solid var(--grey-200);
		border-radius: var(--radius-sm);
		font-family: var(--main-font);
		font-size: var(--form-mobile-input-size);
		color: var(--grey-700);
		background: var(--background-color-primary);
		transition: border-color var(--transition-base);
		appearance: none;

		&:focus {
			outline: none;
			border-color: var(--blue-400);
		}

		&::placeholder {
			color: var(--grey-300);
		}
	}

	/* Styled file picker button */
	.file-picker-btn {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		border: 1.5px dashed var(--grey-300);
		border-radius: var(--radius-sm);
		background: var(--background-color-secondary);
		color: var(--grey-500);
		font-family: var(--main-font);
		font-size: clamp(12px, 1.5vw, 14px);
		cursor: pointer;
		text-align: left;
		transition: border-color var(--transition-base), color var(--transition-base);

		&:hover {
			border-color: var(--blue-400);
			color: var(--blue-500);
		}
	}

	/* ── Feedback ─────────────────────────────────────────────────────────── */
	.form-feedback {
		font-size: clamp(12px, 1.5vw, 13px);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-sm);
		margin: 0;
	}

	.form-feedback--error {
		background-color: var(--red-100);
		color: var(--red-700);
	}

	/* ── Modal action buttons ─────────────────────────────────────────────── */
	.modal__actions {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-sm);

		@media (min-width: 480px) {
			flex-direction: row;
			justify-content: flex-end;
		}
	}

	/* Spinner animation */
	.spinning {
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>