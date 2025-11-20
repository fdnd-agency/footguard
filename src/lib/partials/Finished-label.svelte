<script>
    import finished from "$lib/assets/svg/finished-icon.svg";

    // add class to component
    let className = '';
    export { className as class };
</script>

<figure class="finished-label paragraph {className}">
    <img src={finished} alt="" height="15" width="15">
    Finished
</figure>

<style>
    .finished-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid var(--green-700);
        width: fit-content;
        padding: 0.35rem;
        border-radius: 0.5rem;
        color: var(--green-700);
        background-color: var(--green-100);
        white-space: nowrap;
    }








</style>
