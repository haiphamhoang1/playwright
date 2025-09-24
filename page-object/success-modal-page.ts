import { BasePage } from "./base-page";
import { Element } from "../core/element/element";

export class SuccessModalPage extends BasePage{
    modalTitle: Element;

    constructor(){
        super();
        this.modalTitle = new Element("xpath=//div[@id='example-modal-sizes-title-lg']");   
    }

    async getModalTitle() : Promise<string>
    {
        await this.modalTitle.waitForElementToBeVisible();
    return await this.modalTitle.getText();
    }
}