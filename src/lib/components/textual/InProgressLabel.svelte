<script>
    import inprogress from "$lib/assets/svg/inprogress-icon.svg";

    // add class to component
    let {className} = $props()
</script>

<div class="in-progress-label paragraph {className}">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user preview-icon"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    <p>Your status: <span>In progress</span></p>
</div>

<style>
    .in-progress-label {
        display: flex;
        align-items: center;
        gap: .5rem;

        span {
            color: var(--orange-700);
        }
    }
</style>
