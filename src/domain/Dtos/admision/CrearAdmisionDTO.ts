

export class CrearAdmisionDto{

    private constructor(
        public tipo_De_Admision: string,
        public estado:string = "Activo",
        public motivo_De_Internacion:string,
        public id_Paciente: number,
        public id_Cama: number


    ){}

    static toObject(crearAdmisionDto: CrearAdmisionDto){
        return {
            tipo_De_Admision: crearAdmisionDto.tipo_De_Admision,
            estado:  "Activo",
            motivo_De_Internacion:crearAdmisionDto.motivo_De_Internacion,
            id_Paciente: crearAdmisionDto.id_Paciente,
            id_Cama: crearAdmisionDto.id_Cama
        }
    }
    static create = (objeto: {[key:string]:any}):[string?, CrearAdmisionDto?]=> {
        try {
            
            if(!objeto.tipo_De_Admision) return ["Se requiere tipo_De_Admision"]
            if(!objeto.motivo_De_Internacion) return ["Se requiere motivo_De_Internacion"]
            if(!objeto.id_Paciente) return ["Se requiere id_Paciente"]
            if(!objeto.id_Cama) return ["Se requiere id_Cama"]
            return [undefined, new CrearAdmisionDto(objeto.tipo_De_Admision,
                "Activo",
                objeto.motivo_De_Internacion,
                objeto.id_Paciente,
                objeto.id_Cama)]
        } catch (error) {
            return [error as string]
        }
    }
}