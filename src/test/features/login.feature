#language: pt

Funcionalidade: Login

Contexto: Pagina de Login
    Dado Usuario deve estar na pagina de Login

    @Login @LoginComSucesso
    Cenario: Login bem Sucedido
        Quando Usuario informar um email valido "cadastrado"
            E Usuario informar uma senha "valida"
            E Usuario clicar no botao Login
        Entao Usuario verifica que efetuou o Login
            E Usuario pressiona o botao Log out

    @Login @EmailInvalidoLogin
    Cenario: Login com email invalido
        Quando Usuario informar um email invalido
            E Usuario informar uma senha "valida"
            E Usuario clicar no botao Login
        Entao Usuario verifica na pagina de login a mensagem de erro "Please enter a valid email address."

    @Login @ContaNaoEncontrada
    Cenario: Login com conta não encontrada
        Quando Usuario informar um email valido "nao cadastrado"
            E Usuario informar uma senha "valida"
            E Usuario clicar no botao Login
        Entao Usuario verifica na pagina de login a mensagem de erro "No customer account found"

    @Login @SenhaIncorreta
    Cenario:Login com senha incorreta
        Quando Usuario informar um email valido "cadastrado"
            E Usuario informar uma senha "invalida"
            E Usuario clicar no botao Login
        Entao Usuario verifica na pagina de login a mensagem de erro "The credentials provided are incorrect"