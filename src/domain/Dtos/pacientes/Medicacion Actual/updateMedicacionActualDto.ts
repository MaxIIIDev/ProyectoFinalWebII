import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors"


export class updateMedicacionActualDto{

    private constructor(
        public id_Paciente_Medicacion_Actual:number,
        public id_Admision: number,
        public id_Paciente:number,
        public id_Receta?: number,
        public id_Medicamento?:number
    ){}

    public static toObject(object: {[key:string]:any}):{[key:string]:any} {
        if(object.id_Receta && !object.id_Medicamento){
            return {
                id_Paciente_Medicacion_Actual:object.id_Paciente_Medicacion_Actual,
                id_Admision: object.id_Admision,
                id_Paciente:object.id_Paciente,
                id_Receta: object.id_Receta,
            }
        }
        if(!object.id_Receta && object.id_Medicamento){
            return {
                id_Paciente_Medicacion_Actual:object.id_Paciente_Medicacion_Actual,
                id_Admision: object.id_Admision,
                id_Paciente:object.id_Paciente,
                id_Medicamento: object.id_Medicamento
            }
        }
        return {
            id_Paciente_Medicacion_Actual:object.id_Paciente_Medicacion_Actual,
            id_Admision: object.id_Admision,
            id_Paciente:object.id_Paciente,
            id_Receta: object.id_Receta,
            id_Medicamento: object.id_Medicamento
        }
    }
    public static create(object: {[key:string]:any}){
        try {
            if(!object.id_Paciente_Medicacion_Actual || Number(object.id_Paciente_Medicacion_Actual) < 0 ) return ["id_Paciente_Medicacion_Actual es nulo o menor que 0"]
            if(!object.id_Admision || Number(object.id_Admision) < 0) return ["El id_Admision es nulo o es menor que 0"]
            if(!object.id_Paciente || Number(object.id_Paciente) < 0) return ["El id_Paciente es nulo o es menor que 0"]
            if(!object.id_Receta && !object.id_Medicamento) return ["Se requiere id_Receta o id_Medicament, tiene que ser uno u otro"]
            if(object.id_Receta && Number(object.id_Receta)) return ["id_Receta es menor que 0"]
            if(object.id_Medicamento && Number(object.id_Medicamento) < 0) return ["id_Medicamento es menor que 0"]
            return [undefined, new updateMedicacionActualDto(
                Number(object.id_Paciente_Medicacion_Actual),
                Number(object.id_Admision),
                Number(object.id_Paciente),
                Number(object.id_Receta),
                Number(object.id_Medicamento)
            )] 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","createMedicacionActualDto","40",error as string)
            return [error as string, undefined]
        }
    }
}