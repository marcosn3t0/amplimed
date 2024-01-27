#language: pt

Funcionalidade: Cadastro de conta

Contexto: Pagina de registro
       Dado Usuario deve estar na pagina de registro

       @testRegistro @Cadastro
       Cenario: Cadastro Bem Sucedido
              Quando Usuario seleciona o genero
                     E Usuario informa o nome
                     E Usuario informa o ultimo nome
                     E Usuario informa o email
                     E Usuario informa senha
                     E Usuario confirma senha
                     E Usuario clica no botao registrar
              Entao Usuario verifica se o cadastro foi feito com sucesso
                     E Usuario pressiona o botao Log out
                     
       @testRegistro @EmailInvalido
       Cenario: Validação Email Invalido
              Quando Usuario informa email Invalido
              Entao Usuario verifica a mensage "Wrong email"
       
       @testRegistro @CamposFaltantes
       Cenario: Validação de campos faltantes ao registrar
              Quando Usuario clica no botao registrar
              Entao Usuario verifica as mensagens de campos faltantes para registro
                     |First Name          |First name is required.    |
                     |Last Name           |Last name is required.     |
                     |Email               |Email is required.         |
                     |Password            |Password is required.      |
                     |Confirm Password    |Password is required.      |


       @testRegistro @SenhaInvalida
       Cenario: Validação de senha inválida
              Quando Usuario insere senha invalida
              Entao Verifica a mensage de senha "The password should have at least 6 characters."

       @testRegistro @SenhaDiferentes
       Cenario: Validação de campos faltantes ao registrar
              Quando Usuario informa senha
                     E informa senha diferente
              Entao Verifica a mensage de senha "The password and confirmation password do not match."    