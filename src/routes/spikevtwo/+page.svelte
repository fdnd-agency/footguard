<script>
    import footerIcon from "$lib/assets/svg/arrow-footer.svg";
    import facebook from "$lib/assets/svg/facebook.svg";
    import instagram from "$lib/assets/svg/instagram.svg";
    import linkedin from "$lib/assets/svg/linkedin.svg";
</script>

<footer>
    <section class="footer-title-container">
        <h3>
            Our team is dedicated to providing excellent service and support
            every day.
        </h3>

        <a class="quote-button button-styling" href="">
            Get a Quote now
            <img src={footerIcon} height="25" width="25" alt="" />
        </a>
    </section>

    <section class="quote-container">
        <h4 class="quote-container-title">Take your weekend back</h4>

        <div class="button-container-quote">
            <a href="" class="button-styling">Build a Plan</a>

            <a href="" class="button-styling">Request Service</a>
        </div>
    </section>

    <div class="info-main-container-1">
        <ul class="for-info">
            <li class="list-title-styling">For</li>
            <li><a href="">Homeowners</a></li>
            <li><a href="">Realtors</a></li>
            <li><a href="">Services Pros</a></li>
            <li><a href="">Maintainance</a></li>
        </ul>

        <ul class="company-info">
            <li class="list-title-styling">Company</li>
            <li><a href="">About</a></li>
            <li><a href="">Careers</a></li>
            <li><a href="">Media</a></li>
            <li><a href="">Contact</a></li>
        </ul>

        <ul class="brochures-info">
            <li class="list-title-styling">Brochures</li>
            <li><a href="">Arizona</a></li>
            <li><a href="">Nevada</a></li>
            <li><a href="">Utah</a></li>
            <li><a href="">Nevada</a></li>
        </ul>
    </div>

    <div class="contact-container">
        <ul class="contact-info">
            <li class="list-title-styling">Contact</li>
            <li><a href="tel:+123-234-8867">123-234-8867</a></li>
            <li><a href="mailto:info@lorem.com">info@lorem.com</a></li>
        </ul>

        <nav class="social-media">
            <ul>
                <li class="instagram">
                    <a href="https://www.instagram.com/"
                        ><img
                            src={instagram}
                            alt="Instagram"
                            height="40"
                            width="40"
                        /></a>
                </li>

                <li class="linkedin">
                    <a href="https://nl.linkedin.com/"
                        ><img
                            src={linkedin}
                            alt="Linkedin"
                            height="40"
                            width="40"
                        /></a>
                </li>

                <li class="facebook">
                    <a href="https://www.facebook.com/?locale=nl_NL"
                        ><img
                            src={facebook}
                            alt="Facebook"
                            height="40"
                            width="40"
                        /></a>
                </li>
            </ul>
        </nav>
    </div>
</footer>

