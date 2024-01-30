import { getRandomUsers } from "./geracaoApi";
import { Login, Name, RootRandomUser } from "./RandomUser";
import fs from 'fs';

export default class GerarNovoUsuarioMassaDados{

    private static novoUser:RootRandomUser;
    private static nomeNovoUser:Name;
    private static loginNovoUser:Login;
    private static emailNovoUser:string;
    private static generoNovoUser:string;
    private static timeStamp:string = String(Date.now());

    private static async _getRandomUser(){
        this.novoUser = await getRandomUsers();
        this.nomeNovoUser = this.novoUser.results[0].name;
        this.loginNovoUser = this.novoUser.results[0].login;
        this.emailNovoUser = this.novoUser.results[0].email;
        this.generoNovoUser = this._mudarGenero(this.novoUser.results[0].gender);
    }

    private static  _mudarGenero(genero:string){
        return  genero=="male" ? "M" : "F";
    }

    static async gerarJsonFileNewUser(){
        const newUserJson = JSON.parse(fs.readFileSync('test-data/json-datas/newUser.json','utf8'));

        await this._getRandomUser();
        newUserJson.nome = this.nomeNovoUser.first;
        newUserJson.ultimo_nome = this.nomeNovoUser.last;
        newUserJson.email = this.emailNovoUser.replace('.',this.timeStamp);
        newUserJson.genero = this.generoNovoUser;

        fs.writeFileSync('test-data/json-datas/newUser.json', JSON.stringify(newUserJson));
    }
    


}