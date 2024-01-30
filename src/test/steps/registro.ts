import { Given,When,Then, DataTable, setDefaultTimeout } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { dataFixture } from "../../hooks/dataFixture";

setDefaultTimeout(60*1000*2);

Given('Usuario deve estar na pagina de registro', async function () {
    await pageFixture.page.goto(process.env.REGISTERURL);
});

When('Usuario seleciona o genero', async function () {
  await pageFixture.registroPage.selecionarGenero(dataFixture.novoUser.genero);
});

When('Usuario informa o nome', async function () {
  await pageFixture.registroPage.inserirPrimeiroNome(dataFixture.novoUser.nome);
});

When('Usuario informa o ultimo nome', async function () {
  await pageFixture.registroPage.inserirUltimoNome(dataFixture.novoUser.ultimo_nome);
});


When('Usuario informa o email', async function () {
  await pageFixture.registroPage.inserirEmail(dataFixture.novoUser.email);
});


When('Usuario informa senha', async function () {
  await pageFixture.registroPage.inserirPassword(dataFixture.novoUser.senha);
});

When('Usuario confirma senha', async function () {
  await pageFixture.registroPage.inserirConfimacaoPassword(dataFixture.novoUser.senha);
});

When('Usuario clica no botao registrar', async function () {
  await pageFixture.registroPage.registrar();
});

Then('Usuario verifica se o cadastro foi feito com sucesso', async function () {
  await pageFixture.registroPage.checkResult('Your registration completed');
});


When('Usuario informa email Invalido', async function () {
  await pageFixture.registroPage.inserirEmail(dataFixture.novoUser.email_invalido);
});


Then('Usuario verifica a mensage {string}', async function (msg) {
  await pageFixture.registroPage.verificarMsgEmailInvalido(msg);
});


Then('Usuario verifica as mensagens de campos faltantes para registro', async function (camposFaltantes:DataTable) {
  await pageFixture.registroPage.verificarCamposFaltantes(camposFaltantes);
});


When('Usuario insere senha invalida', async function () {
  await pageFixture.registroPage.inserirPassword(dataFixture.novoUser.senha_invalida);
});

Then('Verifica a mensage de senha {string}', async function (msg:string) {
  await pageFixture.registroPage.verificarSenhaInvalida(msg);
});

When('informa senha diferente', async function () {
  await pageFixture.registroPage.informarSenhaDiferente(dataFixture.novoUser.outra_senha);
});