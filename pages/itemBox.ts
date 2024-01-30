import { Locator, expect } from "@playwright/test";


export class ItemBox{

    readonly locator:Locator;
    private itemBox:string = "div.item-box";
    private itemBoxes:Array<Item>;
    private shortBy:string = "select#products-orderby";
    private display:string = "select#products-pagesize";
    private pager:string = "div.pager li";
    private vizualizacao:string = "select#products-viewmode";
    private itemPagers:Array<Paginacao>;
    private viewMode:string;

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

    async getPaginacao(){

        let n=1;
        this.itemPagers = (await this.locator.locator(this.pager).all()).map(pagerItem =>{
            let page:Paginacao = new Paginacao(pagerItem,n++);
            return page;
        })

        return this.itemPagers;

    }

    async ordernarPor(ordem:string){
        
        await this.locator.locator(this.shortBy).selectOption(ordem);
        
    }

    async mudarNumeroDisplays(num:number){
        
        await this.locator.locator(this.display).selectOption(String(num));
        
    }

    async mudarViewMode(viewMode:string){
        
        this.viewMode = viewMode;
        await this.locator.locator(this.vizualizacao).selectOption(viewMode);
        
    }

    async verificarViewMode(){

        if(this.viewMode.toLowerCase() == "list"){

            const existeElementoProducstList = await this.locator.evaluate(()=>{
                let isPresent = false;
                const productList = document.querySelector("div.product-list");
                productList==null ? isPresent = false : isPresent = true; 
                return isPresent;
            })
            expect(existeElementoProducstList).toBeTruthy();

        }else{

            const existeElementoProductGrid = await this.locator.evaluate(()=>{
                let isPresent = false;
                const productList = document.querySelector("div.product-grid");
                productList==null ? isPresent = false : isPresent = true; 
                return isPresent;
            })

            expect(existeElementoProductGrid).toBeTruthy();

        }
        
        

    }

}

export class Paginacao extends ItemBox{

    private numeroPagina:number;
    private linkButton:string = 'a';
    private spanButton:string = 'span';

    constructor(locator:Locator,numeroPagina:number){
        super(locator);
        this.numeroPagina = numeroPagina;
    }

    async mudarPagina(){
        
            await this.locator.locator(this.linkButton).isVisible({timeout:10000});
            await this.locator.locator(this.linkButton).click();
        
    }

    async verificarNumeracaoPagina(){
        
        if(this.numeroPagina==1){
            const pagina = this.locator.locator(this.spanButton);
            await pagina.isVisible({timeout:10000});
            await expect(pagina).toHaveText(String(this.numeroPagina));
        }else{
            const pagina = this.locator.locator(this.linkButton);
            await pagina.isVisible({timeout:10000});
            await expect(pagina).toHaveText(String(this.numeroPagina-1));
        }

    }

}


export class Item{

    locator:Locator;
    private productTitle:string = "h2.product-title";
    private productPrice:string = "div.prices span.actual-price";
    private productButton:string = "div.add-info div.buttons input";
    private tipoHDD:string = "//label[contains(text(),'HDD')]/ancestor-or-self::dt/following-sibling::dd[1]//li";
    private adicionarProdutoCart:string = "input#add-to-cart-button-16";

    constructor(locator:Locator){
        this.locator = locator;
    }

    async adicionarCarrinhoPrimeiroBotao(){
        await this.locator.locator(this.productButton).click();
    }

    async tituloProduto(){
        const title =  this.locator.locator(this.productTitle);
        return (await title.textContent()).trim();
    }

    async primeiraLetra(){
        const letra = this.locator.locator(this.productTitle);
        return (await letra.textContent()).trim()[0];
    }

    async precoProduto(){

        const price = this.locator.locator(this.productPrice);
        return (await price.textContent()).trim();

    }

    async verificarNomeDoProduto(nome:string){
        
        const title =  this.locator.locator(this.productTitle);
        await expect(title).toHaveText(nome);
        
    }

    async escolherHDD(memoria:string){
        
        await this.locator.locator(this.tipoHDD).getByLabel(memoria).check();
        
    }

    async adicionarCarrinhoSegundoBotao(){
        
        await this.locator.locator(this.adicionarProdutoCart).click();
        
    }

}