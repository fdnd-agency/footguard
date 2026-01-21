<script>
    // Components
    import FilterButton from "$lib/components/buttons/FilterButton.svelte";

    // Hiermee kan je custom events naar de parent page sturen in dit geval research
    import { createEventDispatcher } from "svelte";

    let { status, theme } = $props();

    // Het aanmaken van een een dispatch functie. Dus het aanmaken van de functie de data terugstuurt naar de parent
    const sendEvent = createEventDispatcher();

    // Functie waarmee de sendEvent wordt uitgevoerd.
    // Door een on:change. Dus als de waarde van status of theme veranderd wordt de functie handleChange uitgevoerd.
    // SendEvent stuurt daadwerkelijk de data naar de parent
    function handleChange() {
        sendEvent("change", {status,theme});}
</script>

<form method="get" class="filter-form-container">
	<label for="status" class="visually-hidden">filter status</label>
	<select id="status" name="status" class="filter-button" bind:value={status} on:change={handleChange}>
		<option value="all">Status</option>
		<option value="Not started">Not started</option>
		<option value="Finished">Finished</option>
		<option value="In progress">In progress</option>
	</select>

	<label for="theme" class="visually-hidden">filter theme</label>
	<select id="theme" name="theme" class="filter-button" bind:value={theme} on:change={handleChange}>
		<option value="all">Themes</option>
		<option value="Temperature">Temperature</option>
		<option value="Ulcers">Ulcers</option>
		<option value="High risk">High-Risk</option>
		<option value="Age">Age</option>
	</select>

	<noscript>
		<button class="submit-button" type="submit">Filter</button>
	</noscript>
</form>

<style>
    .filter-form-container {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: flex-start;

        @media (min-width: 560px) {
            justify-content: flex-end;
        }
    }

    :global(.filter-button) {
        background: none;
        color: inherit;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        appearance: none;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 8rem;

        border-radius: 0.5rem;
        padding: 0.5rem;

        background-color: var(--blue-700);
        color: var(--background-color-secondary);
        font-size: clamp(13px, 1.5vw, 15px);

        background-image: url("/src/lib/assets/svg/select-button-arrow.svg");
        background-repeat: no-repeat;
        background-position: right 0.5rem center;
        background-size: 1rem;
        transition: 0.2s ease-in-out;

        &:hover {
            background-color: var(--blue-500);
        }

        &:focus {
            outline: 2px solid var(--orange-400);
        }
    }

    .visually-hidden {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }

    .submit-button {
        background: none;
        color: inherit;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        appearance: none;

        border-radius: 0.5rem;
        padding: 0.5rem;

        background-color: var(--red-500);
        color: var(--background-color-secondary);
        font-size: clamp(13px, 1.5vw, 15px);
    }
</style>
