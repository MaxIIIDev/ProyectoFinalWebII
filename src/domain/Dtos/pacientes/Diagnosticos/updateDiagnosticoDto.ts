import { UpdateSintomaDto } from "../Sintomas/updateSintomaDto";

export class UpdateDiagnosticoDto {
    

    private constructor(
        public id_Paciente_Diagnosticos:number,
        public id_Admision:number,
        public id_tipo_de_diagnostico?:number,
        public detalles?:string, 
        public id_paciente?:number,
        
    ){}
    public static toObject(object:UpdateDiagnosticoDto):{[key:string]:any}{
        return {
            id_Paciente_Diagnosticos:object.id_Paciente_Diagnosticos,
            id_Admision:object.id_Admision,
            id_tipo_de_diagnostico:object.id_tipo_de_diagnostico,
            detalles:object.detalles,
            id_paciente:object.id_paciente,
        }
    }
public static create(object:{[key:string]:any}):[string?,   UpdateDiagnosticoDto?]{

        if(!object.id_Paciente_Diagnosticos || (object.id_Paciente_Diagnosticos < 0)) return ["Se requiere id_Paciente_Diagnosticos", undefined]
        if(object.id_tipo_de_diagnostico && (object.id_tipo_de_diagnostico < 0)) return ["Se requiere id_tipo_de_diagnostico", undefined]
        if(object.detalles && (object.detalles.trim().length < 20)) return ["Se requiere detalles", undefined]
        if(!object.id_paciente || (object.id_paciente < 0)) return ["Se requiere id_paciente", undefined]
        if(!object.id_Admision || (object.id_Admision < 0)) return ["Se requiere id_Admision", undefined]
        
        return [undefined, new UpdateDiagnosticoDto(
            Number(object.id_Paciente_Diagnosticos),
            Number(object.id_Admision),
            Number(object.id_tipo_de_diagnostico),
            object.detalles.trim(),
            Number(object.id_paciente),
        
        )]
    }
        
}
