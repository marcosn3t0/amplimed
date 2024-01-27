#language: pt

Funcionalidade: Checkout de produto

Contexto: Produto Adicionado ao carrinho
    Dado Usuario deve estar na pagina de Login
    Quando Usuario informa um email valido "cadastrado"
        E Usuario informa uma senha "valida"
        E Usuario clica no botao Login
        E Usuario busca produto
        E Usuario clica no primeiro botao adicionar produto ao carrinho
        E Usuario esolhe a opcao do tipo de hdd
        E Usuario clica no segundo botao adicionar produto ao carrinho
        E Usuario verifica wrap menus
        E Usuario clica no wrap menu "Shoppingcart"
        E Usuario verifica produtos adicionados no carrinho

@Checkout @AdicionarAoCarrinho    
Cenario: Adicionar produto ao carrinho
    Entao Usuario verifica se produto foi adicionado ao carrinho
        E Usuario clica no wrap menu "Logout"

@Checkout @AumentarQuantidadeProdutoNoCarrinho    
Cenario: Aumentar a quantidade do produto no carrinho de compras
        E Usuario aumenta a quantidade de produtos no carrinho
        E Usuario retorna para a pagina principal
        E Usuario clica no wrap menu "Shoppingcart"
    Entao Usuario verifica se quantidade do produto foi alterada
        E Usuario clica no wrap menu "Logout"


@Checkout @RemoverProdutoDoCarrinho    
Cenario: Remover Produto do Carrinho
        E Usuario remove produto do carrinho
    Entao Usuario verifica que o carrinho esta vazio
        E Usuario clica no wrap menu "Logout"