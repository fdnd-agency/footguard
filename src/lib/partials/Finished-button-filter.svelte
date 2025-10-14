<script>

    import finished from "$lib/assets/svg/finished-icon.svg";

</script>

    <button class="filter-button finished" type="submit" name="filter" value="finished">
        <img src={finished} alt="" height="15" width="15">
        Finished
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
            background-color: var(--green-200); 
            color: var(--main-text-color-light);
        }
    }

     .finished {
        border: 1px solid var(--green-700);
        color: var(--green-700);
        background-color: var(--green-100);
    }

</style>