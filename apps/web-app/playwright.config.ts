import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  webServer: {
    command: 'pnpm dev:test',
    port: 5174,
    reuseExistingServer: true,
  },
});
