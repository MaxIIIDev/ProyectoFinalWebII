"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeguroMedicoDTO = void 0;
class getSeguroMedicoDTO {
    constructor(numero) {
        this.numero = numero;
    }
}
exports.getSeguroMedicoDTO = getSeguroMedicoDTO;
getSeguroMedicoDTO.toObject = (getSeguroMedico) => {
    return {
        numero: getSeguroMedico.numero
    };
};
getSeguroMedicoDTO.create = (numero) => {
    try {
        const numeroParseado = parseInt(numero);
        if (!numero)
            return ["Se requiere el numero"];
        return [undefined, new getSeguroMedicoDTO(numeroParseado)];
    }
    catch (error) {
        return [error, undefined];
    }
};
