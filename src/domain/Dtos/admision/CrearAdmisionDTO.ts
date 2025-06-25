export class CrearAdmisionDto{

    private constructor(
        public estado:string = "Activo",
        public id_motivo_de_Internacion: number,
        public id_prioridad_de_atencion:number,
        public id_tipo_de_admision: number,
        public id_Paciente: number,
        public id_Cama: number


    ){}

    static toObject(crearAdmisionDto: CrearAdmisionDto){
        return {
            estado: crearAdmisionDto.estado,
            id_motivo_de_Internacion: crearAdmisionDto.id_motivo_de_Internacion,
            id_prioridad_de_atencion: crearAdmisionDto.id_prioridad_de_atencion,
            id_tipo_de_admision: crearAdmisionDto.id_tipo_de_admision,
            id_Paciente: crearAdmisionDto.id_Paciente,
            id_Cama: crearAdmisionDto.id_Cama
        }
    }
    static create = (objeto: {[key:string]:any}):[string?, CrearAdmisionDto?]=> {
        try {
            
            const id_motivo_de_InternacionParseado = parseInt(objeto.id_motivo_de_Internacion)
            if(!id_motivo_de_InternacionParseado) return ["Se requiere id_motivo_de_Internacion"]
            if(!objeto.id_prioridad_de_atencion) return ["Se requiere id_prioridad_de_atencion"]
            if(!objeto.id_tipo_de_admision) return ["Se requiere id_tipo_de_admision"]
            if(!objeto.id_Paciente) return ["Se requiere id_Paciente"]
            if(!objeto.id_Cama) return ["Se requiere id_Cama"]
            return [undefined, new CrearAdmisionDto(
                objeto.estado,
                id_motivo_de_InternacionParseado,
                parseInt(objeto.id_prioridad_de_atencion),
                parseInt(objeto.id_tipo_de_admision),
                parseInt(objeto.id_Paciente),
                parseInt(objeto.id_Cama)
            )]
        } catch (error) {
            return [error as string]
        }
    }
}