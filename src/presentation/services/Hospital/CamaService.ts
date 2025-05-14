import { Sequelize } from "sequelize-typescript"
import { Admision } from "../../../data/models/admision"
import { Hospital_camas } from "../../../data/models/hospital_camas"
import { Pacientes } from "../../../data/models/pacientes"
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors"




export class CamaService{

    static buscarCama = async(id_Cama: number): Promise<[(string | undefined)?, (Hospital_camas | undefined)?]>=> {

        try {
            if(!id_Cama){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCama","CamaService","15","Debe enviar el id_Cama")
                return ["Debe enviar el id_Cama"];
            } 
            const cama = await Hospital_camas.findOne({where:{id_Cama: id_Cama}});
            if(!cama){ 
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCama","CamaService","20","No se enocntro una cama con ese Id")
                return ["No se encontro una cama con ese Id"];
            }
            return [undefined, cama]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCama","CamaService","20",error as string)
            return [error as string, undefined]
        }
    }

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
    static marcarCamaComoOcupada = async(id_Cama: number):Promise<[string?,Hospital_camas["dataValues"]?]> => {

        try {
            const camaEncontrada = await this.buscarCama(id_Cama);
            if(camaEncontrada[0]){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("marcarCamaComoOcupada","CamaService","69",camaEncontrada[0])
                return [camaEncontrada[0]]
            }
            camaEncontrada[1]!.dataValues.disponible = false;
            const camaModificada =  camaEncontrada[1]?.save
            if(!camaModificada){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("marcarCamaComoOcupada","CamaService","76","No se modifico la cama")
                return ["No se actualizo marco como ocupada la cama"]
            } 
            console.log("Se marco la cama como ocupada");
            return [undefined, camaModificada]
        }catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("marcarCamaComoOcupada","CamaServie","77",error as string)
            return [error as string]
        }
    }

}