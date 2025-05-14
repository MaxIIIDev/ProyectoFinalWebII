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

            })
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
                        ],

                    },
                    {
                        model: Hospital_alas,
                        as: "ala",
                        where: { nombre: `${ala}` }
                    }

                ],
                where: { cantidad_Camas: 2 }
            })
           
            
            console.log(habitacionesCon1Habitacion);
            
            var elementosListos: datosNecesarios[] = [];
            if(habitacionesCon1Habitacion){
                for (let habitacion of habitacionesCon1Habitacion) {
                    const objeto: datosNecesarios = {
                        id_habitacion: habitacion.dataValues.id_Habitacion,
                        nro_habitacion: habitacion.dataValues.nro_Habitacion,               
                        id_ala: habitacion.dataValues.ala.dataValues.id_Ala,
                        nombre_ala: habitacion.dataValues.ala.dataValues.nombre,
                        unidad_ala: habitacion.dataValues.ala.dataValues.unidad,
                        camas: {
                            id_cama_1: habitacion.dataValues.camas[0].dataValues.id_Cama,                        
                        }
                    }
    
                    elementosListos.push(objeto)
                }
            }
            
           
           
            var objetosDisponibles: datosNecesarios[]= [];
            var objetosNoDisponibles: datosNecesarios[] = [];

            for (let habitacion of habitacionesConDosHabitaciones) {
               
                for(let cama of habitacion.dataValues.camas){
                    
                    
                    if (cama.dataValues.disponible == true) {
                        console.log("se agrego CAMA DISPONIBLE linea 99");
                        console.log("ES en 114");
                        const objetoNuevo : datosNecesarios = {
                            id_habitacion: habitacion.dataValues.id_Habitacion,
                            nro_habitacion: habitacion.dataValues.nro_Habitacion,
                            id_ala: habitacion.dataValues.ala.dataValues.id_Ala,
                            nombre_ala: habitacion.dataValues.ala.dataValues.nombre,
                            unidad_ala: habitacion.dataValues.ala.dataValues.unidad,
                            camas: {
                                id_cama_1: cama.dataValues.id_Cama,
                                disponible_cama1: true,
                                id_cama_2: undefined,
                                genero_cama_2: undefined
                            }
                        }
                        
                        
                        objetosDisponibles.push(objetoNuevo);
                       
                    } else {
                       
                        const objetoNuevoNoDisponible : datosNecesarios = {
                            id_habitacion: habitacion.dataValues.id_Habitacion,
                            nro_habitacion: habitacion.dataValues.nro_Habitacion,
                            id_ala: habitacion.dataValues.ala.dataValues.id_Ala,
                            nombre_ala: habitacion.dataValues.ala.dataValues.nombre,
                            unidad_ala: habitacion.dataValues.ala.dataValues.unidad,
                            camas: {
                                id_cama_1: cama.dataValues.id_Cama,
                                genero_cama_1: habitacion.dataValues.camas[0].dataValues.admision.dataValues.pacientes.dataValues.genero,
                                disponible_cama1: false,
                                id_cama_2: undefined,
                                genero_cama_2: undefined
                            }
                        }
                        console.log("ES ARRIBAAAAAAAAAAAA");
                        objetosNoDisponibles.push(objetoNuevoNoDisponible);
                       
                    }
                }
            }
            if (!objetosDisponibles && !elementosListos) {
                throw Error("No hay habitaciones disponibles en esta ala")
            }
         
            for(let objetoRecorrido of objetosDisponibles){
                if(objetosNoDisponibles.length> 0){
                    const encontrado = objetosNoDisponibles.find( (objeto) => {
                        return objetoRecorrido.id_habitacion == objeto.id_habitacion && objeto.camas.genero_cama_1 == genero
                    }) 
                    if(encontrado){
                        elementosListos.push(encontrado)
                    }
                   
                    
                }else{
                    elementosListos.push(objetoRecorrido)
                }
                
               
            }
          
            
           if(elementosListos.length == 0){
            return ["NO hay habitaciones disponibles"]
           }
           

            return [undefined, elementosListos];
        } catch (error) {
            console.log(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitacionesDisponibles", "Habitacion Service", "11", error as string));
            return [error as string, undefined];
        }
    }

}
// if (cama.dataValues.disponible == true) {
//     console.log("se agrego CAMA DISPONIBLE linea 99");

//     CamasDisponiblesFiltro.push(cama);
// } else {
//     console.log("se agrego CAMA NO DISPONIBLE linea 103");
//     CamasNoDisponiblesFiltro.push(cama)
// }

 
// for (let camaDisponible of CamasDisponiblesFiltro) {
//     let coincidencia = false;
//     for (let camaNoDisponible of CamasNoDisponiblesFiltro) {

//         console.log(camaNoDisponible.dataValues.admision.dataValues.pacientes.dataValues.genero);
//         console.log("\nEnviado: " + genero);
//         console.log("\n" + genero != camaNoDisponible.dataValues.admision.dataValues.pacientes.dataValues.genero);

//         if (camaDisponible.dataValues.id_Habitacion == camaNoDisponible.dataValues.id_Habitacion) {
//             coincidencia = true;
//         }
//         if (camaDisponible.dataValues.id_Habitacion == camaNoDisponible.dataValues.id_Habitacion && genero == camaNoDisponible.dataValues.admision.dataValues.pacientes.dataValues.genero) {
//             camasDisponiblesDe2Camas.push(camaDisponible);
           

//         }
//     }
//     if (coincidencia == false) {
//         camasDisponiblesDe2Camas.push(camaDisponible)
//     }

// }