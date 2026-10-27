import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { invalidUser } from "../pages/test-data.page";

test.describe("User login to the tool shop", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await page.goto("/");
      await loginPage.sighnInButton().click();
    });

    test("User tries to login without first registering", async () => {
      await test.step("User enters email and password into input fields", async () => {
        await loginPage.enterEmailandPassword(
          invalidUser.email,
          invalidUser.password,
        );
      });

      await test.step("User clicks on the toggle password button to reveal the password", async () => {
        await loginPage.togglePasswordButton().click();
      });

      await test.step("User verifies the entered email andpassword", async () => {
        expect(await loginPage.emailInputField().inputValue()).toBe(
          invalidUser.email,
        );
        expect(await loginPage.passwordInputField().inputValue()).toBe(
          invalidUser.password,
        );
      });

      await test.step("User clicks on the login button and verifies the error message", async () => {
        await loginPage.loginButton().click();
        await expect(loginPage.loginErrorMessage()).toBeVisible();
        await expect(loginPage.loginErrorMessage()).toContainText(
          "Invalid email or password",
        );
      });

      //await loginPage.registerLink().click();
    });
  });
