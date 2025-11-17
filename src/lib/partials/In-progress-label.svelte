<script>
    import inprogress from "$lib/assets/svg/inprogress-icon.svg";

    // add class to component
    let className = '';
    export { className as class };
</script>

<figure class="in-progress-label paragraph {className}">
    <img src={inprogress} alt="" height="15" width="15" />
    In progress
</figure>

<style>
    .in-progress-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid var(--orange-400);
        width: fit-content;
        padding: 0.35rem;
        border-radius: 0.5rem;
        color: var(--orange-700);
        background-color: var(--orange-100);
        white-space: nowrap;
    }
</style>
