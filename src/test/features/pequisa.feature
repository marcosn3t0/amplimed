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

@pesquisa @ValidarPorOrdemAlfabetica @ordencaoAlfabetica
Cenario: Validar Ordenacao de produto por ordem alfabetica
    Quando Usuario informar um email valido "cadastrado"
        E Usuario informar uma senha "valida"
        E Usuario clicar no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario ordena produtos por "Name: A to Z"
        E Usuario verifica lista de produtos
    Entao Usuario verifica se foi ordenado por ordem "Name: A to Z"

@pesquisa @ValidarPorDesordemAlfabetica @ordencaoAlfabetica
Cenario: Validar Ordenacao de produto por desordem alfabetica
    Quando Usuario informar um email valido "cadastrado"
        E Usuario informar uma senha "valida"
        E Usuario clicar no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario ordena produtos por "Name: Z to A"
        E Usuario verifica lista de produtos
    Entao Usuario verifica se foi ordenado por ordem "Name: Z to A"

@pesquisa @ValidarOrdenacaoPorMenorValor
Cenario: Validar Ordenacao de produto do menor valor ao maior
    Quando Usuario informar um email valido "cadastrado"
        E Usuario informar uma senha "valida"
        E Usuario clicar no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario ordena produtos por "Price: Low to High"
        E Usuario verifica lista de produtos
    Entao Usuario verifica se foi ordenado por ordem "Price: Low to High"

@pesquisa @ValidarOrdenacaoPorMaiorValor
Cenario: Validar Ordenacao de produto do maior valor ao menor
    Quando Usuario informar um email valido "cadastrado"
        E Usuario informar uma senha "valida"
        E Usuario clicar no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario ordena produtos por "Price: High to Low"
        E Usuario verifica lista de produtos
    Entao Usuario verifica se foi ordenado por ordem "Price: High to Low"

@pesquisa @ValidarNumeroDisplays
Cenario: Validar Ordenacao de produto por pagina
    Quando Usuario informar um email valido "cadastrado"
        E Usuario informar uma senha "valida"
        E Usuario clicar no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario muda numero de displays para 4
    Entao Usuario verifica paginacao dos produtos na pagina 1
        E Usuario verifica paginacao dos produtos na pagina 2

@pesquisa @ValidarTipoVizualizacao
Cenario: Validar Vizualizacao de produtos
    Quando Usuario informar um email valido "cadastrado"
        E Usuario informar uma senha "valida"
        E Usuario clicar no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario altera vizualizacao para "List"
    Entao Usuario verifica que o modo de vizulizacao foi alterado 