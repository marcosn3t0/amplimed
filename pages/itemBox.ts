import { Locator, expect } from "@playwright/test";

export class ItemBox{

    readonly locator:Locator;
    private itemBox:string = "div.item-box";
    private itemBoxes:Array<Item>;

    constructor(locator:Locator){
        this.locator = locator;
    }

    async getItemBoxes(){

        this.itemBoxes = (await this.locator.locator(this.itemBox).all()).map(item =>{
            let itemBoxObj:Item = new Item(item);
            return itemBoxObj;
        })

        

        return this.itemBoxes;
        
    }

}
export class Item{

    locator:Locator;
    private productTitle:string = "h2.product-title";
    private productPrice:string = "div.prices";
    private productButton:string = "div.add-info div.buttons input";

    constructor(locator:Locator){
        this.locator = locator;
    }

    async addProdutoToCarrinho(){
        await this.locator.locator(this.productButton).click();
    }

    async tituloProduto(){
        const title =  this.locator.locator(this.productTitle);
        return (await title.textContent()).trim();
    }

    async precoProduto(){
        const price = this.locator.locator(this.productPrice);
        return (await price.textContent()).trim();
    }

    async verificarNomeDoProduto(nome:string){
        const title =  this.locator.locator(this.productTitle);
        await expect(title).toHaveText(nome);
    }

}