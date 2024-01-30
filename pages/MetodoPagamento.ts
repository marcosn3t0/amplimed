import { expect } from "@playwright/test";
import  CheckoutPage  from "./checkoutPage";

export class TipoPagamento extends CheckoutPage{
    private dinheiro:string = "input#paymentmethod_0";
    private cheque:string = "input#paymentmethod_1";
    private cartao_credito:string = "input#paymentmethod_2";
    private po:string = "input#paymentmethod_3";

    async selecionarMetodoPagamento(metodoPg:string){

        switch(metodoPg){
            case "dinheiro":
                await this.locator.locator(this.dinheiro).check();
                break;
            case "cheque":
                await this.locator.locator(this.cheque).check();
                break;
            case "cartao_credito":
                await this.locator.locator(this.cartao_credito).check();
                break;
            case "ordem_compra":
                await this.locator.locator(this.po).check();
                break;
        }
        await this.continuarButton();

    }
}
export class Pagamento extends CheckoutPage{

    private dinheiro:string = "div.info p";
    private cheque:string = "div.info p:nth-child(3)";
    private selectBanderiaCartao:string = "select#CreditCardType";
    private nomeCartao = "input#CardholderName";
    private numeroCartao = "input#CardNumber";
    private mesExpiracaoCartao = "select#ExpireMonth";
    private anoExpiracaoCartao = "select#ExpireYear";
    private codigoCartao = "input#CardCode";
    private numeroPo = "input#PurchaseOrderNumber";

    async _iformarPo(po:string){
        
        await this.locator.locator(this.numeroPo).fill(po);

    }

    async _informarCartao(cartao:Array<string>){
        
        await this.locator.locator(this.selectBanderiaCartao).selectOption(cartao[0]);
        await this.locator.locator(this.nomeCartao).fill(cartao[1]);
        await this.locator.locator(this.numeroCartao).fill(cartao[2]);
        await this.locator.locator(this.mesExpiracaoCartao).selectOption(cartao[3]);
        await this.locator.locator(this.anoExpiracaoCartao).selectOption(cartao[4]);
        await this.locator.locator(this.codigoCartao).fill(cartao[5]);


    }

    async _verificarCheque(cheque:string){
        
        const chequeText = this.locator.locator(this.cheque);
        await expect(chequeText).toContainText(cheque);


    }   

    async _verificarDinheiro(dinheiro:string){
        
        const dinheiroText = this.locator.locator(this.dinheiro);
        await expect(dinheiroText).toHaveText(dinheiro);


    }

    async informarMetodoPagamento(pagamento:Object){
        
        switch(pagamento['tipo_pagamento']){
            case "dinheiro":
                await this._verificarDinheiro(pagamento['diheiro']);
                break
            case "cheque":
                await this._verificarCheque(pagamento['cheque']);
                break;
            case "cartao_credito":
                await this._informarCartao(pagamento['cartao_credito']);
                break;
            case "ordem_compra":
                await this._iformarPo(pagamento['ordem_compra']);
                break;
        }

        await this.continuarButton();
        
    }
}