"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrioridadDeAtencionService = void 0;
const Prioridad_De_Atencion_1 = require("../../data/models/Prioridad_De_Atencion");
const HelperForCreateErrors_1 = require("../../Helpers/HelperForCreateErrors");
class PrioridadDeAtencionService {
    static buscarLasPrioridadesDeAtencionEnDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prioridadesDeAtencion = yield Prioridad_De_Atencion_1.Prioridad_De_Atencion.findAll();
                if (!prioridadesDeAtencion)
                    return ["No se encontraron las prioridades de atencion"];
                return [undefined, prioridadesDeAtencion];
            }
            catch (error) {
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarLasPrioridadesDeAtencionEnDB", "PrioridadDeAtencionService", "15", error);
                return [error];
            }
        });
    }
}
exports.PrioridadDeAtencionService = PrioridadDeAtencionService;
//# sourceMappingURL=PrioridadDeAtencionService.js.map