import { motivo_De_Internacion } from "../../data/models/Motivo_De_Internacion";



export class MotivosDeInternacionService {

    static async buscarMotivoDeInternacionPorId(id: number): Promise<[string?, motivo_De_Internacion?]> {
        try {
            const motivo = await motivo_De_Internacion.findByPk(id);
            if(!motivo) return ["No se encontro el motivo de internacion",undefined];
            return [undefined, motivo];
        } catch (error) {
            return [error as string, undefined];
        }
    }
    static async buscarMotivosDeInternacion(): Promise<[string?, motivo_De_Internacion[]?]> {
        try {
            const motivos = await motivo_De_Internacion.findAll();    
            if(!motivos) return ["No se encontraron registrados motivos de internacion"]  
            return [undefined, motivos];
        } catch (error) {
            return [error as string];
        }
    }

}