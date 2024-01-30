import { Locator, expect } from "@playwright/test";
import CheckoutPage from "./checkoutPage";

export class CheckoutConfirmadoElement extends CheckoutPage{

    readonly locator:Locator;
    private msgStrong:string = "div.title strong"
    private msg:string = "Your order has been successfully processed!";

    constructor(locator:Locator){
        super(locator);
        this.locator = locator;
    }

    async verificarCompraBemSucedida(){
        await this.locator.locator(this.msgStrong).waitFor({state:"visible",timeout:10000})
        await expect(this.locator.locator(this.msgStrong)).toHaveText(this.msg);

    }
}