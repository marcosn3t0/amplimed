import { Locator, Page,expect } from "@playwright/test";
import { error } from "console";
import { link } from "fs";

export class HeaderPage{

    readonly page:Page;
    private logoutButton:string = "a.ico-logout";
    private userLoginLink:string = "div.header-links a[href='/customer/info']";
    private pesquisarSearch:string = "input[id='small-searchterms']";
    private searchButton:string = "input.button-1.search-box-button";
    public headerMenu:string = "ul.top-menu";

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

export class HeaderTopMenu extends HeaderPage{

    readonly page:Page;
    private linkMenuObj:LinkMenu;
    private listLink:string = 'li a';
    private menuLinksObj:Object = {};

    constructor(page:Page){
        super(page);
        this.page = page;
    }
    
    async getMenuLinks(){

        await this.page.locator(this.headerMenu).waitFor({timeout:10000});
        await this.page.locator(this.headerMenu).isVisible({timeout:10000});

        for(const link of (await this.page.locator(`${this.headerMenu} ${this.listLink}`).all())){
            this.linkMenuObj = new LinkMenu(link);
            this.menuLinksObj[await this.linkMenuObj.getElementText()]=this.linkMenuObj;
        }

        return this.menuLinksObj;

    }

}

export class LinkMenu{

    private locator:Locator;

    constructor(linkLi:Locator){
        this.locator = linkLi;
    }

    async getElementText(){
        return (await this.locator.textContent()).trim().replace(/[,&_-\s\s+]/g,'')
    }

    async clickLink(){
        await this.locator.waitFor({timeout:10000})
        await this.locator.click();
    }
}

