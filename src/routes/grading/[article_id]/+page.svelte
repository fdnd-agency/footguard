<script>
	// Components
	import Heading from "$lib/components/textual/Heading.svelte";
	import QuestionsForm from "$lib/components/form/QuestionsForm.svelte";
	import PdfCard from "$lib/components/cards/PdfCard.svelte";

	// Dynamic data variables
	let { data } = $props();
	const article = data.detailsInfo;
	const questions = data.questionInfo;
</script>

<section class="main-container-checklist">
	<Heading title="Checklist completion" subTitle="Fill in the checklist based on your expertise"/>

	<div class="pdf-questions-container">
		<PdfCard article={article}/>
		<QuestionsForm questions={questions} article={article}/>
	</div>
</section>

<style>
  .main-container-checklist {
    max-width: 100rem;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    @media (min-width: 720px) {
      padding: 1rem 2rem;
    }
  }

  .pdf-questions-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 1100px) {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>