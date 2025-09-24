
  

# PlaywrightFramework

  

Playwright Automation Framework

  

## Playwright Introduction

  

* Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast. Headless execution is supported for all browsers on all platforms.

* As Playwright is written by the creators of the Puppeteer, you would find a lot of similarities between them.

* Playwright has its own test runner for end-to-end tests, we call it Playwright Test.

* Cross-browser. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox.

* Cross-platform. Test on Windows, Linux, and macOS, locally or on CI, headless or headed.

* Cross-language. Use the Playwright API in TypeScript, JavaScript, Python, .NET, Java. The core framework is implemented using TypeScript.

* Playwright development is sponsored by Microsoft.

  

[GitHub](https://github.com/microsoft/playwright)

[Documentation](https://playwright.dev/docs/intro)

[API reference](https://playwright.dev/docs/api/class-playwright/)

[Changelog](https://github.com/microsoft/playwright/releases)

# Playwright - Framework

  

This is an automation framework using Playwright written in TypeScript.

  

## Framework Structure

  

```

playwright-automation-test //

├─ config //This folder contains environment variables

├─ constant //This folder contains constant of project

├─ core //This folder contains all common classes which can be used for various projects

│ └─ api //Playwright APIContext Wrapper

│ └─ browser //Playwright Browser Wrapper

│ └─ element //Playwright Element Wrapper

│ └─ fixture //Fixture for initializing browser

│ └─ integration //This folder contains code for integration with Jira/Xray

│ └─ util //This folder contains utilities method for file, random, string, etc

├─ data-object //This folder contains interface for data object

├─ fixture //Fixture to initialize page object class

├─ page-object //This folder contains page object class

├─ test-data //This folder contains test data

├─ tests //This folder contains test cases

├─ .gitignore //Git ignore configuration

├─ .gitlab-ci.yml //GitlabCI pipeline configuration

├─ package-lock.json //provide an immutable version of package.json

├─ package.json //contains basic information about the project,registered dependencies and running script

├─ playwright.config.ts //PlayWright configuration file

├─ README.md

  

```

## Requirements

  

```

- Visual Code

- NodeJS version > 20

- Playwright Test for VSCode (Optional)

```

  

# Getting Started

  

```

This is the quick and easy getting started assuming you already have git, Visual Code and NodeJS installed.

```

  

## Open project in Visual Code

  

```

- Launch Visual Code

- File -> Open Folder OR ctrl+K ctrl+O

- Select project root folder

```

  

## Install the required items

  

1. Install all required packages for project defined in the package.json file: Playwright, etc

  

```sh

  

Open  Terminal  window  in  Visual  Code (ctrl +  `) then execute command:

npm install

  

Or go to project root folder then open CMD windows and execute command:

npm install

  

```

  

2. Install Playwright Browsers

  

```sh

  

Open  Terminal  window  in  Visual  Code (ctrl +  `) then execute command:

npx playwright install

  

Or go to project root folder then open CMD windows and execute command:

npx playwright install

  

```

  

## Run Tests

  

### Run tests by Playwright VSCode extension

  

1. Install Playwright Test for VS Code extension on VS Code Marketplace (https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

2. You can run a single test by clicking the green triangle next to your test block to run your test. Playwright will run through each line of the test and when it finishes you will see a green tick next to your test block as well as the time it took to run the test.

3. You can also run your tests and show the browsers by selecting the option Show Browsers in the testing sidebar. Then when you click the green triangle to run your test the browser will open and you will visually see it run through your test. Leave this selected if you want browsers open for all your tests or uncheck it if you prefer your tests to run in headless mode with no browser open.

  

### Run tests on Chrome/Firefox

  

```sh

For  Chrome,  Execute  the  command  in  the  terminal:

npx  playwright  test  --project='chromium'

  

For  Firefox,  Execute  the  command  in  the  terminal:

npx  playwright  test  --project='firefox'

```
### Choose testing environment for running test
Currently, our framework support to run test on various kinds of testing environment like dev, test or staging. For choosing the testing environment, we need to set value for ENVIRONMENT and run test with the following commands.
```
export ENVIRONMENT=staging
npx playwright test --project='chromium'
```
Currently, we support 3 test environments: dev, test, staging.
On the GitlabCI pipeline, whenever triggering test we need to add an variable for the pipeline. The variable key is **TEST_ENV**, and its value is the environment(**dev/test/staging**) we want to run test.
  

### Filter tests by titles

  

```sh

Execute  the  command  in  the  terminal:

npx  playwright  test  --project='chromium'  --grep='create a new user unsuccessfully'

```

  
  
  

### Run tests in parallel

  

We can run test cases in parallel in two ways

  

Option #1: Modify the "workers" field in the playwright.config.ts page -> this option will affect all test suites

  

Option #2: Add --workers arguments in the test run commands (only affect for specific test run)

  

```sh

Run  test  suite  with  2  workers

npx  playwright  test  --project='chromium'--workers=<number-of-workers>

```

  

For more details, please refer to Playwright document

[Playwright Parallelism and sharding](https://playwright.dev/docs/test-parallel)