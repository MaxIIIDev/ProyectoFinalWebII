

export class GetAdmisionPorPacienteDTO{

    private constructor(

        public dni: number

    ){}
    static toObject = (getAdmisionesPorPacienteDTO:GetAdmisionPorPacienteDTO):{[key:string]:any} => {

        return {
            dni: getAdmisionesPorPacienteDTO.dni
        }

    }
    static create = ( dniEnviado: number):[string?,GetAdmisionPorPacienteDTO?] => {
        try {
            if(!dniEnviado) return ["Se requiere el dni"]
            return [undefined, new GetAdmisionPorPacienteDTO(dniEnviado) ]
        } catch (error) {
            return [error as string]
        }

    }
}