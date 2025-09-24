import { Browser, BrowserContext, Page, APIRequestContext } from 'playwright';

export class BrowserManagement {
    private static browser: Browser;
    private static browserContext: BrowserContext;
    private static page: Page;
    private static request: APIRequestContext;

    static initializeBrowser(browser: Browser, browserContext: BrowserContext, page: Page, request: APIRequestContext): void {
        BrowserManagement.browser = browser;
        BrowserManagement.browserContext = browserContext;
        BrowserManagement.page = page;
        BrowserManagement.request = request;
    }

    static setCurrentContext(browserContext: BrowserContext): void {
        BrowserManagement.browserContext = browserContext;
    }

    static setCurrentPage(page: Page): void {
        BrowserManagement.page = page;
    }

    static getCurrrentPage(): Page {
        return this.page;
    }

    static getCurrentContext():BrowserContext{
        return this.browserContext;
    }

    static async switchToTab(index: number): Promise<void> {
        await this.browserContext.waitForEvent('page', {timeout: 30000});
        const allPages = this.browserContext.pages();
        if (index < 0 || index - 1 >= allPages.length) {
            throw new Error(`Tab index ${index} is out of range. There are only ${allPages.length} open tabs.`);
        }
        this.setCurrentPage(allPages[index-1]);
        await allPages[index-1].bringToFront();
    }

    static async resetContextAndOpenNewPage(): Promise<void> {
        await this.browserContext.close();
        const newContext = await this.browser.newContext();
        this.setCurrentContext(newContext);
        const newPage = await newContext.newPage();
        this.setCurrentPage(newPage);
    }

    static getCurrentRequest(): APIRequestContext{
        return this.request;
    }
}