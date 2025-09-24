// import { AccountService } from "../../../api-service/account-service";
// import { BookService } from "../../../api-service/book-service";
// import { JsonHelper } from "../../../core/util/json";
// import { expect, test } from "../../../fixtures/demo-page-fixture";

// const bookData = JsonHelper.getBookInfo();
// const userData = JsonHelper.getUserInfo();

// test.beforeEach(async () => {
//     const genTokenResponse = await AccountService.generateToken(userData.username, userData.password);
//     const jsonTokenResponse = await genTokenResponse.json();
//     const token = jsonTokenResponse["token"];

//     await BookService.addBook(token, bookData.isbn, userData.userID);
// });

// test('Verify delete book successfully',{tag: '@smoke'}, async ({ loginWorkflow, profilePage, bookStorePage}) => {
//     await loginWorkflow.login(userData.username, userData.password);
//     await bookStorePage.goToProfilePage();
//     await profilePage.deleteBookByName(bookData.name);
//     const doesBookExist = await profilePage.doesBookExist(bookData.name);
//     expect(doesBookExist).toBe(false);
// });