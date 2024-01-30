import { dataFixture } from "../src/hooks/dataFixture";


export const criarArrayEnderecoConta = function(){

    let metodoPg:string;

    dataFixture.checkoutInfo.metodo_pagamento['tipo_pagamento']=="ordem_compra" ? metodoPg = 'Purchase Order' : 
    dataFixture.checkoutInfo.metodo_pagamento['tipo_pagamento']=="diheiro" ? metodoPg="Cash On Delivery (COD)" : 
    dataFixture.checkoutInfo.metodo_pagamento['tipo_pagamento']=="cheque" ? metodoPg="Check / Money Order" :
    metodoPg="Credit Card";

    return [
        `${dataFixture.userCadastrado.nome} ${dataFixture.userCadastrado.ultimo_nome}`,
        dataFixture.userCadastrado.email,
        dataFixture.checkoutInfo.telefone,
        dataFixture.checkoutInfo.endereco,
        dataFixture.checkoutInfo.rua,
        dataFixture.checkoutInfo.cidade,
        dataFixture.checkoutInfo.codigo_postal,
        dataFixture.checkoutInfo.pais,
        metodoPg
    ];
}

export const criarArrayEnderecoEntrega = function(metodoEntrega:string){

    metodoEntrega == "ground" ? metodoEntrega="Ground" : metodoEntrega == "next_day" ? 
    metodoEntrega = "Next Day Air" : metodoEntrega = "2nd Day Air";

    return [
        `${dataFixture.userCadastrado.nome} ${dataFixture.userCadastrado.ultimo_nome}`,
        dataFixture.userCadastrado.email,
        dataFixture.checkoutInfo.telefone,
        dataFixture.checkoutInfo.endereco,
        dataFixture.checkoutInfo.rua,
        dataFixture.checkoutInfo.cidade,
        dataFixture.checkoutInfo.codigo_postal,
        dataFixture.checkoutInfo.pais,
        metodoEntrega
    ];
}