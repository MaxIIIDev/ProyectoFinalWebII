import { Tipo_De_Diagnostico } from "../../../data/models/Tipo_De_Diagnostico";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";


export class TipoDeDiagnosticoService {

    public static buscarTodosLosTiposDeDiagnostico = async():Promise<[string?, Tipo_De_Diagnostico[]?]> => {
        try {
            const tiposDeDiagnostico = await Tipo_De_Diagnostico.findAll();
            return [undefined, tiposDeDiagnostico];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodosLosTiposDeDiagnostico","TipoDeDiagnosticoService","10",error as string)
            return [error as string, undefined]
        }
    }
    public static buscarTipoDeDiagnosticoPorId = async(id_Tipo_De_Diagnostico: number):Promise<[string?, Tipo_De_Diagnostico?]> => {
        try {
            const tipoDeDiagnostico = await Tipo_De_Diagnostico.findByPk(id_Tipo_De_Diagnostico);
            if(!tipoDeDiagnostico) return ["No se ha encontrado registrado el tipo de diagnostico", undefined]
            return [undefined, tipoDeDiagnostico];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTipoDeDiagnosticoPorId","TipoDeDiagnosticoService","20",error as string)
            return [error as string, undefined]
        }
    }
}
