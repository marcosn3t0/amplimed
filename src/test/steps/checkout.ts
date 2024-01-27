import { When,Then } from "@cucumber/cucumber";
import { Item } from "../../../pages/itemBox";
import { pageFixture } from "../../hooks/pageFixture";
import { Produto } from "../../../test-data/datas-ts/produto";
import { ProdutoCart } from "../../../pages/shoppingCartPage";

const productDataJson = require("../../../test-data/json-datas/produtos.json")

let produtoData:Produto = JSON.parse(JSON.stringify(productDataJson));

let proutos:Array<Item>;
let yourOwnComputer:Item;
let produtoCart:ProdutoCart;
let produtosCart:Array<ProdutoCart>;

When('Usuario clica no primeiro botao adicionar produto ao carrinho',async function(){
    proutos = await pageFixture.itemBoxes.getItemBoxes();
    await proutos[0].adicionarCarrinhoPrimeiroBotao();
});

When('Usuario esolhe a opcao do tipo de hdd',async function(){
    yourOwnComputer = new Item(pageFixture.page.locator('div.page-body:has(.item-box)'));
    await yourOwnComputer.escolherHDD(produtoData.memoria_hdd[1]);
});

When('Usuario clica no segundo botao adicionar produto ao carrinho',async function(){
    await yourOwnComputer.adicionarCarrinhoSegundoBotao();
});

When('Usuario verifica produtos adicionados no carrinho',async function(){
    produtosCart = await pageFixture.shoppingCart.getProdutosCart();
    produtoCart = produtosCart[0];
})

Then('Usuario verifica se produto foi adicionado ao carrinho',async function(){
    await produtoCart.verificarProduto(produtoData.nome);
})

When('Usuario aumenta a quantidade de produtos no carrinho',async function(){
    await produtoCart.mudarQuantidade(produtoData.quantidade_compra);
    await pageFixture.shoppingCart.atualizarShoppingCart();
});

Then('Usuario verifica se quantidade do produto foi alterada', async function () {
    await produtoCart.verificarQuantidadeProduto(produtoData.quantidade_compra);
});

When('Usuario remove produto do carrinho',async function(){
   await produtoCart.removerProduto();
   await pageFixture.shoppingCart.atualizarShoppingCart();
});

Then('Usuario verifica que o carrinho esta vazio',async function(){
   await pageFixture.shoppingCart.verificarCarrinhoVazio(produtoData.msg_carrinho_vaio);
});

