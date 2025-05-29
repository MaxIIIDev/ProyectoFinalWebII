"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPacienteDto = void 0;
class GetPacienteDto {
    constructor(dni) {
        this.dni = dni;
    }
    static create(dniEnviado) {
        try {
            if (!dniEnviado)
                return ["Se requiere el Dni", undefined];
            return [undefined, new GetPacienteDto(dniEnviado)];
        }
        catch (error) {
            return [error, undefined];
        }
    }
}
exports.GetPacienteDto = GetPacienteDto;
GetPacienteDto.toObject = (getPacienteDto) => {
    return {
        dni: getPacienteDto.dni
    };
};
//# sourceMappingURL=getPacienteDto.js.map