<script>
  import logo from '$lib/assets/img/IWGDF-logo.webp';
  import logoDarkMode from '$lib/assets/img/footguard-icon-darkmode.webp';
</script>

<picture>
  <source srcset={logoDarkMode} media="(prefers-color-scheme: dark)" />
  <img src={logo} alt="IWGDF Logo" width="150" height="43" decoding="async" class="logo-img" />
</picture>

<style>
  .logo-img {
    display: block;
    width: 150px;
    height: auto;
    max-width: 100%;
  }
</style>
