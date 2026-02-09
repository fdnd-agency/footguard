<script>

    // dynamic data search input to reuse
    let { searchBar_ID, labelText } = $props();

</script>

<div class="input-bar-container">
    <input type="search" name="searchbar" class="input-bar" placeholder="" id="{searchBar_ID}">
    <label class="form-label" for="{searchBar_ID}">{labelText}</label>
</div>

<style>
    .input-bar-container {
        container-type: inline-size;
        position: relative;

        & .input-bar {
            background: none;
            color: inherit;
            padding: 0;
            font: inherit;
            cursor: pointer;
            outline: inherit;
            appearance: none;
            border: none;

            padding: 0.5rem;
            border-bottom: 2px solid rgba(255, 166, 0, 0);

            background-color: var(--background-color-secondary);
            color: var(--grey-700);
            font-size: clamp(13px, 1.1vw, 15px);

            background-image: url("/src/lib/assets/svg/search-icon.svg");
            background-repeat: no-repeat;
            background-position: left 0.5rem center;
            transition: 0.2s ease-in-out;
            padding-left: 2rem;

            &:focus {
                border-bottom: 2px solid var(--blue-700);
            }

            &:hover {
                border-bottom-color: var(--blue-500);
            }
        }
    }

    .form-label {
        position: absolute;
        top: 50%;
        left: 40px;
        transform: translateY(-50%);
        transition: transform 0.3s ease;
        pointer-events: none;

        color: var(--grey-500);
        font-size: clamp(13px, 1.5vw, 15px);
    }

    /* als er een focus op de input is of als de placeholder niet meer zichtbaar is wordt op de .form-label de css uitgevoerd */
    .input-bar:focus + .form-label,
    .input-bar:not(:placeholder-shown) + .form-label {
        transform: translateY(-35px);
        transition: transform 0.3s ease-in-out;
        color: var(--grey-400);
    }

    @container (min-width: 50rem) {
        .input-bar:focus + .form-label,
        .input-bar:not(:placeholder-shown) + .form-label {
            transform: translateY(-50%) translateX(10.3rem);
            transition: transform 0.5s ease;

            background-color: var(--blue-700);
            padding: 0.5rem;
            border-radius: 0.5rem;
            color: var(--background-color-secondary);
        }
    }
</style>
