import { BasePage } from "./base-page";
import { Element } from "../core/element/element";
import { expect } from "playwright/test";
export class BookStorePage extends BasePage{
    loginButton: Element;
    searchBox: Element;
    constructor(){
        super();
        this.loginButton = new Element("id=login");
        this.searchBox = new Element("id=searchBox");
    }
    
    async goToLoginPage() : Promise<void> {
        await this.loginButton.click();
    }

    async selectBookByName(bookName: string) : Promise<void> {
        const bookLinkLocator = `xpath=//a[.='${bookName}']`;
        await new Element(bookLinkLocator).click();
    }

    async verifyUserName(username: string) : Promise<void>{
        expect(await this.userNameLabel.getText()).toBe(username);
    }

    async searchBook(bookName: string) : Promise<void> {
        await this.searchBox.type(bookName);
    }

    async getNumberOfBooksOnPage(bookName: string): Promise<number>{
        const bookLinkLocator = `xpath=//a[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${bookName.toLowerCase()}')]`;
        const numberOfElement = await new Element(bookLinkLocator).getNumberOfElements(); 
        console.log("Number of books on page: ", numberOfElement);
        return numberOfElement ;
    }
}