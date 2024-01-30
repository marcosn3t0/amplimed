import { LinkMenu } from "../../../pages/headerPage";
import { pageFixture } from "../../hooks/pageFixture";
import { When } from "@cucumber/cucumber";

let wrapMenus:Object;
let wrapMenu:LinkMenu;


When('Usuario retorna para a pagina principal',async function(){
    await pageFixture.page.goto("https://demowebshop.tricentis.com/");
    await pageFixture.page.waitForSelector("img[alt='Tricentis Demo Web Shop']");
});

When('Usuario verifica wrap menus',async function() {
    wrapMenus = await pageFixture.headerTopMenu.getMenuWrapperLinks();
})

When('Usuario clica no wrap menu {string}',async function(wrapMenuLink:string) {
    wrapMenu = await wrapMenus[wrapMenuLink];
    await wrapMenu.clickLink();
})