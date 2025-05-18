import { motivo_De_Internacion } from "../../data/models/motivo_De_Internacion";



export class MotivosDeInternacionService {


    static async buscarMotivosDeInternacion(): Promise<[string?, motivo_De_Internacion[]?]> {
        try {
            const motivos = await motivo_De_Internacion.findAll();      
            return [undefined, motivos];
        } catch (error) {
            return [error as string];
        }
    }

}