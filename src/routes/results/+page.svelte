<script>
	import questionIcon from "$lib/assets/svg/round-question-icon.svg";
	import question from "$lib/assets/svg/question.svg";
	import plus from "$lib/assets/svg/plus-icon.svg";
	import minus from "$lib/assets/svg/minus-icon.svg";

	// Components
	import QuestionFieldset from "$lib/components/form/QuestionFieldset.svelte";
	import Heading from "$lib/components/textual/Heading.svelte";
	import QuestionCard from "$lib/components/cards/QuestionCard.svelte";
	import QuestionsForm from "$lib/components/form/QuestionsForm.svelte";
	import CompareGradingTable from "$lib/components/charts/CompareGradingTable.svelte";

	// Dynamic data variables
	let { data } = $props();
	const article = data.detailsInfo;
	const questions = data.questionInfo;

</script>

    <section class="main-container-compare-grading">
		<Heading title="Compare grading" subTitle="Compare grades from different assessors side by side"/>
			<div class="container">
				<CompareGradingTable questions={questions} />
				<QuestionsForm questions={questions} article={article} />
			</div>
    </section>

<style>
	.main-container-compare-grading {
		max-width: 100rem;
  		margin: 0 auto;
		padding: 1rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem 1rem 1rem 1rem;

		@media (min-width: 720px) {
			padding: 1rem 2rem 1rem 2rem;
		}
	}

.container {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto;
	gap: 1rem;

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 1fr;
	}
}
</style>
