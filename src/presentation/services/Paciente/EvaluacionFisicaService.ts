import { Paciente_Evaluacion_Fisica } from "../../../data/models/Paciente_Evaluacion_Fisica";
import { CreateEvaluacionFisicaDto } from "../../../domain/Dtos/pacientes/EvaluacionFisica/createEvaluacionFisicaDto";
import { updateEvaluacionFisicaDto } from "../../../domain/Dtos/pacientes/EvaluacionFisica/updateEvaluacionFisicaDto";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import { AdmisionService } from "../AdmisionService";
import { PacienteServices } from "../PacientesService";



export class EvaluacionFisicaService {

    public static async buscarEvaluacionFisicaPorId(id_Evaluacion_fisica:number):Promise<[string?, Paciente_Evaluacion_Fisica?]>{
        try {
            
            if(!id_Evaluacion_fisica || id_Evaluacion_fisica < 0) return ["El id_Evaluacion_fisica es nulo o menor a 0"]
            const evaluacionFisica = await Paciente_Evaluacion_Fisica.findOne({
                where: {
                    id_Evaluacion_fisica : id_Evaluacion_fisica
                }
            })
            if(!evaluacionFisica) return ["No se encontro una evaluacion fisica registrada con dicho id", undefined]
            return [undefined, evaluacionFisica]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarEvaluacionFisicaPorId","EvaluacionFisicaService","19",error as string)
            return [error as string, undefined]
        }
    }
    public static async buscarTodasLasEvaluacionesFisicasPorPaciente(id_Paciente:number):Promise<[string?, Paciente_Evaluacion_Fisica[]?]>{
        try {
            
            if(!id_Paciente || id_Paciente < 0) return ["id_Paciente es nulo o es menor a 0"]
            if(!PacienteServices.buscarPacienteDesconocido(id_Paciente).then(res => res[1])) return ["No se encontro un paciente registrado con dicho id", undefined]
            const evaluacionesFisicasPorPaciente = await Paciente_Evaluacion_Fisica.findAll({
                where: {
                    id_Paciente: id_Paciente
                }
            })
            if(!evaluacionesFisicasPorPaciente || evaluacionesFisicasPorPaciente.length == 0 ) return ["No se encontraron evaluaciones fisicas registradas en dicho paciente", undefined]
            return [undefined, evaluacionesFisicasPorPaciente]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodasLasEvaluacionesFisicasPorPaciente","EvaluacionFisicaService","34",error as string)
            return [error as string ,undefined]
        }
    }
    public static async buscarEvaluacionesFisicasPorAdmision(id_Admision:number):Promise<[string?, Paciente_Evaluacion_Fisica[]?]>{
        try {
            if(!id_Admision || id_Admision < 0) return ["id_Admision es nulo o es menor a 0"]
            if(! await AdmisionService.buscarAdmisionPorId(id_Admision).then(res => res[1])) return ["No se encontro una admision registrada con dicho id", undefined]
            const evaluacionesFisicasPorAdmision = await Paciente_Evaluacion_Fisica.findAll({
                where: {
                    id_Admision: id_Admision
                }
            })
            if(!evaluacionesFisicasPorAdmision || evaluacionesFisicasPorAdmision.length == 0) return ["No se encontraron evaluaciones fisicas registradas en dicha admision", undefined]
            return [undefined, evaluacionesFisicasPorAdmision]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarEvaluacionesFisicasPorAdmision","EvaluacionFisicaService","50",error as string)
            return [error as string, undefined]
        }
    }

    public static async crearEvaluacionFisica(_createEvaluacionFisicaDto: CreateEvaluacionFisicaDto):Promise<[string?, Paciente_Evaluacion_Fisica?]>{
        try {
            if(! await PacienteServices.buscarPacienteDesconocido(_createEvaluacionFisicaDto.id_Paciente).then(res => res[1])) return ["No se encontro un paciente registrado con dicho id", undefined]
            if(! await AdmisionService.buscarAdmisionPorId(_createEvaluacionFisicaDto.id_Admision).then(res => res[1])) return ["No se encontro una admision registrada con dicho id", undefined]
            //todo: Verificar que el id_Enfermero sea un id de enfermero valido
            const buscarEvaluacionFisicaIdentica = await Paciente_Evaluacion_Fisica.findOne({
                where: CreateEvaluacionFisicaDto.toObject(_createEvaluacionFisicaDto)
            })
            if(buscarEvaluacionFisicaIdentica) return ["Ya existe una evaluacion fisica registrada con los mismos datos", undefined]
            const evaluacionFisica = await Paciente_Evaluacion_Fisica.create(CreateEvaluacionFisicaDto.toObject(_createEvaluacionFisicaDto))
            if(!evaluacionFisica) return ["No se pudo crear la evaluacion fisica", undefined]
            return [undefined, evaluacionFisica]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearEvaluacionFisica","EvaluacionFisicaService","57",error as string)
            return [error as string, undefined]
        }
    }
    public static async actualizarEvaluacionFisica(_updateEvaluacionFisicaDto: updateEvaluacionFisicaDto):Promise<[string?, string?]>{
        try {
            if(this.buscarEvaluacionFisicaPorId(_updateEvaluacionFisicaDto.id_Evaluacion_fisica).then(res => res[1]) === undefined) return ["No se encontro una evaluacion fisica registrada con dicho id", undefined]
            if(! await PacienteServices.buscarPacienteDesconocido(_updateEvaluacionFisicaDto.id_Paciente).then(res => res[1])) return ["No se encontro un paciente registrado con dicho id", undefined]
            if(! await AdmisionService.buscarAdmisionPorId(_updateEvaluacionFisicaDto.id_Admision).then(res => res[1])) return ["No se encontro una admision registrada con dicho id", undefined]
            //todo: Verificar que el id_Enfermero sea un id de enfermero valido
            const actualizarEvaluacionFisica = await Paciente_Evaluacion_Fisica.update(
                updateEvaluacionFisicaDto.toObject(_updateEvaluacionFisicaDto),{
                    where: {
                        id_Evaluacion_fisica: _updateEvaluacionFisicaDto.id_Evaluacion_fisica
                    }
                }
            )
            if(!actualizarEvaluacionFisica) return ["No se pudo actualizar la evaluacion fisica", undefined]
            return [undefined, "Evaluacion fisica actualizada correctamente"]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarEvaluacionFisica","EvaluacionFisicaService","63",error as string)
            return [error as string, undefined]
        }
    }
    public static async eliminarEvaluacionFisica(id_Evaluacion_fisica:number):Promise<[string?, boolean?]>{
        try {
            if(!id_Evaluacion_fisica || id_Evaluacion_fisica < 0) return ["El id_Evaluacion_fisica es nulo o menor a 0",false]
            const evaluacionFisica = await Paciente_Evaluacion_Fisica.findOne({
                where: {
                    id_Evaluacion_fisica : id_Evaluacion_fisica
                }
            })
            if(!evaluacionFisica) return ["No se encontro una evaluacion fisica registrada con dicho id", false]
            await evaluacionFisica.destroy()
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarEvaluacionFisica","EvaluacionFisicaService","64",error as string)
            return [error as string, false]
        }
    }
}