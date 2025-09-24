import { test as base } from '@playwright/test';
import { BrowserManagement } from '../browser/browser-management';


export const test = base.extend<{ browserFixture: string }>({
  browserFixture: [async({ browser, context, page, request }, use, testInfo) => {
        BrowserManagement.initializeBrowser(browser, context, page, request);
        await use('');
        addXrayTagIntoTestInfo(testInfo, "@QA");
  },{ scope: 'test',  auto: true }],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addXrayTagIntoTestInfo(testInfo: any, prefix:string)
{
    for(const tag of testInfo.tags)
    {
      if (tag.startsWith(prefix))
      {
        testInfo.annotations.push({ type: 'test_key', description: tag.slice(1) });
      }
    }
}

export const expect = base.expect;