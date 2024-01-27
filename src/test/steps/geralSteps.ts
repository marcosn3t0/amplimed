import { pageFixture } from "../../hooks/pageFixture";
import { When } from "@cucumber/cucumber";

When('Usuario retorna para a pagina principal',async function(){
    await pageFixture.page.goto("https://demowebshop.tricentis.com/");
    await pageFixture.page.waitForSelector("img[alt='Tricentis Demo Web Shop']");
});