import { Given,When,Then, setDefaultTimeout } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { dataFixture } from "../../hooks/dataFixture";

setDefaultTimeout(60*1000*2);

Given('Usuario deve estar na pagina de Login', async function () {
    await pageFixture.page.goto(process.env.LOGINURL);
    await pageFixture.page.waitForSelector('div.returning-wrapper');
});

When('Usuario informa um email valido {string}', async function (cadastro:string) {
    cadastro=="cadastrado" ?
    await pageFixture.loginPage.informarEmail(dataFixture.userCadastrado.email) : 
    await pageFixture.loginPage.informarEmail(dataFixture.userCadastrado.email_nao_cadastrado_valido);
});

When('Usuario informa um email invalido',async function() {
    await pageFixture.loginPage.informarEmail(dataFixture.userCadastrado.email_invalido)
})

When('Usuario informa uma senha {string}', async function (isValido:string) {
    isValido=="valida" ? 
    await pageFixture.loginPage.informarSenha(dataFixture.userCadastrado.senha) :
    await pageFixture.loginPage.informarSenha(dataFixture.userCadastrado.senha_invalida);
});

When('Usuario clica no botao Login', async function () {
    await pageFixture.loginPage.login();
});

Then('Usuario verifica que efetuou o Login', async function () {
    await pageFixture.headerPage.verificarLoginHeader(dataFixture.userCadastrado.email);
});

Then('Usuario pressiona o botao Log out', async function () {
    await pageFixture.headerPage.clickLogoutButton();
});

Then('Usuario verifica na pagina de login a mensagem de erro {string}',async function(mensagem:string){
    await pageFixture.loginPage.verificarMsgErroLogin(mensagem);
});