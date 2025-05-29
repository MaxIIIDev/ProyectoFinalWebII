"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearTurnoDto = void 0;
class CrearTurnoDto {
    constructor(id_horario_turno, id_Paciente, id_Usuario, fecha, estado = "Activo") {
        this.id_horario_turno = id_horario_turno;
        this.id_Paciente = id_Paciente;
        this.id_Usuario = id_Usuario;
        this.fecha = fecha;
        this.estado = estado;
    }
    static toObject(crearTurnoDto) {
        return {
            id_horario_turno: crearTurnoDto.id_horario_turno,
            id_Paciente: crearTurnoDto.id_Paciente,
            id_Usuario: crearTurnoDto.id_Usuario,
            fecha: crearTurnoDto.fecha,
            estado: crearTurnoDto.estado
        };
    }
}
exports.CrearTurnoDto = CrearTurnoDto;
CrearTurnoDto.create = (objeto) => {
    try {
        const id_horario_turnoParseado = parseInt(objeto.id_horario_turno);
        if (!id_horario_turnoParseado)
            return ["Se requiere id_horario_turno"];
        if (!objeto.id_Paciente)
            return ["Se requiere id_Paciente"];
        if (!objeto.id_Usuario)
            return ["Se requiere id_Usuario"];
        if (!objeto.fecha)
            return ["Se requiere fecha"];
        return [undefined, new CrearTurnoDto(id_horario_turnoParseado, objeto.id_Paciente, objeto.id_Usuario, objeto.fecha)];
    }
    catch (error) {
        return [error];
    }
};
