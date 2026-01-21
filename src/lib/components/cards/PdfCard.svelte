<script>
    // Components
    import QuestionFieldset from "$lib/components/form/QuestionFieldset.svelte";
    import questionIcon from "$lib/assets/svg/round-question-icon.svg";
    import Heading from "$lib/components/textual/Heading.svelte";

    let { article, questions } = $props();
</script>

<article class="pdf-container">
    <figure class="pdf-file">
        <!-- https://www.geeksforgeeks.org/html/how-to-embed-pdf-file-using-html/ -->
        <embed src="https://fdnd-agency.directus.app/assets/{article.paper_file}" type="application/pdf" width="100" height="620" alt="pdf-file">
    </figure>
</article>

<style>
    .pdf-container {
        background: var(--background-color-primary);
        border-radius: 1rem;
        height: 75vh;
        padding: 1rem;

        box-shadow:
            0 0.25rem 0.75rem hsla(213, 12%, 15%, 0.12),
            0 0.125rem 0.25rem hsla(213, 12%, 15%, 0.08);
        border: 1px solid hsla(213, 12%, 15%, 0.06);
        transition: transform 0.3s ease;

        .pdf-file,
        .pdf-file embed {
            width: 100%;
            height: 100%;
        }
    }
</style>
