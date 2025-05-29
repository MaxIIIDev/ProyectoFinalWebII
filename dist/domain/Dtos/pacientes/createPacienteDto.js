"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePacienteDto = void 0;
const CalcularEdadPorFecha_1 = require("../../../Helpers/CalcularEdadPorFecha");
class CreatePacienteDto {
    constructor(nombre, apellido, dni, fecha_nac, genero, direccion, edad, peso, telefono, telefono_De_Emergencia, id_tipo_sanguineo, id_seguro_medico) {
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
        this.id_seguro_medico = id_seguro_medico;
    }
    static create(object) {
        const { nombre, apellido, dni, fecha_nac, edad, peso, genero, telefono, telefono_De_Emergencia, direccion, id_tipo_sanguineo, id_seguro_medico } = object;
        if (!nombre)
            return ["Se requiere el nombre"];
        if (!apellido)
            return ["Se requiere el apellido"];
        if (!dni)
            return ["Se requiere el dni"];
        if (!fecha_nac)
            ["Se requiere la fecha de nacimiento"];
        if (!genero)
            return ["Se requiere el genero"];
        if (!direccion)
            return ["Se requiere la direccion"];
        let edadCalculada;
        if (new Date(fecha_nac) > new Date())
            return ["La fecha de nacimiento no puede ser mayor a la fecha actual"];
        if (fecha_nac) {
            edadCalculada = (0, CalcularEdadPorFecha_1.calcularEdad)(fecha_nac);
        }
        let fechaNacimientoModificada = fecha_nac.split("T")[0];
        let id_tipo_sanguineoCambio;
        if (id_tipo_sanguineo == 0) {
            id_tipo_sanguineoCambio = undefined;
        }
        else {
            id_tipo_sanguineoCambio = id_tipo_sanguineo;
        }
        const id_tipo_sanguineoParse = parseInt(id_tipo_sanguineo);
        return [undefined, new CreatePacienteDto(nombre, apellido, dni, fechaNacimientoModificada, genero, direccion, edadCalculada, peso, telefono, telefono_De_Emergencia, id_tipo_sanguineoParse, id_seguro_medico)];
    }
}
exports.CreatePacienteDto = CreatePacienteDto;
CreatePacienteDto.toObject = (createPacienteDto) => {
    return {
        nombre: createPacienteDto.nombre,
        apellido: createPacienteDto.apellido,
        dni: createPacienteDto.dni,
        fecha_nac: createPacienteDto.fecha_nac,
        edad: createPacienteDto.edad,
        peso: createPacienteDto.peso,
        genero: createPacienteDto.genero,
        telefono: createPacienteDto.telefono,
        telefono_De_Emergencia: createPacienteDto.telefono_De_Emergencia,
        direccion: createPacienteDto.direccion,
        id_tipo_sanguineo: createPacienteDto.id_tipo_sanguineo,
        id_seguro_medico: createPacienteDto.id_seguro_medico
    };
};
