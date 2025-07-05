

export class CreateDiagnosticoDto {
    

    private constructor(
        public fecha:string,
        public id_tipo_de_diagnostico:number,
        public detalles:string, 
        public id_medico:number,
        public id_paciente:number,
        public id_tratamiento:number,
        public id_Admision:number,
    ){}
    public static toObject(object:CreateDiagnosticoDto):{[key:string]:any}{
        return {
            fecha:object.fecha,
            id_tipo_de_diagnostico:object.id_tipo_de_diagnostico,
            detalles:object.detalles,
            id_medico:object.id_medico,
            id_paciente:object.id_paciente,
            id_tratamiento:object.id_tratamiento,
            id_Admision:object.id_Admision
        }
    }
    public static create(object:{[key:string]:any}):[string?,CreateDiagnosticoDto?]{

        const fecha = new Date().toISOString().split("T")[0];
        if(!object.id_tipo_de_diagnostico || (object.id_tipo_de_diagnostico < 0)) return ["Se requiere id_tipo_de_diagnostico", undefined]
        if(!object.detalles || (object.detalles.length < 0)) return ["Se requiere detalles", undefined]
        if(!object.id_medico || (object.id_medico < 0)) return ["Se requiere id_medico", undefined]
        if(!object.id_paciente || (object.id_paciente < 0)) return ["Se requiere id_paciente", undefined]
        if(!object.id_tratamiento || (object.id_tratamiento < 0)) return ["Se requiere id_tratamiento", undefined]
        if(!object.id_Admision || (object.id_Admision < 0)) return ["Se requiere id_Admision", undefined]
        return [undefined, new CreateDiagnosticoDto(
            fecha,
            Number(object.id_tipo_de_diagnostico),
            object.detalles,
            Number(object.id_medico),
            Number(object.id_paciente),
            Number(object.id_tratamiento),
            Number(object.id_Admision)
        )]
    }
        
}
