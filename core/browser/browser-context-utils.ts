import { Page } from "playwright";
import { BrowserManagement } from "./browser-management";

export class BrowserContextUtils{
    static getAllPages(): Array<Page>{
        return BrowserManagement.getCurrentContext().pages();
    }
}