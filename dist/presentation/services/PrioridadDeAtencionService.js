"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrioridadDeAtencionService = void 0;
const Prioridad_De_Atencion_1 = require("../../data/models/Prioridad_De_Atencion");
const HelperForCreateErrors_1 = require("../../Helpers/HelperForCreateErrors");
class PrioridadDeAtencionService {
    static async buscarLasPrioridadesDeAtencionEnDB() {
        try {
            const prioridadesDeAtencion = await Prioridad_De_Atencion_1.Prioridad_De_Atencion.findAll();
            if (!prioridadesDeAtencion)
                return ["No se encontraron las prioridades de atencion"];
            return [undefined, prioridadesDeAtencion];
        }
        catch (error) {
            HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarLasPrioridadesDeAtencionEnDB", "PrioridadDeAtencionService", "15", error);
            return [error];
        }
    }
}
exports.PrioridadDeAtencionService = PrioridadDeAtencionService;
//# sourceMappingURL=PrioridadDeAtencionService.js.map