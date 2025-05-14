

export class GetPacienteDto{


    private constructor(
        public dni:number
    ){}
    static toObject = (getPacienteDto: GetPacienteDto):{[key:string]:any} => {
        return {
            dni: getPacienteDto.dni
        }
    }
    static create( dniEnviado:number ): [string?,GetPacienteDto?]{
        
        try {
            
            if(!dniEnviado)return ["Se requiere el Dni", undefined]
            
            return [undefined, new GetPacienteDto(dniEnviado)]
        } catch (error) {
            return [error as string, undefined]
        }        
    }
}
