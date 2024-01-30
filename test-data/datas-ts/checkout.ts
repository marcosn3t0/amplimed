export interface Checkout{
    pais:string,
    codigo_postal:string,
    telefone:string,
    cidade:string,
    endereco:string,
    rua:string,
    provincia:string,
    comentario:string,
    metodo_entrega:string,
    metodo_pagamento:Object,
}