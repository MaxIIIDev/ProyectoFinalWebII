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
exports.CamaService = void 0;
const Admision_1 = require("../../../data/models/Admision");
const Hospital_camas_1 = require("../../../data/models/Hospital_camas");
const Pacientes_1 = require("../../../data/models/Pacientes");
const HelperForCreateErrors_1 = require("../../../Helpers/HelperForCreateErrors");
const Hospital_habitaciones_1 = require("../../../data/models/Hospital_habitaciones");
const Hospital_alas_1 = require("../../../data/models/Hospital_alas");
class CamaService {
}
exports.CamaService = CamaService;
_a = CamaService;
CamaService.buscarCama = (id_Cama) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id_Cama) {
            HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCama", "CamaService", "15", "Debe enviar el id_Cama");
            return ["Debe enviar el id_Cama"];
        }
        const cama = yield Hospital_camas_1.Hospital_camas.findOne({
            include: [
                {
                    model: Hospital_habitaciones_1.Hospital_habitaciones,
                    as: "habitacion",
                    include: [
                        {
                            model: Hospital_alas_1.Hospital_alas,
                            as: "ala"
                        }
                    ]
                }
            ],
            where: { id_Cama: id_Cama }
        });
        if (!cama) {
            HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCama", "CamaService", "20", "No se enocntro una cama con ese Id");
            return ["No se encontro una cama con ese Id"];
        }
        return [undefined, cama];
    }
    catch (error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCama", "CamaService", "20", error);
        return [error, undefined];
    }
});
CamaService.buscarGeneroDeCamaOcupadaPorHabitacion = (id_habitacion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id_habitacion) {
            throw ("Debe enviar el id_habitacion");
        }
        const cama = yield Hospital_camas_1.Hospital_camas.findOne({
            include: [
                {
                    model: Admision_1.Admision,
                    as: "admision",
                    include: [
                        {
                            model: Pacientes_1.Pacientes,
                            as: "pacientes"
                        }
                    ]
                }
            ],
            where: { id_habitacion: id_habitacion }
        });
        if (!cama) {
            throw ("No se obtuvo la cama");
        }
        if (!cama.dataValues.admision) {
            return "No tiene paciente";
        }
        return cama.dataValues.admision.pacientes.genero;
    }
    catch (error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCamaOcupadaPorHabitacion", "CamaService", "20", error);
    }
});
CamaService.marcarCamaComoOcupada = (id_Cama) => __awaiter(void 0, void 0, void 0, function* () {
    //*TESTEADO
    try {
        const camaEncontrada = yield _a.buscarCama(id_Cama);
        if (camaEncontrada[0]) {
            HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("marcarCamaComoOcupada", "CamaService", "69", camaEncontrada[0]);
            return [camaEncontrada[0]];
        }
        const [filasActualizadas] = yield Hospital_camas_1.Hospital_camas.update({ disponible: false }, { where: { id_Cama } });
        if (filasActualizadas === 0) {
            HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("marcarCamaComoOcupada", "CamaService", "76", "No se modifico la cama");
            return ["No se actualizo marco como ocupada la cama"];
        }
        console.log("Se marco la cama como ocupada");
        return [undefined, true];
    }
    catch (error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("marcarCamaComoOcupada", "CamaServie", "77", error);
        return [error];
    }
});
CamaService.marcarCamaComoLibre = (id_Cama) => __awaiter(void 0, void 0, void 0, function* () {
    //*TESTEADO
    try {
        const camaEncontrada = yield _a.buscarCama(id_Cama);
        if (camaEncontrada[0]) {
            HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("marcarCamaComoLibre", "CamaService", "89", camaEncontrada[0]);
            return [camaEncontrada[0], false];
        }
        const [filasActualizadas] = yield Hospital_camas_1.Hospital_camas.update({ disponible: true }, { where: { id_Cama } });
        if (filasActualizadas === 0) {
            HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("marcarCamaComoLibre", "CamaService", "96", "No se modifico la cama");
            return ["No se actualizo marco como libre la cama", false];
        }
        console.log("Se marco la cama como libre");
        return [undefined, true];
    }
    catch (error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("marcarCamaComoLibre", "CamaServie", "97", error);
        return [error];
    }
});
//# sourceMappingURL=CamaService.js.map