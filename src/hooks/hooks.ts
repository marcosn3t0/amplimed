import { BeforeAll,AfterAll } from "@cucumber/cucumber";
import { Page,Browser, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { LoginPage } from "../../pages/loginPage";



let browser:Browser;
let page:Page;
let loginPage:LoginPage;

BeforeAll(async function() {
    
    browser = await chromium.launch({headless:false});
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    pageFixture.page = page;
    pageFixture.loginPage = loginPage;
});

AfterAll(async function () {
    await pageFixture.page.close();
    await browser.close();
});