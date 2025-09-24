// import { AccountService } from "../../../api-service/account-service";
// import { BookService } from "../../../api-service/book-service";
// import { APIUtils } from "../../../core/api/api";
// import { JsonHelper } from "../../../core/util/json";
// import { AddBookSchema } from "../../../data-object/api/json-schema/book";
// import { expect, test } from "../../../fixtures/demo-page-fixture";

// const bookData = JsonHelper.getBookInfo();
// const userData = JsonHelper.getUserInfo();
// let token = '';

// test.beforeEach(async () => {
//     const genTokenResponse = await AccountService.generateToken(userData.username, userData.password);
//     const jsonTokenResponse = await genTokenResponse.json();
//     token = jsonTokenResponse["token"];
// });

// test('Verify delete book successfully by API',{tag: '@smoke'}, async () => {
//     const response = await BookService.addBook(token, bookData.isbn, userData.userID);
//     const responseJson = await response.json();

//     expect(response.status()).toEqual(201);
//     expect(responseJson["books"][0]["isbn"]).toEqual(bookData.isbn);
//     APIUtils.verifyJsonSchema(AddBookSchema, responseJson);
// });

// test.afterEach(async () => {
//     await BookService.deleteBook(token, bookData.isbn, userData.userID);
// });