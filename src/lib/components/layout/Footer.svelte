<script>
  export let year = new Date().getFullYear();
  export let logoSrc = "/src/lib/assets/IWGDF-logo.png";
</script>

<footer class="footer">
  <div class="footer-content">
    <img src={logoSrc} alt="IWGDF Logo" class="footer-logo" />

    <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/address -->
    <address class="footer-madeby">
      <strong>Made by:</strong> Kim Nikita Schijf, Ravi Tjikhoeri, Süleyman Huzeyfe
      Gökgül
    </address>

    <p class="footer-info">
      &copy; {year} Footguard.
      <a
        href="https://iwgdfguidelines.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        IWGDF
      </a>
    </p>
  </div>
</footer>

<style>
  .footer {
    width: 100%;
    background-color: var(--background-color-primary);
    padding: 1rem 0;
    display: flex;
    justify-content: center;

    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      max-width: calc(100% - 2rem);
      margin: 0 1rem;
      text-align: center;

      .footer-logo {
        height: 28px;
        width: auto;
        margin: 0 1.5rem;
      }

      .footer-madeby {
        font-family: var(--main-font);
        font-size: clamp(14px, 1.5vw, 15px);
        font-style: normal;
        line-height: 1.6;
      }

      .footer-info {
        font-family: var(--main-font);
        font-size: clamp(14px, 1.5vw, 15px);

        a {
          color: var(--blue-600);
          font-weight: 600;
          text-decoration: underline;
          transition: color 0.2s;

          &:hover {
            color: var(--orange-500);
            outline: none;
          }

          &:focus-visible {
            outline: 3px solid var(--blue-500);
            outline-offset: 2px;
          }
        }
      }

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: center;
        text-align: left;
        gap: 1.5rem;
        padding: 0 1.5rem;
      }

      @media (min-width: 1024px) {
        justify-content: space-between;
        margin-left: 15rem;
        margin-right: 3rem;
        max-width: calc(100% - 18rem);
      }
    }
  }
</style>
