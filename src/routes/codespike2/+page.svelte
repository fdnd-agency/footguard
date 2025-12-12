<section class="portal-form" aria-labelledby="portal-form-title">
    <div class="portal-form-card">
        <header class="portal-form-header">
            <h2 id="portal-form-title">Portal reserveren</h2>
            <p>
                Vul je gegevens in en stap via de interdimensionale portal naar
                je volgende bestemming.
            </p>
        </header>

        <form class="portal-form-form">
            <fieldset class="portal-form-fieldset">
                <legend class="portal-form-legend">Reizigersinfo</legend>

                <div class="portal-form-field">
                    <label for="name">Naam</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Rick Sanchez"
                        autocomplete="name"
                    />
                </div>

                <div class="portal-form-field">
                    <label for="email">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="rick@citadel.space"
                        autocomplete="email"
                    />
                </div>

                <div class="portal-form-field">
                    <label for="dimension">Doeldimensie</label>
                    <select id="dimension" name="dimension">
                        <option value="">Kies een dimensie…</option>
                        <option value="c-137">C-137 (Home)</option>
                        <option value="post-apoc">Post-apocalyptisch</option>
                        <option value="tiny-ricks">Tiny Rick Universe</option>
                        <option value="cable">Interdimensionale kabel</option>
                    </select>
                </div>
            </fieldset>

            <div class="portal-form-footer">
                <button class="portal-button" type="submit">
                    <span>Open Portal</span>
                </button>

                <small class="portal-form-note">
                    Door door de portal te stappen accepteer je alle tijdlijnen,
                    glitches en onverwachte outcomes.
                </small>
            </div>
        </form>
    </div>
</section>

