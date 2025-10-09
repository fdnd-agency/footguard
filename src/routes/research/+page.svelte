<script>
    let sidebarOpen = false;

    import IWGDF from "$lib/assets/img/IWGDF-logo.webp";
    // import Navbar from "$lib/components/Navbar.svelte";
    import inprogress from "$lib/assets/svg/inprogress-icon.svg";
    import author from "$lib/assets/svg/author-icon.svg";
    import calender from "$lib/assets/svg/calendar-icon.svg";
    import ProgressLabel from "$lib/partials/InprogressLabel.svelte";
    import FinishedLabel from "$lib/partials/FinishedLabel.svelte";
    import NotStarted from "$lib/partials/NotStartedLabel.svelte";

    import finished from "$lib/assets/svg/finished-icon.svg";
    import notStarted from "$lib/assets/svg/notstarted-icon.svg";
</script>

<!-- <Navbar /> -->

<!-- <ProgressLabel/>
<FinishedLabel/>
<NotStarted/> -->

<section class="main-container-research">

  <h1 class="main-container-research-title">Research</h1>

  <div class="research-cards-container">

    <!-- card-1 -->

        <article class="research-card">
      <div class="research-card-data-container">
        <div class="research-card-title-label">
            <h2 class="research-card-title h3">
                <span class="research-id">#1 -</span>
                Home Monitoring of Foot Skin Temperatures to Prevent Ulceration
            </h2>

            <div class="status-label-container finished-label hide paragraph">
                <img src="{finished}" alt="" height="15" width="15">
                Finished
            </div>
        </div>

        <div class="research-card-author-date-container">
            <div class="author-container">
                <img src="{author}" class="author-icon" alt="" height="15" width="15">
                <p class="author-name">John Doe</p>
            </div>

            <div class="calender-container">
                <img src="{calender}" class="calender-icon" alt="" height="15" width="15">
                <p class="calender-date">25 Sep 2007</p>
            </div>
        </div>

        <div class="action-container">
            <div class="status-label-container finished-label paragraph">
                <img src="{finished}" alt="" height="15" width="15">
                Finished
            </div>

            <a href="/" class="research-card-action-btn paragraph">Continue</a>
        </div>
      </div>

         <a href="/" class="research-card-action-btn hide-btn paragraph">Continue</a>
    </article>

    <!-- card-2 -->

    <article class="research-card">
      <div class="research-card-data-container">
        <div class="research-card-title-label">
            <h2 class="research-card-title h3">
                <span class="research-id">#1 -</span>
                Home Monitoring of Foot Skin Temperatures to Prevent Ulceration
            </h2>

            <div class="status-label-container not-started-label hide paragraph">
                <img src="{notStarted}" alt="" height="15" width="15">
                Not started
            </div>
        </div>
        
        <div class="research-card-author-date-container">
            <div class="author-container">
                <img src="{author}" class="author-icon" alt="" height="15" width="15">
                <p class="author-name">John Doe</p>
            </div>

            <div class="calender-container">
                <img src="{calender}" class="calender-icon" alt="" height="15" width="15">
                <p class="calender-date">25 Sep 2007</p>
            </div>
        </div>

        <div class="action-container">
            <div class="status-label-container not-started-label paragraph">
                <img src="{notStarted}" alt="" height="15" width="15">
                Not started
            </div>

            <a href="/" class="research-card-action-btn paragraph">Continue</a>
        </div>
      </div>

         <a href="/" class="research-card-action-btn hide-btn paragraph">Continue</a>
    </article>

        <!-- card-3 -->

    <article class="research-card">
      <div class="research-card-data-container">
        <div class="research-card-title-label">
            <h2 class="research-card-title h3">
                <span class="research-id">#1 -</span>
                Home Monitoring of Foot Skin Temperatures to Prevent Ulceration
            </h2>

            <div class="status-label-container hide paragraph">
                <img src="{inprogress}" alt="" height="15" width="15">
                In progress
            </div>
        </div>
        
        <div class="research-card-author-date-container">
            <div class="author-container">
                <img src="{author}" class="author-icon" alt="" height="15" width="15">
                <p class="author-name">John Doe</p>
            </div>

            <div class="calender-container">
                <img src="{calender}" class="calender-icon" alt="" height="15" width="15">
                <p class="calender-date">25 Sep 2007</p>
            </div>
        </div>

        <div class="action-container">
            <div class="status-label-container paragraph">
                <img src="{inprogress}" alt="" height="15" width="15">
                In progress
            </div>

            <a href="/" class="research-card-action-btn paragraph">Continue</a>
        </div>
      </div>

         <a href="/" class="research-card-action-btn hide-btn paragraph">Continue</a>
    </article>

        <!-- card-4 -->

    <article class="research-card">
      <div class="research-card-data-container">
        <div class="research-card-title-label">
            <h2 class="research-card-title h3">
                <span class="research-id">#1 -</span>
                Home Monitoring of Foot Skin Temperatures to Prevent Ulceration
            </h2>

            <div class="status-label-container hide paragraph">
                <img src="{inprogress}" alt="" height="15" width="15">
                In progress
            </div>
        </div>

        <div class="research-card-author-date-container">
            <div class="author-container">
                <img src="{author}" class="author-icon" alt="" height="15" width="15">
                <p class="author-name">John Doe</p>
            </div>

            <div class="calender-container">
                <img src="{calender}" class="calender-icon" alt="" height="15" width="15">
                <p class="calender-date">25 Sep 2007</p>
            </div>
        </div>

        <div class="action-container">
            <div class="status-label-container paragraph">
                <img src="{inprogress}" alt="" height="15" width="15">
                In progress
            </div>

            <a href="/" class="research-card-action-btn paragraph">Continue</a>
        </div>
      </div>

         <a href="/" class="research-card-action-btn hide-btn paragraph">Continue</a>
    </article>

        <!-- card-5 -->

    <article class="research-card">
      <div class="research-card-data-container">
        <div class="research-card-title-label">
            <h2 class="research-card-title h3">
                <span class="research-id">#1 -</span>
                Home Monitoring of Foot Skin Temperatures to Prevent Ulceration
            </h2>

            <div class="status-label-container finished-label hide paragraph">
                <img src="{finished}" alt="" height="15" width="15">
                Finished
            </div>
        </div>

        <div class="research-card-author-date-container">
            <div class="author-container">
                <img src="{author}" class="author-icon" alt="" height="15" width="15">
                <p class="author-name">John Doe</p>
            </div>

            <div class="calender-container">
                <img src="{calender}" class="calender-icon" alt="" height="15" width="15">
                <p class="calender-date">25 Sep 2007</p>
            </div>
        </div>

        <div class="action-container">
            <div class="status-label-container finished-label paragraph">
                <img src="{finished}" alt="" height="15" width="15">
                Finished
            </div>

            <a href="/" class="research-card-action-btn paragraph">Continue</a>
        </div>
      </div>

         <a href="/" class="research-card-action-btn hide-btn paragraph">Continue</a>
    </article>
  </div>
