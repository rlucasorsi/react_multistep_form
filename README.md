# Multistep Evaluation Form

This is a modern, responsive multistep form built with React and Vite. It allows users to provide feedback through a structured three-step process: Identification, Review, and Confirmation.

## Features

- **Multistep Flow**: Organized into 3 clear steps with a progress indicator.
- **Form Validation**: Real-time validation for name and email.
- **Responsive Design**: Works perfectly on mobile and desktop.
- **State Management**: Preserves user input when navigating between steps.
- **E2E Testing**: Comprehensive test suite with Cypress using the Page Object Pattern (POM).

## Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Local CSS (Modular approach)
- **Icons**: React Icons
- **Testing**: Cypress

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## E2E Testing

This project uses Cypress for End-to-End testing.

- **Check the [Cypress E2E Guide](file:///c:/Lucas%20Orsi/react_multistep_form/CYPRESS_E2E.md)** for detailed instructions and test scenarios.

### Quick Commands

- `npm run cy:open`: Open Cypress interactive runner.
- `npm run cy:run`: Run tests in headless mode.

## Architecture

The project follows modern best practices, including a **Page Object Pattern (POM)** for E2E tests to ensure maintainability and readability.

## Linting

```bash
npm run lint
```