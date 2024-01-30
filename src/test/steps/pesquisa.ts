import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { dataFixture } from "../../hooks/dataFixture";
import { Item, Paginacao } from "../../../pages/itemBox";
import {  LinkMenu } from "../../../pages/headerPage";
import { VerificarOrdem } from "../../../support-files/verificaOrdenacao";

let itemBoxes:Array<Item>;
let produtoProcurado:Item;
let linksMenu:Object;
let menu:LinkMenu;
let verificarOrdem:VerificarOrdem;
let paginacao:Array<Paginacao>;
let pagina1:Paginacao;
let pagina2:Paginacao;

When('Usuario busca produto', async function () {
    await pageFixture.headerPage.pesquisarItemSearchBox(dataFixture.produtoCompra.nome);
});

When('Usuario verifica lista de produtos',async function () {
    itemBoxes = await pageFixture.itemBoxes.getItemBoxes();
});

Then('Usuario verifica se o produto pesquisado esta presente na pagina',async function(){
    produtoProcurado = itemBoxes[0];
    await produtoProcurado.verificarNomeDoProduto(dataFixture.produtoCompra.nome);
});

When('Usuario verifica menus',async function() {
    linksMenu = await pageFixture.headerTopMenu.getMenuLinks();
});

When('Usuario escolhe o menu {string}', async function (Menu) {
    menu = await linksMenu[Menu];
    await menu.clickLink();
});

When('Usuario ordena produtos por {string}', async function (ordem:string) {
    await pageFixture.itemBoxes.ordernarPor(ordem);
});

Then('Usuario verifica se foi ordenado por ordem {string}',async function (ordem:string) {
    verificarOrdem = new VerificarOrdem(itemBoxes);
    switch(ordem){
        case "Name: A to Z":
            await verificarOrdem.verificarOrdenacaoPorOrdemAlfabetica();
            break;
        case "Name: Z to A":
            await verificarOrdem.verificarOrdenacaoPorDesordemAlfabetica();
            break;
        case "Price: Low to High":
            await verificarOrdem.verificarOrdemPrecoMenorParaMaior();
            break;
        case "Price: High to Low":
            await verificarOrdem.verificarOrdemPrecoMaiorParaMenor();
            break;
    }  
})

When('Usuario muda numero de displays para {int}', async function (numeroDisplays:number) {
    await pageFixture.itemBoxes.mudarNumeroDisplays(numeroDisplays);
});

Then('Usuario verifica paginacao dos produtos na pagina {int}',async function(pagina:number){
    paginacao = await pageFixture.itemBoxes.getPaginacao();

    if(pagina==1){
        pagina1 = paginacao[0];
        await pagina1.verificarNumeracaoPagina();        
    }else{
        pagina2 = paginacao[1];
        await pagina2.mudarPagina();
        await pagina2.verificarNumeracaoPagina();
    }

});


When('Usuario altera vizualizacao para {string}',async function(modoVizualizacao:string){
    await pageFixture.itemBoxes.mudarViewMode(modoVizualizacao);
});

Then('Usuario verifica que o modo de vizulizacao foi alterado',async function(){
    await pageFixture.itemBoxes.verificarViewMode();
});