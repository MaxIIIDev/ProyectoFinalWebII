import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors"


export class CreateSintomaDto {

    private constructor(
        public id_Admision:number,
        public id_Nombre_Sintoma:number,
        public id_Paciente_Diagnosticos?:number,
        
    ){}

    public static toObject(object: CreateSintomaDto): {[key:string]:any}{
        return {
            id_Admision: object.id_Admision,
            id_Nombre_Sintoma: object.id_Nombre_Sintoma,
            id_Paciente_Diagnosticos: object.id_Paciente_Diagnosticos
        }
    }

    public static create(id_Admision:number,id_Nombre_Sintoma:number,id_Paciente_Diagnosticos?:number):[string?, CreateSintomaDto?]{
        try {
            if(!id_Admision || !id_Nombre_Sintoma) return ["Se requiere el id_Admision y el id_Nombre_Sintoma", undefined]
            if(Number(id_Admision) < 0 || Number(id_Nombre_Sintoma) < 0) return ["El id_Admision y el id_Nombre_Sintoma deben ser mayores a 0", undefined]
            if(id_Paciente_Diagnosticos && id_Paciente_Diagnosticos < 0) return ["El id_Paciente_Diagnosticos debe ser mayor a 0", undefined]
            return [undefined, new CreateSintomaDto(id_Admision,id_Nombre_Sintoma,id_Paciente_Diagnosticos)]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","CreateSintomaDto","26",error as string)
            return [error as string, undefined]
        }

    }

}