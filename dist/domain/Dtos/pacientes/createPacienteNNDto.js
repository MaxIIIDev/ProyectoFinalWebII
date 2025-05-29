"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePacienteNNDto = void 0;
class CreatePacienteNNDto {
    constructor(nombre, apellido, dni, fecha_nac, edad, genero, direccion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fecha_nac = fecha_nac;
        this.edad = edad;
        this.genero = genero;
        this.direccion = direccion;
    }
    static create(object) {
        const { nombre, apellido, dni, fecha_nac, edad, genero, direccion } = object;
        if (!genero)
            return ["Se requiere el genero"];
        return [undefined, new CreatePacienteNNDto(nombre, apellido, dni, fecha_nac, edad, genero, direccion)];
    }
}
exports.CreatePacienteNNDto = CreatePacienteNNDto;
CreatePacienteNNDto.toObject = (createPacienteDto) => {
    return {
        nombre: createPacienteDto.nombre,
        apellido: createPacienteDto.apellido,
        dni: createPacienteDto.dni,
        fecha_nac: createPacienteDto.fecha_nac,
        edad: createPacienteDto.edad,
        genero: createPacienteDto.genero,
        direccion: createPacienteDto.direccion,
    };
};
