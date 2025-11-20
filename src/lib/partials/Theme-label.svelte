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
        border: 1px solid var(--grey-700);
        width: fit-content;
        padding: 0.35rem;
        border-radius: 0.5rem;
        color: var(--grey-100);
        background-color: var(--grey-700);
        white-space: nowrap;
    }
</style>
