export class CamposFaltantes{
    
    private _mensagem_erro:string;
    private _input:string;

    public get mensagem_erro(){
        return this._mensagem_erro;
    }

    public get input(){
        return this._input;
    }

    public set input(tipoInput:string){
        this._input = tipoInput.replace(" ",'');
    }

    public set mensagem_erro(msg:string){
        this._mensagem_erro = msg;
    }


}