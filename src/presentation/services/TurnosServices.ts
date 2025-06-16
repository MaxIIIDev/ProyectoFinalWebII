import { Turnos } from "../../data/models/Turnos"
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";

export class TurnosServices {

    public static  getAllTurnosInDay = async(): Promise<[string?, Turnos[]?]> => {
        try {
            const turnosEncontrados = await Turnos.findAll({
                where:{
                    fecha: new Date().toISOString().split('T')[0] 
                }
            })
            if(!turnosEncontrados || turnosEncontrados.length === 0){
                return ["No se encontraron turnos para el dia de hoy", null]
            }
            return [undefined, turnosEncontrados];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllTurnosInDay", "TurnosServices", "18", error);
            return ["Error al buscar los turnos", null]
        }
    }


}
