import { Page,Locator, expect } from "@playwright/test";

export class ConfirmOrder{

    readonly page:Page;
    private enderecoConta = "ul.billing-info li";
    private enderecoEntrega = "ul.shipping-info li";
    private itensConfimacao:Array<ItemConfirmacao> = [];
    private verificacaoColuna:string;

    constructor(page:Page){
        this.page = page;
    }

    async getInformacoesValidacoes(tipoValidacaoColuna:string){
        
        tipoValidacaoColuna == "entrega" ? this.verificacaoColuna = this.enderecoEntrega : this.verificacaoColuna = this.enderecoConta;


        await this.page.waitForSelector(this.verificacaoColuna);
        for(const item of (await this.page.locator(this.verificacaoColuna).all())){
            let itemConfirmacao:ItemConfirmacao =new ItemConfirmacao(item);
            if(!(await itemConfirmacao.tituloItemLI()=="BillingAddress"||await itemConfirmacao.tituloItemLI()=="Fax:"||await itemConfirmacao.tituloItemLI()=="PaymentMethod"||await itemConfirmacao.tituloItemLI()=="ShippingAddress"||await itemConfirmacao.tituloItemLI()=="ShippingMethod")){
                if(await itemConfirmacao.verificarClasseEspecifica("city-state-zip")){
                    this.itensConfimacao.push(itemConfirmacao);    
                }
                this.itensConfimacao.push(itemConfirmacao);
            }
        }
        return this.itensConfimacao;

        


    }

    async relizarValidacoesEnderecoConta(itensConfimacoes:Array<ItemConfirmacao>,confirmacaoInfo:Array<string>){


        if(confirmacaoInfo===undefined||itensConfimacoes==undefined){
            throw Error("Variaveis não foram definidas");
        }

        if(itensConfimacoes.length==0||confirmacaoInfo.length==0){
            throw Error(`Array sem dados: \n Item Informações: ${itensConfimacoes.length} informações: ${confirmacaoInfo}\n`);
        }

        for(let i=0;i<confirmacaoInfo.length;i++){
            await itensConfimacoes[i].verificarTextoConfirmacaoPedido(confirmacaoInfo[i]);
        }
            


    }
         
};



export class ItemConfirmacao{

    locator:Locator;

    constructor(locator:Locator){
        this.locator = locator;
    }

    async tituloItemLI(){
        return (await this.locator.textContent()).trim().replace(/[()\s -]/g, '');
    }

    async verificarTextoConfirmacaoPedido(textoVericacao:string){
        try{
            await this.locator.waitFor({timeout:10000});
            await expect(this.locator).toContainText(textoVericacao);
        }catch(error){
            
            throw  Error(`procurando por: ${textoVericacao} \n Locator: ${this.locator} \n Texto: ${await this.locator.textContent()} \n ${error}`);
        }
    }

    async verificarClasseEspecifica(classe:string){

        let isValidClass:Boolean = false; 
        const className = await this.locator.evaluate((el)=>{
            return el.className;
        });
        className == classe ? isValidClass=true : isValidClass=false;
        return isValidClass;

    }
}