"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearAdmisionDto = void 0;
class CrearAdmisionDto {
    constructor(estado = "Activo", id_motivo_de_Internacion, id_prioridad_de_atencion, id_tipo_de_admision, id_Paciente, id_Cama) {
        this.estado = estado;
        this.id_motivo_de_Internacion = id_motivo_de_Internacion;
        this.id_prioridad_de_atencion = id_prioridad_de_atencion;
        this.id_tipo_de_admision = id_tipo_de_admision;
        this.id_Paciente = id_Paciente;
        this.id_Cama = id_Cama;
    }
    static toObject(crearAdmisionDto) {
        return {
            estado: crearAdmisionDto.estado,
            id_motivo_de_Internacion: crearAdmisionDto.id_motivo_de_Internacion,
            id_prioridad_de_atencion: crearAdmisionDto.id_prioridad_de_atencion,
            id_tipo_de_admision: crearAdmisionDto.id_tipo_de_admision,
            id_Paciente: crearAdmisionDto.id_Paciente,
            id_Cama: crearAdmisionDto.id_Cama
        };
    }
}
exports.CrearAdmisionDto = CrearAdmisionDto;
CrearAdmisionDto.create = (objeto) => {
    try {
        const id_motivo_de_InternacionParseado = parseInt(objeto.id_motivo_de_Internacion);
        if (!id_motivo_de_InternacionParseado)
            return ["Se requiere id_motivo_de_Internacion"];
        if (!objeto.id_prioridad_de_atencion)
            return ["Se requiere id_prioridad_de_atencion"];
        if (!objeto.id_tipo_de_admision)
            return ["Se requiere id_tipo_de_admision"];
        if (!objeto.id_Paciente)
            return ["Se requiere id_Paciente"];
        if (!objeto.id_Cama)
            return ["Se requiere id_Cama"];
        return [undefined, new CrearAdmisionDto(objeto.estado, id_motivo_de_InternacionParseado, objeto.id_prioridad_de_atencion, objeto.id_tipo_de_admision, objeto.id_Paciente, objeto.id_Cama)];
    }
    catch (error) {
        return [error];
    }
};
