import { BrowserManagement } from "./browser-management";

export class BrowserUtils {
    static alertEvent : Promise<string>;
    static async navigate(url:string): Promise<void> {
        console.log('Navigating to:', `${process.env.BASE_URL}${url}`);
        await BrowserManagement.getCurrrentPage().goto(`${process.env.BASE_URL}${url}`);
    }

    static async reload(): Promise<void> {
        await BrowserManagement.getCurrrentPage().reload();
    }

    static async registerAlert(timeout=5000, event="accept"){
        BrowserUtils.alertEvent = BrowserManagement.getCurrrentPage().waitForEvent('dialog',{timeout:timeout}).then(async d => {
            if (event == "dismiss"){
                await d.dismiss();
            }
            else{
                await d.accept();
            }
            return d.message();
        });
    }
    
    static async handleAlert(){
        return await BrowserUtils.alertEvent;
    } 

    static async navigateToForm(url:string): Promise<void> {
        console.log('Navigating to:', `${process.env.FORM_URL}${url}`);
        await BrowserManagement.getCurrrentPage().goto(`${process.env.FORM_URL}${url}`);
    }

    static async takeScreenshot(filePath: string): Promise<void> {
        const page = BrowserManagement.getCurrrentPage();
        await page.screenshot({ path: filePath });
    }
}