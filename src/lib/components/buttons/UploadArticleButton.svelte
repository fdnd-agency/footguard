<script>
	/**
	 * UploadArticleButton.svelte
	 *
	 * Renders an "Upload Article" button exclusively for Super Admins.
	 *
	 * Responsibilities:
	 *   - Show/hide based on userRole prop
	 *   - Open the system file picker on click
	 *   - Client-side PDF validation (type check)
	 *   - Submit via SvelteKit enhance (no full page reload)
	 *   - Show loading, success, and error feedback states
	 *
	 * Props:
	 *   userRole {string|null} — role string from locals.user.role (e.g. "super_admin")
	 */
import { enhance } from '$app/forms';

	/** @type {string | null} */
	export let userRole = null;
// ── State ──
	let isUploading = false;
	let errorMessage = '';
	let successMessage = '';

	/** Bound to the hidden <input type="file"> inside the form */
	let fileInput;

	// ── Helpers ──

	/**
	 * Programmatically opens the browser's file picker.
	 * Clears any previous feedback before opening.
	 */
	function openFilePicker() {
		errorMessage = '';
		successMessage = '';
		fileInput?.click();
	}

    /**
	 * Fires when the user selects a file in the picker.
	 * Validates that the file is a PDF before auto-submitting the form.
	 *
	 * @param {Event & { currentTarget: HTMLInputElement }} event
	 */
	function handleFileSelect(event) {
		const file = event.currentTarget.files?.[0];
		if (!file) return;

		// Client-side PDF check — the server validates again for security
		if (file.type !== 'application/pdf') {
			errorMessage = 'Only PDF files are accepted.';
			event.currentTarget.value = ''; // Reset picker
			return;
		}

		// Trigger form submission now that we have a valid file
		event.currentTarget.closest('form')?.requestSubmit();
	}
    /**
	 * SvelteKit enhance callback.
	 * Sets loading state before submission and handles the server response.
	 *
	 * @returns {Function} Callback that runs after the server responds
	 */
	function handleEnhance() {
		isUploading = true;
		errorMessage = '';
		successMessage = '';

		return async ({ result, update }) => {
			isUploading = false;

    if (result.type === 'success') {
				successMessage = 'Article uploaded successfully!';
				// Reset the file input so the same file can be re-selected if needed
				if (fileInput) fileInput.value = '';
				// Re-run the load() function to refresh the articles list
				await update();
			} else if (result.type === 'failure') {
				errorMessage = result.data?.error ?? 'Upload failed. Please try again.';
			}
		};
	}
</script>
<!--
	Only render for Super Admins.
	The server action also enforces this role check as a security measure.
-->
{#if userRole?.toLowerCase() === 'super admin'}
	<div class="upload-wrapper">

		<!--
			SvelteKit form with multipart encoding for file uploads.
			The `enhance` directive intercepts submission for a SPA-style experience.
		-->
		<form
			method="POST"
			action="?/uploadArticle"
			enctype="multipart/form-data"
			use:enhance={handleEnhance}
		>
        <!--
				Hidden file input — triggered by the visible button below.
				`accept` filters the file picker to PDFs only.
				The server still validates the type independently.
			-->
			<input
				bind:this={fileInput}
				type="file"
				name="file"
				accept="application/pdf"
				aria-hidden="true"
				tabindex="-1"
				class="file-input-hidden"
				on:change={handleFileSelect}
			/>
<!-- Visible upload button — uses the shared .button system from styleguide.css -->
			<button
				type="button"
				class="button button-primary button-medium"
				disabled={isUploading}
				aria-label={isUploading ? 'Uploading article, please wait' : 'Upload a PDF research article'}
				on:click={openFilePicker}
			>
            <!-- Icon slot -->
				<span class="button__icon" aria-hidden="true">
					{#if isUploading}
						<!-- Animated spinner shown during upload -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
						>
							<path d="M21 12a9 9 0 1 1-6.219-8.56" />
						</svg>

                        {:else}
						<!-- Upload arrow icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="17 8 12 3 7 8" />
							<line x1="12" y1="3" x2="12" y2="15" />
						</svg>
					{/if}
				</span>
                	<!-- Button label -->
				<span class="button__text">
					{isUploading ? 'Uploading…' : 'Upload Article'}
				</span>
			</button>
		</form>

		<!-- Success feedback — announced to screen readers via role="status" -->
		{#if successMessage}
			<p class="upload-feedback upload-feedback--success" role="status" aria-live="polite">
				{successMessage}
			</p>
		{/if}

		<!-- Error feedback — announced immediately via role="alert" -->
		{#if errorMessage}
			<p class="upload-feedback upload-feedback--error" role="alert" aria-live="assertive">
				{errorMessage}
			</p>
		{/if}
	</div>
    {/if}

    <style>
	/* =============================================
	   Upload wrapper
	   Mobile-first: stacks vertically on small screens
	   ============================================= */
	.upload-wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-xs);
	}

	/* Hide the native <input type="file"> — we use the styled button instead */
	.file-input-hidden {
		display: none;
	}

	/* Spinning animation for the upload icon during loading */
	.button[disabled] .button__icon svg {
		animation: spin 0.8s linear infinite;
	}

    @keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* =============================================
	   Feedback messages
	   ============================================= */
	.upload-feedback {
		font-size: clamp(12px, 1.5vw, 13px); /* matches .paragraph from styleguide */
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-sm);
		margin: 0;
	}

	.upload-feedback--success {
		/* Uses green accent from styleguide */
		background-color: var(--green-100);
		color: var(--green-700);
	}

    .upload-feedback--error {
		/* Uses red accent from styleguide */
		background-color: var(--red-100);
		color: var(--red-700);
	}

	/* =============================================
	   Desktop: lay out button and feedback inline
	   ============================================= */
	@media (min-width: 768px) {
		.upload-wrapper {
			flex-direction: row;
			align-items: center;
		}
	}
</style>