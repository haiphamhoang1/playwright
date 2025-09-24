import { BrowserUtils } from "../../../core/browser/browser-utils";
import { expect, test } from "../../../fixtures/demo-page-fixture";
import { FormData } from "../../../data-object/form-data";
import { JsonHelper } from "../../../core/util/json";
import { SuccessModalPage } from "../../../page-object/success-modal-page";

const formData: FormData[] = JsonHelper.getFormInfo();

for (const item of formData) {
    test('Submit form successfully',  async ({formPage, successModalPage}) => {
        await BrowserUtils.navigateToForm('/');
        console.log('Navigated to form page');
        console.log('Submitting form with data: gender', item.gender);
        await formPage.scrollToBottom();
        await formPage.submitForm(
            item.firstName, item.lastName, item.email, item.gender, item.phone, item.dateOfBirth, item.subjects, item.hobbies, item.picture, item.address, item.state, item.city
            );
        await BrowserUtils.takeScreenshot(`form-submission.png`);
        await successModalPage.modalTitle.waitForElementToBeVisible();
        const titleText = await successModalPage.getModalTitle();
        expect(titleText).toBe('Thanks for submitting the form');
    });

};