<script>
    // voert code pas uit wanneer de HTML van dit component op de pagina staat
    import { onMount } from 'svelte'

    // array voor de font-sizes van klein naar groter (let ipv const, omdat de waarden nog kunnen veranderen)
    let fontSizeOffsets = [-1, 0, 3, 5]

    // deze functie werkt pas wanneer alle HTML is ingeladen
     onMount(() => {
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

<article class="accessibility-widget-info-container">
    <h2>Content</h2>
    <section class="accessibility-widget-content">
        <div class="size-container">
            <div class="size-title-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-case-sensitive preview-icon"><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M22 9v7"/><path d="M3.304 13h6.392"/><circle cx="18.5" cy="12.5" r="3.5"/></svg>
            <strong>Font-size</strong>
            </div>
            <div class="size-buttons-container" data-setting="font-size">
                <button aria-pressed="false">Klein</button>
                <button aria-pressed="true">Normaal</button>
                <button aria-pressed="false">Groot</button>
                <button aria-pressed="false">Groter</button>
            </div>
        </div>

        <div class="size-container">
            <div class="size-title-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5h10"/><path d="M7 19h10"/><path d="M12 5v14"/></svg>
            <strong>Line-height</strong>
            </div>
            <div class="size-buttons-container">
                <button aria-pressed="false">Klein</button>
                <button aria-pressed="true">Normaal</button>
                <button aria-pressed="false">Groot</button>
                <button aria-pressed="false">Groter</button>
            </div>
        </div>

        <div class="size-container">
            <div class="size-title-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18"/><path d="M7 8l-4 4 4 4"/><path d="M17 8l4 4-4 4"/></svg>
            <strong>Letter-spacing</strong>
            </div>
            <div class="size-buttons-container">
                <button aria-pressed="false">Klein</button>
                <button aria-pressed="true">Normaal</button>
                <button aria-pressed="false">Groot</button>
                <button aria-pressed="false">Groter</button>
            </div>
        </div>
    </section>

    <h2>Colors</h2>
    <section class="accessibility-widget-content">
        <strong>Grayscale</strong>
        <br>
        <label class="accessibility-widget-switch">
            <input type="checkbox">
            <span class="accessibility-widget-switch-slider"></span>
        </label>
    </section>

    <button class="accessibility-widget-reset-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw preview-icon"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        <p>Reset</p>
    </button>
</article>

<style>
    .accessibility-widget-info-container {
        border: 2px solid #C7C7C7;
        padding: 1em;
        margin-inline: 1em;
        border-radius: 16px;

        h2 {
            margin-bottom: .3em;

            &:not(:first-of-type) {
                margin-top: .7em;
            }
        }

        .accessibility-widget-content {
            border: 2px solid #DDDDDD;
            padding: .5em;
            border-radius: 12px;

            .size-container {
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
                            border: 2px solid dodgerblue;
                            padding-block: .25em;
                            padding-inline: .75em;
                            border-radius: 8px;
                            font-weight: 500;
                            font-size: 13.7px;

                            &[aria-pressed="true"] {
                                background: dodgerblue;
                            }
                        }
                    }
            }
        }

        .accessibility-widget-content {
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
                        background-color: dodgerblue;
                    }

                    &:checked + .accessibility-widget-switch-slider::before {
                        transform: translateX(15px);
                    }

                    &:focus-visible + .accessibility-widget-switch-slider {
                        outline: 2px solid dodgerblue;
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
            background-color: dodgerblue;
            padding-block: .5em;
            padding-inline: 1em;
            border-radius: 1rem;
            margin-inline-start: auto;
            margin-top: 2em;
            gap: .5em;
        }

        p {
            font-weight: 500;
            font-size: 16px;
        }
    }
</style>
