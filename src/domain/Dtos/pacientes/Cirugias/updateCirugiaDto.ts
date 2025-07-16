import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors"


export class updateCirugiaDto {

    private constructor(
        public id_cirugia:number,
        public id_nombre_cirugia: number,
        public descripcion : string,
        public id_medico: number,
        public id_paciente: number,
        public id_Admision: number
    ){}

    public static toObject(object: {[key:string]:any}):{[key:string]:any}{

        return {
            id_cirugia: object.id_cirugia,
            id_nombre_cirugia: object.id_nombre_cirugia,
            descripcion : object.descripcion,
            id_medico: object.id_medico,
            id_paciente: object.id_paciente,
            id_Admision: object.id_Admision
        }
    }
    public static create(object: {[key:string]:any}):[ string?, updateCirugiaDto?]{
        try {
            if(!object.id_cirugia) return ["Se requiere el id_cirugia"]
            if(!object.id_nombre_cirugia)return ["Se requiere id_nombre_cirugia"]
            if(!object.descripcion || object.descripcion.trim().length < 10) return ["Se requiere la descripcion"]
            if(!object.id_medico)return ["Se requiere id_medico"]
            if(!object.id_paciente) return ["Se requiere id_paciente"]
            if(!object.id_Admision) return ["Se requiere id_Admision"]
            return [undefined, new updateCirugiaDto(
                Number(object.id_cirugia),
                Number(object.id_nombre_cirugia),
                object.descripcion,
                Number(object.id_medico),
                Number(object.id_paciente),
                Number(object.id_Admision)
                )]
        } catch (error) {
            HelperForCreateErrors
                .errorInMethodXClassXLineXErrorX("create","createCirugiaDto","26",error as string);
            return [error, undefined]
        }
    }
}