import { Paciente_Medicacion_Actual } from "../../../data/models/Paciente_Medicacion_Actual";
import { createMedicacionActualDto } from "../../../domain/Dtos/pacientes/Medicacion Actual/createMedicacionActualDto";
import { updateMedicacionActualDto } from "../../../domain/Dtos/pacientes/Medicacion Actual/updateMedicacionActualDto";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";


export class MedicacionActualService {

    public static async buscarLasMedicacionesActualesPorPaciente(id_Paciente: number):Promise<[string?,Paciente_Medicacion_Actual[]?]>{//todo:testear
        try {
            
            if(!id_Paciente || Number(id_Paciente) < 0) return ["id_Paciente es nulo o menor que 0",undefined]
            const medicacionesPaciente = await Paciente_Medicacion_Actual.findAll({
                where: {
                    id_Paciente: id_Paciente
                }
            })
            if(!medicacionesPaciente) return ["No hay registradas medicaciones actuales",undefined]
            return [undefined, medicacionesPaciente]


        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarLasMedicacionesActualesPorPaciente","MedicacionActualService","6",error as string)
            return [error as string , undefined ]
        }
    }
    public static async buscarMedicacionActualPorId(id_Paciente_Medicacion_Actual: number):Promise<[string?,Paciente_Medicacion_Actual?]>{//todo:testear
        try {
            if(!id_Paciente_Medicacion_Actual) return ["Se requiere el id_Paciente_Medicacion_Actual "]
            const busqueda = await Paciente_Medicacion_Actual.findOne({
                where: {
                    id_Paciente_Medicacion_Actual: id_Paciente_Medicacion_Actual
                }
            })
            if(!busqueda) return[ "No se encontro registrada la mediacion actual por id", undefined]
            return [undefined, busqueda]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarMedicacionActualPorId","MedicacionActualService","40",error as string)
            return [error as string,undefined]
        }
    }
    public static async existeMedicacionActual(_createMediacionActual: createMedicacionActualDto):Promise<[string?,boolean?]>{//todo:testear
        try {
            const confirmacion = await Paciente_Medicacion_Actual.findOne({
                where: createMedicacionActualDto.toObject(_createMediacionActual)
            })
            if(confirmacion) return [undefined,true]
            return [undefined, false]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarMedicacionActual", "MedicacionACtualService","30",error as string)
            return [error as string, undefined]
        }
    }
    public static async crearMedicacionActual(_createMedicacionActual: createMedicacionActualDto):Promise<[string?,Paciente_Medicacion_Actual?]>{//todo:testear
        try {
            //Todo: VALIDAR RECETA CUANDO SE CREE EL CRUD DE RECETAS
            //todo: VALIDAR MEDICAMENTO CUANDO SE CREE EL CRUD MEDICAMENTO
            if(await this.existeMedicacionActual(_createMedicacionActual).then(res=> res[1])){
                return ["Ya existe dicho registro", undefined]
            }
            const medicamentoCreado = await Paciente_Medicacion_Actual.create(createMedicacionActualDto.toObject(_createMedicacionActual))
            if(!medicamentoCreado) return ["No se creo el medicamentoActual ", undefined]
            return [undefined, medicamentoCreado]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearMedicacionActual","MedicacionActualService","25",error as string)
            return [error as string, undefined]
        }
    }
    public static async actualizarMedicacionActual(_updateMedicacionActual: updateMedicacionActualDto):Promise<[string?,boolean?]>{//todo:testear
        try {
            if(!this.buscarMedicacionActualPorId(_updateMedicacionActual.id_Paciente_Medicacion_Actual).then(res=> res[1])) return ["No se encontro registrada la mediacion actual por id", false]
            const actualizacion = await Paciente_Medicacion_Actual.update(updateMedicacionActualDto.toObject(_updateMedicacionActual), {
                where: {
                    id_Paciente_Medicacion_Actual: _updateMedicacionActual.id_Paciente_Medicacion_Actual,
                    id_Paciente: _updateMedicacionActual.id_Paciente
                }
            })
            if(!actualizacion || actualizacion[0] <= 0) return [undefined, false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarMedicacionActual","MedicacionACtualService","58",error as string)
            return [error as string, undefined]
        }
    }
    public static async eliminarMedicacionActual(id_Paciente_Medicacion_Actual:number):Promise<[string?,boolean?]>{//todo:testear
        try {
            if(!this.buscarMedicacionActualPorId(id_Paciente_Medicacion_Actual).then(res=> res[1])) return ["No se encontro la medicacion actual por id registrada", false]
            const confirmacion = await Paciente_Medicacion_Actual.destroy({
                where: {
                    id_Paciente_Medicacion_Actual: id_Paciente_Medicacion_Actual
                }
            }) 
            if(!confirmacion || confirmacion < 0) return [undefined, false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarMedicacionActual","MedicacionActualService","100",error as string)
            return [error as string, false]
        }
    }
}