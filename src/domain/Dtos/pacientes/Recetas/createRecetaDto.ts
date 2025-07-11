import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors";


export class createRecetaDto {

    private constructor(
        public fecha : string,
        public id_paciente: number,
        public id_medico:number,
        public id_admision:number
    ){}

    public static toObject(object: {[key:string]:any}):{[key:string]:any}{

        return {
            fecha : object.fecha,
            id_paciente: object.id_paciente,
            id_medico:object.id_medico,
            id_admision:object.id_admision
        }

    }
    public static create(object: {[key:string]:any}):[string?,createRecetaDto?]{

        try {
            

            if(!object.id_paciente) return ["Se requiere id_paciente", undefined]
            if(Number(object.id_paciente) < 0) return ["id_paciente no puede ser menor a 0", undefined]

            if(!object.id_medico) return ["Se requiere id_medico", undefined]
            if(Number(object.id_medico) < 0) return ["id_medico no puede ser menor a 0", undefined]

            if(!object.id_admision) return ["Se requiere id_admision", undefined]
            if(Number(object.id_admision) < 0) return ["id_admision no puede ser menor a 0", undefined]

            const fechaParseada = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
            if(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fechaParseada) === false) return ["Fecha invalida, debe ser en formato año-mes-dia"]
           
            return [undefined, new createRecetaDto(
                fechaParseada,
                Number(object.id_paciente),
                Number(object.id_medico),
                Number(object.id_admision)
            )]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","createRecetaDto","20",error as string)
            return [error, undefined]
        }

    }

}