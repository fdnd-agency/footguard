<script>

    import inprogress from "$lib/assets/svg/inprogress-icon.svg";

</script>

    <button class="filter-button in-progress" type="submit" name="filter" value="inprogress">
        <img src={inprogress} alt="" height="15" width="15">
        In progress
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
            background-color: var(--orange-200); 
            color: var(--main-text-color-light);
        }
    }

     .in-progress {
        border: 1px solid var(--orange-400);
        color: var(--orange-700);
        background-color: var(--orange-100);
    }

</style>