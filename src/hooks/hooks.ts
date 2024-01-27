import { BeforeAll,AfterAll } from "@cucumber/cucumber";
import { Page,Browser, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { LoginPage } from "../../pages/loginPage";
import { HeaderPage, HeaderTopMenu } from "../../pages/headerPage";
import { ItemBox } from "../../pages/itemBox";
import { ShoppingCart } from "../../pages/shoppingCartPage";


let browser:Browser;
let page:Page;
let loginPage:LoginPage;
let headerPage:HeaderPage;
let itemBoxes:ItemBox;
let headerTopMenu:HeaderTopMenu;
let shoppingCart:ShoppingCart;

BeforeAll(async function() {
    browser = await chromium.launch({headless:true});
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    headerPage = new HeaderPage(page);
    itemBoxes = new ItemBox(page.locator('div.page-body:has(.item-box)'));
    shoppingCart = new ShoppingCart(page.locator('div.page.shopping-cart-page'));
    headerTopMenu = new HeaderTopMenu(page);

    pageFixture.page = page;
    pageFixture.loginPage = loginPage;
    pageFixture.headerPage = headerPage;
    pageFixture.itemBoxes = itemBoxes;
    pageFixture.headerTopMenu = headerTopMenu;
    pageFixture.shoppingCart = shoppingCart;
});

AfterAll(async function () {
    await pageFixture.page.close();
    await browser.close();
});