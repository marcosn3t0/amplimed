import { Locator, Page, expect } from "@playwright/test";

export class LoginPage{

    readonly page:Page;
    private email:string = "input.email";
    private senha:string = "input.password";
    private loginButton:string = "input.button-1.login-button";
    private userLogged:string = "div.header-links a[href='/customer/info']";
    private logOutButton:string = "a.ico-logout";
    private emailInvalido:string = "span.field-validation-error span[for='Email']";
    private usuarioNaoCadastrado:string = "div.validation-summary-errors ul li:has-text('No customer account found')";
    private senhaInvalidaLi:string = "div.validation-summary-errors ul li:has-text('The credentials provided are incorrect')";

    constructor(page:Page){
        this.page = page;
    }

    LoginPageEndpoint(){
        return '/login';
    }

    async informarEmail(email:string){
        await this.page.fill(this.email,email);
    }

    async informarSenha(senha:string){
        await this.page.fill(this.senha,senha);
    }

    async login(){
        await this.page.locator(this.loginButton).isVisible({timeout:10000})
        await this.page.click(this.loginButton);
        
    }

    async verificaUsuarioLogado(email:string){
        const loginUserHeader = this.page.locator(this.userLogged);
        await expect(loginUserHeader).toHaveText(email);
    }

    async logOut(){
        await this.page.click(this.logOutButton);
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