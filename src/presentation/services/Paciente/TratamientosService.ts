import { Admision } from "../../../data/models/Admision";
import { Enfermero } from "../../../data/models/Enfermero";
import { Medicamentos } from "../../../data/models/Medicamentos";
import { Medicos } from "../../../data/models/Medicos";
import { Paciente_Alergias } from "../../../data/models/Paciente_Alergias";
import { Paciente_Diagnosticos } from "../../../data/models/Paciente_Diagnosticos";
import { paciente_tratamientos } from "../../../data/models/paciente_tratamientos";
import { Pacientes } from "../../../data/models/Pacientes";
import { Tipo_De_tratamiento } from "../../../data/models/Tipo_De_tratamiento";
import { createTratamientoDto } from "../../../domain/Dtos/pacientes/Tratamientos/createTratamientoDto";
import { updateTratamientoDto } from "../../../domain/Dtos/pacientes/Tratamientos/updateTratamientoDto";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import { EnfermerosService } from "../EnfermerosService";
import { MedicoService } from "../MedicoService";
import { PacienteServices } from "../PacientesService";
import { TipoDeTratamientoService } from "../TipoDeTratamientoService";


export class TratamientosService {

    public static async validarTratamientoNoAsignado(id_tratamiento:number):Promise<[string?,boolean?]>{
        try {
            if(!id_tratamiento || id_tratamiento < 0) return ["El id del tratamiento es inválido", false];
            const tratamiento = await paciente_tratamientos.findOne({
                where: {
                    id_tratamiento: id_tratamiento
                },
                include: [
                    {
                        model: Paciente_Alergias,
                        as: "alergias"
                    },
                    {
                        model: Paciente_Diagnosticos,
                        as: "diagnostico"
                    }
                ]
            })
            if(tratamiento.dataValues.alergias.length > 0) return ["El tratamiento esta asignado a una alergia, debe eliminarlo desde el panel de Alergias", false]
            if(tratamiento.dataValues.diagnostico != null) return ["El tratamiento esta asignado a un diagnostico, debe eliminarlo desde el panel de Diagnostico (Solo Medicos)", false]
            return [undefined, true];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("TratamientosService", "validarTratamientoNoAsignado", "25", error);
            return [error as string, undefined];
        }
    }
    public static async getTratamientosByIdPaciente(id_paciente: number): Promise<[string?,paciente_tratamientos[]?]> {
        try {
            if(!id_paciente || id_paciente < 0) return ["El id del paciente es inválido", undefined];
            if(! await PacienteServices.getPacienteById(id_paciente).then(res=> res[1])) return ["El paciente no existe", undefined];
            const tratamientosDelPaciente = await paciente_tratamientos.findAll({
                where: {
                    id_paciente: id_paciente
                },
                include: [
                    {
                        model: Tipo_De_tratamiento,
                        as: "tipo_de_tratamiento"
                    },
                    {
                        model: Medicos,
                        as: "medico"
                    },
                    {
                        model: Enfermero,
                        as: "enfermero"
                    },
                    {
                        model: Medicamentos,
                        as: "medicamento"
                    }
                ]
            })
           
            return [undefined, tratamientosDelPaciente];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("TratamientosService", "getTratamientosByIdPaciente", "10", error);
            return [error as string, undefined];
        }
    }
    public static async getTratamientosByIdPacienteAndAdmision(id_paciente: number, id_admision: number): Promise<[string?,paciente_tratamientos[]?]> {
        try {
            if(!id_paciente || id_paciente < 0) return ["El id del paciente es inválido", undefined];
            if(!id_admision || id_admision < 0) return ["El id de la admision es inválido", undefined];
            if(! await PacienteServices.getPacienteById(id_paciente).then(res=> res[1])) return ["El paciente no existe", undefined];
            const tratamientosDelPaciente = await paciente_tratamientos.findAll({
                where:{
                    id_paciente: id_paciente
                },
                include: [
                    {
                        model: Pacientes,
                        as: "paciente",
                        include: [
                            {
                                model: Admision,
                                where: {
                                    id_Admision: id_admision,
                                }
                            }
                        ]
                    },
                    {
                        model: Tipo_De_tratamiento,
                        as: "tipo_de_tratamiento"
                    },
                    {
                        model: Medicos,
                        as: "medico"
                    },
                    {
                        model: Enfermero,
                        as: "enfermero"
                    },
                    {
                        model: Medicamentos,
                        as: "medicamento"
                    }
                ]
            })
           
            return [undefined, tratamientosDelPaciente];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("TratamientosService", "getTratamientosByIdPaciente", "10", error);
            return [error as string, undefined];
        }
    }
    public static async getTratamientoById(id_tratamiento: number): Promise<[string?,paciente_tratamientos?]> {
        try {
            if(!id_tratamiento || id_tratamiento < 0) return ["El id del tratamiento es inválido", undefined];
            const tratamiento = await paciente_tratamientos.findOne({
                where: {
                    id_tratamiento: id_tratamiento
                }
            })
            if(!tratamiento) return ["El tratamiento no existe", undefined];
            return [undefined, tratamiento];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("TratamientosService", "getTratamientosByIdTratamiento", "24", error);
            return [error as string, undefined];
        }
    }
    public static async registrarTratamiento(_createTratamientoDto:createTratamientoDto):Promise<[string?,paciente_tratamientos?]>{

        try {

            if(!await TipoDeTratamientoService.buscarTipoDeTratamientoPorId(_createTratamientoDto.id_tipo_de_tratamiento).then(res => res[1])) return ["El tipo de tratamiento no existe", undefined];
            if(!await PacienteServices.getPacienteById(_createTratamientoDto.id_paciente).then(res => res[1])) return ["El paciente no existe", undefined];
            if(_createTratamientoDto.id_medico && !await MedicoService.getMedicoById(_createTratamientoDto.id_medico).then(res => res[1])) return ["El médico no existe", undefined];
            if(_createTratamientoDto.id_enfermero && !await EnfermerosService.getEnfermeroById(_createTratamientoDto.id_enfermero).then(res=>res[1])) return ["El enfermero no existe", undefined];

            const tratamiento = await paciente_tratamientos.create(createTratamientoDto.toObject(_createTratamientoDto));
            if(!tratamiento) return ["Error al registrar el tratamiento", undefined];
            return [undefined, tratamiento];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("TratamientosService", "registrarTratamiento", "30", error);
            return [error as string, undefined];
        }

    }
    public static async actualizarTratamiento(_updateTratamientoDto:updateTratamientoDto):Promise<[string?,number?]>{
        try {
            if(!await paciente_tratamientos.findOne({ where: { id_tratamiento: _updateTratamientoDto.id_tratamiento } })) return ["El tratamiento no existe", undefined];
            if(!await TipoDeTratamientoService.buscarTipoDeTratamientoPorId(_updateTratamientoDto.id_tipo_de_tratamiento).then(res => res[1])) return ["El tipo de tratamiento no existe", undefined];
            if(!await PacienteServices.getPacienteById(_updateTratamientoDto.id_paciente).then(res => res[1])) return ["El paciente no existe", undefined];
            if(_updateTratamientoDto.id_medico && !await MedicoService.getMedicoById(_updateTratamientoDto.id_medico).then(res => res[1])) return ["El médico no existe", undefined];
            if(_updateTratamientoDto.id_enfermero && !await EnfermerosService.getEnfermeroById(_updateTratamientoDto.id_enfermero).then(res=>res[1])) return ["El enfermero no existe", undefined];

            const tratamiento = await paciente_tratamientos.update(updateTratamientoDto.toObject(_updateTratamientoDto), {
                where: {
                    id_tratamiento: _updateTratamientoDto.id_tratamiento
                }
            });
            if(!tratamiento) return ["Error al actualizar el tratamiento", undefined];
            return [undefined, tratamiento[0]];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("TratamientosService", "actualizarTratamiento", "64", error);
            return [error as string, undefined];
        }
    }
    public static async eliminarTratamiento(id_tratamiento: number): Promise<[string?, boolean?]> {
        try {
            const [error, tratamiento] = await this.validarTratamientoNoAsignado(id_tratamiento);
            if(error && !tratamiento) return [error, false];
            if(!id_tratamiento || id_tratamiento < 0) return ["El id_tratamiento es inválido", false];
            if(!await this.getTratamientoById(id_tratamiento).then(res => res[1])) return ["El tratamiento no existe", false];
            const tratamientoEliminado = await paciente_tratamientos.destroy({
                where: {
                    id_tratamiento: id_tratamiento
                }
            });
            if(!tratamientoEliminado) return ["Error al eliminar el tratamiento", false];
            return [undefined, true];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("TratamientosService", "eliminarTratamiento", "70", error);
            return [error as string, undefined];           
        }

    }
}