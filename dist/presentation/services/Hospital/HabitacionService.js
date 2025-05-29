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
exports.HabitacionService = void 0;
const Admision_1 = require("../../../data/models/Admision");
const Hospital_alas_1 = require("../../../data/models/Hospital_alas");
const Hospital_camas_1 = require("../../../data/models/Hospital_camas");
const Hospital_habitaciones_1 = require("../../../data/models/Hospital_habitaciones");
const Pacientes_1 = require("../../../data/models/Pacientes");
const HelperForCreateErrors_1 = require("../../../Helpers/HelperForCreateErrors");
class HabitacionService {
}
exports.HabitacionService = HabitacionService;
_a = HabitacionService;
HabitacionService.getHabitacionesDisponibles = (genero, ala) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habitacionesCon1Habitacion = yield Hospital_habitaciones_1.Hospital_habitaciones.findAll({
            include: [
                {
                    model: Hospital_camas_1.Hospital_camas,
                    as: "camas",
                    paranoid: false,
                    where: {
                        disponible: true
                    }
                },
                {
                    model: Hospital_alas_1.Hospital_alas,
                    as: "ala",
                    where: { nombre: `${ala}` }
                }
            ],
            where: { cantidad_Camas: 1 }
        });
        const habitacionesConDosHabitaciones = yield Hospital_habitaciones_1.Hospital_habitaciones.findAll({
            include: [
                {
                    model: Hospital_camas_1.Hospital_camas,
                    as: "camas",
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
                    ]
                },
                {
                    model: Hospital_alas_1.Hospital_alas,
                    as: "ala",
                    where: { nombre: `${ala}` }
                }
            ],
            where: { cantidad_Camas: 2 }
        });
        let elementosListos = [];
        if (habitacionesCon1Habitacion) {
            for (let habitacion of habitacionesCon1Habitacion) {
                const objeto = {
                    id_habitacion: habitacion.dataValues.id_Habitacion,
                    nro_habitacion: habitacion.dataValues.nro_Habitacion,
                    id_ala: habitacion.dataValues.ala.dataValues.id_Ala,
                    nombre_ala: habitacion.dataValues.ala.dataValues.nombre,
                    unidad_ala: habitacion.dataValues.ala.dataValues.unidad,
                    camas: {
                        id_cama_1: habitacion.dataValues.camas[0].dataValues.id_Cama,
                        disponible_cama1: true
                    }
                };
                elementosListos.push(objeto);
            }
        }
        if (habitacionesConDosHabitaciones) {
            for (let habitacion of habitacionesConDosHabitaciones) {
                let camaDisponible = habitacion.dataValues.camas.filter((cama) => cama.dataValues.disponible === true);
                let camaOcupada = habitacion.dataValues.camas.filter((cama) => cama.dataValues.disponible === false);
                if (camaDisponible.length === 2) {
                    const objeto = {
                        id_habitacion: habitacion.dataValues.id_Habitacion,
                        nro_habitacion: habitacion.dataValues.nro_Habitacion,
                        id_ala: habitacion.dataValues.ala.dataValues.id_Ala,
                        nombre_ala: habitacion.dataValues.ala.dataValues.nombre,
                        unidad_ala: habitacion.dataValues.ala.dataValues.unidad,
                        camas: {
                            id_cama_1: camaDisponible[0].dataValues.id_Cama,
                            disponible_cama1: true,
                            id_cama_2: camaDisponible[1].dataValues.id_Cama,
                            disponible_cama2: true
                        }
                    };
                    elementosListos.push(objeto);
                    continue;
                }
                if (camaDisponible.length === 1 && camaOcupada.length === 1) {
                    const camaAva = camaDisponible[0];
                    const camaUna = camaOcupada[0];
                    const generoOcupado = camaUna.dataValues.admision.dataValues.pacientes.dataValues.genero;
                    // if (camaOcupada) {
                    //     const generoOcupado = camaOcupada.dataValues.admision.dataValues.pacientes.dataValues.genero;
                    //     if (generoOcupado !== genero) {
                    //         continue; // Si el género no coincide, no se agrega esta habitación
                    //     }
                    // }
                    if (generoOcupado !== genero) {
                        continue;
                    }
                    const objeto = {
                        id_habitacion: habitacion.dataValues.id_Habitacion,
                        nro_habitacion: habitacion.dataValues.nro_Habitacion,
                        id_ala: habitacion.dataValues.ala.dataValues.id_Ala,
                        nombre_ala: habitacion.dataValues.ala.dataValues.nombre,
                        unidad_ala: habitacion.dataValues.ala.dataValues.unidad,
                        camas: {
                            id_cama_1: camaAva.dataValues.id_Cama,
                            disponible_cama1: true,
                            //id_cama_2: camaUna ? camaUna.dataValues.id_Cama : undefined,
                            //genero_cama_2: camaUna ? generoOcupado : undefined,
                            //disponible_cama2: false
                        }
                    };
                    elementosListos.push(objeto);
                }
            }
        }
        if (elementosListos.length === 0) {
            return ["No hay habitaciones disponibles"];
        }
        return [undefined, elementosListos];
    }
    catch (error) {
        console.log(HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitacionesDisponibles", "Habitacion Service", "11", error));
        return [error, undefined];
    }
});
