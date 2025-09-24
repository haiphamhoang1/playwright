import { BrowserUtils } from "../core/browser/browser-utils";
import { BookStorePage } from "../page-object/book-store-page";
import { LoginPage } from "../page-object/login-page";

export class LoginWorkflow {
    loginPage: LoginPage;
    bookStorePage: BookStorePage;

    constructor() {
        this.bookStorePage = new BookStorePage();
        this.loginPage = new LoginPage();
    }

    async login(username: string, password: string): Promise<void> {
        await BrowserUtils.navigate('/');
        await this.bookStorePage.goToLoginPage();
        await this.loginPage.login(username, password);
        await this.bookStorePage.waitForUserNameDisplayed();
    }
}
