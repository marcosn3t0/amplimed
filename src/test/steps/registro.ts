import { Given,When,Then, DataTable } from "@cucumber/cucumber";
import {Registro} from "../../../pages/registerPage";
import { pageFixture } from "../../hooks/pageFixture";
import { Usuario } from "../../../test-data/datas-ts/valid_user";

const userDataJson = require("../../../test-data/json-datas/newUser.json");

let userData:Usuario = JSON.parse(JSON.stringify(userDataJson));

let registroPage:Registro;

Given('Usuario deve estar na pagina de registro', async function () {
  registroPage = new Registro(pageFixture.page);
  await pageFixture.page.goto('https://demowebshop.tricentis.com/register');
});


When('Usuario seleciona o genero', async function () {
  await registroPage.selecionarGenero(userData.genero);
});

When('Usuario informa o nome', async function () {
  await registroPage.inserirPrimeiroNome(userData.nome);
});

When('Usuario informa o ultimo nome', async function () {
  await registroPage.inserirUltimoNome(userData.ultimo_nome);
});


When('Usuario informa o email', async function () {
  await registroPage.inserirEmail(userData.email);
});


When('Usuario informa senha', async function () {
  await registroPage.inserirPassword(userData.senha);
});

When('Usuario confirma senha', async function () {
  await registroPage.inserirConfimacaoPassword(userData.senha);
});

When('Usuario clicar no botao registrar', async function () {
  await registroPage.registrar();
});

Then('Usuario verifica se o cadastro foi feito com sucesso', async function () {
  await registroPage.checkResult('Your registration completed');
});


When('Usuario informa email Invalido', async function () {
  await registroPage.inserirEmail(userData.email_invalido);
});


Then('Usuario verifica a mensage {string}', async function (msg) {
  await registroPage.verificarMsgEmailInvalido(msg);
});


Then('Usuario verifica as mensagens de campos faltantes para registro', async function (camposFaltantes:DataTable) {
  await registroPage.verificarCamposFaltantes(camposFaltantes);
});


When('Usuario insere senha invalida', async function () {
  await registroPage.inserirPassword(userData.senha_invalida);
});

Then('Verifica a mensage de senha {string}', async function (msg:string) {
  await registroPage.verificarSenhaInvalida(msg);
});

When('informa senha diferente', async function () {
  await registroPage.informarSenhaDiferente(userData.outra_senha);
});