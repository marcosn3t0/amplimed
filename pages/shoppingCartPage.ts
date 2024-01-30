import { Locator, expect } from "@playwright/test";

export class ShoppingCart{
    
    readonly locator:Locator;
    private termosServicos:string = "div.terms-of-service input#termsofservice";
    private checkoutButton:string = "button.button-1.checkout-button";
    private atualizarCartButton:string = "input.button-2.update-cart-button";
    private produtos:string = "tr.cart-item-row";
    private produtosCart:Array<ProdutoCart>;
    private carrinhoVazio:string = "div.order-summary-content";

    constructor(locator:Locator){
        this.locator = locator;
    }

    async getProdutosCart(){
        this.produtosCart = (await this.locator.locator(this.produtos).all()).map((prod,index)=>{
            let produto:ProdutoCart = new ProdutoCart(prod,index);
            return produto;
        })

        return this.produtosCart;
    }

    async atualizarShoppingCart(){
        await this.locator.locator(this.atualizarCartButton).click();
    }

    async aceitarTermosServicos(){
        await this.locator.locator(this.termosServicos).check();
    }

    async checkout(){
        await this.locator.locator(this.checkoutButton).click();
    }

    async verificarCarrinhoVazio(msg:string){
        const carrinho = this.locator.locator(this.carrinhoVazio);
        await expect(carrinho).toHaveText(msg);
    }

}

export class ProdutoCart extends ShoppingCart{

    private removerProdutoInput:string = "input[name='removefromcart']";
    private quantiadeInput:string = "input.qty-input";
    private nomeProdutoText:string = "a.product-name";
    private idProduto:number;

    constructor(locator:Locator,idProduto:number){
        super(locator);
        this.idProduto = idProduto;
    }

    async tituloProduto(){
        return (await this.locator.locator(this.nomeProdutoText).textContent()).trim();
    }

    async mudarQuantidade(quantidade:number){
        await this.locator.locator(this.quantiadeInput).fill(String(quantidade));
    }

    async removerProduto(){
        await this.locator.locator(this.removerProdutoInput).check();
    }

    async verificarProduto(nome:string){
        const nomeText = this.locator.locator(this.nomeProdutoText);
        await expect(nomeText).toHaveText(nome);
    }

    async verificarQuantidadeProduto(quantidade:number){
        const quantidadeInput = this.locator.locator(this.quantiadeInput);
        await expect(quantidadeInput).toHaveValue(String(quantidade));
    }

}