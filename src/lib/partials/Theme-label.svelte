<script>

    // add class to component
    let className = '';
    export { className as class };

    // for custom theme name
    export let themeName = '';
</script>

<span class="theme-label sub-text {className}">{themeName}</span>

<style>
    .theme-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid var(--blue-400);
        width: fit-content;
        padding: 0.25rem;
        border-radius: 0.5rem;
        color: var(--main-text-color-light);
        background-color: var(--blue-500);
        white-space: nowrap;
    }
</style>