<style>
    :root {
        --space-xxs: 0.125rem;
        --space-xs: 0.25rem;
        --space-sm: 0.5rem;
        --space-md: 1rem;
        --space-lg: 1.5rem;
        --space-xl: 2rem;
        --space-xxl: 3rem;
        --space-xxxl: 4rem;
        --space-xxxxl: 6rem;

        h4 {
            font-size: clamp(2.5rem, 4vw, 3rem);
            font-weight: 600;
        }

        h3 {
            font-size: clamp(2rem, 4vw, 3.5rem);
            font-weight: 600;
        }

        a {
            text-decoration: none;
        }

        li {
            list-style-type: none;
            padding: var(--space-xs);
        }

        .button-styling {
            background-color: rgb(70, 38, 250);
            padding: var(--space-sm);
            border-radius: 5px;
            color: white;
        }

        .list-title-styling {
            color: #000000;
            font-weight: 700;
            font-size: larger;
        }
    }

    footer {
        --mask: radial-gradient(24.49px at 50% 33.6px, #000 99%, #0000 101%)
                calc(50% - 42px) 0/84px 100%,
            radial-gradient(24.49px at 50% -12.6px, #0000 99%, #000 101%) 50%
                21px/84px 100% repeat-x;
        -webkit-mask: var(--mask);
        mask: var(--mask);

        display: grid;
        grid-template-rows: auto;
        grid-template-columns: auto;
        padding-top: 5rem;
        background-color: #f4db5e;

        @media (min-width: 730px) {
            grid-template-columns: 1fr 1fr;
        }
    }

    .footer-title-container {
        background-color: orange;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        justify-content: center;
        align-items: center;

        padding: var(--space-xl);

        @media (min-width: 730px) {
            grid-column: 1 / 3;
        }

        h3 {
            text-align: center;
        }

        .quote-button {
            display: flex;
            flex-direction: row;
            gap: var(--space-sm);
            align-items: center;
        }
    }

    .quote-container {
        background-color: rgb(243, 171, 88);

        padding: var(--space-xxl);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--space-xl);
        padding-top: 3rem;
        padding-bottom: 5rem;

        @media (min-width: 400px) {
            grid-column: 1;
        }

        @media (min-width: 700px) {
            --mask: radial-gradient(
                        8.48px at calc(100% - 10.8px) 50%,
                        #000 99%,
                        #0000 101%
                    )
                    0 calc(50% - 16px) / 100% 32px,
                radial-gradient(
                        8.48px at calc(100% + 2.8px) 50%,
                        #0000 99%,
                        #000 101%
                    )
                    calc(100% - 8px) 50%/100% 32px repeat-y;
            -webkit-mask: var(--mask);
            mask: var(--mask);
        }

        h4 {
            text-align: center;
            max-width: 30rem;
        }

        .button-container-quote {
            display: flex;
            flex-direction: row;
            gap: var(--space-md);

            a {
            }
        }
    }

    .info-main-container-1 {
        background-color: rgb(243, 236, 153);
        padding: var(--space-md);
        display: flex;
        flex-direction: column;
        gap: var(--space-md);

        @media (min-width: 700px) {
            --mask: radial-gradient(
                        8.48px at calc(100% - 10.8px) 50%,
                        #000 99%,
                        #0000 101%
                    )
                    0 calc(50% - 16px) / 100% 32px,
                radial-gradient(
                        8.48px at calc(100% + 2.8px) 50%,
                        #0000 99%,
                        #000 101%
                    )
                    calc(100% - 8px) 50%/100% 32px repeat-y;
            -webkit-mask: var(--mask);
            mask: var(--mask);
        }

        @media (min-width: 900px) {
            mask: none;
        }

        @media (min-width: 900px) {
            flex-direction: row;
            justify-content: center;
            gap: var(--space-xxl);
            grid-row: 3;
            grid-column: 2;
            justify-content: flex-start;
        }
    }

    .for-info > *:not(:first-child),
    .company-info > *:not(:first-child),
    .brochures-info > *:not(:first-child),
    .contact-info > *:not(:first-child) {
        font-size: clamp(1rem, 3vw, 1.2rem);
    }

    .contact-container {
        padding: var(--space-md);
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);

        @media (min-width: 700px) {
            grid-column: 2;
            grid-row: 2 / 3;
            align-self: center;
        }
    }

    .social-media ul {
        display: flex;
        flex-direction: row;
        justify-content: first baseline;
        gap: var(--space-sm);
    }

    .facebook,
    .instagram,
    .linkedin {
        display: flex;
        align-items: center;
        gap: var(--space-sm);

        a {
            margin: 0;
            padding: 0;
            line-height: 1;
        }
    }

    /* standaard underline */
    .for-info > *:not(:first-child),
    .company-info > *:not(:first-child),
    .brochures-info > *:not(:first-child),
    .contact-info > *:not(:first-child) {
        :hover {
            text-decoration: underline;
            text-decoration-thickness: 4px;
            text-decoration-color: rgb(120, 96, 254);
        }
    }

    /* als text-decoration-inset supported is wordt dit uitgevoerd. Dit werkt nu nog alleen op FireFox */
    @supports (text-decoration-inset: 100px) {
        .for-info > *:not(:first-child),
        .company-info > *:not(:first-child),
        .brochures-info > *:not(:first-child),
        .contact-info > *:not(:first-child) {
            :hover {
                animation: border 0.3s ease;
                text-decoration: underline;
                text-decoration-thickness: 4px;
                text-decoration-color: rgb(120, 96, 254);
            }
        }

        @keyframes border {
            from {
                text-decoration-inset: 100px;
            }
            to {
                text-decoration-inset: 0;
            }
        }
    }
</style>
