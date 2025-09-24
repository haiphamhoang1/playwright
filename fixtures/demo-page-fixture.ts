import { test as baseTest, expect as baseExpect } from '../core/fixture/base-fixture';
import { BookDetailedPage } from '../page-object/book-detailed-page';
import { BookStorePage } from '../page-object/book-store-page';
import { LoginPage } from '../page-object/login-page';
import { ProfilePage } from '../page-object/profile-page';
import { FormPage } from '../page-object/form-page';
import { LoginWorkflow } from '../workflow/login';
import { SuccessModalPage } from '../page-object/success-modal-page';

export const test = baseTest.extend<{
    bookDetailedPage: BookDetailedPage;
    bookStorePage: BookStorePage;
    loginPage: LoginPage;
    profilePage: ProfilePage;
    formPage: FormPage;
    loginWorkflow: LoginWorkflow;
    successModalPage: SuccessModalPage;
}>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bookDetailedPage: async ({ page }, use) => {
        await use(new BookDetailedPage());
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bookStorePage: async ({ page }, use) => {
        await use(new BookStorePage());
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginPage: async ({ page }, use) => {
        await use(new LoginPage());
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage());
    },
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formPage: async ({ page }, use) => {
        await use(new FormPage());
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginWorkflow: async ({ page }, use) => {
        await use(new LoginWorkflow());
    },
    successModalPage: async ({ page }, use) => {
        await use(new SuccessModalPage());
    },
});

export const expect = baseExpect;