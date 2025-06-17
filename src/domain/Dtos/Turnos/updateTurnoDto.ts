
export class updateTurnoDto {

    private constructor(
        public id_turno: number,
        public fecha: string,
        public id_horario_turno: number,
        public id_Paciente: number,
        public motivo: string,
        public id_Medico: number,
        public estado: boolean
    ) { }

    static toObject(updateTurnoDto: updateTurnoDto) {
        return {
            id_turno: updateTurnoDto.id_turno,
            fecha: updateTurnoDto.fecha,
            id_horario_turno: updateTurnoDto.id_horario_turno,
            id_Paciente: updateTurnoDto.id_Paciente,
            motivo: updateTurnoDto.motivo,
            id_Medico: updateTurnoDto.id_Medico,
            estado: updateTurnoDto.estado
        }
    }

    static create = (objeto: { [key: string]: any }): [string?, updateTurnoDto?] => {
        try {
            const id_turnoParseado = parseInt(objeto.id_turno);
            if (!id_turnoParseado) return ["Se requiere id_turno"];
            const id_horario_turnoParseado = parseInt(objeto.id_horario_turno);
            if (!id_horario_turnoParseado) return ["Se requiere id_horario_turno"];
            if (!objeto.id_Paciente) return ["Se requiere id_Paciente"];
            if (!objeto.id_Medico) return ["Se requiere id_Medico"];
            if(!objeto.motivo) return ["Se requiere motivo"];
            if (!objeto.fecha) return ["Se requiere fecha"];
            const fechaParseada = new Date(objeto.fecha).toISOString().split('T')[0]; 

            return [undefined, new updateTurnoDto(
                id_turnoParseado,
                fechaParseada,
                id_horario_turnoParseado,
                parseInt(objeto.id_Paciente),
                objeto.motivo,
                parseInt(objeto.id_Medico),
                objeto.estado !== undefined ? objeto.estado : true 
            )]
        } catch (error) {
            return [error as string]
        }
    }

}

