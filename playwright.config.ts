import { defineConfig, devices } from '@playwright/test';
import * as dotenv from "dotenv";
import * as path from "path";

const environment = process.env.ENVIRONMENT || 'test';
dotenv.config({ path: path.resolve(__dirname,'config', `.env.${environment}`) });

const xrayOptions = {
  // Whether to add <properties> with all annotations; default is false
  embedAnnotationsAsProperties: true,

  // By default, annotation is reported as <property name='' value=''>.
  // These annotations are reported as <property name=''>value</property>.
  textContentAnnotations: ['test_description'],

  // Where to put the report.
  outputFile: './xray-report.xml'
};


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 10 * 60 * 1000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[['html'],
            ['@xray-app/playwright-junit-reporter', xrayOptions],
            ['junit', { outputFile: 'results.xml' }]
          ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'on-first-retry',
    baseURL: process.env.BASE_URL,
    actionTimeout: 10 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api-setup',
      use: { headless: true },
      testMatch: /test-api-setup/
    },
    {
      name: 'api',
      use: { headless: true },
      testDir: './tests/api',
      testIgnore: /test-api-setup/,
      dependencies: ['api-setup'],
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']
    },
      testDir: './tests/ui'
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   testDir: './tests/ui'
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    //   testDir: './tests/ui'
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
