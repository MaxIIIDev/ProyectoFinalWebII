

export class CrearTurnoDto{

    private constructor(
        public fecha: string ,   
        public id_horario_turno: number,
        public id_paciente: number,
        public motivo:string,
        public id_medico: number,
        public estado: boolean = true
            
    ){}

    static toObject(crearTurnoDto: CrearTurnoDto){
        return {
            fecha: crearTurnoDto.fecha,
            id_horario_turno: crearTurnoDto.id_horario_turno,
            id_paciente: crearTurnoDto.id_paciente,
            motivo: crearTurnoDto.motivo,
            id_medico: crearTurnoDto.id_medico,
            estado: crearTurnoDto.estado
        }
    }
    static create = (objeto: {[key:string]:any}):[string?, CrearTurnoDto?]=> {
        try {
            const id_horario_turnoParseado = parseInt(objeto.id_horario_turno)
            if(!id_horario_turnoParseado) return ["Se requiere id_horario_turno"]
            if(!objeto.id_paciente) return ["Se requiere id_Paciente"]
            if(!objeto.id_medico) return ["Se requiere id_Medico"]
            if(!objeto.fecha) return ["Se requiere fecha"]
            if(!objeto.motivo || objeto.motivo.trim() === "") return ["Se requiere motivo"]
            if(objeto.motivo.length < 20 || objeto.motivo.length > 255) return ["El motivo debe tener entre 20 y 255 caracteres"]
            const fechaParseada = new Date(objeto.fecha).toISOString().split('T')[0]; // Formato YYYY-MM-DD
            if(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fechaParseada) === false) return ["Fecha invalida, debe ser en formato año-mes-dia"]
            return [undefined, new CrearTurnoDto(
                fechaParseada,
                id_horario_turnoParseado,
                parseInt(objeto.id_paciente),
                objeto.motivo,
                parseInt(objeto.id_medico)
                )]
        } catch (error) {
            return [error as string]
        }
    }

}




