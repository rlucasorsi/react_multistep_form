# Cypress E2E Testing Guide

This document details how to run the End-to-End (E2E) tests for the React Multistep Form and the scenarios covered by the test suite.

## Prerequisites

Ensure you have the development server running before executing the tests:

```bash
npm run dev
```

## Running Tests

You can run the tests in two modes:

### 1. Interactive Mode (Cypress Open)

This opens the Cypress Test Runner, allowing you to see the tests running in a browser.

```bash
npm run cy:open
```

### 2. Headless Mode (Cypress Run)

This runs the tests in the terminal without opening a browser window.

```bash
npm run cy:run
```

## Configuration

The tests use environment variables for some test data (like name and email). You should create a `cypress.env.json` file in the root directory:

```json
{
  "name": "Your Name",
  "email": "your.email@example.com"
}
```

> [!NOTE]
> `cypress.env.json` is ignored by Git to keep your local test data private.

## CI (GitHub Actions)

The tests are automatically run in GitHub Actions on every push to `main`.

### Required Secrets

To make the tests pass in CI, you must configure the following **GitHub Secrets** in your repository settings:

- `CYPRESS_NAME`: The name to use during tests.
- `CYPRESS_EMAIL`: The email to use during tests.

## Local Safety: Husky Pre-push Hook

To avoid pushing failing tests, a local **pre-push hook** (managed by **Husky**) is available. It will run the headless tests automatically when you try to `git push`.

This hook is located in [.husky/pre-push](file:///c:/Lucas%20Orsi/react_multistep_form/.husky/pre-push).

If you need to bypass this hook for any reason (not recommended), you can use:
```bash
git push --no-verify
```

## Architecture: Page Object Pattern (POM)

The test suite follows the **Page Object Pattern (POM)** to improve maintainability and readability. Each step of the form is encapsulated in its own Page Object class:

- **IdentificationPage**: Handles Step 1 (Identification).
- **ReviewPage**: Handles Step 2 (Review).
- **ThanksPage**: Handles Step 3 (Confirmation).

These Page Objects are located in `cypress/support/pages/`.

## Covered Scenarios

The main test file is [AvaliationForm.cy.js](file:///c:/Lucas%20Orsi/react_multistep_form/cypress/e2e/gui/form/AvaliationForm.cy.js). It covers the following scenarios:

### 1. Initial Page Load
- Verifies title and description.
- Checks if the Step Indicator starts at step 1.
- Ensures form fields are initially empty.
- Validates that only the "Avançar" button is visible initially.

### 2. Step 1: Identification (UserForm)
- Successful advancement with valid name and email.
- Validation: Prevents advancing without name or email.
- Validation: Prevents advancing with an invalid email format.

### 3. Step 2: Review (ReviewForm)
- Verifies display of all 4 satisfaction options.
- Checks for the presence of the comment field.
- Validation: Prevents advancing without selecting satisfaction or writing a comment.
- Verifies that both "Voltar" and "Avançar" buttons are present.

### 4. Step 3: Confirmation (Thanks)
- Verifies the "Falta pouco..." title.
- Checks if the summary correctly displays the user's name from Step 1.
- Validates the display of the satisfaction icon and the typed comment.
- Verifies that the "Enviar" button is present.

### 5. Navigation & State
- **Backwards Navigation**: Ensures users can go back from Step 2 to 1 and Step 3 to 2.
- **Step Indicator**: Verifies the indicator updates correctly as you move through steps.
- **Data Preservation**: Ensures that data entered in previous steps is preserved when navigating back and forth.

### 6. Full Happy Path
- A complete flow from the first step to the final confirmation screen, verifying the entire process works end-to-end.
