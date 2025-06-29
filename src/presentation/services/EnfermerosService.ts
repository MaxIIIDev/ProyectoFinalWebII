import { Enfermero } from "../../data/models/Enfermero";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";


export class EnfermerosService {


    public static async getEnfermeroById(id_Enfermero: number): Promise<[string?, Enfermero?]> {
        try {
            if(!id_Enfermero || id_Enfermero < 0) return ["id_Enfermero es inválido", undefined];
            const enfermero = await Enfermero.findOne({
                where: {
                    id_Enfermero: id_Enfermero
                }
            });
            if(!enfermero) return ["El enfermero no existe", undefined];
            return [undefined, enfermero];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosService", "getEnfermeroById", "10", error);
            return [error as string, undefined];
        }
    }
}