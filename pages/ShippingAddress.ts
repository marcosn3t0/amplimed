import { Locator } from "@playwright/test";
import  CheckoutPage  from "./checkoutPage";

export class ShippingAddreess extends CheckoutPage{
    private pickUpCheckbox:string = "input#PickUpInStore";

    constructor(locator:Locator){
        super(locator);
    }

    async selecionarEnderecoEntrega(pickUpCheck:string){
        if(pickUpCheck){
            await this.locator.locator(this.pickUpCheckbox).check();
        }
    }
}

export class ShippingMethod extends CheckoutPage{
    
    private ground:string = "input#shippingoption_0";
    private nextDay:string = "input#shippingoption_1";
    private secondDay:string = "input#shippingoption_2";

    async selecionarMetodoEntrega(metodoEntrega:string){
        switch(metodoEntrega){
            case "ground":
                await this.locator.locator(this.ground).check();
                break;
            case "next_day":
                await this.locator.locator(this.nextDay).check();
                break
            case "second_day":
                await this.locator.locator(this.secondDay).check();
                break
        }

        await this.continuarButton();
    }
}