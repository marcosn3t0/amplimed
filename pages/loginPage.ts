import { Locator, Page, expect } from "@playwright/test";

export class LoginPage{

    readonly page:Page;
    private email:string = "input.email";
    private senha:string = "input.password";
    private loginButton:string = "input.button-1.login-button";
    private emailInvalido:string = "span.field-validation-error span[for='Email']";
    private usuarioNaoCadastrado:string = "div.validation-summary-errors ul li:has-text('No customer account found')";
    private senhaInvalidaLi:string = "div.validation-summary-errors ul li:has-text('The credentials provided are incorrect')";
    private urlLogin:string = 'https://demowebshop.tricentis.com/login';

    constructor(page:Page){
        this.page = page;
    }

    async paginaLogin(){

        await this.page.goto(`${this.urlLogin}`);
        await this.page.waitForSelector('div.returning-wrapper');

    }

    async informarEmail(email:string){
        await this.page.locator(this.email).waitFor()
        await this.page.fill(this.email,email);
    }

    async informarSenha(senha:string){
        await this.page.fill(this.senha,senha);
    }

    async login(){
        await this.page.locator(this.loginButton).waitFor({timeout:10000})
        await this.page.click(this.loginButton);
        
    }

    async verificaMsgs(locator:Locator,msg:string){
        await expect(locator).toHaveText(msg);
    }

    async verificarMsgErroLogin(msg:string){
        await this.page.locator(this.emailInvalido).isVisible({timeout:10000})?
        await this.verificaMsgs(this.page.locator(this.emailInvalido),msg) :
        (await this.page.locator(this.usuarioNaoCadastrado).isVisible({timeout:10000})?
        await this.verificaMsgs(this.page.locator(this.usuarioNaoCadastrado),msg):
        await this.verificaMsgs(this.page.locator(this.senhaInvalidaLi),msg))
    }

}