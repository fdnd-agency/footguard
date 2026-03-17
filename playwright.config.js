// palywright.config.js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/tests/e2e',

  // Automatically start the dev server before running tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true // reuse if already running
  },

  // Base URL so you can use page.goto('/login') instead of full URL
  use: {
    baseURL: 'http://localhost:5173'
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' }
    }

    // webkit skipped — not supported on your Mac
  ]
})
