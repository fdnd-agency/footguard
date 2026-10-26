<script>
    // voert code pas uit wanneer de HTML van dit component op de pagina staat
    import { onMount } from 'svelte'

    // array voor de font-sizes van klein naar groter (let ipv const, omdat de waarden nog kunnen veranderen)
    let fontSizeOffsets = [-1, 0, 3, 5]

    // deze functie werkt pas wanneer alle HTML is ingeladen
     onMount(() => {
        const trigger = document.querySelector('.accessibility-widget-trigger')
        const content = document.querySelector('.accessibility-widget-info-container')

        trigger.addEventListener('click', () => content.classList.add('is-open'))

        const groups = document.querySelectorAll('.size-buttons-container')

        //zoekt alle elementen met de class size-buttons-container. ForEach voert de functie voor elk element uit
        document.querySelectorAll('.size-buttons-container').forEach((group) => {
            // eventListener toegevoegd voor de click op de button
            group.addEventListener('click', (e) => {
                // e.target is de button waar je op dat moment op klikt en het resultaat daarvan bewaar je in de variabele clicked
                const clicked = e.target.closest('button')
                if (!clicked) return

                // pakt alle buttons in elke class met de naam size-buttons-container. De puntjes zet de resultaten om in een array
                const buttons = [...group.querySelectorAll('button')]

                // loopt langs elke button
                buttons.forEach((btn) => {
                    // zet aria-pressed om naar true of false. Hier maken we een vergelijking
                    btn.setAttribute('aria-pressed', btn === clicked)
                })

                // checkt of deze class de data-setting="font-size" heeft in HTML
                if (group.dataset.setting === 'font-size') {
                    // bepaalt welke offset wordt toegepast
                    const offset = fontSizeOffsets[buttons.indexOf(clicked)]
                    // offset toepassen met een CSS variabele en daarna krijg je de px waarde na het klikken op een button
                    document.documentElement.style.setProperty('--font-size-offset', `${offset}px`)
                }
            })
        })

        // zoekt naar de reset button
        const resetButton = document.querySelector('.accessibility-widget-reset-button')

        // onclick wordt de CSS variabele font-size-offset verwijderd
        resetButton.addEventListener('click', () => {
            document.documentElement.style.removeProperty('--font-size-offset')

            // gaat langs alle knoppen binnen het group class size-buttons-container en zet de button "normaal" weer op actief (z'n standaard waarde)
            groups.forEach((group) => {
                const buttons = [...group.querySelectorAll('button')]

                // gaat langs elke button en vergelijkt of de button gelijk is aan index 1 (de normale button). Als dat zo is dan is de uitkomst true en wordt de normaal button weer actief
                buttons.forEach((btn, index) => {
                    btn.setAttribute('aria-pressed', index === 1)
                })
            })
        })
    })
</script>

<button class="accessibility-widget-trigger">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-person-standing preview-icon"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>
    <span>Accessibility</span>
</button>

<section class="accessibility-widget-info-container">
    <h2>Content</h2>
    <div class="accessibility-widget-content">
        <fieldset class="size-container">
            <legend class="size-title-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-case-sensitive preview-icon"><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M22 9v7"/><path d="M3.304 13h6.392"/><circle cx="18.5" cy="12.5" r="3.5"/></svg>
            <strong>Font-size</strong>
            </legend>
            <div class="size-buttons-container" data-setting="font-size">
                <button type="button" aria-pressed="false">Small</button>
                <button type="button" aria-pressed="true">Normal</button>
                <button type="button" aria-pressed="false">Big</button>
                <button type="button" aria-pressed="false">Bigger</button>
            </div>
        </fieldset>

        <fieldset class="size-container">
            <legend class="size-title-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5h10"/><path d="M7 19h10"/><path d="M12 5v14"/></svg>
            <strong>Line-height</strong>
            </legend>
            <div class="size-buttons-container">
                <button type="button" aria-pressed="false">Small</button>
                <button type="button" aria-pressed="true">Normal</button>
                <button type="button" aria-pressed="false">Big</button>
                <button type="button" aria-pressed="false">Bigger</button>
            </div>
        </fieldset>

        <fieldset class="size-container">
            <legend class="size-title-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18"/><path d="M7 8l-4 4 4 4"/><path d="M17 8l4 4-4 4"/></svg>
            <strong>Letter-spacing</strong>
            </legend>
            <div class="size-buttons-container">
                <button type="button" aria-pressed="false">Small</button>
                <button type="button" aria-pressed="true">Normal</button>
                <button type="button" aria-pressed="false">Big</button>
                <button type="button" aria-pressed="false">Bigger</button>
            </div>
        </fieldset>
    </div>

    <h2>Colors</h2>
    <fieldset class="accessibility-widget-content">
        <legend>
            <strong>Grayscale</strong>
        </legend>
        <label class="accessibility-widget-switch">
            <input type="checkbox">
            <span class="accessibility-widget-switch-slider"></span>
        </label>
    </fieldset>

    <button class="accessibility-widget-reset-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw preview-icon"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        <span>Reset</span>
    </button>
