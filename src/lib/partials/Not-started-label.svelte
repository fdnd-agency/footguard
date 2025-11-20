<script>
    import notStarted from "$lib/assets/svg/notstarted-icon.svg";

    let className = "";
    export { className as class };
</script>

<figure class="not-started-label paragraph {className}">
    <img src={notStarted} alt="" height="15" width="15" />
    Not started
</figure>

<style>
    .not-started-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid var(--red-400);
        width: fit-content;
        padding: 0.35rem;
        border-radius: 0.5rem;
        color: var(--red-400);
        background-color: rgb(255, 249, 249);
        white-space: nowrap;
    }
</style>
