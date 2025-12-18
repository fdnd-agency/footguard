<script>

	// Components
	import Pdf from "$lib/assets/img/pdf-1.pdf";
	import QuestionFieldset from "$lib/components/QuestionFieldset.svelte";
	import questionIcon from "$lib/assets/svg/round-question-icon.svg";
	import Heading from "$lib/partials/Heading.svelte";

	
</script>


<div class="main-container">

    <section class="main-container-checklist">

	<Heading title="Checklist completion" subTitle="Fill in the checklist based on your expertise"/>

		<div class="pdf-questions-container">

			<article class="pdf-container">
				<figure class="pdf-file">
					<!-- https://www.geeksforgeeks.org/html/how-to-embed-pdf-file-using-html/ -->
					<embed src="{Pdf}" type="application/pdf" width="100" height="620" alt="pdf-file">
				</figure>
			</article>

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

		</div>
    </section>

</div>

<style>
	
	.main-container-checklist {
		padding: 1rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.main-container-checklist-title {
		color: var(--blue-700);
		padding-top: 1rem;
		padding-bottom: 2rem;
	}

	.pdf-questions-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 1100px) {
		.pdf-questions-container {
			grid-template-columns: 1fr 1fr;
		}
	}

	.pdf-container {
		background-color: var(--grey-100);
		border-radius: 1rem;
		height: 75vh;
		padding: 1rem;
	}

	.pdf-file,
	.pdf-file embed {
		width: 100%;
		height: 100%;
	}

	.questions-container {
		height: 75vh;
		/* overflow: scroll; */
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--grey-100);
		padding: 1rem;
		border-radius: 1rem;
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
