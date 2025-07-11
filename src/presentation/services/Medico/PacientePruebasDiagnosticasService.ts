import { Admision } from "../../../data/models/Admision";
import { nombre_Prueba_Diagnostica } from "../../../data/models/Nombre_Prueba_Diagnostica";
import { Paciente_Diagnosticos } from "../../../data/models/Paciente_Diagnosticos";
import { Paciente_pruebas_diagnosticas } from "../../../data/models/Paciente_pruebas_diagnosticas";
import { createPruebaDiagnosticaDto } from "../../../domain/Dtos/pacientes/Diagnosticos/PruebasDiagnosticas/createPruebaDiagnostica";
import { updatePruebaDiagnosticaDto } from "../../../domain/Dtos/pacientes/Diagnosticos/PruebasDiagnosticas/updatePruebaDiagnostica";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import { DiagnosticosServices } from "../Paciente/DiagnosticosServices";
import { PacienteServices } from "../PacientesService";
import { NombrePruebaDiagnosticaService } from "./NombrePruebaDiagnosticaService";


export class PacientePruebasDiagnosticasService{

    static async buscarPruebaDiagnosticaPorId(id_Prueba_Diagnostica:number):Promise<[string?,Paciente_pruebas_diagnosticas?]>{
        try {
            if(!id_Prueba_Diagnostica || id_Prueba_Diagnostica < 0) return ["El id_Prueba_Diagnostica es nulo o menor que 0", undefined]
            const pruebaDiagnostica = await Paciente_pruebas_diagnosticas.findOne({
                where: {
                    id_Prueba_Diagnostica: id_Prueba_Diagnostica
                }
            })
            if(!pruebaDiagnostica) return ["No se ha encontrado registrado la prueba diagnostica", undefined]
            return [undefined, pruebaDiagnostica]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPruebaDiagnosticaPorId","PacientePruebasDiagnosticasService","10",error as string)   
            return [error as string, undefined]
        }
    }
    static async buscarTodasLasPruebasDiagnosticasDelDiagnostico(id_Diagnostico:number):Promise<[string?,Paciente_pruebas_diagnosticas[]?]>{
        try {
            if(!id_Diagnostico || id_Diagnostico < 0) return ["El id_Diagnostico es nulo o menor que 0", undefined]
            const pruebasDiagnosticasDelDiagnostico = await Paciente_pruebas_diagnosticas.findAll({
                where: {
                    id_diagnostico: id_Diagnostico
                },
                include:[
                    {
                        model: nombre_Prueba_Diagnostica,
                        as: "nombre_prueba_diagnostica"
                    },
                    {
                        model: Paciente_Diagnosticos,
                        as: "diagnostico",
                        include: [
                            {
                                model: Admision,
                                as: "admision"
                            }
                        ]
                    }
                    
                ]
            })
            return [undefined, pruebasDiagnosticasDelDiagnostico]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodasLasPruebasDiagnosticasDelDiagnostico","PacientePruebasDiagnosticasService","20",error as string)   
            return [error as string, undefined]
        }
    }
    static async crearPruebaDiagnostica(_createPruebaDiagnosticaDto: createPruebaDiagnosticaDto):Promise<[string?,Paciente_pruebas_diagnosticas?]>{
        try {
            if(! await NombrePruebaDiagnosticaService.buscarNombrePruebaDiagnosticaPorId(_createPruebaDiagnosticaDto.id_nombre_prueba_diagnostica).then(res=>res[1])) return ["El id_nombre_prueba_diagnostica no se encuentra registrado", undefined]
            if(! await DiagnosticosServices.getDiagnosticoById(_createPruebaDiagnosticaDto.id_diagnostico).then(res=>res[1])) return ["El id_diagnostico no se encuentra registrado", undefined]
            if(! await PacienteServices.getPacienteById(_createPruebaDiagnosticaDto.id_paciente).then(res=>res[1])) return ["El id_paciente no se encuentra registrado", undefined]
            const pruebaDiagnostica = await Paciente_pruebas_diagnosticas.create(createPruebaDiagnosticaDto.toObject(_createPruebaDiagnosticaDto));
            
            if(!pruebaDiagnostica) return ["No se pudo crear la prueba diagnostica", undefined]
            return [undefined, pruebaDiagnostica]
                
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPruebaDiagnostica","PacientePruebasDiagnosticasService","30",error as string)   
            return [error as string, undefined]
        }
    }
    static async actualizarPruebaDiagnostica(_updatePruebaDiagnosticaDto: updatePruebaDiagnosticaDto):Promise<[string?,boolean?]>{
        try {
            if(! await this.buscarPruebaDiagnosticaPorId(_updatePruebaDiagnosticaDto.id_Prueba_Diagnostica).then(res=>res[1])) return ["El id_Prueba_Diagnostica no se encuentra registrado", false]
            if(! await NombrePruebaDiagnosticaService.buscarNombrePruebaDiagnosticaPorId(_updatePruebaDiagnosticaDto.id_nombre_prueba_diagnostica).then(res=>res[1])) return ["El id_nombre_prueba_diagnostica no se encuentra registrado", false]
            if(! await DiagnosticosServices.getDiagnosticoById(_updatePruebaDiagnosticaDto.id_diagnostico).then(res=>res[1])) return ["El id_diagnostico no se encuentra registrado", false]
            if(! await PacienteServices.getPacienteById(_updatePruebaDiagnosticaDto.id_paciente).then(res=>res[1])) return ["El id_paciente no se encuentra registrado", false]
            const pruebaDiagnostica = await Paciente_pruebas_diagnosticas.update(updatePruebaDiagnosticaDto.toObject(_updatePruebaDiagnosticaDto), {
                where: {
                    id_Prueba_Diagnostica: _updatePruebaDiagnosticaDto.id_Prueba_Diagnostica
                }
            })
            if(!pruebaDiagnostica || pruebaDiagnostica[0] === 0) return ["No se pudo actualizar la prueba diagnostica", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarPruebaDiagnostica","PacientePruebasDiagnosticasService","40",error as string)
            return [error as string, undefined]
        }
    }
    static async eliminarPruebaDiagnostica(id_Prueba_Diagnostica:number):Promise<[string?,boolean?]>{
        try {
            if(! await this.buscarPruebaDiagnosticaPorId(id_Prueba_Diagnostica).then(res=>res[1])) return ["El id_Prueba_Diagnostica no se encuentra registrado", false]
            const pruebaDiagnostica = await Paciente_pruebas_diagnosticas.destroy({
                where: {
                    id_Prueba_Diagnostica: id_Prueba_Diagnostica
                }
            })
            if(!pruebaDiagnostica || pruebaDiagnostica === 0) return ["No se pudo eliminar la prueba diagnostica", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarPruebaDiagnostica","PacientePruebasDiagnosticasService","50",error as string)
            return [error as string, undefined]
        }
    }
}
