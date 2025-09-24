import { Element } from "../core/element/element";
export class BasePage {
    userNameLabel: Element;
    profileMenu: Element;
    
    constructor() {
        this.userNameLabel = new Element("id=userName-value");
        this.profileMenu = new Element("xpath=//span[.='Profile']")
    }

    async goToProfilePage(): Promise<void>{
        await this.profileMenu.click();
    }
    
    async waitForUserNameDisplayed(): Promise<void>
    {
        await this.userNameLabel.waitForElementToBeVisible();
    }
}