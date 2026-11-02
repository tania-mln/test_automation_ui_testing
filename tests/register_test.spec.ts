import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { CustomerRegistrationPage } from "../pages/customer_registration.page";
import { validUser } from "../pages/test-data.page";

test.describe("User login to the tool shop", () => {
    let loginPage: LoginPage;
    let customerRegistrationPage: CustomerRegistrationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        customerRegistrationPage = new CustomerRegistrationPage(page);
        await page.goto("/");
        await loginPage.signInButton().click();
    });

    test('User registers to the tool shop', async () => {
        await test.step('User is redirected to the registration page', async () => {
            await loginPage.registerLink().click();
            await expect(customerRegistrationPage.customerRegistrationHeader()).toBeVisible();
        });

        await test.step('User fills first name to the input field', async () => {
            await customerRegistrationPage.firstNameInputField().fill(validUser.firstName);
            await expect(customerRegistrationPage.firstNameInputField()).toHaveValue(validUser.firstName);
        });

        await test.step('User fills last name to the input field', async () => {
            await customerRegistrationPage.lastNameInputField().fill(validUser.lastName);
            await expect(customerRegistrationPage.lastNameInputField()).toHaveValue(validUser.lastName);
        });

        await test.step('User fills date of birth to the input field', async () => {
            await customerRegistrationPage.dateOfBirthInputField().fill(validUser.dateOfBirth);
            await expect(customerRegistrationPage.dateOfBirthInputField()).toHaveValue(validUser.dateOfBirth);
        });
        
        await test.step('User selects country from the dropdown', async () => {
            await customerRegistrationPage.countryDropdown().selectOption(validUser.country);
            await expect(customerRegistrationPage.countryDropdown()).toHaveValue(validUser.country);
        });
            
        await test.step('User fills postal code to the input field', async () => {
            await customerRegistrationPage.postalCodeInputField().fill(validUser.postalCode);
            await expect(customerRegistrationPage.postalCodeInputField()).toHaveValue(validUser.postalCode);
        });

        await test.step('User fills house number to the input field', async () => {
            await customerRegistrationPage.houseNumberInputField().fill(validUser.houseNumber);
            await expect(customerRegistrationPage.houseNumberInputField()).toHaveValue(validUser.houseNumber);
        });

        await test.step('User fills street to the input field', async () => {
            await customerRegistrationPage.streetInputField().fill(validUser.street);
            await expect(customerRegistrationPage.streetInputField()).toHaveValue(validUser.street);
        });

        await test.step('User fills city to the input field', async () => {
            await customerRegistrationPage.cityInputField().fill(validUser.city);
            await expect(customerRegistrationPage.cityInputField()).toHaveValue(validUser.city);
        });
        await test.step('User fills phone number to the input field', async () => {
            await customerRegistrationPage.phoneNumberInputField().fill(validUser.phoneNumber);
            await expect(customerRegistrationPage.phoneNumberInputField()).toHaveValue(validUser.phoneNumber);
        });

        await test.step('User fills email to the input field', async () => {
            const { randomUUID } = await import("node:crypto");
            const email = `john.doe.${randomUUID()}@example.com`;
            await customerRegistrationPage.emailInputField().fill(email);
            await expect(customerRegistrationPage.emailInputField()).toHaveValue(email);
        });

        await test.step('User fills password to the input field', async () => {
            await customerRegistrationPage.passwordInputField().fill(validUser.password);
            await customerRegistrationPage.showPasswordButton().click();
            await expect(customerRegistrationPage.passwordInputField()).toHaveValue(validUser.password);
        });

        await test.step('User clicks the register button', async () => {
            await customerRegistrationPage.registerButton().click();
        });
    });
});
