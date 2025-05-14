import { Admision } from "../../../data/models/admision"
import { Hospital_camas } from "../../../data/models/hospital_camas"
import { Pacientes } from "../../../data/models/pacientes"
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors"




export class CamaService{

    static buscarGeneroDeCamaOcupadaPorHabitacion = async(id_habitacion : number) => {

        try{
            if(!id_habitacion){
                throw ("Debe enviar el id_habitacion")
            }
            const cama = await Hospital_camas.findOne({
                include: [
                    {
                        model: Admision,
                        as: "admision",
                        include:[
                            {
                                model:Pacientes,
                                as: "pacientes"
                            }
                        ]
                    }
                ],
                where: { id_habitacion: id_habitacion }}
            )
            if(!cama){
                throw ("No se obtuvo la cama")
            }
            if(!cama.dataValues.admision){
                return "No tiene paciente"
                
            }
            return cama.dataValues.admision.pacientes.genero 
        }catch(error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCamaOcupadaPorHabitacion","CamaService", "20",error as string)
        }

    }

}