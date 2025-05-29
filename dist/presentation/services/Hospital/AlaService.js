"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlaService = void 0;
const Hospital_alas_1 = require("../../../data/models/Hospital_alas");
const HelperForCreateErrors_1 = require("../../../Helpers/HelperForCreateErrors");
class AlaService {
}
exports.AlaService = AlaService;
_a = AlaService;
AlaService.getAlaFromDb = async () => {
    try {
        const alas = await Hospital_alas_1.Hospital_alas.findAll();
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
};
//# sourceMappingURL=AlaService.js.map