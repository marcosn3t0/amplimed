import { DataTable } from "@cucumber/cucumber";
import {  Page, expect } from "@playwright/test";
import {CamposFaltantes} from "../support-files/campos";

export class Registro{

    readonly page: Page;
    private validacaoCampos:Array<CamposFaltantes>;
    private generoRadio = "input[name='Gender']";
    private primeiroNomeInput = "input[id='FirstName']";
    private ultimoNomeInput = "input[id='LastName']";
    private emailInput = "input[id='Email']";
    private senhaInput = "input[id='Password']";
    private confirmaSenhaInput = "input[id='ConfirmPassword']";
    private registroButton = "input[id='register-button']";
    private resultado = "div.result";
    private msgErroEmail = ".field-validation-error > span[for='Email']";
    private msgErroSenha = ".field-validation-error > span[for='Password']";
    private msgConfirmSenhaError = ".field-validation-error > span[for='ConfirmPassword']";

    constructor(page: Page){
        this.page = page;
    }

    async selecionarGenero(genero:string){
        await this.page.check(`${this.generoRadio}[value='${genero}']`);
    }

    async inserirPrimeiroNome(nome:string){
        await this.page.fill(this.primeiroNomeInput, nome);
    }

    async inserirUltimoNome(ultimoNome:string){
        await this.page.fill(this.ultimoNomeInput, ultimoNome);
    }

    async inserirEmail(email:string){
        await this.page.fill(this.emailInput,email);
    }

    async inserirPassword(password:string){
        await this.page.fill(this.senhaInput,password);
    }

    async inserirConfimacaoPassword(confirmPassword:string){
        await this.page.fill(this.confirmaSenhaInput,confirmPassword);
    }

    async registrar(){
        await this.page.click(this.registroButton);
    }

    async checkResult(text:string){
        const result = this.page.locator(this.resultado);
        await expect(result).toHaveText(text);
    }

    async verificarMsgEmailInvalido(msg:string){
        await this.page.press(this.emailInput,'Tab');
        const result = this.page.locator(this.msgErroEmail);
        await expect(result).toHaveText(msg);
    }
    
    async verificarMsgErroCampo(validacaoInput:string,msgErroMatch:string){
        try{
            const msgErro  = 
            this.page.locator(`.field-validation-error > span[for='${validacaoInput}']`);
            await expect(msgErro).toHaveText(msgErroMatch);
        }catch(error){
            //Apresenta erro caso haja difereça entre as mensagens do browser com as do DataTable
            throw await error;
        }
        
    }

    async verificarCamposFaltantes(campos:DataTable){
        
        //Criação de Classes para Validação dos campos
        this.validacaoCampos = campos['rawTable'].map(function(campo){
            let campoClass:CamposFaltantes;
            campoClass = new CamposFaltantes();
            campoClass.input = campo[0];
            campoClass.mensagem_erro = campo[1];
            return campoClass;
        });

        //forEach para verificar todas as clases de campos do DataTable
        this.validacaoCampos.forEach(campos=>{
            this.verificarMsgErroCampo(campos.input,campos.mensagem_erro)
        });
        
    }

    async verificarSenhaInvalida(msg:string){

        await this.page.press(this.senhaInput,'Tab');
        let senhaInvalida = null;

        if(await this.page.isVisible(this.msgErroSenha)){
            senhaInvalida = this.page.locator(this.msgErroSenha);
            await expect(senhaInvalida).toHaveText(msg);
        }else{
            senhaInvalida = this.page.locator(this.msgConfirmSenhaError);
            await expect(senhaInvalida).toHaveText(msg);
        }

    }

    async informarSenhaDiferente(senha:string){
        await this.page.fill(this.confirmaSenhaInput,senha);
    }

}