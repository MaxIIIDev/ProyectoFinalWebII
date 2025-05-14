

export class getSeguroMedicoDTO{


    private constructor(
        public numero:number
    ){}

    static toObject = (getSeguroMedico: getSeguroMedicoDTO)=> {

        return {
            numero: getSeguroMedico.numero
        }      
    }
    static create = (numero: string): [string?,getSeguroMedicoDTO?]=>{

        try {
           
            const numeroParseado = parseInt(numero);
            if(!numero) return ["Se requiere el numero"]
            return [undefined, new getSeguroMedicoDTO(numeroParseado)]    
        } catch (error) {
            return [error as string, undefined]
        }
    }
}