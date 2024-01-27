#language: pt

Funcionalidade: Pesquisar produtos

Contexto: Pagina de Login
    Dado Usuario deve estar na pagina de Login
    
@Pesquisa @PesquisarProduto    
Cenario: Pesquisar produto
    Quando Usuario informa um email valido "cadastrado"
        E Usuario informa uma senha "valida"
        E Usuario clica no botao Login
        E Usuario busca produto
        E Usuario verifica lista de produtos
    Entao Usuario verifica se o produto pesquisado esta presente na pagina

@Pesquisa @ValidarPorOrdemAlfabetica @ordencaoAlfabetica
Cenario: Validar Ordenacao de produto por ordem alfabetica
    Quando Usuario informa um email valido "cadastrado"
        E Usuario informa uma senha "valida"
        E Usuario clica no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario ordena produtos por "Name: A to Z"
        E Usuario verifica lista de produtos
    Entao Usuario verifica se foi ordenado por ordem "Name: A to Z"

@Pesquisa @ValidarPorDesordemAlfabetica @ordencaoAlfabetica
Cenario: Validar Ordenacao de produto por desordem alfabetica
    Quando Usuario informa um email valido "cadastrado"
        E Usuario informa uma senha "valida"
        E Usuario clica no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario ordena produtos por "Name: Z to A"
        E Usuario verifica lista de produtos
    Entao Usuario verifica se foi ordenado por ordem "Name: Z to A"

@Pesquisa @ValidarOrdenacaoPorMenorValor
Cenario: Validar Ordenacao de produto do menor valor ao maior
    Quando Usuario informa um email valido "cadastrado"
        E Usuario informa uma senha "valida"
        E Usuario clica no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario ordena produtos por "Price: Low to High"
        E Usuario verifica lista de produtos
    Entao Usuario verifica se foi ordenado por ordem "Price: Low to High"

@Pesquisa @ValidarOrdenacaoPorMaiorValor
Cenario: Validar Ordenacao de produto do maior valor ao menor
    Quando Usuario informa um email valido "cadastrado"
        E Usuario informa uma senha "valida"
        E Usuario clica no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario ordena produtos por "Price: High to Low"
        E Usuario verifica lista de produtos
    Entao Usuario verifica se foi ordenado por ordem "Price: High to Low"

@Pesquisa @ValidarNumeroDisplays
Cenario: Validar Ordenacao de produto por pagina
    Quando Usuario informa um email valido "cadastrado"
        E Usuario informa uma senha "valida"
        E Usuario clica no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario muda numero de displays para 4
    Entao Usuario verifica paginacao dos produtos na pagina 1
        E Usuario verifica paginacao dos produtos na pagina 2

@Pesquisa @ValidarTipoVizualizacao
Cenario: Validar Vizualizacao de produtos
    Quando Usuario informa um email valido "cadastrado"
        E Usuario informa uma senha "valida"
        E Usuario clica no botao Login
        E Usuario verifica menus
        E Usuario escolhe o menu "Books"
        E Usuario altera vizualizacao para "List"
    Entao Usuario verifica que o modo de vizulizacao foi alterado 