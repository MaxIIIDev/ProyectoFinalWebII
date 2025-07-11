import { HelperForCreateErrors } from "../../../../../Helpers/HelperForCreateErrors"
import { createPruebaDiagnosticaDto } from "./createPruebaDiagnostica"


export class updatePruebaDiagnosticaDto{

    private constructor(
        public id_Prueba_Diagnostica: number,
        public id_nombre_prueba_diagnostica: number,
        public resultado: string,
        public id_diagnostico: number,
        public id_paciente: number,
    ){}

    public static toObject(updatePruebaDiagnosticaDto:updatePruebaDiagnosticaDto):{
        id_Prueba_Diagnostica: number,
        id_nombre_prueba_diagnostica: number,
        resultado: string,
        id_diagnostico: number,
        id_paciente: number,
    }{
        return {
            id_Prueba_Diagnostica: updatePruebaDiagnosticaDto.id_Prueba_Diagnostica,
            id_nombre_prueba_diagnostica: updatePruebaDiagnosticaDto.id_nombre_prueba_diagnostica,
            resultado: updatePruebaDiagnosticaDto.resultado,
            id_diagnostico: updatePruebaDiagnosticaDto.id_diagnostico,
            id_paciente: updatePruebaDiagnosticaDto.id_paciente,
        }
    }
    public static create(object: {[key:string]:any}): [string?,updatePruebaDiagnosticaDto?]{
        try {
            if(!object.id_Prueba_Diagnostica) return ["id_Prueba_Diagnostica is missing"]
            if(!object.id_nombre_prueba_diagnostica) return ["id_nombre_prueba_diagnostica is missing"]
            if(!object.resultado) return ["resultado is missing"]
            if(object.resultado.trim().length < 10) return ["resultado must be at least 10 characters long"]
            if(!object.id_diagnostico) return ["id_diagnostico is missing"]
            if(!object.id_paciente) return ["id_paciente is missing"]
            return [undefined,new updatePruebaDiagnosticaDto(
                Number(object.id_Prueba_Diagnostica),
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
