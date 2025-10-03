# FootGuard

[Design Challenge](https://github.com/fdnd-agency/iwgdfguidlines/wiki/Design-Challenge)

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Branches

We work with branches according to the guidelines in the [FDND Docs](https://docs.fdnd.nl/conventies.html#branching-strategy).

This follows the Git Flow workflow:
- Main → always contains production-ready code.
- Develop → the integration branch where features are merged and tested.
- Feature branches → start from develop, used for building new functionality (e.g. feature/login-page).
- Release branches → start from develop to prepare a new version. After testing, merged into both main and develop.
- Hotfix branches → start from main to fix urgent issues in production. After the fix, merged into both main and develop.

This way, development stays organized, stable, and ready for production at any time.

![git-flow-4](https://github.com/user-attachments/assets/69468298-8604-420d-9a62-d4c7f79ce051)
