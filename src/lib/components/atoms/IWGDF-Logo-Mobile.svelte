<script>
  import logo from '$lib/assets/img/IWGDF-logo.webp';
  import logoDarkMode from '$lib/assets/img/footguard-icon-darkmode.webp';
</script>

<picture>
  <source srcset={logoDarkMode} media="(prefers-color-scheme: dark)" />
  <img src={logo} alt="IWGDF Logo" width="120" height="35" decoding="async" class="logo-img" />
</picture>

<style>
  .logo-img {
    display: block;
    width: 120px;
    height: auto;
    max-width: 100%;
  }
</style>
