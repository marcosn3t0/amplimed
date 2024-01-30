import  CheckoutPage  from "./checkoutPage";

export default class EnderecoCheckout extends CheckoutPage{
    private cidade:string = "input#BillingNewAddress_City";
    private bairro:string = "input#BillingNewAddress_Address1";
    private rua:string = "input#BillingNewAddress_Address2";
    private codigo_postal:string = "input#BillingNewAddress_ZipPostalCode";
    private telefone:string = "input#BillingNewAddress_PhoneNumber";
    private pais:string = "select#BillingNewAddress_CountryId";
    private provincia:string = "select#BillingNewAddress_StateProvinceId";
    private enderecoCadastrado:string = "div.section.new-billing-address";

    async _selecionarPais(pais:string,provincia:string='Alabama'){
        
        await this.locator.locator(this.pais).selectOption(pais);
        if(pais=="United States"){
            await this.locator.locator(this.provincia).selectOption(provincia);
        }

    }

    async _inserirCidade(cidade:string){
        
        await this.locator.locator(this.cidade).fill(cidade);

        
    }

    async _inserirbairro(bairro:string){
        
        await this.locator.locator(this.bairro).fill(bairro);

        
    }

    async _inserirRua(rua:string){
        
        await this.locator.locator(this.rua).fill(rua);

    }

    async _inserirCodigoPostal(codigo_postal:string){
        
        await this.locator.locator(this.codigo_postal).fill(codigo_postal);

    }

    async _inserirTelefone(telefone:string){
        
        await this.locator.locator(this.telefone).fill(telefone);

    }

    async preencherInformacoesDeEndereco(pais:string,cidade:string,bairro:string,rua:string,
        codigo_postal:string,telefone:string){
            
        const verificarEnderecoCadastrado = this.locator.locator(this.enderecoCadastrado);
        const display = await verificarEnderecoCadastrado.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('display');
            });

        if(display=='block'){
            await this._selecionarPais(pais);
            await this._inserirCidade(cidade);
            await this._inserirbairro(bairro);
            await this._inserirRua(rua);
            await this._inserirCodigoPostal(codigo_postal);
            await this._inserirTelefone(telefone);
        }

        await this.continuarButton();



    }

}