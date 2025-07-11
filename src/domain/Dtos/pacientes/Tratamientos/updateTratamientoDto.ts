

import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors";


export class updateTratamientoDto {

    private constructor(
        public id_tratamiento:number,
        public id_tipo_de_tratamiento: number,
        public detalle: string,
        public cantidad_suministrada: number | null,
        public fecha_de_inicio: string | null,
        public fecha_de_fin: string | null,
        public id_paciente: number,
        public id_medicamento: number | null,
        public id_enfermero: number | null,
        public id_medico: number | null,
        public id_Paciente_Diagnosticos: number | null,
        public id_admision: number,
    ){}


    public static toObject(object: {[key:string]:any}): {[key:string]:any}{

        return {
            id_tratamiento: object.id_tratamiento,
            id_tipo_de_tratamiento: object.id_tipo_de_tratamiento,
            detalle: object.detalle,
            cantidad_suministrada: object.cantidad_suministrada,
            fecha_de_inicio: object.fecha_de_inicio,
            fecha_de_fin: object.fecha_de_fin,
            id_paciente: object.id_paciente,
            id_medicamento: object.id_medicamento,
            id_enfermero: object.id_enfermero,
            id_medico: object.id_medico,
            id_Paciente_Diagnosticos: object.id_Paciente_Diagnosticos,
            id_admision: object.id_admision           
        }
 
    }
    public static create(object: {[key:string]:any}): [string?,updateTratamientoDto?]{
        try {
            if(!object.id_tratamiento || isNaN(object.id_tratamiento) || object.id_tratamiento < 0) return ["Se requiere id_tratamiento"];

            if(!object.id_tipo_de_tratamiento || object.id_tipo_de_tratamiento < 0) return ["Se requiere id_tipo_de_tratamiento"];
            if(!object.detalle || object.detalle.trim() === "") return ["Se requiere detalle"];
            
            if((object.cantidad_suministrada && !object.id_medicamento) || (!object.cantidad_suministrada && object.id_medicamento)) return ["Se requiere cantidad_suministrada y id_medicamento"];
            if(object.cantidad_suministrada && Number(object.cantidad_suministrada) < 0) return ["cantidad_suministrada debe ser un número positivo"];
            if(object.id_medicamento && Number(object.id_medicamento) < 0) return ["id_medicamento debe ser un número positivo"];
            
            if(object.cantidad_suministrada && (isNaN(object.cantidad_suministrada) || object.cantidad_suministrada <= 0)) return ["Se requiere cantidad_suministrada"];
           
            
            const fechaParseada = object.fecha_de_inicio ? new Date(object.fecha_de_inicio).toISOString().split('T')[0] : null; // Formato YYYY-MM-DD
            if(fechaParseada && /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fechaParseada) === false) return ["Fecha invalida, debe ser en formato año-mes-dia"]
            
            const fecha_de_finParseada = object.fecha_de_fin ? new Date(object.fecha_de_fin).toISOString().split('T')[0] : null; // Formato YYYY-MM-DD
            if( fecha_de_finParseada && /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fecha_de_finParseada) === false) return ["Fecha invalida, debe ser en formato año-mes-dia"]

            if(!object.id_paciente || object.id_paciente < 0) return ["Se requiere id_paciente"];
            if(object.id_enfermero && (isNaN(object.id_enfermero) || object.id_enfermero < 0)) return ["id_enfermero debe ser un número positivo"];
            if(object.id_medico && (isNaN(object.id_medico) || object.id_medico < 0)) return ["id_medico debe ser un número positivo"];
            if(!object.id_enfermero && !object.id_medico) return ["Se requiere al menos un id_enfermero o id_medico"];
            if(object.id_Paciente_Diagnosticos && (isNaN(object.id_Paciente_Diagnosticos) || object.id_Paciente_Diagnosticos < 0)) return ["id_Paciente_Diagnosticos debe ser un número positivo"];
            if(!object.id_admision || object.id_admision < 0) return ["Se requiere id_admision"];
            return [undefined, new updateTratamientoDto(
                Number(object.id_tratamiento),
                Number(object.id_tipo_de_tratamiento),
                object.detalle,
                object.cantidad_suministrada ? Number(object.cantidad_suministrada) : null,
                fechaParseada,
                fecha_de_finParseada,
                Number(object.id_paciente),
                object.id_medicamento ? Number(object.id_medicamento) : null,
                object.id_enfermero ? Number(object.id_enfermero) : null,
                object.id_medico ? Number(object.id_medico) : null,
                object.id_Paciente_Diagnosticos ? Number(object.id_Paciente_Diagnosticos) : null,
                Number(object.id_admision),
            )];

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("CreateTratamientoDto", "create", "17", error);
            return [error as string, undefined];
        }
    }
}