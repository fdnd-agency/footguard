<script>
  export let active = false;
</script>

<svelte:head>
  {#if active}
    <style>
      * {
        cursor:
          url("/src/lib/assets/custom-cursor.png") 16 16,
          auto !important;
      }
    </style>
  {/if}
</svelte:head>
