"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnfermerosController = void 0;
class EnfermerosController {
    constructor() {
        this.getEnfermeros = (req, res) => {
            res.send("hola estas en el metodo get enfermeros");
        };
    }
}
exports.EnfermerosController = EnfermerosController;
