import type { Locator, Page } from "@playwright/test";

export class CustomerRegistrationPage {
  constructor(private readonly page: Page) {}

  customerRegistrationHeader = (): Locator =>
    this.page.getByRole("heading", {
      name: "Customer registration",
      level: 3,
    });

  firstNameInputField = (): Locator => this.page.getByTestId("first-name");
  lastNameInputField = (): Locator => this.page.getByTestId("last-name");
  dateOfBirthInputField = (): Locator =>
    this.page.getByPlaceholder("YYYY-MM-DD");
  countryDropdown = (): Locator => this.page.getByTestId("country");
  postalCodeInputField(): Locator {
    return this.page.getByRole("textbox", { name: "Postal code", exact: true });
  }
  houseNumberInputField(): Locator {
    return this.page.getByRole("textbox", {
      name: "House number",
      exact: true,
    });
  }
  streetInputField(): Locator {
    return this.page.getByRole("textbox", { name: "Street", exact: true });
  }
  cityInputField(): Locator {
    return this.page.getByRole("textbox", { name: "City", exact: true });
  }
  phoneNumberInputField(): Locator {
    return this.page.getByRole("textbox", { name: "Phone", exact: true });
  }

  emailInputField(): Locator {
    return this.page.getByRole("textbox", {
      name: "Email address",
      exact: true,
    });
  }
  passwordInputField(): Locator {
    return this.page.getByRole("textbox", { name: "Password", exact: true });
  }
  showPasswordButton(): Locator {
    return this.page.locator('button:has(svg[data-icon="eye"])');
  }
  registerButton(): Locator {
    return this.page.getByRole("button", { name: "Register" });
  }
}
