<script>

    import notStarted from "$lib/assets/svg/notstarted-icon.svg";

</script>



<div class="finished-label paragraph">
    <img src={notStarted} alt="" height="15" width="15">
    Not started
</div>


<style>
       .finished-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid var(--red-400);
        width: fit-content;
        padding: 0.35rem;
        border-radius: 0.5rem;
        color: var(--red-400);
        background-color: var(--red-100);
        white-space: nowrap;
    }
</style>