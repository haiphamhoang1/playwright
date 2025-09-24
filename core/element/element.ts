import { expect } from "playwright/test";
import { BrowserManagement } from "../browser/browser-management";
export enum LocatorType {
    ROLE = 0,
    TEXT = 1,
    LABEL = 2,
    PLACEHOLDER = 3,
    ALT_TEXT = 4,
    TITLE = 5,
    TEST_ID = 6,
    DEFAULT = 7
}

interface ElementOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export class Element {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locator: any;
    locatorType: LocatorType;
    options: ElementOptions;

    constructor(locator: string, locatorType: LocatorType = LocatorType.DEFAULT, options: ElementOptions = {}) {
        this.locator = locator;
        this.locatorType = locatorType;
        this.options = options;
    }

    getElement() {
        switch (this.locatorType) {
            case LocatorType.ROLE:
                return BrowserManagement.getCurrrentPage().getByRole(this.locator, this.options);
            case LocatorType.TEXT:
                return BrowserManagement.getCurrrentPage().getByText(this.locator, this.options);
            case LocatorType.LABEL:
                return BrowserManagement.getCurrrentPage().getByLabel(this.locator, this.options);
            case LocatorType.PLACEHOLDER:
                return BrowserManagement.getCurrrentPage().getByPlaceholder(this.locator, this.options);
            case LocatorType.ALT_TEXT:
                return BrowserManagement.getCurrrentPage().getByAltText(this.locator, this.options);
            case LocatorType.TITLE:
                return BrowserManagement.getCurrrentPage().getByTitle(this.locator, this.options);
            case LocatorType.TEST_ID:
                return BrowserManagement.getCurrrentPage().getByTestId(this.locator);
            default:
                return BrowserManagement.getCurrrentPage().locator(this.locator);
        }
    }

    async click(timeout = 10000) {
        await this.getElement().click({timeout:timeout});
    }

    async type(text: string) {
        await this.getElement().pressSequentially(text);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async waitForElement(options: any) {
        await this.getElement().waitFor(options);
    }

    async waitForElementToBeVisible(timeout = 5000) {
        await this.waitForElement({ state: 'visible', timeout: timeout });
    }

    async waitForElementToBeHidden() {
        await this.waitForElement({ state: 'hidden' });
    }

    async isEnable(): Promise<boolean> {
        return await this.getElement().isEnabled();
    }

    async isVisible(): Promise<boolean> {
        return await this.getElement().isVisible();
    }

    async fillText(text: string) {
        await this.getElement().fill(text);
    }

    async hover() {
        await this.getElement().hover();
    }

    async getText() {
        const elementText = await this.getElement().innerText();
        return elementText;
    }

    async getInputValue() {
        const elementText = await this.getElement().inputValue();
        return elementText;
    }

    async getAttribute(attribute: string): Promise<string | null> {
        return await this.getElement().getAttribute(attribute);
    }

    async getNumberOfElements() {
        return await this.getElement().count();
    }

    async pressKey(key: string) {
        return await this.getElement().press(key);
    }

    async rightClick() {
        return await this.getElement().click({
            button: 'right',
        });
    }

    async middleClick() {
        return await this.getElement().click({
            button: 'middle',
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async holdKeyAndClick(options: any) {
        return await this.getElement().click(options);
    }

    async clickAndHold() {
        return await this.getElement().click({
            delay: 3000
        });
    }

    async clickMultipleTimes(clickCount: number) {
        return await this.getElement().click({
            clickCount: clickCount,
        });
    }

    async focus() {
        return await this.getElement().focus();
    }

    async verifyElementIsVisible() {
        await expect(this.getElement()).toBeVisible();
    }

    async getAllInnerTexts() {
        return await this.getElement().allInnerTexts();
    }

    async scrollToElement() {
        await this.getElement().scrollIntoViewIfNeeded();
    }

    async check(timeout = 10000) {
        await this.getElement().check({timeout:timeout});
    }

    async hide(): Promise<void> {
        await this.getElement().evaluate((el) => {
            el.style.display = 'none';
        });
    }

    async setInputFiles(filePath: string) {
        await this.getElement().setInputFiles(filePath);
    }
}