import { Op } from "sequelize"
import { RecetasMedicamentos } from "../../../data/models/RecetaMedicamentos"
import { createRecetaMedicamentoDto } from "../../../domain/Dtos/pacientes/Recetas/RecetaMedicamentos/createRecetaMedicamentoDto"
import { updateRecetaMedicamentoDto } from "../../../domain/Dtos/pacientes/Recetas/RecetaMedicamentos/updateRecetaMedicamentoDto"
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors"


export class RecetasMedicamentosService{

    public static async buscarRecetaMedicamentoPorId(id_Recetas_Medicamentos:number):Promise<[string?,RecetasMedicamentos?]>{//todo:TESTEAR
        try {
            if(!id_Recetas_Medicamentos || id_Recetas_Medicamentos < 0) return ["El id_Recetas_Medicamentos es nulo o menor que 0", undefined]
            const recetaMedicamentoEncontrada = await RecetasMedicamentos.findOne({
                where: {
                    id_Recetas_Medicamentos: id_Recetas_Medicamentos
                }
            })
            if(!recetaMedicamentoEncontrada) return ["No se encontro registrado la receta medicamento"]
            return [undefined, recetaMedicamentoEncontrada]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarRecetaMedicamentoPorId","RecetasMedicamentosService","12",error as string)
            return [error as string, undefined]
        }
    }
    public static async validarMedicamentosNoDuplicados(id_Receta:number,id_Medicamento:number,modo:number,id_Recetas_Medicamentos?:number){
            try {
                if(modo == 1){
                    if(!id_Receta || id_Receta < 0) return ["El id_Receta es nulo o menor que 0", false]
                    if(!id_Medicamento || id_Medicamento < 0) return ["El id_Medicamento es nulo o menor que 0", false]
                    const medicamentoDeLaReceta = await RecetasMedicamentos.findAll({
                        where: {
                            id_Receta: id_Receta,
                            id_Medicamento: id_Medicamento
                        }
                    })
                    if(medicamentoDeLaReceta.length > 0) return ["El medicamento ya se encuentra en la receta", false]
                }
                if(modo == 2){
                    if(!id_Receta || id_Receta < 0) return ["El id_Receta es nulo o menor que 0", false]
                    if(!id_Medicamento || id_Medicamento < 0) return ["El id_Medicamento es nulo o menor que 0", false]
                    const medicamentoDeLaReceta = await RecetasMedicamentos.findAll({
                        where: {
                            id_Receta: id_Receta,
                            id_Medicamento: id_Medicamento,
                            id_Recetas_Medicamentos: {
                                [Op.ne]: id_Recetas_Medicamentos
                            }
                        }
                    })
                    if(medicamentoDeLaReceta.length > 0) return ["El medicamento ya se encuentra en la receta", false]
                }
                
                return [undefined, true]
            } catch (error) {
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarMedicamentosNoDuplicados","RecetasService","120",error as string)
                return [error as string, undefined]
            }
    }
    public static async crearRecetaMedicamento(_createRecetaMedicamentoDto:createRecetaMedicamentoDto):Promise<[string?,RecetasMedicamentos?]>{//todo:TESTEAR
        try {
            if(!await this.validarMedicamentosNoDuplicados(_createRecetaMedicamentoDto.id_Receta,_createRecetaMedicamentoDto.id_Medicamento,1).then(res => res[1])) return ["El medicamento ya se encuentra en la receta", undefined]
            const recetaMedicamentoCreada = await RecetasMedicamentos.create(createRecetaMedicamentoDto.toObject(_createRecetaMedicamentoDto))
            if(!recetaMedicamentoCreada) return ["No se creo la receta medicamento", undefined]
            return [undefined, recetaMedicamentoCreada]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearRecetaMedicamento","RecetasMedicamentosService","29",error as string)
            return [error as string, undefined]
        }
    }
    public static async actualizarRecetaMedicamento(_updateRecetaMedicamentoDto:updateRecetaMedicamentoDto):Promise<[string?,boolean?]>{//todo:TESTEAR
        try {
            if(!await this.buscarRecetaMedicamentoPorId(_updateRecetaMedicamentoDto.id_Recetas_Medicamentos).then(res => res[1])) return ["La receta medicamento con dicho id no se encontro registrada", false]
            if(!await this.validarMedicamentosNoDuplicados(_updateRecetaMedicamentoDto.id_Receta,_updateRecetaMedicamentoDto.id_Medicamento,2,_updateRecetaMedicamentoDto.id_Recetas_Medicamentos).then(res => res[1])) return ["El medicamento ya se encuentra en la receta", false]
            const recetaMedicamentoActualizada = await RecetasMedicamentos.update(updateRecetaMedicamentoDto.toObject(_updateRecetaMedicamentoDto), {
                where: {
                    id_Recetas_Medicamentos: _updateRecetaMedicamentoDto.id_Recetas_Medicamentos
                }
            })
            if(!recetaMedicamentoActualizada || recetaMedicamentoActualizada[0] <= 0) return ["No se actualizo la receta medicamento", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarRecetaMedicamento", "RecetasMedicamentosService", "60", error as string)
            return [error as string, undefined]
        }
    }
    public static async eliminarRecetaMedicamento(id_Recetas_Medicamentos:number):Promise<[string?,boolean?]>{
        try {
            const recetaMedicamentoEliminada = await RecetasMedicamentos.destroy({
                where: {
                    id_Recetas_Medicamentos: id_Recetas_Medicamentos
                }
            })
            if(!recetaMedicamentoEliminada) return ["No se elimino la receta medicamento", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarRecetaMedicamento", "RecetasMedicamentosService", "86", error as string)
            return [error as string, undefined]
        }
    }
}