<script>

    import notStarted from "$lib/assets/svg/notstarted-icon.svg";

</script>

    <button class="filter-button not-started" type="submit" name="filter" value="notstarted">
        <img src={notStarted} alt="" height="15" width="15">
        Not started
    </button>

<style>

    .filter-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;
        padding: 0.5rem;
        border-radius: 0.5rem;
        width: fit-content;
        cursor: pointer;

        &:hover {
            background-color: var(--red-200); 
            color: var(--main-text-color-light);
        }
    }

       .not-started {
        border: 1px solid var(--red-400);
        color: var(--red-400);
        background-color: var(--red-100);
    }

</style>