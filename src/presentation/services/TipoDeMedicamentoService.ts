import { Tipo_De_Medicamento } from "../../data/models/Tipo_De_Medicamento";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";



export class TipoDeMedicamentoService{

    public static async buscarTipoDeMedicamentoPorId(id_tipo_de_medicamento:number):Promise<[string?, Tipo_De_Medicamento?]>{//Todo: TESTEAR
        try {
            
            if(!id_tipo_de_medicamento || id_tipo_de_medicamento < 0 ) return ["id_tipo_de_medicamento es nulo o menor a 0"]
            const tipoDeMedicamentoBuscado = await Tipo_De_Medicamento.findOne({
                where:{
                    id_tipo_de_medicamento: id_tipo_de_medicamento
                }
            })
            if(!tipoDeMedicamentoBuscado) return ["El tipo de medicamento no se encuentra registrado", undefined]
            return [undefined, tipoDeMedicamentoBuscado]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTipoDeMedicamentoPorId","TipoDeMedicamentoService","20",error as string)
            return [error as string, undefined]
        }
    }
    public static async getTodosLosTiposDeMedicamento():Promise<[string?,Tipo_De_Medicamento[]?]>{//Todo: TESTEAR
        try {
            const todosLosTiposDeMedicamentos = await Tipo_De_Medicamento.findAll()
            if(!todosLosTiposDeMedicamentos) return ["No se encuentran registro de tipo de medicamento", undefined]
            
            return [undefined, todosLosTiposDeMedicamentos]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTodosLosTiposDeMedicamento","TipoDeMedicamentoService","40", error as string)
            return [error as string, undefined]
        }
    }
    public static async buscarTipoDeMedicamentoPorNombre(nombre:string):Promise<[string?,Tipo_De_Medicamento?]>{//Todo: TESTEAR
        try {
            
            if(!nombre || nombre.length < 3) return ["El nombre no puede tener menos de 3 caracteres o tener un valor nulo", undefined]

            const medicamentoEncontrado = await Tipo_De_Medicamento.findOne({
                where: {
                    nombre: nombre
                }
            })
            if(!medicamentoEncontrado) return ["No se encontro registrado un medicamento con dicho nombre", undefined]

            return [undefined , medicamentoEncontrado]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTipoDeMedicamentoPorNombre", "TipoDeMedicamentoService","40",error as string)
            return [error as string, undefined]
        }
    }
}