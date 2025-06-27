import { Medicamentos } from "../../data/models/Medicamentos";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { TipoDeMedicamentoService } from "./TipoDeMedicamentoService";


export class MedicamentosServices{

    public static async buscarMedicamentoPorId(id_Medicamento: number):Promise<[string?,Medicamentos?]>{//Todo: TESTEAR

        try {
            
            if(!id_Medicamento || id_Medicamento < 0) return ["id_Medicamento es nulo o menor a 0 "]
            const medicamentoBuscado = await Medicamentos.findOne({
                where: {
                    id_Medicamento: id_Medicamento
                }
            })
            if(!medicamentoBuscado) return ["No se encontro un medicamento con dicho id", undefined]
            return [undefined, medicamentoBuscado]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarMedicamentoPorId","MedicamentosServices","20",error as string)
            return [error as string, undefined]
        }

    }
    public static async getTodosLosMedicamentos():Promise<[string?,Medicamentos[]?]>{//Todo: TESTEAR
        try {
            const medicamentosBuscados = await Medicamentos.findAll()
            if(!medicamentosBuscados) return ["No se encontraron registros de medicamentos en la base de datos",undefined]
            return [undefined, medicamentosBuscados]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTodosLosMedicamentos","MedicamentosServices","40",error as string)
            return [error as string, undefined]
        }
    }
    public static async getMedicamentoByType(id_tipo_de_medicamento:number):Promise<[string?,Medicamentos[]?]>{//Todo: TESTEAR
        try {
            if(!id_tipo_de_medicamento || id_tipo_de_medicamento < 0 ) return ["id_tipo_de_medicamento es nulo o es menor que 0"]
            const tipoDeMedicamento = await TipoDeMedicamentoService.buscarTipoDeMedicamentoPorId(id_tipo_de_medicamento);
            if(!tipoDeMedicamento[1]) return [tipoDeMedicamento[0]]
            const medicamentosPorTipo = await Medicamentos.findAll({
                where: {
                    id_tipo_de_medicamento: id_tipo_de_medicamento
                }
            })
            if(!medicamentosPorTipo) return["No se encuentran registrados medicamentos por dicho tipo", undefined]
            
            return [undefined, medicamentosPorTipo]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getMedicamentoByType","MedicamentosServices","50",error as string)
            return [error as string];
        }
    }

}