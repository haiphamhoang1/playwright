//console.log('test-search.spec.ts loaded');
import { BrowserUtils } from "../../../core/browser/browser-utils";
import { expect, test } from "../../../fixtures/demo-page-fixture";
import { SearchData } from "../../../data-object/search-data";
import { CSVHelper } from "../../../core/util/csv";
import { JsonHelper } from "../../../core/util/json";
const searchInfos: SearchData[] = CSVHelper.readCSVFile("search/SearchData.csv");
//console.log('Loaded searchInfos:', searchInfos.length);
const bookData = JsonHelper.getBookInfo();

for (const searchInfo of searchInfos) {
    test(`Search book successfully with book title: ${searchInfo.searchString}`,  async ({bookStorePage}) => {
        await BrowserUtils.navigate('/');
        await bookStorePage.searchBook(searchInfo.searchString);
        await BrowserUtils.takeScreenshot(`search-${searchInfo.searchString}.png`);
        const numberOfBooksFound = await bookStorePage.getNumberOfBooksOnPage(searchInfo.searchString);
        console.log('Number of books found:', numberOfBooksFound);
        console.log('Expected:', Number(searchInfo.numberOfBookFound), typeof searchInfo.numberOfBookFound);
        expect(Number(numberOfBooksFound) == Number(searchInfo.numberOfBookFound)).toBe(true);
    });
};