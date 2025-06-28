import { Paciente_recetas } from "../../../data/models/Paciente_recetas";
import { createRecetaDto } from "../../../domain/Dtos/pacientes/Recetas/createRecetaDto";
import { updateRecetaDto } from "../../../domain/Dtos/pacientes/Recetas/updateRecetaDto";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import { MedicamentosServices } from "../MedicamentosServices";
import { MedicoService } from "../MedicoService";
import { PacienteServices } from "../PacientesService";



export class RecetasService {

    public static async buscarRecetaPorId(id_Receta: number):Promise<[string?,Paciente_recetas?]>{//todo:TESTEAR
        try {
            if(!id_Receta || id_Receta < 0) return ["La receta es nula o menor a 0", undefined]
            const recetaEncontrada = await Paciente_recetas.findOne({
                where: {
                    id_Receta: id_Receta
                }
            })
            if(!recetaEncontrada) return ["No hay una receta con ese id"]
            return [undefined, recetaEncontrada]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarRecetaPorId","RecetasService","7", error as string)
            return [error as string, undefined]
        }
    }
    public static async buscarTodaslasRecetasDelPaciente(id_Paciente: number):Promise<[string?,Paciente_recetas[]?]>{//todo:TESTEAR
        try {
            if(!id_Paciente || id_Paciente < 0) return ["El id_Paciente es nulo o menor que 0"]
            if(!await PacienteServices.buscarPacienteDesconocido(id_Paciente).then(res => res[0])) return ["No se ha encontrado registrado el paciente"]
            const recetasDelPaciente = await Paciente_recetas.findAll({
                where: {
                    id_Paciente: id_Paciente
                }
            })
            if(!recetasDelPaciente) return ["El paciente no tiene recetas medicas registradas"]
            return [undefined, recetasDelPaciente]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaslasRecetasDelPaciente","RecetasService","50",error as string)
            return [error as string , undefined]
        }
    } 
    public static async crearReceta(_createRecetaDto:createRecetaDto):Promise<[string?,Paciente_recetas?]>{//todo:TESTEAR
        try {
            
            if(!await PacienteServices.buscarPacienteDesconocido(_createRecetaDto.id_paciente).then(res => res[1])) return ["No se encontro registrado al paciente"]
            if(!await MedicoService.getMedicoById(_createRecetaDto.id_medico).then(res => res[1])) return ["No se encontro el medico registrado con dicho Id"]
            if(!await MedicamentosServices.buscarMedicamentoPorId(_createRecetaDto.id_medicamento).then(res => res[1])) return ["No se encontro un medicamento registrado con dicho Id"]

            const recetaCreada = await Paciente_recetas.create(createRecetaDto.toObject(_createRecetaDto))
            if(!recetaCreada) return ["No se creo la receta", undefined]
            return [undefined, recetaCreada]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearReceta","RecetasService","41",error as string)
            return [error as string, undefined]
        }
    }

    public static async actualizarReceta(_updateRecetaDto: updateRecetaDto):Promise<[string?, boolean?]>{//todo:TESTEAR
        try {
            if(!await this.buscarRecetaPorId(_updateRecetaDto.id_Receta).then(res => res[1])) return ["La receta con dicho id no se encontro registrada", false]
            if(!await PacienteServices.buscarPacienteDesconocido(_updateRecetaDto.id_paciente).then(res => res[1])) return ["No se encontro registrado al paciente", false]
            if(!await MedicoService.getMedicoById(_updateRecetaDto.id_medico).then(res => res[1])) return ["No se encontro el medico registrado con dicho Id", false]
            if(!await MedicamentosServices.buscarMedicamentoPorId(_updateRecetaDto.id_medicamento).then(res => res[1])) return ["No se encontro un medicamento registrado con dicho Id", false]
            const recetaActualizada = await Paciente_recetas.update(updateRecetaDto.toObject(_updateRecetaDto), {
                where: {
                    id_Receta: _updateRecetaDto.id_Receta
                }
            })
            if(!recetaActualizada || recetaActualizada[0] <= 0) return ["No se actualizo la receta", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarReceta", "RecetasService", "60", error as string)
            return [error as string, false]
        }
    }
    public static async eliminarReceta(id_Receta: number):Promise<[string?,boolean?]>{//todo:TESTEAR
        try {
            if(!id_Receta || id_Receta < 0) return ["id_Receta no puede ser nulo o menor a 0", false]
            if(!await this.buscarRecetaPorId(id_Receta).then(res=>res[1])) return ["No se encontro registrada la receta con dicho id", false]
            const confirmacionDeEliminacion = await Paciente_recetas.destroy({
                where: {
                    id_Receta: id_Receta
                }
            })
            if(!confirmacionDeEliminacion || confirmacionDeEliminacion[0] <= 0) return ["No se elimino la receta", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarReceta","RecetasService","80", error as string)
            return [error as string, undefined]
        }
    }
}