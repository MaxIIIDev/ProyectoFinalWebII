import { Tipo_De_tratamiento } from "../../data/models/Tipo_De_tratamiento";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";


export class TipoDeTratamientoService {

    public static async  buscarTipoDeTratamientoPorId(id_tipo_de_tratamiento: number): Promise<[string?, any?]> {
        try {
            if(!id_tipo_de_tratamiento || id_tipo_de_tratamiento < 0) return ["El id del tipo de tratamiento es inválido", undefined];
            const tipoDeTratamiento = await Tipo_De_tratamiento.findOne({
                where: {
                    id_tipo_de_tratamiento: id_tipo_de_tratamiento
                }
            });
            if(!tipoDeTratamiento) return ["El tipo de tratamiento no existe", undefined];
            return [undefined, tipoDeTratamiento];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("TipoDeTratamientoService", "buscarTipoDeTratamientoPorId", "10", error);
            return [error as string, undefined];
        }
    }

    public static async getAllTiposDeTratamiento(): Promise<[string?, Tipo_De_tratamiento[]?]> {
        try {
            const tiposDeTratamiento = await Tipo_De_tratamiento.findAll();
            if(!tiposDeTratamiento || tiposDeTratamiento.length === 0) return ["No hay tipos de tratamiento registrados", undefined];
            return [undefined, tiposDeTratamiento];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("TipoDeTratamientoService", "getAllTiposDeTratamiento", "20", error);
            return [error as string, undefined];
        }
    }

}