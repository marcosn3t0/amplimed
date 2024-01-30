import { Locator,  expect } from "@playwright/test";

export class CheckoutConfirmOrder{

    readonly locator:Locator;
    private produtosCart:string = "table tr.cart-item-row";
    private produtosDoCart:Array<ProdutosCartCheckout>;
    private confimarButton:string = "input.button-1.confirm-order-next-step-button";

    constructor(locator:Locator){
        this.locator = locator;
    }

    async getProdutcsCheckout(){
        
        await this.locator.locator(this.produtosCart).waitFor();
        this.produtosDoCart = (await this.locator.locator(this.produtosCart).all()).map(produtos=>{
            let produto:ProdutosCartCheckout = new ProdutosCartCheckout(produtos);
            return produto;
        })

        return this.produtosDoCart;
        
    }

    async confirmar(){
        
        await this.locator.locator(this.confimarButton).waitFor({timeout:10000})
        await this.locator.locator(this.confimarButton).click();
        
        
    }

}

export class ProdutosCartCheckout extends CheckoutConfirmOrder{
    
    private quantidade:string = "//td[@class='qty nobr']//span[2]";
    private nomeProduto:string = "td[class='product'] a[class='product-name']";
    readonly locator: Locator;

    constructor(locator:Locator){
        super(locator);
        this.locator = locator;
    }

    async verificarQuantidadeProduto(quantidade:number){
        
            await expect(this.locator.locator(this.quantidade)).toHaveText(String(quantidade));
        
    }

    async verificaNomeProduto(nome:string){
        
            await expect(this.locator.locator(this.nomeProduto)).toHaveText(nome);
        
    }

}