<article class="accessibility-widget-info-container">
    <h2>Content</h2>
    <section class="accessibility-widget-content">
        <div class="size-container">
            <div class="size-title-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings preview-icon"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
                <strong>Font-size</strong>
            </div>
            <div class="size-buttons-container">
                <button>Klein</button>
                <button>Normaal</button>
                <button>Groot</button>
                <button>Groter</button>
            </div>
        </div>

        <div class="size-container">
            <div class="size-title-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings preview-icon"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
                <strong>Line-height</strong>
            </div>
            <div class="size-buttons-container">
                <button>Klein</button>
                <button>Normaal</button>
                <button>Groot</button>
                <button>Groter</button>
            </div>
        </div>

        <div class="size-container">
            <div class="size-title-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings preview-icon"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
                <strong>Letter-spacing</strong>
            </div>
            <div class="size-buttons-container">
                <button>Klein</button>
                <button>Normaal</button>
                <button>Groot</button>
                <button>Groter</button>
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
</article>

<style>
    .accessibility-widget-info-container {
        border: 2px solid #C7C7C7;
        padding: 1em;
        margin-inline: 1em;
        border-radius: 16px;

        h2 {
            margin-bottom: .3em;
        }

        .accessibility-widget-content {
            border: 2px solid #DDDDDD;
            padding: .5em;
            border-radius: 12px;

            .size-container {
                .size-title-container {
                    display: flex;
                    gap: .5em;
                    margin-bottom: .5em;
                }

                .size-buttons-container {
                    margin-bottom: 1em;

                        button {
                            border: 2px solid dodgerblue;
                            padding-block: .25em;
                            padding-inline: .75em;
                            border-radius: 8px;
                            font-weight: 500;
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
    }
</style>
