import svelte from 'eslint-plugin-svelte'
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  {
    ignores: ['node_modules', 'build', '.svelte-kit'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
]
