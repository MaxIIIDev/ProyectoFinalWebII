"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotivosDeInternacionService = void 0;
const motivo_De_Internacion_1 = require("../../data/models/motivo_De_Internacion");
class MotivosDeInternacionService {
    static async buscarMotivosDeInternacion() {
        try {
            const motivos = await motivo_De_Internacion_1.motivo_De_Internacion.findAll();
            if (!motivos)
                return ["No se encontraron registrados motivos de internacion"];
            return [undefined, motivos];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.MotivosDeInternacionService = MotivosDeInternacionService;
//# sourceMappingURL=MotivosDeInternacionService.js.map