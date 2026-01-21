<script>
    let { value, color } = $props();
</script>

<p class="paragraph" style="background-color:{color};">{value}</p>

<style>

    p {
        margin: 0.7rem;
        border-radius: 0.5rem;
        color: var(--grey-100);
        width: 3.5rem;
    }

</style>
