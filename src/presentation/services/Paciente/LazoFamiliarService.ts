import { Lazo_Familiar } from "../../../data/models/Lazo_familiar";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";

export class LazoFamiliarService{
    
    public static buscarTodosLosLazosFamiliares = async () : Promise<[string?, Lazo_Familiar[]?]> => {
        try {
            const lazosFamiliares = await Lazo_Familiar.findAll();
            if(!lazosFamiliares || lazosFamiliares.length <= 0) return ["No se encontraron lazos familiares registrados", undefined]
            return [undefined, lazosFamiliares]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("LazoFamiliarService", "buscarTodosLosLazosFamiliares", "12", error as string);
            return [error as string, undefined];
        }
    }
}
