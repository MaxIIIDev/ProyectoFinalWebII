import { HelperForCreateErrors } from "../../../../../Helpers/HelperForCreateErrors"


export class createPruebaDiagnosticaDto{

    private constructor(
        public id_nombre_prueba_diagnostica: number,
        public resultado: string,
        public id_diagnostico: number,
        public id_paciente: number,
    ){}

    public static toObject(createPruebaDiagnosticaDto:createPruebaDiagnosticaDto):{
        id_nombre_prueba_diagnostica: number,
        resultado: string,
        id_diagnostico: number,
        id_paciente: number,
    }{
        return {
            id_nombre_prueba_diagnostica: createPruebaDiagnosticaDto.id_nombre_prueba_diagnostica,
            resultado: createPruebaDiagnosticaDto.resultado,
            id_diagnostico: createPruebaDiagnosticaDto.id_diagnostico,
            id_paciente: createPruebaDiagnosticaDto.id_paciente,
        }
    }
    public static create(object: {[key:string]:any}): [string?,createPruebaDiagnosticaDto?]{
        try {
            if(!object.id_nombre_prueba_diagnostica) return ["id_nombre_prueba_diagnostica is missing"]
            if(!object.resultado) return ["resultado is missing"]
            if(object.resultado.trim().length < 10) return ["resultado must be at least 10 characters long"]
            if(!object.id_diagnostico) return ["id_diagnostico is missing"]
            if(!object.id_paciente) return ["id_paciente is missing"]
            return [undefined,new createPruebaDiagnosticaDto(
                Number(object.id_nombre_prueba_diagnostica),
                object.resultado,
                Number(object.id_diagnostico),
                Number(object.id_paciente),
            )]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","createPruebaDiagnosticaDto","28",error as string)
            return [error as string, undefined]
        }
    }

}
