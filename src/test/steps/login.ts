import { Given,When,Then } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { Usuario } from "../../../test-data/datas-ts/valid_user";

const userCadastradoDataJson = require("../../../test-data/json-datas/cadUser.json");

let userCadastradoData:Usuario = JSON.parse(JSON.stringify(userCadastradoDataJson));

Given('Usuario deve estar na pagina de Login', async function () {
    await pageFixture.page.goto('https://demowebshop.tricentis.com/login');
});

When('Usuario informar um email valido {string}', async function (cadastro:string) {
    cadastro=="cadastrado" ?
    await pageFixture.loginPage.informarEmail(userCadastradoData.email) : 
    await pageFixture.loginPage.informarEmail(userCadastradoData.email_nao_cadastrado_valido);
});

When('Usuario informar um email invalido',async function() {
    await pageFixture.loginPage.informarEmail(userCadastradoData.email_invalido)
})

When('Usuario informar uma senha {string}', async function (isValido:string) {
    isValido=="valida" ? 
    await pageFixture.loginPage.informarSenha(userCadastradoData.senha) :
    await pageFixture.loginPage.informarSenha(userCadastradoData.senha_invalida);
});

When('Usuario clicar no botao Login', async function () {
    await pageFixture.loginPage.login();
});

Then('Usuario verifica que efetuou o Login', async function () {
    await pageFixture.headerPage.verificarLoginHeader(userCadastradoData.email);
});

Then('Usuario pressiona o botao Log out', async function () {
    await pageFixture.headerPage.clickLogoutButton();
});

Then('Usuario verifica na pagina de login a mensagem de erro {string}',async function(mensagem:string){
    await pageFixture.loginPage.verificarMsgErroLogin(mensagem);
});