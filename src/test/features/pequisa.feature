#language: pt


Funcionalidade: Pesquisar produtos

Contexto: Pagina de Login
    Dado Usuario deve estar na pagina de Login
    
@pesquisa @pesquisarProduto    
Cenario: Pesquisar produto
    Quando Usuario informar um email valido "cadastrado"
        E Usuario informar uma senha "valida"
        E Usuario clicar no botao Login
        E Usuario busca produto
        E Usuario verifica lista de produtos
    Entao Usuario verifica se o produto pesquisado esta presente na pagina

@pesquisa @validarPorOrdemAlfabetica
Cenario: Validar Ordenacao de produto por ordem alfabetica
    Quando Usuario informar um email valido "cadastrado"
        E Usuario informar uma senha "valida"
        E Usuario clicar no botao Login