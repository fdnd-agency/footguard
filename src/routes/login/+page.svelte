<script>
    	import IWGDFLogo from '$lib/components/navbar-icons/IWGDF-Logo.svelte';
        
	// Frontend-only state for basic validation + UI
	let email = '';
	let errorMessage = '';

	// Basic email check (frontend validation only)
	function isValidEmail(value) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	function handleSubmit(event) {
		// We prevent default because there is no backend yet.
		// Later (backend issue) you can remove preventDefault so it actually POSTs.
		event.preventDefault();

		errorMessage = '';

		if (!isValidEmail(email)) {
			errorMessage = 'Please enter a valid email address.';
			return;
		}

		// Frontend-only placeholder:
		// In a later issue, this will send the POST request to /api/magic-link
		alert('Frontend only: this would send a magic link request.');
	}
</script>

<section class="login-page">
	<div class="card">
		<!-- Logo -->
		<div class="logo">
            <IWGDFLogo />
        </div>

		<h1 class="title">Sign in via email</h1>

		<p class="subtitle">
			Please enter your email address below to receive a sign-in link in your inbox.
		</p>

		<!--
			IMPORTANT:
			We keep action="/api/magic-link" because that's the final target,
			but we preventDefault in handleSubmit (frontend-only issue).
		-->
		<form method="POST" action="/api/magic-link" on:submit={handleSubmit}>
			<input
				class="input"
				type="email"
				name="email"
				placeholder="Enter your email address"
				bind:value={email}
				required
			/>

			<button class="button" type="submit">
				Send magic link
			</button>

			<p class="help">
				We will send you a sign-in link that will be valid for one hour
			</p>

			{#if errorMessage}
				<p class="error" role="alert">{errorMessage}</p>
			{/if}
		</form>
	</div>

	<footer class="footer">© 2026 Footguard. IWGDF</footer>
</section>

<style>
	/* =========================
	   MOBILE FIRST (default)
	   ========================= */

	.login-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1.5rem;
		position: relative;

		/* Use the provided background image from design */
		background-image: url('/login-bg.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.card {
		width: 100%;
		max-width: 360px;
		background: rgba(245, 245, 245, 0.95);
		border-radius: 28px;
		padding: 2rem 1.5rem;
		text-align: center;
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
	}

	.logo {
		width: 140px;
		margin: 0 auto 1rem auto;
	}

	.title {
		margin: 0 0 0.5rem 0;
		font-size: 1.3rem;
		font-weight: 600;
	}

	.subtitle {
		margin: 0 0 1.5rem 0;
		font-size: 0.95rem;
		color: rgba(0, 0, 0, 0.55);
		line-height: 1.35;
	}

	form {
		display: grid;
		gap: 1rem;
	}

	.input {
		width: 100%;
		padding: 0.9rem 1rem;
		border-radius: 14px;
		border: none;
		background: rgba(230, 230, 230, 1);
		font-size: 1rem;
		text-align: center;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08);
	}

	.button {
		width: 100%;
		padding: 0.9rem 1rem;
		border-radius: 14px;
		border: none;
		background: #4b8ec5;
		color: white;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		box-shadow: 0 10px 18px rgba(0, 0, 0, 0.2);
	}

	.help {
		margin: 0;
		font-size: 0.85rem;
		color: rgba(0, 0, 0, 0.45);
	}

	.error {
		margin: 0.25rem 0 0 0;
		color: #b00020;
		font-size: 0.9rem;
	}

	.footer {
		position: absolute;
		bottom: 1rem;
		font-size: 0.85rem;
		color: rgba(0, 0, 0, 0.8);
	}

	/* =========================
	   DESKTOP (add-on)
	   ========================= */

	@media (min-width: 1024px) {
		.login-page {
			/* Desktop design shows image on left + white area on right */
			background: none;
			padding: 0;
			flex-direction: row;
			align-items: stretch;
		}

		/* Left half background image */
		.login-page::before {
			content: '';
			position: absolute;
			inset: 0 auto 0 0;
			width: 50%;
			background-image: url('/login-bg.png');
			background-size: cover;
			background-position: center;
		}

		/* Right half white background */
		.login-page::after {
			content: '';
			position: absolute;
			inset: 0 0 0 auto;
			width: 50%;
			background: white;
		}

		/* Put card on top of right half */
		.card {
			position: relative;
			z-index: 1;
			margin-left: auto;
			margin-right: 10%;
			align-self: center;
		}

		/* Footer not visible in desktop design (optional) */
		.footer {
			display: none;
		}
	}
</style>
