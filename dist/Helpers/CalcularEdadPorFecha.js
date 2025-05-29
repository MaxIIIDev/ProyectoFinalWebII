"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularEdad = calcularEdad;
function calcularEdad(fechaNacimiento) {
    const partesFecha = fechaNacimiento.split('-');
    const año = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1;
    const dia = parseInt(partesFecha[2], 10);
    const fechaNac = new Date(año, mes, dia);
    const fechaActual = new Date();
    if (isNaN(fechaNac.getTime()) || fechaNac > fechaActual) {
        return NaN;
    }
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    if (mesActual < mes || (mesActual === mes && diaActual < dia)) {
        edad--;
    }
    return edad >= 0 ? edad : 0;
}
