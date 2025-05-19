

export class CrearTurnoDto{

    private constructor(
        public id_horario_turno: number,
        public id_Paciente: number,
        public id_Usuario: number,
        public fecha: string,
        public estado: string = "Activo"
    ){}

    static toObject(crearTurnoDto: CrearTurnoDto){
        return {
            id_horario_turno: crearTurnoDto.id_horario_turno,
            id_Paciente: crearTurnoDto.id_Paciente,
            id_Usuario: crearTurnoDto.id_Usuario,
            fecha: crearTurnoDto.fecha,
            estado: crearTurnoDto.estado
        }
    }
    static create = (objeto: {[key:string]:any}):[string?, CrearTurnoDto?]=> {
        try {
            const id_horario_turnoParseado = parseInt(objeto.id_horario_turno)
            if(!id_horario_turnoParseado) return ["Se requiere id_horario_turno"]
            if(!objeto.id_Paciente) return ["Se requiere id_Paciente"]
            if(!objeto.id_Usuario) return ["Se requiere id_Usuario"]
            if(!objeto.fecha) return ["Se requiere fecha"]
            return [undefined, new CrearTurnoDto(
                id_horario_turnoParseado,
                objeto.id_Paciente,
                objeto.id_Usuario,
                objeto.fecha)]
        } catch (error) {
            return [error as string]
        }
    }

}




