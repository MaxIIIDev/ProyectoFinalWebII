import { Hospital_alas } from "../../../data/models/hospital_alas";
import { Hospital_camas } from "../../../data/models/hospital_camas";
import { Hospital_habitaciones } from "../../../data/models/hospital_habitaciones";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import { CamaService } from "./CamaService";



export class HabitacionService {


    static getHabitacionesDisponibles = async (genero: string, ala: string): Promise<[string?, any?]> => {
    
        const generoDeBusqueda = genero === "Masculino" ? "F" : "M";

        try{

            const habitaciones = await Hospital_habitaciones.findAll({
                include: [
                    {
                        model: Hospital_camas,
                        as: "camas",
                        where: {disponible: true}
                    },
                    {
                        model: Hospital_alas,
                        as:"alas",
                        where: {nombre: `${ala}`}
                    }                   
                ]
            })
             if(!habitaciones){
                throw Error("No se encuentran habitaciones disponibles en dicha ala")
             }

            const habitacionesFiltradas1Habitacion = habitaciones.filter( (habitacion)=> {
                habitacion.cantidad_Camas == 1
            })
            const habitacionesFiltradasCon2Habitaciones = habitaciones.filter( (habitacion) => {
                habitacion.cantidad_Camas == 2
            })
            let habitacionesConCamasValidas = habitacionesFiltradas1Habitacion;
            for(let habitacion of habitacionesFiltradasCon2Habitaciones){
                const generoObtenido = await CamaService.buscarGeneroDeCamaOcupadaPorHabitacion(habitacion.id_Habitacion);
                if(habitacion.cama.admision.pacientes.genero != generoObtenido){
                    console.log("Se agrego una habitacion valida");                    
                    habitacionesConCamasValidas.push(habitacion)
                }
            }

            if(habitacionesConCamasValidas.length == 0){
                console.log("No hay camas disponibles");
            }
            return [undefined, habitacionesConCamasValidas]
        }catch(error){

            console.log(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitacionesDisponibles","Habitacion Service", "11",error as string));
            return [error as string,undefined ]

        }

    }

}