</section>

<style>
    .accessibility-widget-trigger {
        display: flex;
        align-items: center;
        padding-block: .75em;
        padding-inline: 1em;
        border-radius: 24px;
        border: 2px solid black;
        background-color: white;

        span {
            font-size: 16px;
            font-weight: 500;
        }
    }

    .accessibility-widget-info-container {
        position: fixed;
        width: min(90vw, 28rem);
        height: fit-content;
        max-height: 73dvh;
        inset: 0;
        margin: auto;
        overflow-y: auto;
        border: 2px solid #C7C7C7;
        background-color: white;
        box-shadow: 0 0 0 100vmax rgb(0 0 0 / .6);
        padding: 1em;
        border-radius: 16px;
        opacity: 0;
        visibility: hidden;

        &:global(.is-open) {
            opacity: 1;
            visibility: visible;
        }

        h2 {
            border-bottom: 2px solid #DDDDDD;
            margin-bottom: .3em;

            &:not(:first-of-type) {
                margin-top: .7em;
            }
        }

        .accessibility-widget-content {
            border: none;

            .size-container {
                border: none;

                .size-title-container {
                    display: flex;
                    align-items: center;
                    gap: .5em;
                    margin-bottom: .5em;

                    svg {
                        box-sizing: content-box;
                        padding: .2rem;
                        background-color: #EBF0FA;
                        border-radius: 8px;
                    }
                }

                .size-buttons-container {
                    margin-bottom: 1em;

                        button {
                            border: 2px solid var(--blue-500);
                            box-shadow: var(--shadow-sm);
                            color: black;
                            padding-block: .25em;
                            padding-inline: .75em;
                            border-radius: var(--radius-sm);
                            font-size: 15px;
                            transition: background-color var(--transition-base), color var(--transition-base), border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);

                            &:focus-visible {
                                background-color: var(--blue-600);
                                color: var(--background-color-primary);
                            }

                            &[aria-pressed="true"] {
                                background: var(--blue-500);
                                color: var(--background-color-primary);

                                &:hover {
                                    background-color: var(--blue-600);
                                    color: var(--background-color-primary);
                                }
                            }

                            &[aria-pressed="false"] {
                                &:hover {
                                    background-color: var(--blue-600);
                                    color: var(--background-color-primary);
                                }
                            }
                        }
                    }
            }

            .accessibility-widget-switch {
                position: relative;
                display: inline-block;
                width: 35px;
                height: 20px;

                input {
                opacity: 0;
                width: 0;
                height: 0;

                    &:checked + .accessibility-widget-switch-slider {
                        background-color: var(--blue-500);
                        color: var(--background-color-primary);
                    }

                    &:checked + .accessibility-widget-switch-slider::before {
                        transform: translateX(15px);
                    }

                    &:focus-visible + .accessibility-widget-switch-slider {
                        outline: 2px solid var(--blue-500);
                        color: var(--background-color-primary);
                        outline-offset: 2px;
                    }
                }

                .accessibility-widget-switch-slider {
                    position: absolute;
                    inset: 0;
                    background-color: var(--grey-300);
                    border-radius: var(--radius-full);
                    cursor: pointer;
                    transition: .4s;

                    &::before {
                        content: "";
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        left: 2px;
                        bottom: 2px;
                        background-color: white;
                        border-radius: 50%;
                        transition: .4s;
                    }
                }
            }
        }

        .accessibility-widget-reset-button {
            display: flex;
            align-items: center;
            background-color: var(--blue-500);
            color: var(--background-color-primary);
            padding-block: .5em;
            padding-inline: 1em;
            border-radius: 1rem;
            margin-inline-start: auto;
            margin-top: 2em;
            gap: .5em;
            box-shadow: var(--shadow-sm);
            border-radius: var(--radius-sm);
            transition: background-color var(--transition-base), color var(--transition-base), border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);

            &:hover,
            &:focus-visible {
                background-color: var(--blue-600);
                color: var(--background-color-primary);
            }
        }

        span {
            font-weight: 500;
            font-size: 16px;
        }
    }
</style>
