
# Demo Web Store - Testes Automatizados

Este projeto foi criado com o objetivo de automatizar a suite de testes utilizando o Playwright framework, esse desafio foi proposto pela empresa Amplimed contando com suites de 20 cenários, cobrindo 4 funcionalidades do sistema. Como opção o desenvolvedor pode integrar o puglin que quiser e esolher entre javascript e typescript. (Desafio.pdf).








## Como Executar o Projeto

Clone o projeto, verifique se as depêndecias estão corretas, verifique-as na secção depêndecias:

Execução do projeto sem argumentos:
```bash
  npm run test
```

Execução do projeto com tags:

```bash
  npm run test --TAGS="@Cadastro"
```

Cada feature do projeto possui tags gerais, assim como cada cenário possui sua própria TAG. Sempre acima de cada cenário.

Exemplo:

```cucumber
@Checkout @AdicionarAoCarrinho <----- TAGS    
Cenario: Adicionar produto ao carrinho

```

As TAGS podem ser ignoradas, com isso todos os cenários serão executados, além de ignorar as TAGS o argumento BROWSER também pode ser ignorado, mas rodará com o chrome que é o browser padrão do projeto. É possível realizar a excução com um dos três BROWSERS: chrome, firefox e webkit;

Exemplo sem TAGS:
```bash
  npm run test --BROWSER="chrome"
```

Exemplo com TAGS e BROWSER:
```bash
  npm run test --TAGS="@Checkout" --BROWSER="firefox"
```





## Relatórios

Os Relatórios são gerados automaticamentes após execução de testes, mas também podem ser gerados com o comando:

```bash
  npm run report
```

Exemplo de relatório gerado após execução de todos os testes:

https://frabjous-salamander-d10835.netlify.app/
## Escolhas de desenvolvimento

Como escolha de implementação escolhi a linguagem Typescript, mesmo que eu tenha mais fluência utilizando o Javascript, escolhi o Typescript por me desafiar a desenvolver e aprender mais sobre o Javascript tipado.

Foi escolhido integrar o Playwright com o Cucumber para descrever os cenários, pois é de fácil vizualização para quem irá ler os cenários, ajuda na reutilização de steps e combina muito bem com qualquer framework de testes.








## POM

Utilizei o Page Objects Model  como desing patterns do projeto. Acredito que em termos de abstração o POM é o melhor padrão de projeto para desenvolver testes automatizados, pois permite criar objetos para cada elemento da página, fazendo com que cada parte dessa tenha uma classe contendo ações e propriedades que podem ser utilizadas/reutilizadas ao decorrer do projeto e facilita na organização do código deixando cada objeto com sua devida responsabilidade.

/pages
## Criação de Massas de testes

Para grande parte dos cenários criei massas de dados, arquivos Jsons que são modificaveis, servem para alimentar as informações que o app pedem, permitindo que as informações e telas fiquem mais dinâmicas. Fiz dessa forma para ter mais controle sobre os dados. 
Para os cenários que utilizam o NewUser.json, foi adicionado uma busca de dados em um API que gera usuários aleatórios, após o consumo da API é gerado sempre um novo arquivo NewUser.json. A geração de massa de testes se encontra em hooks/hooks.ts na função carregarMassaDados()

test-data/json-datas/

cadUser.json - Utilizado nos cenário que necessitam login no sistema

checkout.json - Para preencher informações de checkout e verificar as mesmas

produtos.json - produto a ser comprado

newUser.json - Alguns campos dessa massa de teste são gerados por API, de forma que os dados fiquem dinâmicos. É utilizado nos cenários de registro para cadastrar um novo usuário.
## Dependências utilizadas

Dependências e downloads utilizados no projeto:

npm init playwright@latest

npm install --save @types/node

npm install --save-dev cross-env

npm install dotenv --save

npm install fs-extra

npm install multiple-cucumber-html-reporter --save
npm install multiple-cucumber-html-reporter --save-dev

npm install @cucumber/cucumber

npm install -D ts-node

package.json

package-lock.json
## Melhorias Futuras

Aqui descrevo melhorias que podem ser acrescentadas futuramente nesse projeto:

1 - Deixar todos os cenários com massa de testes dinâmicas, somente os cenários que utilizam o arquivo newUser.json tem massa de dados dinâmicas via API.

2 - Melhoria na função de validação de ordem alfabética, somente as primeiras letras das palavras são comparadas, poderia ser criado uma função que percorre todas as letras de cada palavra e assim compara letra por letra da palavra toda


3 - Intgrar com alguma esteira de automação CI/CD como Jenkins.
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcos-aur%C3%A9lio-39229a161/)


