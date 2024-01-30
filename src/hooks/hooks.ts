import { BeforeAll,AfterAll, Before, After,AfterStep, Status } from "@cucumber/cucumber";
import { Page,Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { LoginPage } from "../../pages/loginPage";
import { HeaderPage, HeaderTopMenu } from "../../pages/headerPage";
import { ItemBox } from "../../pages/itemBox";
import { ShoppingCart } from "../../pages/shoppingCartPage";
import { Usuario } from "../../test-data/datas-ts/valid_user";
import { dataFixture } from "./dataFixture";
import { Produto } from "../../test-data/datas-ts/produto";
import { Checkout } from "../../test-data/datas-ts/checkout";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { Registro } from "../../pages/registerPage";
import { carregarMassaDados } from "../../test-data/datas-ts/carregarMassaDados";

const userCadastradoDataJson = require("../../test-data/json-datas/cadUser.json");
const productDataJson = require("../../test-data/json-datas/produtos.json")
const userDataJson = require("../../test-data/json-datas/newUser.json");
const checkoutoDataJson = require("../../test-data/json-datas/checkout.json");

let checkoutInfo:Checkout;
let produtoData:Produto;
let userCadastrado:Usuario;
let novoUsuario:Usuario;

let browser:Browser;
let context:BrowserContext;
let page:Page;
let loginPage:LoginPage;
let headerPage:HeaderPage;
let itemBoxes:ItemBox;
let headerTopMenu:HeaderTopMenu;
let shoppingCart:ShoppingCart;
let registroPage:Registro

BeforeAll(async function() {
    getEnv();
    browser = await invokeBrowser();
    await carregarMassaDados();
});

Before(async function(){
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    headerPage = new HeaderPage(page);
    itemBoxes = new ItemBox(page.locator('div.page-body:has(.item-box)'));
    shoppingCart = new ShoppingCart(page.locator('div.page.shopping-cart-page'));
    headerTopMenu = new HeaderTopMenu(page);
    registroPage = new Registro(page);

    userCadastrado = JSON.parse(JSON.stringify(userCadastradoDataJson));
    produtoData = JSON.parse(JSON.stringify(productDataJson));
    novoUsuario = JSON.parse(JSON.stringify(userDataJson));
    checkoutInfo = JSON.parse(JSON.stringify(checkoutoDataJson));

    pageFixture.page = page;
    pageFixture.loginPage = loginPage;
    pageFixture.headerPage = headerPage;
    pageFixture.itemBoxes = itemBoxes;
    pageFixture.headerTopMenu = headerTopMenu;
    pageFixture.shoppingCart = shoppingCart;
    pageFixture.registroPage = registroPage;

    dataFixture.produtoCompra = produtoData;
    dataFixture.userCadastrado = userCadastrado;
    dataFixture.novoUser = novoUsuario;
    dataFixture.checkoutInfo = checkoutInfo;
});

AfterStep(async function({pickle}) {
    const img = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}.png`,type:"png"})
    await this.attach(img,"image/png");
});

After(async function({pickle,result}) {

    console.log(`\n ${result.status}`);
    if(result.status==Status.FAILED){
        const img = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}.png`,type:"png"})
        await this.attach(img,"image/png");
    }

    await pageFixture.page.close();
    await context.close();
});

AfterAll(async function() {
    await browser.close(); 
});