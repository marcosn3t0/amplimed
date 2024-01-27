#language: pt

Funcionalidade: Login

Contexto: Pagina de Login
    Dado Usuario deve estar na pagina de Login

    @Login @LoginComSucesso
    Cenario: Login bem Sucedido
        Quando Usuario informa um email valido "cadastrado"
            E Usuario informa uma senha "valida"
            E Usuario clica no botao Login
        Entao Usuario verifica que efetuou o Login
            #E Usuario pressiona o botao Log out
            E Usuario verifica wrap menus
            E Usuario clica no wrap menu "Logout"

    @Login @EmailInvalidoLogin
    Cenario: Login com email invalido
        Quando Usuario informa um email invalido
            E Usuario informa uma senha "valida"
            E Usuario clica no botao Login
        Entao Usuario verifica na pagina de login a mensagem de erro "Please enter a valid email address."

    @Login @ContaNaoEncontrada
    Cenario: Login com conta não encontrada
        Quando Usuario informa um email valido "nao cadastrado"
            E Usuario informa uma senha "valida"
            E Usuario clica no botao Login
        Entao Usuario verifica na pagina de login a mensagem de erro "No customer account found"

    @Login @SenhaIncorreta
    Cenario:Login com senha incorreta
        Quando Usuario informa um email valido "cadastrado"
            E Usuario informa uma senha "invalida"
            E Usuario clica no botao Login
        Entao Usuario verifica na pagina de login a mensagem de erro "The credentials provided are incorrect"