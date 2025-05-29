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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlaService = void 0;
const Hospital_alas_1 = require("../../../data/models/Hospital_alas");
const HelperForCreateErrors_1 = require("../../../Helpers/HelperForCreateErrors");
class AlaService {
}
exports.AlaService = AlaService;
_a = AlaService;
AlaService.getAlaFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alas = yield Hospital_alas_1.Hospital_alas.findAll();
        let objetosLimpios = [];
        for (let ala of alas) {
            let validado = true;
            if (objetosLimpios.length == 0) {
                objetosLimpios.push(ala.dataValues);
            }
            if (objetosLimpios.length != 0) {
                for (let element of objetosLimpios) {
                    if (element.nombre == ala.dataValues.nombre) {
                        validado = false;
                    }
                }
                if (validado) {
                    objetosLimpios.push(ala.dataValues);
                }
            }
        }
        return objetosLimpios;
    }
    catch (error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAlaFromDb", "AlaService", "9", error);
    }
});
//# sourceMappingURL=AlaService.js.map