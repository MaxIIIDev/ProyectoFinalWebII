import { Hospital_camas } from "../../data/models/hospital_camas"
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors"



export class CamaService{

    static buscarGeneroDeCamaOcupadaPorHabitacion = async(id_habitacion : number) => {

        try{
            if(!id_habitacion){
                throw ("Debe enviar el id_habitacion")
            }
            const cama = await Hospital_camas.findOne({
                where: { id_habitacion: id_habitacion }})
            if(!cama){
                throw ("No se obtuvo la cama")
            }
            return cama.admision.pacientes.genero 
        }catch(error){
            HelperForCreateErrors.errorInMethodXLineXErrorX("buscarCamaOcupadaPorHabitacion", "20",error as string)
        }

    }

}