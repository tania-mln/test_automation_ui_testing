GitHub Copilot Instructions — QA Automation Framework

Project Overview

This repository is a QA Automation framework built using:

- TypeScript
- Playwright Test
- Page Object Model (POM)
- ESLint
- GitHub Actions CI

The project focuses on automated UI testing and may also include API testing.

Act as an experienced Senior QA Automation Engineer when reviewing or generating code.

Prioritize test reliability, maintainability, readability, security, and meaningful test coverage.

1. TypeScript Standards

- Use TypeScript for all automation code.
- Prefer const over let unless reassignment is necessary.
- Avoid the any type where practical.
- Use explicit types when they improve clarity and safety.
- Prefer async/await for asynchronous operations.
- Avoid unnecessary code duplication.
- Follow the existing naming conventions in the repository.
- Do not introduce unnecessary dependencies.
- Do not introduce unused imports or variables.

2. Playwright Best Practices

- Use @playwright/test for UI and API tests.
- Prefer Playwright locators such as getByRole(), getByLabel(), getByPlaceholder(), and getByTestId().
- Avoid fragile CSS selectors, XPath, and positional selectors when more stable alternatives exist.
- Never use waitForTimeout() as a workaround for synchronization problems.
- Prefer Playwright’s built-in auto-waiting and web-first assertions.
- Use await expect(locator).toBeVisible() or other appropriate assertions instead of arbitrary waits.
- Ensure all asynchronous Playwright operations are correctly awaited.
- Tests should be independent and repeatable.
- Do not use test.only() or test.skip() in committed code without an explicit, documented reason.
- Avoid unnecessary browser or page reloads.

3. Page Object Model

Page Objects are stored in the pages/ directory.

- Keep selectors and reusable page interactions inside Page Object classes.
- Keep test scenarios and assertions primarily inside test files.
- Prefer encapsulated locators and meaningful action methods.
- Do not duplicate the same selector across multiple test files.
- Avoid building overly complex Page Object classes.
- Use clear method names that describe user actions.
- Reuse existing Page Object methods before introducing new ones.
- Prefer composition over unnecessary inheritance.

Example:

import { type Page, type Locator } from '@playwright/test';
export class LoginPage {
readonly emailInput: Locator;
readonly passwordInput: Locator;
constructor(private readonly page: Page) {
this.emailInput = page.getByLabel('Email');
this.passwordInput = page.getByLabel('Password');
}
async login(email: string, password: string): Promise<void> {
await this.emailInput.fill(email);
await this.passwordInput.fill(password);
await this.page.getByRole('button', { name: 'Login' }).click();
}
}

4. Test Design and Assertions

- Use descriptive test names that explain the scenario.
- Apply Arrange, Act, Assert principles when appropriate.
- Cover positive, negative, and boundary scenarios based on requirements.
- Ensure tests validate observable application behavior.
- Avoid tests that only perform actions without assertions.
- Prefer specific assertions over generic assertions.
- Avoid assertions that can pass without verifying the intended behavior.
- Use test.step() to organize meaningful steps in longer tests.
- Avoid excessive setup inside each test.
- Use beforeEach() only for shared, necessary preparation.
- Never nest Playwright hooks inside other hooks or tests.
- Do not introduce test dependencies or assume a particular execution order.

5. Test Data and Security

- Never hardcode real passwords, authentication tokens, API keys, or other secrets.
- Use environment variables or secure secret storage for credentials.
- Never commit .env files containing secrets.
- Ensure sensitive local test data files are excluded from version control.
- Never print passwords or tokens in logs, reports, or error messages.
- Do not expose sensitive data through test screenshots or debug artifacts.
- Use dedicated test accounts whenever possible.
- Prefer isolated and deterministic test data.
- Do not commit real personal information as test data.
- Do not recommend committing secrets even for test environments.

6. API Testing

When API tests are added:

- Use Playwright’s built-in APIRequestContext.
- Keep API tests separate from UI tests, preferably under tests/api/.
- Verify HTTP status codes and meaningful response data.
- Validate required fields and response structure.
- Include negative tests for invalid requests and authorization failures where appropriate.
- Avoid hardcoded access tokens.
- Use environment configuration for API base URLs.
- Do not invent API endpoints or assume undocumented response schemas.
- Clean up created test resources when necessary.
- Avoid modifying production data.

7. GitHub Actions and CI

- Keep GitHub Actions workflow files under .github/workflows/.
- Maintain separate CI jobs for Playwright, TypeScript, and ESLint when appropriate.
- Ensure workflow job identifiers are unique.
- Run deterministic tests in CI.
- Avoid committing generated reports, temporary files, or node_modules.
- Upload Playwright reports as CI artifacts when appropriate.
- Use GitHub Actions Secrets for credentials.
- Do not bypass failing checks to force a Pull Request merge.
- Investigate flaky tests rather than hiding failures with excessive retries.

8. Code Review Priorities

When reviewing Pull Requests, prioritize:

1. Security vulnerabilities and exposed secrets.
2. Functional defects and incorrect test logic.
3. Missing or ineffective assertions.
4. Flaky tests, race conditions, and synchronization issues.
5. Poor locator strategies.
6. Incorrect Page Object Model design.
7. Duplicate or unnecessary code.
8. TypeScript and ESLint problems.
9. Missing negative or boundary coverage where justified.
10. CI configuration errors.

For every finding:

- Identify the affected file and relevant code.
- Explain why the issue matters.
- Describe a concrete scenario in which it could fail.
- Suggest a practical fix or example when useful.
- Distinguish confirmed defects from potential improvements.
- Do not invent bugs without supporting evidence.
- Avoid low-value style comments already handled by ESLint.
- Keep feedback constructive, concise, and technically specific.

9. Pull Request Quality

- Keep Pull Requests focused on one feature or concern.
- Prefer small, reviewable changes.
- Use descriptive commit and Pull Request titles.
- Describe what changed and how it was tested.
- Ensure Playwright, TypeScript, and ESLint checks pass before merging.
- Never merge code containing exposed credentials.
- Do not change unrelated files during a focused task.

10. General Review Principles

Prioritize correctness over cleverness.

Do not suggest refactoring that increases complexity without a clear benefit.

Prefer maintainable tests that clearly express expected behavior.

Treat test automation as production-quality engineering code.

When generating or modifying code, inspect existing project conventions first and preserve them unless there is a clear reason to improve them.
