"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperForCreateErrors = void 0;
class HelperForCreateErrors {
    static errorInMethodXLineX(metodo, linea) {
        return `Error en ${metodo}\nLinea: ${linea}`;
    }
    static errorInMethodXClassXLineXErrorX(metodo, clase, linea, error) {
        const message = `\n===============================\n==Error en ${metodo}\n==Nombre de la clase: ${clase}\n==Linea: ${linea}\n==Error: ${error}\n==========================\n`;
        console.log(message);
        return message;
    }
}
exports.HelperForCreateErrors = HelperForCreateErrors;
