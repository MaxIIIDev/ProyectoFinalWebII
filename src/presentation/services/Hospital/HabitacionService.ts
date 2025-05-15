import { Admision } from "../../../data/models/admision";
import { Hospital_alas } from "../../../data/models/hospital_alas";
import { Hospital_camas } from "../../../data/models/hospital_camas";
import { Hospital_habitaciones } from "../../../data/models/hospital_habitaciones";
import { Pacientes } from "../../../data/models/pacientes";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import { CamaService } from "./CamaService";

type datosNecesarios = {
    id_habitacion: number,
    nro_habitacion: number,
    
    id_ala: number,
    nombre_ala: string,
    unidad_ala: string,
    camas:{
        id_cama_1: number,
        genero_cama_1?: string,
        disponible_cama1?: boolean,
        id_cama_2?:number,
        genero_cama_2?: string,
        disponible_cama2?: boolean
    }
}

export class HabitacionService {

    static getHabitacionesDisponibles = async (genero: string, ala: string): Promise<[string?, any?]> => {
        try {
            const habitacionesCon1Habitacion = await Hospital_habitaciones.findAll({
                include: [
                    {
                        model: Hospital_camas,
                        as: "camas",
                        paranoid: false,
                        where: {
                            disponible: true
                        }
                    },
                    {
                        model: Hospital_alas,
                        as: "ala",
                        where: { nombre: `${ala}` }
                    }
                ],
                where: { cantidad_Camas: 1 }
            });

            const habitacionesConDosHabitaciones = await Hospital_habitaciones.findAll({
                include: [
                    {
                        model: Hospital_camas,
                        as: "camas",
                        include: [
                            {
                                model: Admision,
                                as: "admision",
                                include: [
                                    {
                                        model: Pacientes,
                                        as: "pacientes"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: Hospital_alas,
                        as: "ala",
                        where: { nombre: `${ala}` }
                    }
                ],
                where: { cantidad_Camas: 2 }
            });

            let elementosListos: datosNecesarios[] = [];

            if (habitacionesCon1Habitacion) {
                for (let habitacion of habitacionesCon1Habitacion) {
                    const objeto: datosNecesarios = {
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
                    let camaDisponible = habitacion.dataValues.camas.find((cama: any) => cama.dataValues.disponible === true);
                    let camaOcupada = habitacion.dataValues.camas.find((cama: any) => cama.dataValues.disponible === false);

                    if (camaDisponible) {
                        if (camaOcupada) {
                            const generoOcupado = camaOcupada.dataValues.admision.dataValues.pacientes.dataValues.genero;
                            if (generoOcupado !== genero) {
                                continue; // Si el género no coincide, no se agrega esta habitación
                            }
                        }

                        const objeto: datosNecesarios = {
                            id_habitacion: habitacion.dataValues.id_Habitacion,
                            nro_habitacion: habitacion.dataValues.nro_Habitacion,
                            id_ala: habitacion.dataValues.ala.dataValues.id_Ala,
                            nombre_ala: habitacion.dataValues.ala.dataValues.nombre,
                            unidad_ala: habitacion.dataValues.ala.dataValues.unidad,
                            camas: {
                                id_cama_1: camaDisponible.dataValues.id_Cama,
                                disponible_cama1: true,
                                id_cama_2: camaOcupada ? camaOcupada.dataValues.id_Cama : undefined,
                                genero_cama_2: camaOcupada ? camaOcupada.dataValues.admision.dataValues.pacientes.dataValues.genero : undefined
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
        } catch (error) {
            console.log(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitacionesDisponibles", "Habitacion Service", "11", error as string));
            return [error as string, undefined];
        }
    }

}