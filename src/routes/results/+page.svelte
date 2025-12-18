<script>
	import questionIcon from "$lib/assets/svg/round-question-icon.svg";
	import question from "$lib/assets/svg/question.svg";
	import plus from "$lib/assets/svg/plus-icon.svg";
	import minus from "$lib/assets/svg/minus-icon.svg";

	// Components
	import Pdf from "$lib/assets/img/pdf-1.pdf";
	import QuestionFieldset from "$lib/components/QuestionFieldset.svelte";
	import Heading from "$lib/partials/Heading.svelte";
	import QuestionCard from "$lib/components/cards/QuestionCard.svelte";
</script>

    <section class="main-container-compare-grading">

		<Heading title="Compare grading" subTitle="Compare grades from different assessors side by side"/>

		<div class="sub-container-articles">

			<article class="questions-container">
				<h2 class="h3"><span class="">5 # - </span> Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients</h2>

				<figure class="anwsered-questions-count-container">
					<img src="{questionIcon}" alt="" height="25" width="25">
					<p class="h5 answered-questions"><span>7 of 25</span> questions answered</p>
				</figure>
				
				<form class="questions-form" method="post">
					<!-- hardcoded for now, when api it can be looped -->
					 <div class="questions-scroll-container">
						<QuestionFieldset questionId="1" questionName="question-1" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="2" questionName="question-2" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="3" questionName="question-3" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="4" questionName="question-4" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="5" questionName="question-5" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="6" questionName="question-6" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="7" questionName="question-7" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="8" questionName="question-8" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="9" questionName="question-9" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="10" questionName="question-10" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="11" questionName="question-11" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="12" questionName="question-12" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="13" questionName="question-13" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="14" questionName="question-14" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="15" questionName="question-15" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="16" questionName="question-16" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="17" questionName="question-17" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="18" questionName="question-18" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="19" questionName="question-19" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="20" questionName="question-20" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="21" questionName="question-21" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="22" questionName="question-22" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="23" questionName="question-23" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="24" questionName="question-24" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
						<QuestionFieldset questionId="25" questionName="question-25" questionTitle="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" />
					</div>

					<div class="buttons-container">
						<button class="form-save-button paragraph" type="button" >Save</button>
						<button class="form-submit-button paragraph" type="submit">Submit</button>
					</div>

				</form>
			</article>

			<article class="first-assesor-container">
				<h2 class="h3"><span>Assesor 1:</span> John Doe</h2>

				<div class="all-answers-container">
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Unclear" questionIcon={minus} questionNumber="1" color="#801800"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="No" questionIcon={plus} questionNumber="2" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Yes" questionIcon={question} questionNumber="3" color="var(--orange-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Unclear" questionIcon={plus} questionNumber="4" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="No" questionIcon={minus} questionNumber="5" color="#801800"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="No" questionIcon={plus} questionNumber="6" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Unclear" questionIcon={plus} questionNumber="7" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Yes" questionIcon={question} questionNumber="8" color="var(--orange-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Yes" questionIcon={minus} questionNumber="9" color="#801800"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Yes" questionIcon={question} questionNumber="10" color="var(--orange-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Unclear" questionIcon={plus} questionNumber="11" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="No" questionIcon={plus} questionNumber="12" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Yes" questionIcon={question} questionNumber="13" color="var(--orange-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Unclear" questionIcon={minus} questionNumber="14" color="#801800"/>
				</div>
			</article>

			<article class="second-assesor-container">
				<h2 class="h3"><span>Assesor 2:</span> Jane Doe</h2>

				<div class="all-answers-container">
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Unclear" questionIcon={plus} questionNumber="1" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="No" questionIcon={question} questionNumber="2" color="var(--orange-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Yes" questionIcon={plus} questionNumber="3" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Unclear" questionIcon={plus} questionNumber="4" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="No" questionIcon={plus} questionNumber="5" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="No" questionIcon={question} questionNumber="6" color="var(--orange-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Unclear" questionIcon={minus} questionNumber="7" color="#801800"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Yes" questionIcon={plus} questionNumber="8" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Yes" questionIcon={question} questionNumber="9" color="var(--orange-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Yes" questionIcon={plus} questionNumber="10" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Unclear" questionIcon={question} questionNumber="11" color="var(--orange-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="No" questionIcon={question} questionNumber="12" color="var(--orange-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Yes" questionIcon={plus} questionNumber="13" color="var(--green-600)"/>
					<QuestionCard question="Skin Temperature Monitoring Reduces the Risk for Diabetic Foot Ulceration in High-risk Patients" questionAnswer="Unclear" questionIcon={minus} questionNumber="14" color="#801800"/>
				</div>
			</article>
		</div>
    </section>

<style>
	.main-container-compare-grading {
		padding: 1rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.sub-container-articles {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 1100px) {
		.sub-container-articles {
			grid-template-columns: 1fr 1fr;
		}

		@media (min-width: 1400px) {
			.sub-container-articles {
				grid-template-columns: 1fr 1fr 1fr;
			}
		}
	}

	.first-assesor-container,
	.second-assesor-container {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		background-color: hsla(197, 7%, 79%, 0.127);
		padding: 1rem;
		border-radius: 1rem;
		height: 75vh;

		@media (min-width: 1200px) {
			.first-assesor-container {
				grid-row: 2;
				grid-column: 1 / 2;
			}
		}
	}

	.all-answers-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		overflow: scroll;
		padding: 1rem;
		border-radius: 1rem;
	}

	.questions-container {
		height: 75vh;
		/* overflow: scroll; */
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: hsla(197, 7%, 79%, 0.127);
		padding: 1rem;
		border-radius: 1rem;

		@media (min-width: 1100px) {
			grid-row: 1;
			grid-column: 1 / 3;
		}

		@media (min-width: 1400px) {
			grid-row: 1;
			grid-column: 3;
		}
	}

	h2 span, .answered-questions span {
		color: var(--grey-500);
	}

	.anwsered-questions-count-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		span {
			font-weight: 700;
		}
	}

	.reviewer {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.questions-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: scroll;
	}

	.questions-scroll-container {
		flex: 1;
		overflow-y: auto;
		gap: 1rem;
		display: flex;
		flex-direction: column;
	}

	.buttons-container {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		padding: 0.1rem;
		flex-shrink: 0;
		/* background-color: var(--background-color-primary);  */
	}

	.form-submit-button,
	.form-save-button {
		color: var(--font-color-card);
		padding: 0.5rem;
		border-radius: 1rem;
		width: fit-content;
		white-space: nowrap;
		font-size: clamp(10px, 1.5vw, 16px);
		transition: 0.2s ease-in-out;
		cursor: pointer;
	}

	.form-save-button {
		background-color: var(--blue-600);
	}

	.form-submit-button {
		background-color: var(--green-600);
	}

	/* remove visible scrollbar */
	* {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	*::-webkit-scrollbar {
		display: none;
	}
</style>
