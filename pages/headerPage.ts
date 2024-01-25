import { Page,expect } from "@playwright/test";

export class HeaderPage{

    readonly page:Page;
    private logoutButton:string = "a.ico-logout";
    private userLoginLink:string = "div.header-links a[href='/customer/info']";
    private pesquisarSearch:string = "input[id='small-searchterms']";
    private searchButton:string = "input.button-1.search-box-button";

    constructor(page:Page){
        this.page = page;
    }

    async clickLogoutButton(){
        await this.page.locator(this.logoutButton).isVisible({timeout:10000});
        await this.page.click(this.logoutButton);
    }

    async verificarLoginHeader(email:string){
        const loginUserHeader = this.page.locator(this.userLoginLink);
        await expect(loginUserHeader).toHaveText(email);
    }

    async pesquisarItemSearchBox(produto:string){
        await this.page.fill(this.pesquisarSearch,produto);
        await this.page.click(this.searchButton);
    }
}