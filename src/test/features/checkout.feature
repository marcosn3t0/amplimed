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

@Checkout @FinalizarCheckout    
Cenario: Finalizar etapas de Checkout
    E Usuario aumenta a quantidade de produtos no carrinho
    E Usuario confirma termos e condicoes
    E Usuario clica no botao Checkout
    E Usuario preenche informacoes de endereco
    E Usuario preenche informacoes de entrega do endereco
    E Usuario seleciona metodo de entrega
    E Usuario informa metodo de pagamento
Entao Usuario valida se informacoes de endereco foram inseridas corretamentes
    E Usuario confirma detalhes do produto
    E Usuario verifica a mensagem de compra bem sucedida
    E Usuario clica no wrap menu "Logout"