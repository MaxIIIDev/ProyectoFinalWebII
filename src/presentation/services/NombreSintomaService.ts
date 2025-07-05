import { Nombre_Sintoma } from "../../data/models/nombre_sintoma";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";

export class NombreSintomaService {
    
    public static async getNombreSintomaById(id_Nombre_Sintoma: number): Promise<[string?, Nombre_Sintoma?]> {
        try {
            if(id_Nombre_Sintoma && id_Nombre_Sintoma < 0) return ["El id_Nombre_Sintoma debe ser mayor a 0", undefined]
            const nombreSintoma = await Nombre_Sintoma.findByPk(id_Nombre_Sintoma);
            if(!nombreSintoma) return ["No se encontro el nombre del sintoma", undefined]
            return [undefined, nombreSintoma]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getNombreSintomaById","NombreSintomaService","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async getAllNombreSintomas(): Promise<[string?, Nombre_Sintoma[]?]> {
        try {
            const nombreSintomas = await Nombre_Sintoma.findAll();
            if(!nombreSintomas) return ["No se encontraron nombres de sintomas", undefined]
            return [undefined, nombreSintomas]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllNombreSintomas","NombreSintomaService","8",error as string)
            return [error as string, undefined]
        }
    }
}
