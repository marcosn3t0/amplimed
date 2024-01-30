import { When,Then } from "@cucumber/cucumber";
import { Item } from "../../../pages/itemBox";
import { pageFixture } from "../../hooks/pageFixture";
import { dataFixture } from "../../hooks/dataFixture";
import { ProdutoCart } from "../../../pages/shoppingCartPage";
import EnderecoCheckout from "../../../pages/EnderecoCheckout";
import { Pagamento } from "../../../pages/MetodoPagamento";
import { ShippingAddreess } from "../../../pages/ShippingAddress";
import { ShippingMethod } from "../../../pages/ShippingAddress";
import { TipoPagamento } from "../../../pages/MetodoPagamento";
import { ConfirmOrder, ItemConfirmacao } from "../../../pages/confirmOrderPage";
import { criarArrayEnderecoConta, criarArrayEnderecoEntrega } from "../../../support-files/GerarArrayValidacao";
import { CheckoutConfirmOrder, ProdutosCartCheckout } from "../../../pages/CartProdutcsCheckout";
import { CheckoutConfirmadoElement } from "../../../pages/FinalizacaoCheckout";

let proutos:Array<Item>;
let yourOwnComputer:Item;
let produtoCart:ProdutoCart;
let produtosCart:Array<ProdutoCart>;
let enderecoCheckout:EnderecoCheckout;
let itemConfirmacaoEnderecoConta:Array<ItemConfirmacao>;
let itemConfirmacaoEnderecoEntrega:Array<ItemConfirmacao>;
let enderecoConta:Array<string>;
let enderecoEntrega:Array<string>;
let produtosCartCheckout:Array<ProdutosCartCheckout>;
let checkoutOrder:CheckoutConfirmOrder;
let confirmacaoMsg:CheckoutConfirmadoElement;

When('Usuario clica no primeiro botao adicionar produto ao carrinho',async function(){
    proutos = await pageFixture.itemBoxes.getItemBoxes();
    await proutos[0].adicionarCarrinhoPrimeiroBotao();
});

When('Usuario esolhe a opcao do tipo de hdd',async function(){
    yourOwnComputer = new Item(pageFixture.page.locator('div.page-body:has(.item-box)'));
    await yourOwnComputer.escolherHDD(dataFixture.produtoCompra.memoria_hdd[1]);
});

When('Usuario clica no segundo botao adicionar produto ao carrinho',async function(){
    await yourOwnComputer.adicionarCarrinhoSegundoBotao();
});

When('Usuario verifica produtos adicionados no carrinho',async function(){
    produtosCart = await pageFixture.shoppingCart.getProdutosCart();
    produtoCart = produtosCart[0];
})

Then('Usuario verifica se produto foi adicionado ao carrinho',async function(){
    await produtoCart.verificarProduto(dataFixture.produtoCompra.nome);
})

When('Usuario aumenta a quantidade de produtos no carrinho',async function(){
    await produtoCart.mudarQuantidade(dataFixture.produtoCompra.quantidade_compra);
    await pageFixture.shoppingCart.atualizarShoppingCart();
});

Then('Usuario verifica se quantidade do produto foi alterada', async function () {
    await produtoCart.verificarQuantidadeProduto(dataFixture.produtoCompra.quantidade_compra);
});

When('Usuario remove produto do carrinho',async function(){
   await produtoCart.removerProduto();
   await pageFixture.shoppingCart.atualizarShoppingCart();
});

Then('Usuario verifica que o carrinho esta vazio',async function(){
   await pageFixture.shoppingCart.verificarCarrinhoVazio(dataFixture.produtoCompra.msg_carrinho_vaio);
});

When('Usuario confirma termos e condicoes',async function(){
   await pageFixture.shoppingCart.aceitarTermosServicos(); 
});

When('Usuario clica no botao Checkout',async function(){
   await pageFixture.shoppingCart.checkout(); 
});

When('Usuario preenche informacoes de endereco',async function(){
    enderecoCheckout = new EnderecoCheckout(pageFixture.page.locator('div.page.checkout-page li#opc-billing'));
    await enderecoCheckout.preencherInformacoesDeEndereco(dataFixture.checkoutInfo.pais,dataFixture.checkoutInfo.cidade,
        dataFixture.checkoutInfo.endereco,dataFixture.checkoutInfo.rua,dataFixture.checkoutInfo.codigo_postal,dataFixture.checkoutInfo.telefone);
});

When('Usuario preenche informacoes de entrega do endereco',async function(){
    const entrega = new ShippingAddreess(pageFixture.page.locator('div.page.checkout-page div#checkout-step-shipping'));
    await entrega.continuarButton();
});

When('Usuario seleciona metodo de entrega',async function(){
    const metodoEntrega = new ShippingMethod(pageFixture.page.locator('li#opc-shipping_method'));
    await metodoEntrega.selecionarMetodoEntrega(dataFixture.checkoutInfo.metodo_entrega[1]);
});

When('Usuario informa metodo de pagamento',async function() {
    const tipoPg = new TipoPagamento(pageFixture.page.locator('li#opc-payment_method'));
    const pagamento = new Pagamento(pageFixture.page.locator('li#opc-payment_info'));
    
    //seleciona o tipo de metodo pagamento com base no arquivo json
    await tipoPg.selecionarMetodoPagamento(dataFixture.checkoutInfo.metodo_pagamento['tipo_pagamento']);
    await pagamento.informarMetodoPagamento(dataFixture.checkoutInfo.metodo_pagamento);
});

Then('Usuario valida se informacoes de endereco foram inseridas corretamentes', async function () {
    const ConfirmarOrdemEnderecoEntrega = new ConfirmOrder(pageFixture.page);
    const ConfirmarOrdemEnderecoConta = new ConfirmOrder(pageFixture.page);

    //validação na coluna: Billings Addresss 
    itemConfirmacaoEnderecoConta = await ConfirmarOrdemEnderecoConta.getInformacoesValidacoes("endereco");
    enderecoConta = criarArrayEnderecoConta();
    await ConfirmarOrdemEnderecoConta.relizarValidacoesEnderecoConta(itemConfirmacaoEnderecoConta,enderecoConta);

    //Validações na Coluna: Shippings Addresss
    itemConfirmacaoEnderecoEntrega = await ConfirmarOrdemEnderecoEntrega.getInformacoesValidacoes("entrega");
    enderecoEntrega = criarArrayEnderecoEntrega(dataFixture.checkoutInfo.metodo_entrega[1]);
    await ConfirmarOrdemEnderecoEntrega.relizarValidacoesEnderecoConta(itemConfirmacaoEnderecoEntrega,enderecoEntrega);
    
});

Then('Usuario confirma detalhes do produto', async function () {

    checkoutOrder = new CheckoutConfirmOrder(pageFixture.page.locator("div#checkout-step-confirm-order"));
    produtosCartCheckout = await checkoutOrder.getProdutcsCheckout();

    //Primeiro e Unico produto
    await produtosCartCheckout[0].verificaNomeProduto(dataFixture.produtoCompra.nome);
    await produtosCartCheckout[0].verificarQuantidadeProduto(dataFixture.produtoCompra.quantidade_compra);
    
    //Confirmar compra
    await checkoutOrder.confirmar();
});

Then('Usuario verifica a mensagem de compra bem sucedida',async function(){
    confirmacaoMsg = new CheckoutConfirmadoElement(pageFixture.page.locator("div.page.checkout-page"));
    await confirmacaoMsg.verificarCompraBemSucedida();
    await confirmacaoMsg.continuarButton();
});

