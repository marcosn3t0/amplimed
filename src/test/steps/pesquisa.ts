import { Then, When } from "@cucumber/cucumber";
import { Produto } from "../../../test-data/datas-ts/produto";
import { pageFixture } from "../../hooks/pageFixture";
import { Item } from "../../../pages/itemBox";

const productDataJson = require("../../../test-data/json-datas/produtos.json")

let produtoData:Produto = JSON.parse(JSON.stringify(productDataJson));

let itemBoxes:Array<Item>;
let produtoProcurado:Item;

When('Usuario busca produto', async function () {
    await pageFixture.headerPage.pesquisarItemSearchBox(produtoData.nome);
});

When('Usuario verifica lista de produtos',async function () {
    itemBoxes = await pageFixture.itemBoxes.getItemBoxes();
});

Then('Usuario verifica se o produto pesquisado esta presente na pagina',async function(){
    produtoProcurado = itemBoxes[0];
    await produtoProcurado.verificarNomeDoProduto(productDataJson.nome);
});

