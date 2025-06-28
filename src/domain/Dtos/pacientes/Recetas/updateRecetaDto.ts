import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors";


export class updateRecetaDto {

    private constructor(
        public id_Receta: number,
        public fecha : string,
        public id_paciente: number,
        public id_medico:number,
        public id_medicamento:number,
        public indicacion: string 
    ){}

    public static toObject(object: {[key:string]:any}):{[key:string]:any}{

        return {
            id_Receta: object.id_Receta,
            fecha : object.fecha,
            id_paciente: object.id_paciente,
            id_medico:object.id_medico,
            id_medicamento: object.id_medicamento,
            indicacion: object.indicacion 
        }

    }
    public static create(object: {[key:string]:any}):[string?,updateRecetaDto?]{

        try {
            if(!object.id_Receta) return ["Se requiere id_Receta", undefined]
            if(Number(object.id_Receta) < 0) return ["id_Receta no puede ser menor a 0", undefined] 
            if(!object.fecha) return ["Se requiere la fecha", undefined]

            if(!object.id_paciente) return ["Se requiere id_paciente", undefined]
            if(Number(object.id_paciente) < 0) return ["id_paciente no puede ser menor a 0", undefined]

            if(!object.id_medico) return ["Se requiere id_medico", undefined]
            if(Number(object.id_medico) < 0) return ["id_medico no puede ser menor a 0", undefined]

            if(!object.id_medicamento) return ["Se requiere id_medicamento", undefined]
            if(Number(object.id_medicamento) < 0) return ["id_medicamento no puede ser menor a 0", undefined]

            if(!object.indicacion) return ["Se requiere indicacion", undefined]
            const fechaParseada = new Date(object.fecha).toISOString().split('T')[0]; // Formato YYYY-MM-DD
            if(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fechaParseada) === false) return ["Fecha invalida, debe ser en formato año-mes-dia"]
           
            return [undefined, new updateRecetaDto(
                Number(object.id_Receta),
                fechaParseada,
                Number(object.id_paciente),
                Number(object.id_medico),
                Number(object.id_medicamento),
                object.indicacion
            )]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","createRecetaDto","20",error as string)
            return [error, undefined]
        }

    }

}