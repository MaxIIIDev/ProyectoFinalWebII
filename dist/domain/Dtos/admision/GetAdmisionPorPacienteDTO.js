"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAdmisionPorPacienteDTO = void 0;
class GetAdmisionPorPacienteDTO {
    constructor(dni) {
        this.dni = dni;
    }
}
exports.GetAdmisionPorPacienteDTO = GetAdmisionPorPacienteDTO;
GetAdmisionPorPacienteDTO.toObject = (getAdmisionesPorPacienteDTO) => {
    return {
        dni: getAdmisionesPorPacienteDTO.dni
    };
};
GetAdmisionPorPacienteDTO.create = (dniEnviado) => {
    try {
        if (!dniEnviado)
            return ["Se requiere el dni"];
        return [undefined, new GetAdmisionPorPacienteDTO(dniEnviado)];
    }
    catch (error) {
        return [error];
    }
};
//# sourceMappingURL=GetAdmisionPorPacienteDTO.js.map