import type { Locator, Page } from '@playwright/test';

export class LoginPage {
    constructor(private readonly page: Page) { }
    
    sighnInButton = (): Locator => this.page.getByRole('link', { name: 'Sign in' });
    emailInputField = (): Locator => this.page.locator('[data-test="email"]');
    passwordInputField = (): Locator => this.page.locator('[data-test="password"]');
    togglePasswordButton = (): Locator => this.page.locator(
        'button:has(svg[data-icon="eye"])',
    );
    loginButton = (): Locator => this.page.getByRole('button', { name: 'Login' });
    loginErrorMessage = (): Locator => this.page.locator('[data-test="login-error"]');
    registerLink = (): Locator => this.page.getByRole('link', { name: 'Register your account' });

    
    async enterEmailandPassword(email: string, password: string): Promise<void> {
        await this.emailInputField().fill(email);
        await this.passwordInputField().fill(password);
    }

    
}