<style>
    .portal-form {
        container-type: inline-size;
        container-name: portal-form;
        width: 100%;
        max-width: 420px;
        color: #f7f8ff;

        .portal-form-card {
            position: relative;
            overflow: hidden;
            isolation: isolate;
            padding: 1.75rem 1.5rem 1.4rem;
            border-radius: 1.25rem;
            border: 1px solid #1b2135;
            background: radial-gradient(
                circle at top,
                #1b2540 0,
                #05060c 55%,
                #020208 100%
            );
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.55);

            @supports (color: oklch(60% 0.2 145)) {
                border-color: color-mix(
                    in oklch,
                    oklch(35% 0.05 260) 70%,
                    black
                );
            }

            &::before {
                content: "";
                position: absolute;
                inset: -40% -20% auto;
                height: 140px;
                pointer-events: none;
                z-index: 0;
                opacity: 0.9;
                background: radial-gradient(
                    circle,
                    rgba(132, 255, 120, 0.18) 0,
                    transparent 60%
                );

                @supports (color: color-mix(in oklch, white, black)) {
                    background: radial-gradient(
                        circle,
                        color-mix(in oklch, oklch(85% 0.2 145) 25%, transparent)
                            0,
                        transparent 60%
                    );
                }
            }

            > * {
                position: relative;
                z-index: 1;
            }
        }

        .portal-form-header {
            margin-bottom: 1.25rem;

            h2 {
                margin: 0 0 0.25rem;
                font-size: 1.2rem;
                letter-spacing: 0.06em;
                text-transform: uppercase;
            }

            p {
                margin: 0;
                font-size: 0.85rem;
                color: #a3aac7;

                @supports (color: oklch(78% 0.03 270)) {
                    color: oklch(78% 0.03 270);
                }
            }
        }

        .portal-form-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .portal-form-fieldset {
            border: 0;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
        }

        .portal-form-legend {
            font-size: 0.8rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #a3aac7;

            @supports (color: oklch(78% 0.03 270)) {
                color: oklch(78% 0.03 270);
            }
        }

        .portal-form-field {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            label {
                font-size: 0.8rem;
                color: #a3aac7;

                @supports (color: oklch(78% 0.03 270)) {
                    color: oklch(78% 0.03 270);
                }
            }

            input,
            select {
                appearance: none;
                border-radius: 0.75rem;
                border: 1px solid #30354a;
                background: #080a12;
                color: #f7f8ff;
                padding: 0.55rem 0.8rem;
                font-size: 0.9rem;
                outline: none;

                @supports (color: oklch(98% 0.02 270)) {
                    color: oklch(98% 0.02 270);
                    background: color-mix(
                        in oklch,
                        oklch(14% 0.03 260) 85%,
                        black
                    );
                    border-color: color-mix(
                        in oklch,
                        oklch(45% 0.05 260) 60%,
                        black
                    );
                }

                &:focus-visible {
                    border-color: #8ee36c;

                    @supports (color: oklch(82% 0.22 145)) {
                        border-color: oklch(82% 0.22 145);
                    }
                }

                &::placeholder {
                    color: #70769a;
                }
            }
        }

        .portal-form-footer {
            margin-top: 0.4rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .portal-form-note {
            font-size: 0.75rem;
            color: #a3aac7;

            @supports (color: oklch(78% 0.03 270)) {
                color: oklch(78% 0.03 270);
            }
        }
    }

    @container portal-form (max-width: 380px) {
        .portal-form {
            max-width: 100%;

            .portal-form-card {
                padding: 1.4rem 1.1rem 1.1rem;
            }

            .portal-form-header h2 {
                font-size: 1.05rem;
            }
        }

        .portal-button {
            padding-inline: 1.6rem;
        }
    }

    @container portal-form (max-width: 320px) {
        .portal-form {
            .portal-form-card {
                padding: 1.2rem 1rem 1rem;
            }

            .portal-form-field input,
            .portal-form-field select {
                font-size: 0.85rem;
            }
        }
    }

    .portal-button {
        position: relative;
        padding: 0.9rem 3rem;
        border-radius: 999px;
        border: 2px solid #c5ffab;
        background: radial-gradient(
                circle at 30% 20%,
                #ffffff20 0,
                transparent 40%
            ),
            radial-gradient(circle at 70% 80%, #ffffff15 0, transparent 45%),
            radial-gradient(circle, #2c8a26, #0a3810);
        color: #071a05;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        cursor: pointer;
        overflow: hidden;
        isolation: isolate;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition:
            transform 0.2s ease-out,
            border-color 0.2s ease-out;

        span {
            position: relative;
            z-index: 3;
        }

        @supports (color: color-mix(in oklch, white, black)) {
            border-color: color-mix(in oklch, oklch(85% 0.2 145) 55%, white);
        }

        &::before,
        &::after {
            content: "";
            position: absolute;
            inset: -40%;
            border-radius: 50%;
            mix-blend-mode: screen;
            pointer-events: none;
        }

        &::before {
            background: radial-gradient(
                    circle at 30% 30%,
                    #f6ff9c 0 6%,
                    transparent 30%
                ),
                radial-gradient(
                    circle at 70% 40%,
                    #ffffffcc 0 4%,
                    transparent 26%
                ),
                radial-gradient(
                    circle at 50% 70%,
                    #ffffffb0 0 5%,
                    transparent 28%
                ),
                conic-gradient(
                    from 0deg,
                    #a4ff57,
                    #66d436,
                    #2c8a26,
                    #66d436,
                    #a4ff57
                );
            filter: blur(1px);
            transform: scale(0.9);
            animation:
                portal-spin 12s linear infinite,
                portal-pulse 1300ms ease-in-out infinite alternate;
        }

        &::after {
            inset: -25%;
            background: radial-gradient(
                    circle at 10% 20%,
                    #ffffff80 0 4%,
                    transparent 25%
                ),
                radial-gradient(
                    circle at 80% 80%,
                    #ffffff80 0 3%,
                    transparent 24%
                ),
                conic-gradient(
                    from 90deg,
                    #2c8a26,
                    #66d436,
                    #a4ff57,
                    #66d436,
                    #2c8a26
                );
            filter: blur(2px);
            animation:
                portal-spin-reverse 16s linear infinite,
                portal-pulse-inner 1400ms ease-in-out infinite alternate;
        }

        &:hover,
        &:focus-visible {
            outline: none;
            transform: translateY(-2px) scale(1.03);

            &::before {
                animation-duration: 3.2s, 1300ms;
            }
            &::after {
                animation-duration: 4s, 1400ms;
            }
        }
    }

    @keyframes portal-spin {
        to {
            transform: scale(0.9) rotate(360deg);
        }
    }

    @keyframes portal-spin-reverse {
        to {
            transform: scale(0.95) rotate(-360deg);
        }
    }

    @keyframes portal-pulse {
        0% {
            filter: blur(1px);
        }
        100% {
            filter: blur(3px);
        }
    }

    @keyframes portal-pulse-inner {
        0% {
            filter: blur(2px);
        }
        100% {
            filter: blur(4px);
        }
    }
</style>
