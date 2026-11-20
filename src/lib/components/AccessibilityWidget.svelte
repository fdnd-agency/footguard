<button class="accessibility-widget-trigger" popovertarget="accessibility-widget">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-person-standing preview-icon"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>
    <span>Accessibility</span>
</button>

<form id="accessibility-widget" class="accessibility-widget-info-container" popover>
    <button class="accessibility-widget-close-button" type="button" popovertarget="accessibility-widget" popovertargetaction="hide">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        <span>Close</span>
    </button>

    <h2>Content</h2>
    <div class="accessibility-widget-content">
        <fieldset class="size-container">
            <legend class="size-title-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-case-sensitive preview-icon"><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M22 9v7"/><path d="M3.304 13h6.392"/><circle cx="18.5" cy="12.5" r="3.5"/></svg>
            <strong>Font-size</strong>
            </legend>
            <div class="size-buttons-container">
                <input type="radio" name="font-size" id="font-small">
                <label for="font-small">Small</label>

                <input type="radio" name="font-size" id="font-normal" checked>
                <label for="font-normal">Normal</label>

                <input type="radio" name="font-size" id="font-large">
                <label for="font-large">Large</label>

                <input type="radio" name="font-size" id="font-larger" >
                <label for="font-larger">Larger</label>
            </div>
        </fieldset>

        <fieldset class="size-container">
            <legend class="size-title-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 5h10"/><path d="M7 19h10"/><path d="M12 5v14"/></svg>
            <strong>Line-height</strong>
            </legend>
            <div class="size-buttons-container">
                <input type="radio" name="line-height" id="line-small">
                <label for="line-small">Small</label>

                <input type="radio" name="line-height" id="line-normal" checked>
                <label for="line-normal">Normal</label>

                <input type="radio" name="line-height" id="line-large">
                <label for="line-large">Large</label>

                <input type="radio" name="line-height" id="line-larger" >
                <label for="line-larger">Larger</label>
            </div>
        </fieldset>

        <fieldset class="size-container">
            <legend class="size-title-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18"/><path d="M7 8l-4 4 4 4"/><path d="M17 8l4 4-4 4"/></svg>
            <strong>Letter-spacing</strong>
            </legend>
            <div class="size-buttons-container">
                <input type="radio" name="letter-spacing" id="lett-spacing-small">
                <label for="lett-spacing-small">Small</label>

                <input type="radio" name="letter-spacing" id="lett-spacing-normal" checked>
                <label for="lett-spacing-normal">Normal</label>

                <input type="radio" name="letter-spacing" id="lett-spacing-large">
                <label for="lett-spacing-large">Large</label>

                <input type="radio" name="letter-spacing" id="lett-spacing-larger" >
                <label for="lett-spacing-larger">Larger</label>
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

    <button class="accessibility-widget-reset-button" type="reset">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw preview-icon"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        <span>Reset</span>
    </button>
</form>

<style>
    .accessibility-widget-trigger {
        display: flex;
        align-items: center;
        position: fixed;
        right: var(--spacing-md);
        bottom: var(--spacing-md);
        z-index: 10;
        padding-block: var(--spacing-sm);
        padding-inline: var(--spacing-md);
        border-radius: var(--radius-xl);
        border: 2px solid black;
        background-color: white;

        span {
            font-weight: 500;
        }
    }

    .accessibility-widget-info-container {
        position: fixed;
        inset: 0;
        margin: auto;
        width: min(90vw, 28rem);
        height: fit-content;
        max-height: 73dvh;
        overflow-y: auto;
        border: 2px solid #C7C7C7;
        background-color: white;
        padding: var(--spacing-md);
        border-radius: var(--radius-lg);

        &::backdrop {
            background-color: rgb(0 0 0 / .6);
        }
        .accessibility-widget-close-button {
            display: flex;
            align-items: center;
            margin-inline-start: auto;
        }

        @media (prefers-color-scheme: dark) {
            background-color: var(--background-color-primary);
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
                    gap: var(--spacing-xs);
                    margin-bottom: var(--spacing-xs);

                    svg {
                        box-sizing: content-box;
                        padding: .2rem;
                        background-color: #EBF0FA;
                        border-radius: var(--radius-sm);
                    }
                }

                .size-buttons-container {
                    margin-block: var(--spacing-xs) 1.75rem;

                    input {
                        appearance: none;

                        &:checked + label {
                            background-color: var(--blue-500);
                            color: var(--background-color-primary);

                            &:hover {
                                background-color: var(--blue-600);
                            }
                        }
                    }

                    label {
                        padding-block: var(--spacing-xs);
                        padding-inline: var(--spacing-sm);
                        border: 2px solid var(--blue-500);
                        box-shadow: var(--shadow-sm);
                        border-radius: var(--radius-sm);
                        transition: background-color var(--transition-base), color var(--transition-base), border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
                        cursor: pointer;
                        
                        &:hover {
                            background-color: var(--blue-600);
                            border-color: var(--blue-600);
                            color: var(--background-color-primary);
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
            padding-block: var(--spacing-xs);
            padding-inline: var(--spacing-md);
            margin-inline-start: auto;
            margin-top: var(--spacing-lg);
            gap: var(--spacing-xs);
            box-shadow: var(--shadow-sm);
            border-radius: var(--radius-sm);
            transition: background-color var(--transition-base), color var(--transition-base), border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);

            &:hover,
            &:focus-visible {
                background-color: var(--blue-600);
                color: var(--background-color-primary);
            }
        }
    }

    :global(:root:has(#font-small:checked)) { --font-size-offset: -1px; }
    :global(:root:has(#font-large:checked)) { --font-size-offset: 3px; }
    :global(:root:has(#font-larger:checked)) { --font-size-offset: 5px; }
</style>
