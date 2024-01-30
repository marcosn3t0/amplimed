import { Locator } from "@playwright/test";

export default abstract class CheckoutPage{

    readonly locator:Locator;
    private continueButton:string = "input[value='Continue']";

    constructor(locator:Locator){
        this.locator = locator;
    }

    async continuarButton(){

        await this.locator.locator(this.continueButton).click();

    }
}