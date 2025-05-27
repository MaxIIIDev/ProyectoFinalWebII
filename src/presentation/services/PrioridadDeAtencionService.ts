import { Prioridad_De_Atencion } from "../../data/models/Prioridad_De_Atencion";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";



export class PrioridadDeAtencionService{

    public static async buscarLasPrioridadesDeAtencionEnDB(): Promise<[string?,Prioridad_De_Atencion[]?]>{

        try {
            const prioridadesDeAtencion: Prioridad_De_Atencion[] = await Prioridad_De_Atencion.findAll();
            if(!prioridadesDeAtencion) return ["No se encontraron las prioridades de atencion"]
            return [undefined, prioridadesDeAtencion]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarLasPrioridadesDeAtencionEnDB","PrioridadDeAtencionService","15",error as string)
            return [ error as string]
        }
    }

}