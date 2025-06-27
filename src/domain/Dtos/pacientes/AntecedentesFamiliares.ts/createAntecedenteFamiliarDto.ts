import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors";


export class createAntecedenteFamiliarDto{

    private constructor(
        public nombre_Enfermedad: string,
        public detalles: string,
        public id_Paciente: number
    ){}

    public static toObject(object: {[key:string]:any}):{[key:string]:any}{
        return {
            nombre_Enfermedad: object.nombre_Enfermedad,
            detalles: object.detalles,
            id_Paciente: object.id_Paciente
        }
    }

    public static create(object: {[key:string]:any}): [string?, createAntecedenteFamiliarDto?]{
        try {
            if(!object.nombre_Enfermedad) return["Se requiere nombre_Enfermedad"]
            if(!object.detalles) return["Se requiere detalles"]
            if(!object.id_Paciente || Number(object.id_Paciente) < 0 ) return ["Se requiere id_Paciente || id_Paciente no puede ser negativo"]

            return[undefined, new createAntecedenteFamiliarDto(
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
