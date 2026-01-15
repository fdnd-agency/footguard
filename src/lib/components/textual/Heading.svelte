<script>

  let {title, subTitle, className} = $props()

</script>

<div class="page-title">
    <h1>{title}</h1>
    <p>{subTitle}</p>
</div>

<style>

    .page-title {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1.5rem 0 2rem 2rem;
    }

</style>