</section>

<style>
  :global(body) {
	background-color: var(--background-color-primary);
}

.main-container-research {
	padding: 1rem 1rem 1rem 1rem;
}

.main-container-research-title {
	color: var(--blue-700);
}

.research-card-title {
	color: var(--blue-700);
}

h2 .research-id {
	color: var(--grey-300);
}

.research-cards-container {
	margin-top: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.research-card {
	padding: 1rem;
	border-radius: 1rem;
	background-color: hsl(200, 900%, 100%);
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

@media (min-width: 700px) {
	.research-card {
		flex-direction: row;
		align-items: center;
	}
}

.research-card-data-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 0.5rem;
}

/* status label styling */
.status-label-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	border: 1px solid var(--orange-400);
	width: fit-content;
	padding: 0.35rem;
	border-radius: 0.5rem;
	color: var(--orange-700);
	background-color: var(--orange-100);
	white-space: nowrap;
}

.research-card-title-label {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	align-items: center;
}

@media (min-width: 700px) {
	.research-card-title-label {
		flex-direction: row;
	}
}

.research-card-author-date-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
}

.author-container,
.calender-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	justify-content: center;
}

.author-name,
.calender-date {
	font-size: clamp(10px, 1.5vw, 12px);
}

.research-card-action-btn {
	background-color: var(--blue-700);
	color: var(--main-text-color-light);
	padding: 0.5rem;
	border-radius: 1rem;
	width: fit-content;
	white-space: nowrap;
	font-size: clamp(10px, 1.5vw, 16px);
}

/* hide elements */
.hide {
	display: none;
}

@media (min-width: 768px) {
	.hide {
		display: flex;
	}
}

.hide-btn {
	display: none;
}

@media (min-width: 1200px) {
	.hide-btn {
		display: flex;
		margin-left: auto;
		margin-right: 1rem;
	}
}

.action-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
}

@media (min-width: 768px) {
	.action-container .status-label-container {
		display: none;
	}
}

@media (min-width: 1200px) {
	.action-container .research-card-action-btn {
		display: none;
	}
}

/* colors labels green and red */
.finished-label {
	border: 1px solid var(--green-500);
	color: var(--green-700);
	background-color: var(--green-100);
}

.not-started-label {
	border: 1px solid var(--red-400);
	color: var(--red-400);
	background-color: var(--red-100);
}

</style>
