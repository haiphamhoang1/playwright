// import { BrowserUtils } from "../../../core/browser/browser-utils";
// import { CSVHelper } from "../../../core/util/csv";
// import { LoginData } from "../../../data-object/login-data";
// import { test } from "../../../fixtures/demo-page-fixture";

// const loginInfos: LoginData[] = CSVHelper.readCSVFile("login/ValidUserData.csv");
// for (const loginInfo of loginInfos) {
//     test(`Create role by API successfully with rolename: ${loginInfo.username}`, { tag: '@QA-123' }, async ({loginPage, bookStorePage}) => {
//         await BrowserUtils.navigate('/');
//         await bookStorePage.goToLoginPage();
//         await loginPage.login(loginInfo.username, loginInfo.password);
//         await bookStorePage.waitForUserNameDisplayed();
//         await bookStorePage.verifyUserName(loginInfo.username);
//     });
// };