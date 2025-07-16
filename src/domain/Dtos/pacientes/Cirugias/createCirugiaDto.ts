import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors"


export class createCirugiaDto {

    private constructor(
        
        public id_nombre_cirugia: number,
        public descripcion : string,
        public id_medico: number,
        public id_paciente: number,
        public id_Admision: number,
        public fecha?: string,
    ){}

    public static toObject(object: {[key:string]:any}):{[key:string]:any}{

        return {
            id_nombre_cirugia: object.id_nombre_cirugia,
            descripcion : object.descripcion,
            id_medico: object.id_medico,
            id_paciente: object.id_paciente,
            id_Admision: object.id_Admision,
            fecha: object.fecha
        }
    }
    public static create(object: {[key:string]:any}):[ string?, createCirugiaDto?]{
        try {
            if(!object.id_nombre_cirugia)return ["Se requiere id_nombre_cirugia"]
            if(!object.descripcion || object.descripcion.trim().length < 10) return ["Se requiere la descripcion"]
            if(!object.id_medico)return ["Se requiere id_medico"]
            if(!object.id_paciente) return ["Se requiere id_paciente"]
            if(!object.id_Admision) return ["Se requiere id_Admision"]
            const fechaParseada = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
            if(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fechaParseada) === false) return ["Fecha invalida, debe ser en formato año-mes-dia"]
            return [undefined, new createCirugiaDto(
                Number(object.id_nombre_cirugia),
                object.descripcion.trim(),
                Number(object.id_medico),
                Number(object.id_paciente),
                Number(object.id_Admision),
                fechaParseada
                )]
        } catch (error) {
            HelperForCreateErrors
                .errorInMethodXClassXLineXErrorX("create","createCirugiaDto","26",error as string);
            return [error, undefined]
        }
    }
}