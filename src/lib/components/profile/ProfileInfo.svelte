<script>
  import { resolve } from '$app/paths'
</script>

<section>
  <h2>General Information</h2>
  <p>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
    of type and scrambled it to make a type specimen book.
  </p>

  <dl>
    <dt>Role</dt><dd>Admin</dd>
    <dt>Institution</dt><dd>Lorem ipsum</dd>
    <dt>Name</dt><dd>Lorem ipsum</dd>
    <dt>Email</dt><dd>Lorem ipsum</dd>
  </dl>

  <a href={resolve('/')}>Groups</a>

</section>

<style>
  section {
    padding: 0 var(--spacing-md) var(--spacing-xl);

    h2 {
      color: var(--blue-700);
      margin-bottom: var(--spacing-md);
    }

    p {
      color: var(--grey-400);
      line-height: 1.7;
      margin-bottom: var(--spacing-lg);
    }

    dl {
      display: grid;
      grid-template-columns: auto 1fr;
      row-gap: var(--spacing-md);
      column-gap: var(--spacing-xl);
      align-items: baseline;
      margin-bottom: var(--spacing-xl);
      margin-top:  var(--spacing-xl);

      dt {
        color: var(--grey-300);
      }

      dd {
        color: var(--blue-600);
        margin: 0;
      }
    }

    a {
      display: block;
      width: fit-content;
      margin-inline: auto;
      padding: var(--spacing-sm) var(--spacing-xl);
      border-radius: var(--radius-full);
      background: var(--orange-400);
      color: var(--background-color-primary);
      text-align: center;
    }
  }

  @container profile-card (min-width: 42rem) {
    section {
      padding: 0 var(--spacing-lg) var(--spacing-2xl);

      dl {
        grid-template-columns: auto 1fr auto 1fr;
        column-gap: 4rem;
        row-gap: var(--spacing-lg);
      }
    }
  }
</style>
