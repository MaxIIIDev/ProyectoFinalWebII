import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors";


export class updateAntecedenteFamiliarDto{

    private constructor(
        public id_Antecedente_Familiar:number,
        public nombre_Enfermedad: string,
        public detalles: string,
        public id_Paciente: number
    ){}

    public static toObject(object: {[key:string]:any}): {[key:string]:any}{
        return {
            id_Antecedente_Familiar: object.id_Antecedente_Familiar,
            nombre_Enfermedad: object.nombre_Enfermedad,
            detalles: object.detalles,
            id_Paciente: object.id_Paciente
        }
    }

    public static create(object: {[key:string]:any}):[string?, updateAntecedenteFamiliarDto?]{
        try {
            if(!object.id_Antecedente_Familiar || Number(object.id_Antecedente_Familiar) < 0) return ["Se requiere id_Antecedente_Familiar || id_Antecedente_Familiar no puede ser negativo"]
            if(!object.nombre_Enfermedad) return["Se requiere nombre_Enfermedad"]
            if(!object.detalles) return["Se requiere detalles"]
            if(!object.id_Paciente || Number(object.id_Paciente) < 0 ) return ["Se requiere id_Paciente || id_Paciente no puede ser negativo"]
            return[undefined, new updateAntecedenteFamiliarDto(
                Number(object.id_Antecedente_Familiar),
                object.nombre_Enfermedad,
                object.detalles,
                Number(object.id_Paciente)
            )]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","createAntecedenteFamiliarDto","40",error as string)
            return [ error, undefined]
        }
    }
}
