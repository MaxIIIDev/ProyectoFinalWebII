import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors"


export class createMedicacionActualDto{

    private constructor(
        public id_Admision: number,
        public id_Paciente:number,
        public id_Medicamento:number,
        public motivo: string
    ){}

    public static toObject(object: {[key:string]:any}):{[key:string]:any} {
        return {
            id_Admision: object.id_Admision,
            id_Paciente:object.id_Paciente,
            id_Medicamento: object.id_Medicamento,
            motivo: object.motivo
        }
    }
    public static create(object: {[key:string]:any}):[string?,createMedicacionActualDto?]{
        try {
            if(!object.id_Admision || Number(object.id_Admision) < 0) return ["El id_Admision es nulo o es menor que 0"]
            if(!object.id_Paciente || Number(object.id_Paciente) < 0) return ["El id_Paciente es nulo o es menor que 0"]
            if(!object.id_Medicamento || Number(object.id_Medicamento) < 0) return ["id_Medicamento es menor que 0 o es requerido"]
            if(!object.motivo || object.motivo.length < 10) return ["El motivo es menor que 10 o es requerido"]
            return [undefined, new createMedicacionActualDto(
                Number(object.id_Admision),
                Number(object.id_Paciente),
                Number(object.id_Medicamento),
                object.motivo
            )] 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","createMedicacionActualDto","40",error as string)
            return [error as string, undefined]
        }
    }
}