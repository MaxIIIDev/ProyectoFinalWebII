"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacienteAnonimo = void 0;
class PacienteAnonimo {
    static getPacienteMasculina() {
        return {
            nombre: "John",
            apellido: "doe",
            dni: null,
            fecha_nac: Date.now(),
            edad: 30,
            genero: "Masculino",
            direccion: "av SiempreViva",
        };
    }
    static getPacienteFemenina() {
        return {
            nombre: "Jane",
            apellido: "doe",
            dni: null,
            fecha_nac: Date.now(),
            edad: 30,
            genero: "Femenino",
            direccion: "av SiempreViva",
        };
    }
}
exports.PacienteAnonimo = PacienteAnonimo;
//# sourceMappingURL=PacienteAnonimo.js.map