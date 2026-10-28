# Copilot Instructions — QA Automation Framework

This TypeScript QA automation project uses Playwright Test, Page Object Model, ESLint, and GitHub Actions. Act as an experienced QA automation engineer. Prioritize reliability, maintainability, security, and meaningful coverage. Inspect existing conventions before changing code.

## TypeScript
- Prefer `const`, explicit useful types, and `async`/`await`; avoid `any`, duplication, unused code, and unnecessary dependencies.
- Follow repository naming and formatting conventions.

## Playwright and tests
- Use `@playwright/test`, stable locators (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`), auto-waiting, and web-first assertions.
- Avoid fragile selectors, arbitrary `waitForTimeout()` calls, unnecessary reloads, unawaited operations, and committed `test.only()`/`test.skip()` without a documented reason.
- Keep tests independent and repeatable. Use descriptive names, Arrange/Act/Assert where useful, and assertions that verify observable behavior. Cover relevant positive, negative, and boundary cases.
- Keep shared setup minimal; do not nest hooks or assume test order.

## Page objects
- Store page objects in `pages/`. Keep reusable selectors and interactions there; keep scenarios and assertions primarily in tests.
- Encapsulate locators and user actions, reuse existing methods, avoid duplicate selectors and overly complex classes, and prefer composition to unnecessary inheritance.

## Security and test data
- Never commit or expose real credentials, tokens, API keys, personal information, or secret-bearing `.env` files. Use environment variables or secure secret storage; never log secrets or expose them in artifacts.
- Prefer dedicated accounts and isolated, deterministic test data.

## API tests
- Use Playwright `APIRequestContext`; keep API tests separate (prefer `tests/api/`).
- Verify status and meaningful response data, including appropriate negative and authorization cases. Do not invent undocumented endpoints or schemas; configure base URLs, avoid production data, and clean up created resources.

## CI
- Keep workflows under `.github/workflows/`; use unique job IDs and deterministic tests.
- Run Playwright, TypeScript, and ESLint checks as appropriate. Use GitHub Actions Secrets, upload reports when useful, investigate flaky tests, and never bypass failing checks or commit generated reports, temporary files, or `node_modules`.

## Code review priorities
Prioritize, in order: security vulnerabilities/exposed secrets; functional defects or incorrect test logic; missing or ineffective assertions; flakiness, races, or synchronization; locator quality; page-object design; unnecessary duplication; TypeScript/ESLint issues; justified negative/boundary coverage; CI configuration errors.

For each finding, identify the affected file and code, explain the impact and a concrete failure scenario, and suggest a practical fix when useful. Distinguish confirmed defects from potential improvements. Do not invent unsupported bugs or report low-value style issues handled by ESLint. Keep feedback constructive, concise, and technically specific.

## Pull requests and general principles
- Keep changes focused, small, and reviewable; do not modify unrelated files.
- Describe changes and testing; ensure relevant checks pass and no credentials are exposed.
- Prefer correctness and maintainable, clear tests over cleverness. Avoid refactoring without a clear benefit; treat automation as production-quality code.
