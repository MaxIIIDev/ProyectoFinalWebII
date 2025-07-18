
export class updateTurnoDto {

    private constructor(
        public id_turno: number,
        public fecha: string,
        public id_horario_turno: number,
        public id_paciente: number,
        public motivo: string,
        public id_medico: number,
        public estado: boolean
    ) { }

    static toObject(updateTurnoDto: updateTurnoDto) {
        return {
            id_turno: updateTurnoDto.id_turno,
            fecha: updateTurnoDto.fecha,
            id_horario_turno: updateTurnoDto.id_horario_turno,
            id_Paciente: updateTurnoDto.id_paciente,
            motivo: updateTurnoDto.motivo,
            id_Medico: updateTurnoDto.id_medico,
            estado: updateTurnoDto.estado
        }
    }

    static create = (objeto: { [key: string]: any }): [string?, updateTurnoDto?] => {
        try {
            const id_turnoParseado = parseInt(objeto.id_turno);
            if (!id_turnoParseado) return ["Se requiere id_turno"];
            const id_horario_turnoParseado = parseInt(objeto.id_horario_turno);
            if (!id_horario_turnoParseado) return ["Se requiere id_horario_turno"];
            if (!objeto.id_paciente) return ["Se requiere id_Paciente"];
            if (!objeto.id_medico) return ["Se requiere id_Medico"];
            if(!objeto.motivo) return ["Se requiere motivo"];
            if (!objeto.fecha) return ["Se requiere fecha"];
            const fechaParseada = new Date(objeto.fecha).toISOString().split('T')[0]; 
            if(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fechaParseada) === false) return ["Fecha invalida, debe ser en formato año-mes-dia"]

            return [undefined, new updateTurnoDto(
                id_turnoParseado,
                fechaParseada,
                id_horario_turnoParseado,
                parseInt(objeto.id_paciente),
                objeto.motivo,
                parseInt(objeto.id_medico),
                objeto.estado !== undefined ? objeto.estado : true 
            )]
        } catch (error) {
            return [error as string]
        }
    }

}

