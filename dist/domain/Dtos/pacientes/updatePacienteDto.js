"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePacienteDto = void 0;
const CalcularEdadPorFecha_1 = require("../../../Helpers/CalcularEdadPorFecha");
class UpdatePacienteDto {
    constructor(id_Paciente, nombre, apellido, dni, fecha_nac, genero, direccion, edad, peso, telefono, telefono_De_Emergencia, id_tipo_sanguineo) {
        this.id_Paciente = id_Paciente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fecha_nac = fecha_nac;
        this.genero = genero;
        this.direccion = direccion;
        this.edad = edad;
        this.peso = peso;
        this.telefono = telefono;
        this.telefono_De_Emergencia = telefono_De_Emergencia;
        this.id_tipo_sanguineo = id_tipo_sanguineo;
    }
    static create(object, actual) {
        const { id_Paciente, nombre, apellido, dni, fecha_nac, edad, peso, genero, telefono, telefono_De_Emergencia, direccion, id_tipo_sanguineo } = object;
        if (!id_Paciente)
            return ["Se requiere el id del paciente"];
        const dniParseada = (dni) ? parseInt(dni) : dni;
        let edadCalculada = edad;
        console.log(fecha_nac);
        const id_tipo_sanguineoParseado = (id_tipo_sanguineo) ? parseInt(id_tipo_sanguineo) : id_tipo_sanguineo;
        if (fecha_nac) {
            edadCalculada = (0, CalcularEdadPorFecha_1.calcularEdad)(fecha_nac);
        }
        const telefonoEmergenciaParseado = (telefono_De_Emergencia) ? telefono_De_Emergencia : null;
        let fechaNacimientoModificada = new Date(fecha_nac);
        const fechaActual = new Date();
        if (fechaNacimientoModificada > fechaActual)
            return ["La fecha de nacimiento no puede ser mayor a la fecha actual"];
        return [undefined, new UpdatePacienteDto(id_Paciente, nombre, apellido, dniParseada, fecha_nac, genero, direccion, edadCalculada, peso, telefono, telefonoEmergenciaParseado, id_tipo_sanguineoParseado)];
    }
}
exports.UpdatePacienteDto = UpdatePacienteDto;
UpdatePacienteDto.toObject = (updatePacienteDto) => {
    return {
        id_Paciente: updatePacienteDto.id_Paciente,
        nombre: updatePacienteDto.nombre,
        apellido: updatePacienteDto.apellido,
        dni: updatePacienteDto.dni,
        fecha_nac: updatePacienteDto.fecha_nac,
        edad: updatePacienteDto.edad,
        peso: updatePacienteDto.peso,
        genero: updatePacienteDto.genero,
        telefono: updatePacienteDto.telefono,
        telefono_De_Emergencia: updatePacienteDto.telefono_De_Emergencia,
        direccion: updatePacienteDto.direccion,
        id_tipo_sanguineo: updatePacienteDto.id_tipo_sanguineo
    };
};
//# sourceMappingURL=updatePacienteDto.js.map