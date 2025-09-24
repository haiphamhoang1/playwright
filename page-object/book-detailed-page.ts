import { BasePage } from "./base-page";
import { Element } from "../core/element/element";
export class BookDetailedPage extends BasePage{
    addBookToCollectionButton: Element;
    constructor(){
        super();
        this.addBookToCollectionButton = new Element("xpath=//button[.='Add To Your Collection']");   
    }

    async addBookToCollection() : Promise<void>
    {
        await this.addBookToCollectionButton.click();
    }
}