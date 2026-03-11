// palywright.config.js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/tests/e2e',
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' }
    }

    // webkit weggelaten - niet ondersteund op jouw Mac
  ]
})
