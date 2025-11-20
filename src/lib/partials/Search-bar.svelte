<script>
    export let form;

    // add class to component
    let className = "";
    export { className as class };

    // dynamic data search input to reuse
    export let labelText = "";
    export let searchBar_ID = "";
</script>

<div class="input-bar-container">
    <input type="text" name="searchbar" class="input-bar" placeholder="" id="{searchBar_ID}">
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

            border-radius: 0.5rem;
            padding: 0.5rem;
            border: 0.5px solid var(--blue-700);

            background-color: var(--background-color-primary);
            color: var(--grey-700);
            font-size: clamp(13px, 1.1vw, 15px);

            background-image: url("/src/lib/assets/svg/search-icon.svg");
            background-repeat: no-repeat;
            background-position: left 0.5rem center;
            transition: 0.2s ease-in-out;
            padding-left: 2rem;

            &:hover {
                border-color: var(--blue-500);
            }

            &:focus {
                outline: 2px solid var(--orange-400);
                border: 0.5px solid var(--orange-400);
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

        color: var(--grey-200);
        font-size: clamp(13px, 1.5vw, 15px);
    }

    /* als er een focus op de input is of als de placeholder niet meer zichtbaar is wordt op de .form-label de css uitgevoerd */
    .input-bar:focus + .form-label,
    .input-bar:not(:placeholder-shown) + .form-label {
        transform: translateY(-45px);
        transition: transform 0.3s ease-in-out;
        color: var(--grey-600);
    }

    @container (min-width: 60rem) {
        .input-bar:focus + .form-label,
        .input-bar:not(:placeholder-shown) + .form-label {
            transform: translateY(-50%) translateX(10.6rem);
            transition: transform 0.5s ease;

            background-color: var(--blue-700);
            padding: 0.5rem;
            border-radius: 0.5rem;
            color: var(--background-color-secondary);
        }
    }
</style>
