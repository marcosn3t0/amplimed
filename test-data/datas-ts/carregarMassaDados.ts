import  GerarNovoUsuarioMassaDados  from "./MassaDadosNovoUsuario";

export const carregarMassaDados = async() => {
    await GerarNovoUsuarioMassaDados.gerarJsonFileNewUser();
}