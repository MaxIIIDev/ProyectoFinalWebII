import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors"



export class UpdateSintomaDto {
 
    private constructor(
        public id_Sintoma:number,
        public id_Admision:number,
        public id_Nombre_Sintoma?:number,
        public id_Paciente_Diagnosticos?:number,
    ){}
    public static toObject(object: UpdateSintomaDto): {[key:string]:any}{
        return {
            id_Sintoma: object.id_Sintoma,
            id_Admision: object.id_Admision,
            id_Nombre_Sintoma: object.id_Nombre_Sintoma,
            id_Paciente_Diagnosticos: object.id_Paciente_Diagnosticos
        }
    }
    public static create(id_Sintoma:number,id_Admision:number,id_Nombre_Sintoma?:number,id_Paciente_Diagnosticos?:number):[string?, UpdateSintomaDto?]{
        try {
            if(!id_Sintoma || !id_Admision) return ["Se requiere el id_Sintoma y el id_Admision", undefined]
            if(Number(id_Sintoma) < 0 || Number(id_Admision) < 0) return ["El id_Sintoma y el id_Admision deben ser mayores a 0", undefined]
            if(id_Nombre_Sintoma && id_Nombre_Sintoma < 0) return ["El id_Nombre_Sintoma debe ser mayor a 0", undefined]
            if(id_Paciente_Diagnosticos && id_Paciente_Diagnosticos < 0) return ["El id_Paciente_Diagnosticos debe ser mayor a 0", undefined]
            return [undefined, new UpdateSintomaDto(id_Sintoma,id_Admision,id_Nombre_Sintoma,id_Paciente_Diagnosticos)]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","UpdateSintomaDto","26",error as string)
            return [error as string, undefined]
        }
    }
}