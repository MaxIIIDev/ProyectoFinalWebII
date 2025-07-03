import { nombre_Cirugia } from "../../data/models/Nombre_Cirugia";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";



export class NombreCirugiasServices {

    public static async buscarNombreCirugiaPorId(id_nombre_cirugia:number):Promise<[string?, nombre_Cirugia?]>{
        try {
            if(!id_nombre_cirugia || id_nombre_cirugia < 0) return ["Se requiere id_nombre_cirugia o es menor que 0", undefined]
            const nombreCirugiaEncontrada = await nombre_Cirugia.findOne({
                where: {
                    id_nombre_cirugia: id_nombre_cirugia
                }
            })
            if(!nombreCirugiaEncontrada) return ["No se encontro el nombre de cirugia por dicho Id", undefined]
            return [undefined, nombreCirugiaEncontrada];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarNombreCirugiaPorId","NombreCirugiasServices","6",error as string)
            return [error as string,undefined]
        }
    }

    public static async buscarTodosLosNombresDeCirugias():Promise<[string?, nombre_Cirugia[]?]>{
        try {
            const nombresCirugias = await nombre_Cirugia.findAll();
            if(nombresCirugias[0] && nombresCirugias[1] == undefined){
                return ["No se encontro ningun nombre de cirugia", undefined];
            }
            return [undefined, nombresCirugias];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodosLosNombresDeCirugias","NombreCirugiasServices","6",error as string)
            return [error as string]
        }
    }
}
