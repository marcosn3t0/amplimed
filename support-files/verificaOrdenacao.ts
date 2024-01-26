import { Item } from "../pages/itemBox";

export class VerificarOrdem{

    private itemsWeb:Array<Item>;

    
    constructor(itemsWeb:Array<Item>){
        this.itemsWeb = itemsWeb;
    }

    async verificarOrdenacaoPorOrdemAlfabetica(){
        //Realiza comparação entre os titulos dos produtos
        /*
        *   Compara as primeiras letras de cada produto para verificar se a ordenação
        *   por oredem alfabética foi feita corretamente.
        *   É lançado erro caso palvras estejam ordenadas de maneira incorreta
        */
        for(let i =0;i<this.itemsWeb.length;i++){
            
            if(i>0){
                if(
                    ((await this.itemsWeb[i].primeiraLetra()).toLowerCase().charCodeAt(0) - 97)<
                    ((await this.itemsWeb[i-1].primeiraLetra()).toLowerCase().charCodeAt(0) - 97)){
                    throw `Ordenou palavra: ${await this.itemsWeb[i-1].tituloProduto()} \n antes da palavra: ${await this.itemsWeb[i].tituloProduto()}`;
                }
            }

        }
        
    }

    async verificarOrdenacaoPorDesordemAlfabetica(){

        for(let i =0;i<this.itemsWeb.length;i++){
            
            if(i>0){
                if(
                    ((await this.itemsWeb[i].primeiraLetra()).toLowerCase().charCodeAt(0) - 97)>
                    ((await this.itemsWeb[i-1].primeiraLetra()).toLowerCase().charCodeAt(0) - 97)){
                    throw `Ordenou palavra: ${await this.itemsWeb[i-1].tituloProduto()} \n antes da palavra: ${await this.itemsWeb[i].tituloProduto()}`;
                }
            }

        }

    }

    async verificarOrdemPrecoMenorParaMaior(){
        for(let i =0;i<this.itemsWeb.length;i++){
            if(i>0){
                if(
                parseFloat(await this.itemsWeb[i].precoProduto())<
                parseFloat(await this.itemsWeb[i-1].precoProduto())){
                    throw `
                        Produto-1: ${await this.itemsWeb[i].tituloProduto()} \n
                        Produto-2: ${await this.itemsWeb[i-1].tituloProduto()} \n
                        Ordenou o maior preço do Produto-2: ${await this.itemsWeb[i-1].tituloProduto()} 
                        valor: ${await this.itemsWeb[i-1].precoProduto()} \n
                        Antes do menor preço do Produto-1: ${await this.itemsWeb[i].tituloProduto()} 
                        valor: ${await this.itemsWeb[i].precoProduto()}
                    `
                }
            }
        }
    }

    async verificarOrdemPrecoMaiorParaMenor(){
        for(let i =0;i<this.itemsWeb.length;i++){
            if(i>0){
                if(
                parseFloat(await this.itemsWeb[i].precoProduto())>
                parseFloat(await this.itemsWeb[i-1].precoProduto())){
                    throw `
                        Produto-1: ${await this.itemsWeb[i].tituloProduto()} \n
                        Produto-2: ${await this.itemsWeb[i-1].tituloProduto()} \n
                        Ordenou o menor preço do Produto-2: ${await this.itemsWeb[i-1].tituloProduto()} 
                        valor: ${await this.itemsWeb[i-1].precoProduto()} \n
                        Antes do maior preço do Produto-1: ${await this.itemsWeb[i].tituloProduto()} 
                        valor: ${await this.itemsWeb[i].precoProduto()}
                    `
                }
            }
        }
    }
}