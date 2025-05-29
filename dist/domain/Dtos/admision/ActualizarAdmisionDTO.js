"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarAdmisionDto = void 0;
class ActualizarAdmisionDto {
    constructor(estado, id_motivo_de_Internacion, id_prioridad_de_atencion, id_tipo_de_admision, id_Paciente, id_Cama) {
        this.estado = estado;
        this.id_motivo_de_Internacion = id_motivo_de_Internacion;
        this.id_prioridad_de_atencion = id_prioridad_de_atencion;
        this.id_tipo_de_admision = id_tipo_de_admision;
        this.id_Paciente = id_Paciente;
        this.id_Cama = id_Cama;
    }
    static toObject(actualizarAdmisionDto) {
        return {
            estado: actualizarAdmisionDto.estado,
            id_motivo_de_Internacion: actualizarAdmisionDto.id_motivo_de_Internacion,
            id_prioridad_de_atencion: actualizarAdmisionDto.id_prioridad_de_atencion,
            id_tipo_de_admision: actualizarAdmisionDto.id_tipo_de_admision,
            id_Paciente: actualizarAdmisionDto.id_Paciente,
            id_Cama: actualizarAdmisionDto.id_Cama
        };
    }
}
exports.ActualizarAdmisionDto = ActualizarAdmisionDto;
ActualizarAdmisionDto.create = (objeto) => {
    try {
        let id_motivo_de_InternacionParseado;
        let id_prioridad_de_atencionParseado;
        let id_tipo_de_admisionParseado;
        let id_PacienteParseado;
        let id_CamaParseado;
        if (objeto.id_motivo_de_Internacion) {
            id_motivo_de_InternacionParseado = parseInt(objeto.id_motivo_de_Internacion);
        }
        else {
            id_motivo_de_InternacionParseado = objeto.id_motivo_de_Internacion;
        }
        if (objeto.id_prioridad_de_atencion) {
            id_prioridad_de_atencionParseado = parseInt(objeto.id_prioridad_de_atencion);
        }
        else {
            id_prioridad_de_atencionParseado = objeto.id_prioridad_de_atencion;
        }
        if (objeto.id_tipo_de_admision) {
            id_tipo_de_admisionParseado = parseInt(objeto.id_tipo_de_admision);
        }
        else {
            id_tipo_de_admisionParseado = objeto.id_tipo_de_admision;
        }
        if (objeto.id_Paciente) {
            id_PacienteParseado = parseInt(objeto.id_Paciente);
        }
        else {
            id_PacienteParseado = objeto.id_Paciente;
        }
        if (objeto.id_Cama) {
            id_CamaParseado = parseInt(objeto.id_Cama);
        }
        else {
            id_CamaParseado = objeto.id_Cama;
        }
        if (!objeto.id_Paciente)
            return ["Se requiere id_Paciente"];
        return [undefined, new ActualizarAdmisionDto(objeto.estado, id_motivo_de_InternacionParseado, id_prioridad_de_atencionParseado, id_tipo_de_admisionParseado, id_PacienteParseado, id_CamaParseado)];
    }
    catch (error) {
        return [error];
    }
};
//# sourceMappingURL=ActualizarAdmisionDTO.js.map