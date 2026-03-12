// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // simulates a browser environment
    globals: true // so you can use describe/it/expect without importing
  }
})
