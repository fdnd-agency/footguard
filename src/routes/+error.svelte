<script>
    import { resolve } from "$app/paths";
    import { page } from '$app/stores';
  </script>  
<section class="error-container">
  <h1>{$page.status} - {$page.error?.message ?? 'Something went wrong'}</h1>
  <p class="link-container">Go back to the
    <a href={resolve("/")} class="dashboard-link">Dashboard</a>
    <svg class="svg-arrow" viewBox="0 0 24 24">
      <path
        d="M20.707 15.293 12.414 7l2.293-2.293A1 1 0 0 0 14 3H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1.707.707L7 12.414l8.293 8.293a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z"
        style="fill:#ff891a"
      />
    </svg>
    </p>
</section>

<style>
.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
    padding: 2rem;
    position: relative;
}

.error-container h1 {
    margin-bottom: 1rem;
    font-size: clamp(15px, 4.5vw, 40px);
}

.link-container {
    position: relative; 
    display: inline-block;
}

.dashboard-link {
    color: var(--red-500);
    text-decoration: underline;
    font-weight: 600;
    font-size: clamp(15px, 4.5vw, 40px);

    &:hover {
        text-decoration-color: var(--red-400);
    }
}

.svg-arrow {
    position: absolute;
    top: 50%;        
    left: 100%;      
    margin-left: 0.5rem; 
    height: 3rem;
    width: 3rem;
    pointer-events: none; 
    animation: shake 1s infinite ease-in-out;
}

@keyframes shake {
    0% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(-2px) rotate(-2deg); }
    50% { transform: translateX(2px) rotate(2deg); }
    75% { transform: translateX(-2px) rotate(-2deg); }
    100% { transform: translateX(0) rotate(0deg); }
}

</style>
