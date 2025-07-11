import { Request, Response } from "express";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { admisionesType } from "../Enfermeria/EnfermerosController";
import { AdmisionService } from "../services/AdmisionService";
import { PacienteServices } from "../services/PacientesService";
import { DiagnosticosServices } from "../services/Paciente/DiagnosticosServices";
import { AlergiaService } from "../services/Paciente/AlergiasService";
import { MedicamentosServices } from "../services/MedicamentosServices";
import { MedicacionActualService } from "../services/Paciente/MedicacionActualService";
import { AntecedentesFamiliaresService } from "../services/Paciente/AntecedentesFamiliaresService";
import { CirugiasService } from "../services/Paciente/CirugiasService";
import { EvaluacionFisicaService } from "../services/Paciente/EvaluacionFisicaService";
import { TratamientosService } from "../services/Paciente/TratamientosService";
import { createTratamientoDto } from "../../domain/Dtos/pacientes/Tratamientos/createTratamientoDto";
import { updateTratamientoDto } from "../../domain/Dtos/pacientes/Tratamientos/updateTratamientoDto";
import { TipoDeTratamientoService } from "../services/TipoDeTratamientoService";
import { SintomasServices } from "../services/SintomasServices";
import { TipoDeDiagnosticoService } from "../services/Paciente/TipoDeDiagnosticoService";
import { CreateDiagnosticoDto } from "../../domain/Dtos/pacientes/Diagnosticos/createDiagnosticoDto";
import { UpdateDiagnosticoDto } from "../../domain/Dtos/pacientes/Diagnosticos/updateDiagnosticoDto";
import { PacientePruebasDiagnosticasService } from "../services/Medico/PacientePruebasDiagnosticasService";
import { NombrePruebaDiagnosticaService } from "../services/Medico/NombrePruebaDiagnosticaService";
import { createPruebaDiagnosticaDto } from "../../domain/Dtos/pacientes/Diagnosticos/PruebasDiagnosticas/createPruebaDiagnostica";
import { updatePruebaDiagnosticaDto } from "../../domain/Dtos/pacientes/Diagnosticos/PruebasDiagnosticas/updatePruebaDiagnostica";
import { RecetasService } from "../services/Medico/RecetasService";
import { createRecetaDto } from "../../domain/Dtos/pacientes/Recetas/createRecetaDto";
import { createRecetaMedicamentoDto } from "../../domain/Dtos/pacientes/Recetas/RecetaMedicamentos/createRecetaMedicamentoDto";
import { RecetasMedicamentosService } from "../services/Medico/RecetasMedicamentosService";
import { updateRecetaMedicamentoDto } from "../../domain/Dtos/pacientes/Recetas/RecetaMedicamentos/updateRecetaMedicamentoDto";


export class MedicoController {

    public VistaInicioMedico = (req:Request,res:Response) => {
        try {
            const error = req.query.error || undefined
            const warning = req.query.warning || undefined
            
            if(error){
                res.render("MedicoViews/VistaInicioMedico.pug",{
                    error: error,
                    medico: req.session.usuarioLogueado
                })
                return
            }
            if(warning){
                res.render("MedicoViews/VistaInicioMedico.pug",{
                    warning: warning,
                    medico: req.session.usuarioLogueado
                })
                return
            }
            
            res.render("MedicoViews/VistaInicioMedico.pug",{
                medico: req.session.usuarioLogueado
            })

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaInicioMedico","MedicoController","10",error as string)
            res.redirect(`/medicos/?error=${error}`)
        }
    }
    public VistaListaAdmisiones = async(req:Request,res:Response)=>{
        try {
            const error = req.query.error || undefined
            const warning = req.query.warning || undefined
            
            const admisiones = await AdmisionService.buscarTodasLasAdmisiones();
            if(admisiones[0]){
                res.render("MedicoViews/VistaListaAdmisiones.pug", {error: admisiones[0]});
                return;
            }
            
            const admisionesFormateadas = []
            
            
            for(let admision of admisiones[1]){
                
                const admisionFormateada: admisionesType = {
                    id_Admision: admision.dataValues.id_Admision,
                    Fecha: new Date(admision.dataValues.fecha_De_Admision).toISOString().split("T")[0],
                    nombre: admision.dataValues.pacientes.dataValues.nombre,
                    apellido: admision.dataValues.pacientes.dataValues.apellido,
                    dni: admision.dataValues.pacientes.dataValues.dni,
                    habitacion: admision.dataValues.camas.dataValues.habitacion.dataValues.nro_Habitacion,
                    ala: admision.dataValues.camas.dataValues.habitacion.dataValues.ala.dataValues.nombre,
                    cama: admision.dataValues.camas.dataValues.id_Cama,
                    motivo_de_internacion: admision.dataValues.motivo_de_internacion.dataValues.motivo,
                    prioridad_de_atencion: admision.dataValues.prioridad_de_atencion.dataValues.prioridad
                }
                admisionesFormateadas.push(admisionFormateada)
            }
            if(error){
                res.render("MedicoViews/VistaListaAdmisiones.pug", {
                    error: error,
                    admisiones: admisionesFormateadas
                })
                return
            }
            if(warning){
                res.render("MedicoViews/VistaListaAdmisiones.pug", {
                    warning: warning,
                    admisiones: admisionesFormateadas
                })
                return
            }
            res.render("MedicoViews/VistaListaAdmisiones.pug", {
                admisiones: admisionesFormateadas
            })
            return 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaListaAdmisiones","MedicoController","40",error as string)
            res.redirect(`/medicos/?error=${error}`)
        }
    }
    public vistaPacienteSeleccionado = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const id_Admision = req.query.id_Admision || undefined;
            
            let id_AdmisionValida = undefined;
            if(id_Admision) id_AdmisionValida = Number(id_Admision);
            if(!id_Admision && req.session.admision) id_AdmisionValida = req.session.admision.id_Admision;
            if(!id_AdmisionValida){
                res.redirect("/medicos/lista/admisiones/?error=" + encodeURIComponent("No se ha seleccionado una admisión"));
                return;
            }
            const admision = await AdmisionService.buscarAdmisionPorId(Number(id_AdmisionValida));
            if(admision[0]){
                res.redirect("/medicos/lista/admisiones/?error=" + encodeURIComponent(admision[0]));
                return;
            }
            const id_Paciente = admision[1].dataValues.id_Paciente
            const paciente = await PacienteServices.getPacienteById(id_Paciente);
            if(paciente[0]){
                res.redirect("/medicos/lista/admisiones/?error=" + encodeURIComponent(paciente[0]));
                return;
            }
            req.session.paciente = {
                id_Paciente: paciente[1].dataValues.id_Paciente,
                nombre: paciente[1].dataValues.nombre,
                apellido: paciente[1].dataValues.apellido,
                dni: paciente[1].dataValues.dni,
                fecha_nac: paciente[1].dataValues.fecha_nac,
                edad: paciente[1].dataValues.edad,
                peso: paciente[1].dataValues.peso,
                genero: paciente[1].dataValues.genero,
                telefono: paciente[1].dataValues.telefono,
                telefono_emergencia: paciente[1].dataValues.telefono_De_Emergencia,
                direccion: paciente[1].dataValues.direccion,
                id_tipo_sanguineo: paciente[1].dataValues.id_tipo_sanguineo,
                id_seguro_medico: paciente[1].dataValues.id_seguro_medico
            }
            req.session.admision ={
                id_Admision: admision[1].dataValues.id_Admision,
                estado: admision[1].dataValues.estado,
                id_motivo_de_Internacion: admision[1].dataValues.id_motivo_de_Internacion,
                id_prioridad_de_atencion: admision[1].dataValues.id_prioridad_de_atencion,
                id_tipo_de_admision: admision[1].dataValues.id_tipo_de_admision,
                fecha_De_Admision: admision[1].dataValues.fecha_De_Admision,
                id_Paciente: admision[1].dataValues.id_Paciente,
                id_Cama: admision[1].dataValues.id_Cama
            }
            if(error){
                res.render("MedicoViews/VistaPacienteSeleccionado.pug", {
                    error: error,
                    paciente: {
                        nombre: paciente[1].dataValues.nombre,
                        apellido: paciente[1].dataValues.apellido,
                    }
                })
                return;
            }
            if(warning){
                res.render("MedicoViews/VistaPacienteSeleccionado.pug", {
                    warning: warning,
                    paciente: {
                        nombre: paciente[1].dataValues.nombre,
                        apellido: paciente[1].dataValues.apellido,
                    }
                })
                return;
            }
            res.render("MedicoViews/VistaPacienteSeleccionado.pug", {
                paciente: {
                    nombre: paciente[1].dataValues.nombre,
                    apellido: paciente[1].dataValues.apellido,
                }
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("vistaPacienteSeleccionado","MedicoController","95",error as string)
            res.redirect(`/medicos/lista/admisiones?error=${error}`)       
            return  
        }
    }
    public vistaListaDiagnosticos = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            
            const diagnosticos = await DiagnosticosServices.buscarDiagnosticosPorPaciente(req.session.paciente.id_Paciente)
            if(diagnosticos[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${diagnosticos[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Diagnosticos/VistaListaDiagnosticos.pug", {
                    error: error,
                    diagnosticos: diagnosticos[1],
                    id_Admision: req.session.admision.id_Admision,
                    id_medico: req.session.usuarioLogueado.id_Personal
                })
                return;
            }
            if(warning){
                res.render("MedicoViews/Diagnosticos/VistaListaDiagnosticos.pug", {
                    warning: warning,
                    diagnosticos: diagnosticos[1],
                    id_Admision: req.session.admision.id_Admision,
                    id_medico: req.session.usuarioLogueado.id_Personal
                })
                return;
            }
            if(confirmacion){
                res.render("MedicoViews/Diagnosticos/VistaListaDiagnosticos.pug", {
                    success: confirmacion,
                    diagnosticos: diagnosticos[1],
                    id_Admision: req.session.admision.id_Admision,
                    id_medico: req.session.usuarioLogueado.id_Personal
                })
                return;
            }
            res.render("MedicoViews/Diagnosticos/VistaListaDiagnosticos.pug", {
                diagnosticos: diagnosticos[1],
                id_Admision: req.session.admision.id_Admision,
                id_medico: req.session.usuarioLogueado.id_Personal
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("vistaListaDiagnosticos","MedicoController","178",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaRegistrarDiagnostico = async(req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            
            const tiposDeDiagnostico = await TipoDeDiagnosticoService.buscarTodosLosTiposDeDiagnostico();
            if(tiposDeDiagnostico[0]){
                res.redirect(`/medicos/view/diagnosticos?error=${tiposDeDiagnostico[0]}`)
                return;
            }
            if(error){
                res.render("MedicoViews/Diagnosticos/VistaRegistrarDiagnostico.pug", {
                    error: error,
                    tiposDeDiagnostico: tiposDeDiagnostico[1]
                })
                return;
            }
            if(warning){
                res.render("MedicoViews/Diagnosticos/VistaRegistrarDiagnostico.pug", {
                    warning: warning,
                    tiposDeDiagnostico: tiposDeDiagnostico[1],
                })
                return;
            }
            if(confirmacion){
                res.render("MedicoViews/Diagnosticos/VistaRegistrarDiagnostico.pug", {
                    success: confirmacion,
                    tiposDeDiagnostico: tiposDeDiagnostico[1],
                })
                return;
            }
            res.render("MedicoViews/Diagnosticos/VistaRegistrarDiagnostico.pug", {
                tiposDeDiagnostico: tiposDeDiagnostico[1]
            })
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("vistaRegistrarDiagnostico","MedicoController","236",error as string)
            res.redirect(`/medicos/view/diagnosticos?error=${error}`)       
            return  
        }
    }
    public VistaActualizarDiagnostico = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            const id_Paciente_Diagnosticos = (req.query.id_Paciente_Diagnosticos) ? Number(req.query.id_Paciente_Diagnosticos) : undefined;
            if(!id_Paciente_Diagnosticos){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURI("No se encontro el diagnostico")}`)
                return;
            }
            const diagnostico = await DiagnosticosServices.getDiagnosticoById(id_Paciente_Diagnosticos)
            if(diagnostico[0]&& diagnostico[1] == undefined){
                res.redirect(`/medicos/view/diagnosticos?error=${diagnostico[0]}`)
                return;
            }
            const tiposDeDiagnostico = await TipoDeDiagnosticoService.buscarTodosLosTiposDeDiagnostico();
            if(tiposDeDiagnostico[0]){
                res.redirect(`/medicos/view/diagnosticos?error=${tiposDeDiagnostico[0]}`)
                return;
            }
            if(error){
                res.render("MedicoViews/Diagnosticos/VistaActualizarDiagnostico.pug", {
                    error: error,
                    tiposDeDiagnostico: tiposDeDiagnostico[1],
                    diagnosticoActual: diagnostico[1]
                })
                return;
            }
            if(warning){
                res.render("MedicoViews/Diagnosticos/VistaActualizarDiagnostico.pug", {
                    warning: warning,
                    tiposDeDiagnostico: tiposDeDiagnostico[1],
                    diagnosticoActual: diagnostico[1]
                })
                return;
            }
            if(confirmacion){
                res.render("MedicoViews/Diagnosticos/VistaActualizarDiagnostico.pug", {
                    success: confirmacion,
                    tiposDeDiagnostico: tiposDeDiagnostico[1],
                    diagnosticoActual: diagnostico[1]
                })
                return;
            }
            res.render("MedicoViews/Diagnosticos/VistaActualizarDiagnostico.pug", {
                tiposDeDiagnostico: tiposDeDiagnostico[1],
                diagnosticoActual: diagnostico[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("vistaActualizarDiagnostico","MedicoController","277",error as string)
            res.redirect(`/medicos/view/diagnosticos?error=${error}`)       
            return  
        }
    }
    public VistaListaPruebasDiagnosticas = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            const id_diagnostico = (req.query.id_Paciente_Diagnosticos) ? Number(req.query.id_Paciente_Diagnosticos) : undefined;
            const id_medico_diagnostico = (req.query.id_medico_diagnostico) ? Number(req.query.id_medico_diagnostico) : undefined;
            
            if(!id_diagnostico){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURI("No se encontro el diagnostico")}`)
                return;
            }
            if(!id_medico_diagnostico){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURI("No se encontro el medico")}`)
                return;
            }
            const PruebasDiagnosticas = await PacientePruebasDiagnosticasService.buscarTodasLasPruebasDiagnosticasDelDiagnostico(id_diagnostico)
            if(PruebasDiagnosticas[0]){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${PruebasDiagnosticas[0]}`)
                return;
            }
            const diagnostico = await DiagnosticosServices.getDiagnosticoById(id_diagnostico)
            if(diagnostico[0]&& diagnostico[1] == undefined){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${diagnostico[0]}`)
                return;
            }
            const validacion = (req.session.admision.id_Admision == diagnostico[1].dataValues.id_Admision && req.session.usuarioLogueado.id_Personal == id_medico_diagnostico)
            if(confirmacion){
                res.render("MedicoViews/Diagnosticos/PruebasDiagnosticas/VistaListaPruebasDiagnosticas.pug",{
                    success: confirmacion,
                    pruebas_diagnosticas: PruebasDiagnosticas[1],
                    id_Admision: req.session.admision.id_Admision,
                    id_Paciente_Diagnosticos: id_diagnostico,
                    id_medico_diagnostico: id_medico_diagnostico,
                    id_medico_actual: req.session.usuarioLogueado.id_Personal,
                    validacion: validacion
                })
                return;
            }
            if(error){
                res.render("MedicoViews/Diagnosticos/PruebasDiagnosticas/VistaListaPruebasDiagnosticas.pug",{
                    error: error,
                    pruebas_diagnosticas: PruebasDiagnosticas[1],
                    id_Admision: req.session.admision.id_Admision,
                    id_Paciente_Diagnosticos: id_diagnostico,
                    id_medico_diagnostico: id_medico_diagnostico,
                    id_medico_actual: req.session.usuarioLogueado.id_Personal,
                    validacion: validacion
                })
                return;
            }
            if(warning){
                res.render("MedicoViews/Diagnosticos/PruebasDiagnosticas/VistaListaPruebasDiagnosticas.pug",{
                    warning: warning,
                    pruebas_diagnosticas: PruebasDiagnosticas[1],
                    id_Admision: req.session.admision.id_Admision,
                    id_Paciente_Diagnosticos: id_diagnostico,
                    id_medico_diagnostico: id_medico_diagnostico,
                    id_medico_actual: req.session.usuarioLogueado.id_Personal,
                    validacion: validacion
                })
                return;
            }
            res.render("MedicoViews/Diagnosticos/PruebasDiagnosticas/VistaListaPruebasDiagnosticas.pug",{
                pruebas_diagnosticas: PruebasDiagnosticas[1],
                id_Admision: req.session.admision.id_Admision,
                id_Paciente_Diagnosticos: id_diagnostico,
                id_medico_diagnostico: id_medico_diagnostico,
                id_medico_actual: req.session.usuarioLogueado.id_Personal,
                validacion: validacion
            })
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("vistaListaPruebasDiagnosticas","MedicoController","336",error as string)
            res.redirect(`/medicos/view/pruebas/diagnosticas?error=${error}&id_Paciente_Diagnosticos=${req.query.id_Paciente_Diagnosticos}`)       
            return  
        }
    }
    public VistaCrearPruebaDiagnostica = async(req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const id_diagnostico = (req.query.id_Paciente_Diagnosticos) ? Number(req.query.id_Paciente_Diagnosticos) : undefined;
            const id_medico_diagnostico = (req.query.id_medico_diagnostico) ? Number(req.query.id_medico_diagnostico) : undefined;
            if(!id_diagnostico){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURI("No se encontro el diagnostico")}`)
                return;
            }
            if(!id_medico_diagnostico){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURI("No se encontro el medico")}`)
                return;
            }
            const diagnostico = await DiagnosticosServices.getDiagnosticoById(id_diagnostico)
            if(diagnostico[0]&& diagnostico[1] == undefined){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${diagnostico[0]}`)
                return;
            }
            const nombresDePruebasDiagnosticas = await NombrePruebaDiagnosticaService.buscarTodosLosNombresDePruebasDiagnosticas()
            if(nombresDePruebasDiagnosticas[0]){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${nombresDePruebasDiagnosticas[0]}&id_Paciente_Diagnosticos=${id_diagnostico}`)
                return;
            }
            if(error){
                res.render("MedicoViews/Diagnosticos/PruebasDiagnosticas/VistaRegistrarPruebaDiagnostica.pug", {
                    error: error,
                    nombresDePruebasDiagnosticas: nombresDePruebasDiagnosticas[1],
                    id_Paciente_Diagnosticos: id_diagnostico,
                    id_medico_diagnostico: id_medico_diagnostico
                })
                return;
            }
            
            res.render("MedicoViews/Diagnosticos/PruebasDiagnosticas/VistaRegistrarPruebaDiagnostica.pug", {
                nombresDePruebasDiagnosticas: nombresDePruebasDiagnosticas[1],
                id_Paciente_Diagnosticos: id_diagnostico,
                id_medico_diagnostico: id_medico_diagnostico
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("vistaCrearPruebaDiagnostica","MedicoController","389",error as string)
            res.redirect(`/medicos/view/pruebas/diagnosticas?error=${error}&id_Paciente_Diagnosticos=${req.query.id_Paciente_Diagnosticos}`)
            return
        }
    }
    public VistaActualizarPruebaDiagnostica = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const id_Paciente_diagnosticos = (req.query.id_Paciente_Diagnosticos) ? Number(req.query.id_Paciente_Diagnosticos) : undefined;
            const id_Prueba_diagnostica = (req.query.id_Prueba_Diagnostica) ? Number(req.query.id_Prueba_Diagnostica) : undefined;
            const id_medico_diagnostico = (req.query.id_medico_diagnostico) ? Number(req.query.id_medico_diagnostico) : undefined;
            if(!id_Paciente_diagnosticos){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURI("No se encontro el diagnostico")}`)
                return;
            }
            if(!id_Prueba_diagnostica){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURI("No se encontro la prueba diagnostica")}`)
                return;
            }
            if(!id_medico_diagnostico){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURI("No se encontro el medico")}`)
                return;
            }
            const pruebaDiagnosticaActual = await PacientePruebasDiagnosticasService.buscarPruebaDiagnosticaPorId(id_Prueba_diagnostica)
            if(pruebaDiagnosticaActual[0]&& pruebaDiagnosticaActual[1] == undefined){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${pruebaDiagnosticaActual[0]}&id_Paciente_Diagnosticos=${id_Paciente_diagnosticos}&id_Prueba_Diagnostica=${id_Prueba_diagnostica}&id_medico_diagnostico=${id_medico_diagnostico}`)
                return;
            }
            
            const nombresDePruebasDiagnosticas = await NombrePruebaDiagnosticaService.buscarTodosLosNombresDePruebasDiagnosticas()
            if(nombresDePruebasDiagnosticas[0]){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${nombresDePruebasDiagnosticas[0]}&id_Paciente_Diagnosticos=${id_Paciente_diagnosticos}&id_Prueba_Diagnostica=${id_Prueba_diagnostica}&id_medico_diagnostico=${id_medico_diagnostico}`)
                return;
            }

            if(error){
                res.render("MedicoViews/Diagnosticos/PruebasDiagnosticas/VistaActualizarPruebaDiagnostica.pug",{
                    error: error,
                    nombresDePruebasDiagnosticas: nombresDePruebasDiagnosticas[1],
                    id_Paciente_diagnosticos: id_Paciente_diagnosticos,
                    pruebaDiagnosticaActual: pruebaDiagnosticaActual[1],
                    id_medico_diagnostico: id_medico_diagnostico
                })
                return;
            }
            if(warning){
                res.render("MedicoViews/Diagnosticos/PruebasDiagnosticas/VistaActualizarPruebaDiagnostica.pug",{
                    warning: warning,
                    nombresDePruebasDiagnosticas: nombresDePruebasDiagnosticas[1],
                    id_Paciente_diagnosticos: id_Paciente_diagnosticos,
                    pruebaDiagnosticaActual: pruebaDiagnosticaActual[1],
                    id_medico_diagnostico: id_medico_diagnostico
                })
                return;
            }
            res.render("MedicoViews/Diagnosticos/PruebasDiagnosticas/VistaActualizarPruebaDiagnostica.pug",{
                nombresDePruebasDiagnosticas: nombresDePruebasDiagnosticas[1],
                id_Paciente_diagnosticos: id_Paciente_diagnosticos,
                pruebaDiagnosticaActual: pruebaDiagnosticaActual[1],
                id_medico_diagnostico: id_medico_diagnostico
            })
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("vistaActualizarPruebaDiagnostica","MedicoController","426",error as string)
            res.redirect(`/medicos/view/pruebas/diagnosticas?error=${error}&id_Paciente_Diagnosticos=${req.query.id_Paciente_Diagnosticos}&id_Prueba_Diagnostica=${req.query.id_Prueba_Diagnostica}&id_medico_diagnostico=${req.query.id_medico_diagnostico}`)
            return
        }
    }
    public VistaHistorialMedico = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            
            if(error){
                res.render("MedicoViews/Historial/VistaHistorialMedico.pug",{
                    error: error,
                    paciente: req.session.paciente
                })
                return;
            }
            if(warning){
                res.render("MedicoViews/Historial/VistaHistorialMedico.pug",{
                    warning: warning,
                    paciente: req.session.paciente
                })
                return;
            }
            res.render("MedicoViews/Historial/VistaHistorialMedico.pug",{
                paciente: req.session.paciente
            })
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaHistorialMedico","MedicoController","221",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaHistorialDeAlergias = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            
            const alergias = await AlergiaService.buscarTodasLasAlergiasPorPaciente(req.session.paciente.id_Paciente)
            if(alergias[0]){
                res.redirect(`/medicos/view/historial?error=${alergias[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Historial/Alergias/VistaListaAlergias.pug", {
                    error: error,
                    alergias: alergias[1]
                })
                return
            }
            res.render("MedicoViews/Historial/Alergias/VistaListaAlergias.pug", {
                alergias: alergias[1]
            })
            return
            
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaHistorialDeAlergias","MedicoController","221",error as string)
            res.redirect(`/medicos/view/historial?error=${error}`)       
            return  
        }
    }
    public VistaHistorialDeMedicamentosActuales = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            
            const medicacionesActuales = await MedicacionActualService.buscarLasMedicacionesActualesPorPacienteYAdmision(req.session.paciente.id_Paciente, req.session.admision.id_Admision)
            if(medicacionesActuales[0]){
                res.redirect(`/medicos/view/historial?error=${medicacionesActuales[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Historial/MedicacionesActuales/VistaListaMedicacionesActuales.pug", {
                    error: error,
                    medicacionesActuales: medicacionesActuales[1]
                })
                return
            }
            res.render("MedicoViews/Historial/MedicacionesActuales/VistaListaMedicacionesActuales.pug", {
                medicacionesActuales: medicacionesActuales[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaHistorialDeMedicamentosActuales","MedicoController","221",error as string)
            res.redirect(`/medicos/view/historial?error=${error}`)       
            return  
        }
    }
    public VistaHistorialDeAntecedentesFamiliares = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            
            const antecedentesFamiliares = await AntecedentesFamiliaresService.buscarAntecedentesFamiliaresPorPaciente(req.session.paciente.id_Paciente)
            if(antecedentesFamiliares[0]){
                res.redirect(`/medicos/view/historial?error=${antecedentesFamiliares[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Historial/AntecedentesFamiliares/VistaListaAntecedentesFamiliares.pug", {
                    error: error,
                    antecedentesFamiliares: antecedentesFamiliares[1]
                })
                return
            }
            res.render("MedicoViews/Historial/AntecedentesFamiliares/VistaListaAntecedentesFamiliares.pug", {
                antecedentesFamiliares: antecedentesFamiliares[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaHistorialDeAntecedentesFamiliares","MedicoController","221",error as string)
            res.redirect(`/medicos/view/historial?error=${error}`)       
            return  
        }
    }
    public VistaHistorialDeCirugias = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            
            const cirugias = await CirugiasService.buscarCirugiasPorPaciente(req.session.paciente.id_Paciente)
            if(cirugias[0]){
                res.redirect(`/medicos/view/historial?error=${cirugias[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Historial/Cirugias/VistaListaCirugias.pug", {
                    error: error,
                    cirugias: cirugias[1]
                })
                return
            }
            res.render("MedicoViews/Historial/Cirugias/VistaListaCirugias.pug", {
                cirugias: cirugias[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaHistorialDeCirugias","MedicoController","221",error as string)
            res.redirect(`/medicos/view/historial?error=${error}`)       
            return  
        }
    }
    public VistaEvaluacionesFisicasActual = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            
            const evaluaciones = await EvaluacionFisicaService.buscarEvaluacionesFisicasPorAdmisionDelPaciente(req.session.admision.id_Admision, req.session.paciente.id_Paciente)
            if(evaluaciones[0]){
                res.redirect(`/medicos/view/historial?error=${evaluaciones[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/EvaluacionesFisicas/VistaListaEvaluacionFisica.pug", {
                    error: error,
                    evaluaciones: evaluaciones[1]
                })
                return
            }
            res.render("MedicoViews/EvaluacionesFisicas/VistaListaEvaluacionFisica.pug", {
                evaluaciones: evaluaciones[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaHistorialDeEvaluacionesFisicas","MedicoController","221",error as string)
            res.redirect(`/medicos/view/historial?error=${error}`)       
            return  
        }
    }
    public VistaHistorialDeEvaluacionesFisicas = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            
            const evaluaciones = await EvaluacionFisicaService.buscarTodasLasEvaluacionesFisicasPorPaciente(req.session.paciente.id_Paciente)
            if(evaluaciones[0]){
                res.redirect(`/medicos/view/historial?error=${evaluaciones[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/EvaluacionesFisicas/VistaHistorialEvaluacionFisica.pug", {
                    error: error,
                    evaluaciones: evaluaciones[1]
                })
                return
            }
            res.render("MedicoViews/EvaluacionesFisicas/VistaHistorialEvaluacionFisica.pug", {
                evaluaciones: evaluaciones[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaHistorialDeEvaluacionesFisicasAnterior","MedicoController","221",error as string)
            res.redirect(`/medicos/view/historial?error=${error}`)       
            return  
        }
    }
    public VistaTratamientosPrescritos = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            const tratamientos = await TratamientosService.getTratamientosByIdPacienteAndAdmision(req.session.paciente.id_Paciente, req.session.admision.id_Admision)
            if(tratamientos[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${tratamientos[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Tratamientos/VistaListarTratamiento.pug", {
                    error: error,
                    tratamientos: tratamientos[1],
                    idMedicoActual: req.session.usuarioLogueado.id_Personal
                })
                return
            }
            if(warning){
                res.render("MedicoViews/Tratamientos/VistaListarTratamiento.pug", {
                    warning: warning,
                    tratamientos: tratamientos[1],
                    idMedicoActual: req.session.usuarioLogueado.id_Personal
                })
                return
            }
            if(confirmacion){
                res.render("MedicoViews/Tratamientos/VistaListarTratamiento.pug", {
                    success: confirmacion,
                    tratamientos: tratamientos[1],
                    idMedicoActual: req.session.usuarioLogueado.id_Personal
                })
                return
            }
            res.render("MedicoViews/Tratamientos/VistaListarTratamiento.pug", {
                tratamientos: tratamientos[1],
                idMedicoActual: req.session.usuarioLogueado.id_Personal
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaTratamientosPrescritos","MedicoController","221",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaHistorialDeTratamientosPrescritos = async (req:Request, res:Response) => {
        try {
            
            const tratamientos = await TratamientosService.getTratamientosByIdPaciente(req.session.paciente.id_Paciente)
            if(tratamientos[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${tratamientos[0]}`)
                return
            }
            res.render("MedicoViews/Tratamientos/VistaHistorialTratamientos.pug", {
                tratamientos: tratamientos[1],
                fechaAdmision: req.session.admision.fecha_De_Admision
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaHistorialDeTratamientosPrescritos","MedicoController","455",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaCrearTratamientoPrescrito = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const tiposDeTratamiento = await TipoDeTratamientoService.getAllTiposDeTratamiento()
            if(tiposDeTratamiento[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${tiposDeTratamiento[0]}`)
                return
            }
            const medicamentos = await MedicamentosServices.getTodosLosMedicamentos();
            if(medicamentos[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${medicamentos[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Tratamientos/VistaCrearTratamiento.pug", {
                    error: error,
                    tiposDeTratamiento: tiposDeTratamiento[1],
                    medicamentos: medicamentos[1]
                })
                return
            }
            res.render("MedicoViews/Tratamientos/VistaCrearTratamiento.pug", {
                tiposDeTratamiento: tiposDeTratamiento[1],
                medicamentos: medicamentos[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaCrearTratamientoPrescrito","MedicoController","455",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaActualizarTratamientoPrescrito = async(req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const id_tratamiento = (req.query.id_tratamiento) ? Number(req.query.id_tratamiento) : undefined;
            const tiposDeTratamiento = await TipoDeTratamientoService.getAllTiposDeTratamiento()
            if(tiposDeTratamiento[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${tiposDeTratamiento[0]}`)
                return
            }
            const medicamentos = await MedicamentosServices.getTodosLosMedicamentos();
            if(medicamentos[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${medicamentos[0]}`)
                return
            }
            const tratamientoActual = await TratamientosService.getTratamientoById(id_tratamiento)
            if(tratamientoActual[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${tratamientoActual[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Tratamientos/VistaActualizarTratamiento.pug", {
                    error: error,
                    tiposDeTratamiento: tiposDeTratamiento[1],
                    medicamentos: medicamentos[1],
                    tratamientoActual: tratamientoActual[1]
                })
                return
            }
            res.render("MedicoViews/Tratamientos/VistaActualizarTratamiento.pug", {
                tiposDeTratamiento: tiposDeTratamiento[1],
                medicamentos: medicamentos[1],
                tratamientoActual: tratamientoActual[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaActualizarTratamientoPrescrito","MedicoController","501",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaTratamientosParaDiagnostico = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const confirmacion = req.query.confirmacion || undefined;
           
            const id_Paciente_Diagnosticos = (req.query.id_Paciente_Diagnosticos) ? Number(req.query.id_Paciente_Diagnosticos) : undefined;
            const id_medico_diagnostico = (req.query.id_medico_diagnostico) ? Number(req.query.id_medico_diagnostico) : undefined;
            


            if(!id_Paciente_Diagnosticos){
                res.redirect(`/medicos/view/diagnosticos?error=El id del diagnostico es inválido`)
                return
            }
            if(!id_medico_diagnostico){
                res.redirect(`/medicos/view/diagnosticos?error=El id del medico es inválido`)
                return
            }
            const tratamientos = await TratamientosService.getTratamientosByIdPacienteAndDiagnostico(req.session.paciente.id_Paciente, id_Paciente_Diagnosticos)
            if(tratamientos[0]){
                res.redirect(`/medicos/view/diagnosticos?error=${tratamientos[0]}`)
                return
            }
            const diagnosticoActual = await DiagnosticosServices.getDiagnosticoById(id_Paciente_Diagnosticos)
            if(diagnosticoActual[0]){
                res.redirect(`/medicos/view/diagnosticos?error=${diagnosticoActual[0]}`)
                return
            }
            const validacion = (diagnosticoActual[1].dataValues.id_medico == req.session.usuarioLogueado.id_Personal && diagnosticoActual[1].dataValues.id_Admision == req.session.admision.id_Admision)
            if(error){
                res.render("MedicoViews/Diagnosticos/Tratamientos/VistaListarTratamiento.pug", {
                    error: error,
                    tratamientos: tratamientos[1],
                    idMedicoActual: req.session.usuarioLogueado.id_Personal,
                    validacion: validacion,
                    id_Paciente_Diagnosticos: id_Paciente_Diagnosticos,
                    id_medico_diagnostico: id_medico_diagnostico
                })
                return
            }
            
            if(confirmacion){
                res.render("MedicoViews/Diagnosticos/Tratamientos/VistaListarTratamiento.pug", {
                    success: confirmacion,
                    tratamientos: tratamientos[1],
                    idMedicoActual: req.session.usuarioLogueado.id_Personal,
                    validacion: validacion,
                    id_Paciente_Diagnosticos: id_Paciente_Diagnosticos,
                    id_medico_diagnostico: id_medico_diagnostico
                })
                return
            }
            res.render("MedicoViews/Diagnosticos/Tratamientos/VistaListarTratamiento.pug", {
                tratamientos: tratamientos[1],
                idMedicoActual: req.session.usuarioLogueado.id_Personal,
                validacion: validacion,
                id_Paciente_Diagnosticos: id_Paciente_Diagnosticos,
                id_medico_diagnostico: id_medico_diagnostico
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaTratamientosPrescritos","MedicoController","221",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaCrearTratamientoParaDiagnostico = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;

            const id_Paciente_Diagnosticos = (req.query.id_Paciente_Diagnosticos) ? Number(req.query.id_Paciente_Diagnosticos) : undefined;
            const id_medico_diagnostico = (req.query.id_medico_diagnostico) ? Number(req.query.id_medico_diagnostico) : undefined;
            
            if(!id_Paciente_Diagnosticos){
                res.redirect(`/medicos/view/diagnosticos?error=El id del diagnostico es inválido`)
                return
            }
            if(!id_medico_diagnostico){
                res.redirect(`/medicos/view/diagnosticos?error=El id del medico es inválido`)
                return
            }
            
            const tiposDeTratamiento = await TipoDeTratamientoService.getAllTiposDeTratamiento()
            if(tiposDeTratamiento[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${tiposDeTratamiento[0]}`)
                return
            }
            const medicamentos = await MedicamentosServices.getTodosLosMedicamentos();
            if(medicamentos[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${medicamentos[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Diagnosticos/Tratamientos/VistaCrearTratamiento.pug", {
                    error: error,
                    tiposDeTratamiento: tiposDeTratamiento[1],
                    medicamentos: medicamentos[1],
                    id_Paciente_Diagnosticos: id_Paciente_Diagnosticos,
                    id_medico_diagnostico: id_medico_diagnostico,
                })
                return
            }
            res.render("MedicoViews/Diagnosticos/Tratamientos/VistaCrearTratamiento.pug", {
                tiposDeTratamiento: tiposDeTratamiento[1],
                medicamentos: medicamentos[1],
                id_Paciente_Diagnosticos: id_Paciente_Diagnosticos,
                id_medico_diagnostico: id_medico_diagnostico,
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaCrearTratamientoPrescrito","MedicoController","455",error as string)
            res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${req.query.id_Paciente_Diagnosticos}&id_medico_diagnostico=${req.query.id_medico_diagnostico}&error=${error}`)       
            return  
        }
    }
    public VistaActualizarTratamientoParaDiagnostico = async(req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const id_tratamiento = (req.query.id_tratamiento) ? Number(req.query.id_tratamiento) : undefined;
            const id_Paciente_Diagnosticos = (req.query.id_Paciente_Diagnosticos) ? Number(req.query.id_Paciente_Diagnosticos) : undefined;
            const id_medico_diagnostico = (req.query.id_medico_diagnostico) ? Number(req.query.id_medico_diagnostico) : undefined;
            
            if(!id_Paciente_Diagnosticos){
                res.redirect(`/medicos/view/diagnosticos?error=El id del diagnostico es inválido`)
                return
            }
            if(!id_medico_diagnostico){
                res.redirect(`/medicos/view/diagnosticos?error=El id del medico es inválido`)
                return
            }
            const tiposDeTratamiento = await TipoDeTratamientoService.getAllTiposDeTratamiento()
            if(tiposDeTratamiento[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${tiposDeTratamiento[0]}`)
                return
            }
            const medicamentos = await MedicamentosServices.getTodosLosMedicamentos();
            if(medicamentos[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${medicamentos[0]}`)
                return
            }
            const tratamientoActual = await TratamientosService.getTratamientoById(id_tratamiento)
            if(tratamientoActual[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${tratamientoActual[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Diagnosticos/Tratamientos/VistaActualizarTratamiento.pug", {
                    error: error,
                    tiposDeTratamiento: tiposDeTratamiento[1],
                    medicamentos: medicamentos[1],
                    tratamientoActual: tratamientoActual[1],
                    id_Paciente_Diagnosticos: id_Paciente_Diagnosticos,
                    id_medico_diagnostico: id_medico_diagnostico
                })
                return
            }
            res.render("MedicoViews/Diagnosticos/Tratamientos/VistaActualizarTratamiento.pug", {
                tiposDeTratamiento: tiposDeTratamiento[1],
                medicamentos: medicamentos[1],
                tratamientoActual: tratamientoActual[1],
                id_Paciente_Diagnosticos: id_Paciente_Diagnosticos,
                id_medico_diagnostico: id_medico_diagnostico
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaActualizarTratamientoPrescrito","MedicoController","501",error as string)
            res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${req.query.id_Paciente_Diagnosticos}&id_medico_diagnostico=${req.query.id_medico_diagnostico}&error=${error}`)       
            return  
        }
    }
    public VistaSintomas = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            
            const sintomas = await SintomasServices.getAllSintomasByPacienteAndAdmision(req.session.paciente.id_Paciente, req.session.admision.id_Admision)
            if(sintomas[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${sintomas[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Sintomas/VistaListaSintomas.pug", {
                    error: error,
                    sintomas: sintomas[1]
                })
                return
            }
            res.render("MedicoViews/Sintomas/VistaListaSintomas.pug", {
                sintomas: sintomas[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaSintomas","MedicoController","549",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaHistorialSintomas = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            
            const sintomas = await SintomasServices.getAllSintomasByPaciente(req.session.paciente.id_Paciente)
            if(sintomas[0]){
                res.redirect(`/medicos/view/historial/sintomas?error=${sintomas[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Sintomas/VistaAllSintomas.pug", {
                    error: error,
                    sintomas: sintomas[1]
                })
                return
            }
            res.render("MedicoViews/Sintomas/VistaAllSintomas.pug", {
                sintomas: sintomas[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaAllSintomas","MedicoController","574",error as string)
            res.redirect(`/medicos/view/historial/sintomas?error=${error}`)       
            return  
        }
    }
    public VistaSeccionAltaPaciente = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            if(error){
                res.render("MedicoViews/Alta/VistaSeccionAltaPaciente.pug", {
                    error: error,
                    paciente: req.session.paciente
                })
                return
            }
            res.render("MedicoViews/Alta/VistaSeccionAltaPaciente.pug", {
                paciente: req.session.paciente
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaSeccionAltaPaciente","MedicoController","1075",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaListaRecetasMedicas = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            const recetas = await RecetasService.buscarTodasLasRecetasPorPacienteYAdmision(req.session.paciente.id_Paciente, req.session.admision.id_Admision)
            if(recetas[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${recetas[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Alta/RecetaMedica/VistaListaRecetasMedicas.pug", {
                    error: error,
                    recetas: recetas[1],
                    medicoActual: req.session.usuarioLogueado.id_Personal,
                    validado: true
                })
                return
            }
            if(confirmacion){
                res.render("MedicoViews/Alta/RecetaMedica/VistaListaRecetasMedicas.pug", {
                    success: confirmacion,
                    recetas: recetas[1],
                    medicoActual: req.session.usuarioLogueado.id_Personal,
                    validado: true
                })
                return
            }
            res.render("MedicoViews/Alta/RecetaMedica/VistaListaRecetasMedicas.pug", {
                recetas: recetas[1],
                medicoActual: req.session.usuarioLogueado.id_Personal,
                validado: true
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaListaRecetasMedicas","MedicoController","1100",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaHistorialRecetasMedicas = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            
            const recetas = await RecetasService.buscarTodaslasRecetasDelPaciente(req.session.paciente.id_Paciente)
            if(recetas[0]){
                res.redirect(`/medicos/view/paciente/seleccionado?error=${recetas[0]}`)
                return
            }
            
            if(error){
                res.render("MedicoViews/Alta/RecetaMedica/VistaHistorialRecetasMedicas.pug", {
                    error: error,
                    recetas: recetas[1],
                    medicoActual: req.session.usuarioLogueado.id_Personal,
                })
                return
            }
            res.render("MedicoViews/Alta/RecetaMedica/VistaHistorialRecetasMedicas.pug", {
                recetas: recetas[1],
                medicoActual: req.session.usuarioLogueado.id_Personal,
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaListaRecetasMedicas","MedicoController","1100",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaListaMedicamentosReceta = async(req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            const id_Receta = req.query.id_Receta ? Number(req.query.id_Receta) : undefined;
            if(!id_Receta){
                res.redirect(`/medicos/view/lista/recetas/medicas?error=No se envio id_Receta`)
                return
            }
            const medicamentosRecetas = await RecetasService.getMedicamentosDeLaReceta(id_Receta)
            if(medicamentosRecetas[0]){
                res.redirect(`/medicos/view/lista/recetas/medicas?error=${medicamentosRecetas[0]}`)
                return
            }
            if(confirmacion){
                res.render("MedicoViews/Alta/RecetaMedica/Medicamentos/VistaListaMedicamentos.pug", {
                    success: confirmacion,
                    medicamentosRecetas: medicamentosRecetas[1],
                    medicoActual: req.session.usuarioLogueado.id_Personal,
                    id_Receta: id_Receta,
                    validado: true
                })
                return
            }
                
            if(error){
                res.render("MedicoViews/Alta/RecetaMedica/Medicamentos/VistaListaMedicamentos.pug", {
                    error: error,
                    medicamentosRecetas: medicamentosRecetas[1],
                    medicoActual: req.session.usuarioLogueado.id_Personal,
                    id_Receta: id_Receta,
                    validado: true
                })
                return
            }
            res.render("MedicoViews/Alta/RecetaMedica/Medicamentos/VistaListaMedicamentos.pug", {
                medicamentosRecetas: medicamentosRecetas[1],
                medicoActual: req.session.usuarioLogueado.id_Personal,
                id_Receta: id_Receta,
                validado: true
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaListaMedicamentosReceta","MedicoController","1164",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
            return  
        }
    }
    public VistaHistorialMedicamentosReceta = async (req:Request,res:Response)=> {
        try {
            const error = req.query.error || undefined;
            const id_Receta = req.query.id_Receta ? Number(req.query.id_Receta) : undefined;
            if(!id_Receta){
                res.redirect(`/medicos/view/alta/historial/recetas?error=No se envio id_Receta`)
                return
            }
            const medicamentosRecetas = await RecetasService.getMedicamentosDeLaReceta(id_Receta)
            if(medicamentosRecetas[0]){
                res.redirect(`/medicos/view/alta/historial/recetas?error=${medicamentosRecetas[0]}`)
                return
            }
            if(error){
                res.render("MedicoViews/Alta/RecetaMedica/Medicamentos/VistaHistorialMedicamentos.pug", {
                    error: error,
                    medicamentosRecetas: medicamentosRecetas[1],
                })
                return
            }
            res.render("MedicoViews/Alta/RecetaMedica/Medicamentos/VistaHistorialMedicamentos.pug", {
                medicamentosRecetas: medicamentosRecetas[1],
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaHistorialMedicamentosReceta","MedicoController","1217",error as string)
            res.redirect(`/medicos/view/alta/historial/recetas?error=${error}`)
            return
        }
    }
    public VistaRegistrarMedicamentoEnReceta = async(req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const id_Receta = req.query.id_Receta ? Number(req.query.id_Receta) : undefined;
            if(!id_Receta){
                res.redirect(`/medicos/view/lista/recetas/medicas?error=No se envio id_Receta`)
                return
            }
            const medicamentos = await MedicamentosServices.getTodosLosMedicamentos()
            if(medicamentos[0]){
                res.redirect(`/medicos/view/lista/recetas/medicas?error=${medicamentos[0]}`)
                return
            }
            
            if(error){
                res.render("MedicoViews/Alta/RecetaMedica/Medicamentos/VistaCrearMedicamento.pug", {
                    error: error,
                    medicamentos: medicamentos[1],
                    id_Receta: id_Receta
                })
                return
            }
            res.render("MedicoViews/Alta/RecetaMedica/Medicamentos/VistaCrearMedicamento.pug", {
                medicamentos: medicamentos[1],
                id_Receta: id_Receta
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaRegistrarMedicamentoEnReceta","MedicoController","1202",error as string)
            res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.query.id_Receta}&error=${error}`)       
            return  
        }
    }
    public VistaActualizarMedicamentoEnReceta = async(req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            const id_Receta = req.query.id_Receta ? Number(req.query.id_Receta) : undefined;
            const id_Recetas_Medicamentos = req.query.id_Recetas_Medicamentos ? Number(req.query.id_Recetas_Medicamentos) : undefined;
            if(!id_Receta){
                res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.query.id_Receta}&error=No se envio id_Receta`)
                return
            }
            if(!id_Recetas_Medicamentos){
                res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.query.id_Receta}&error=No se envio id_Receta_Medicamento`)
                return
            }
            const medicamentos = await MedicamentosServices.getTodosLosMedicamentos()
            if(medicamentos[0]){
                res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.query.id_Receta}&error=${medicamentos[0]}`)
                return
            }
            const recetaMedicamentosActual = await RecetasMedicamentosService.buscarRecetaMedicamentoPorId(id_Recetas_Medicamentos)
            if(recetaMedicamentosActual[0]){
                res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.query.id_Receta}&error=${recetaMedicamentosActual[0]}`)
                return
            }
            const medicamentoActual = await MedicamentosServices.buscarMedicamentoPorId(recetaMedicamentosActual[1].dataValues.id_Medicamento)
            if(medicamentoActual[0]){
                res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.query.id_Receta}&error=${medicamentoActual[0]}`)
                return
            }
            const indicacion = await RecetasMedicamentosService.buscarRecetaMedicamentoPorId(id_Recetas_Medicamentos)
            if(indicacion[0]){
                res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.query.id_Receta}&error=${indicacion[0]}`)
                return
            }
            if(confirmacion){
                res.render("MedicoViews/Alta/RecetaMedica/Medicamentos/VistaActualizarMedicamento.pug", {
                    success: confirmacion,
                    medicamentos: medicamentos[1],
                    medicamentoActual: medicamentoActual[1],
                    indicacion: indicacion[1].dataValues.indicacion,
                    id_Receta: id_Receta,
                    id_Recetas_Medicamentos: id_Recetas_Medicamentos
                })
                return
            }
            
            if(error){
                res.render("MedicoViews/Alta/RecetaMedica/Medicamentos/VistaActualizarMedicamento.pug", {
                    error: error,
                    medicamentos: medicamentos[1],
                    medicamentoActual: medicamentoActual[1],
                    indicacion: indicacion[1].dataValues.indicacion,
                    id_Receta: id_Receta,
                    id_Recetas_Medicamentos: id_Recetas_Medicamentos
                })
                return
            }
            res.render("MedicoViews/Alta/RecetaMedica/Medicamentos/VistaActualizarMedicamento.pug", {
                medicamentos: medicamentos[1],
                medicamentoActual: medicamentoActual[1],
                indicacion: indicacion[1].dataValues.indicacion,
                id_Receta: id_Receta,
                id_Recetas_Medicamentos: id_Recetas_Medicamentos
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("VistaActualizarMedicamentoEnReceta","MedicoController","1239",error as string)
            res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.query.id_Receta}&error=${error}`)       
            return  
        }
    }
    //////////////////////////todo://////////////
    //////////////////////////todo:Controladores/
    //////////////////////////todo://////////////
    public crearTratamientoPrescrito = async(req:Request, res:Response) => {
        try {
            const {id_tipo_de_tratamiento, detalle, cantidad_suministrada, id_medicamento} = req.body 
            const [errorDto, dtoReady] = createTratamientoDto.create({
                id_tipo_de_tratamiento: id_tipo_de_tratamiento,
                detalle: detalle,
                cantidad_suministrada: cantidad_suministrada,
                id_medicamento: id_medicamento,
                id_paciente: req.session.paciente.id_Paciente,
                id_medico: req.session.usuarioLogueado.id_Personal,
                id_admision: req.session.admision.id_Admision,
            })
            if(errorDto){
                res.redirect(`/medicos/view/crear/tratamiento/prescrito?error=${encodeURIComponent(errorDto)}`);
                return;
            }
            const [error, tratamientoCreado] = await TratamientosService.registrarTratamiento(dtoReady);
            if(error && !tratamientoCreado){
                res.redirect(`/medicos/view/crear/tratamiento/prescrito?error=${encodeURIComponent(error)}`);
                return;
            }
            res.redirect(`/medicos/view/tratamientos?confirmacion=${encodeURIComponent("Tratamiento creado correctamente")}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "crearTratamientoPrescrito", "2465", error as string);
            res.redirect(`/medicos/view/tratamientos?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public actualizarTratamientoPrescrito = async(req:Request, res:Response) => {
        try {
            
            const {id_tratamiento,id_tipo_de_tratamiento, detalle, cantidad_suministrada, id_medicamento} = req.body 
            const [errorDto, dtoReady] = updateTratamientoDto.create({
                id_tratamiento: id_tratamiento,
                id_tipo_de_tratamiento: id_tipo_de_tratamiento,
                detalle: detalle,
                cantidad_suministrada: cantidad_suministrada,
                id_medicamento: id_medicamento,
                id_paciente: req.session.paciente.id_Paciente,
                id_medico: req.session.usuarioLogueado.id_Personal,
                id_admision: req.session.admision.id_Admision,
            })
            if(errorDto){
                res.redirect(`/medicos/view/actualizar/tratamiento/prescrito?error=${encodeURIComponent(errorDto)}&id_tratamiento=${encodeURIComponent(id_tratamiento)}`);
                return;
            }
            const [error, tratamientoActualizado] = await TratamientosService.actualizarTratamiento(dtoReady);
            if(error && !tratamientoActualizado){
                res.redirect(`/medicos/view/actualizar/tratamiento/prescrito?error=${encodeURIComponent(error)}&id_tratamiento=${encodeURIComponent(id_tratamiento)}`);
                return;
            }
            res.redirect(`/medicos/view/tratamientos?confirmacion=${encodeURIComponent("Tratamiento actualizado correctamente")}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "actualizarTratamientoPrescrito", "2505", error as string);
            res.redirect(`/medicos/view/tratamientos?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public eliminarTratamientoPrescrito = async(req:Request, res:Response) => {
        try {
            const id_tratamiento = (req.query.id_tratamiento)? Number(req.query.id_tratamiento) : undefined;
            if(!id_tratamiento){
                res.redirect(`/medicos/view/tratamientos/prescritos?error=${encodeURIComponent("No se ha proporcionado un id de tratamiento")}`);
                return;
            }
            const [error, tratamientoEliminado] = await TratamientosService.eliminarTratamiento(id_tratamiento)
            if(error && !tratamientoEliminado){
                res.redirect(`/medicos/view/tratamientos?error=${encodeURIComponent(error)}`);
                return;
            }
            res.redirect(`/medicos/view/tratamientos?confirmacion=${encodeURIComponent("Tratamiento eliminado correctamente")}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "eliminarTratamiento", "2225", error as string);
            res.redirect(`/medicos/view/tratamientos?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public crearDiagnostico = async(req:Request, res:Response) => {
        try {
            const {id_tipo_de_diagnostico, detalles} = req.body
            const [errorDto, dtoReady] = CreateDiagnosticoDto.create({
                id_tipo_de_diagnostico: id_tipo_de_diagnostico,
                detalles: detalles,
                id_paciente: req.session.paciente.id_Paciente,
                id_medico: req.session.usuarioLogueado.id_Personal,
                id_Admision: req.session.admision.id_Admision,
            })
            if(errorDto){
                res.redirect(`/medicos/view/diagnostico/registrar?error=${encodeURIComponent(errorDto)}`);
                return;
            }
            const [error, diagnosticoCreado] = await DiagnosticosServices.createDiagnostico(dtoReady)
            if(error && !diagnosticoCreado){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent(error)}`);
                return;
            }
            res.redirect(`/medicos/view/diagnosticos?confirmacion=${encodeURIComponent("Diagnostico creado correctamente")}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("vistaCrearDiagnostico","MedicoController","740",error as string)
            res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent(error as string)}`)
            return;
        }
    }
    public actualizarDiagnostico = async(req:Request, res:Response) => {
        try {
            const {id_Paciente_Diagnosticos, id_tipo_de_diagnostico, detalles} = req.body
            const [errorDto, dtoReady] = UpdateDiagnosticoDto.create({
                id_Paciente_Diagnosticos: id_Paciente_Diagnosticos,
                id_tipo_de_diagnostico: id_tipo_de_diagnostico,
                detalles: detalles,
                id_paciente: req.session.paciente.id_Paciente,
                id_medico: req.session.usuarioLogueado.id_Personal,
                id_Admision: req.session.admision.id_Admision,
            })
            if(errorDto){
                res.redirect(`/medicos/view/diagnostico/actualizar?error=${encodeURIComponent(errorDto)}&id_Paciente_Diagnosticos=${encodeURIComponent(id_Paciente_Diagnosticos)}`);
                return;
            }
            const [error, diagnosticoActualizado] = await DiagnosticosServices.updateDiagnostico(dtoReady)
            if(error && !diagnosticoActualizado){
                res.redirect(`/medicos/view/diagnostico/actualizar?error=${encodeURIComponent(error)}&id_Paciente_Diagnosticos=${encodeURIComponent(id_Paciente_Diagnosticos)}`);
                return;
            }
            res.redirect(`/medicos/view/diagnosticos?confirmacion=${encodeURIComponent("Diagnostico actualizado correctamente")}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarDiagnostico","MedicoController","823",error as string)
            res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent(error as string)}`)
            return;
        }
    }
    public eliminarDiagnostico = async(req:Request, res:Response) => {
        try {
            const id_Paciente_Diagnosticos = (req.query.id_Paciente_Diagnosticos)? Number(req.query.id_Paciente_Diagnosticos) : undefined;
            if(!id_Paciente_Diagnosticos){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent("No se ha proporcionado un id de diagnostico")}`);
                return;
            }
            const [error, diagnosticoEliminado] = await DiagnosticosServices.deleteDiagnostico(id_Paciente_Diagnosticos)
            if(error && !diagnosticoEliminado){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent(error)}`);
                return;
            }
            res.redirect(`/medicos/view/diagnosticos?confirmacion=${encodeURIComponent("Diagnostico eliminado correctamente")}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarDiagnostico","MedicoController","848",error as string)
            res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent(error as string)}`)
            return;
        }
    }
    public crearPruebaDiagnostica = async(req:Request, res:Response) => {
        try {
            const {id_Paciente_Diagnosticos,id_medico_diagnostico, id_nombre_prueba_diagnostica, resultado} = req.body
            const [errorDto, dtoReady] = createPruebaDiagnosticaDto.create({
                id_diagnostico: id_Paciente_Diagnosticos,
                id_nombre_prueba_diagnostica: id_nombre_prueba_diagnostica,
                resultado: resultado,
                id_paciente: req.session.paciente.id_Paciente,
            })
            if(errorDto){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent(errorDto)}&id_Paciente_Diagnosticos=${encodeURIComponent(id_Paciente_Diagnosticos)}&id_medico_diagnostico=${encodeURIComponent(id_medico_diagnostico)}`);
                return;
            }
            const [error, pruebaDiagnosticaCreada] = await PacientePruebasDiagnosticasService.crearPruebaDiagnostica(dtoReady)
            if(error && !pruebaDiagnosticaCreada){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent(error)}&id_Paciente_Diagnosticos=${encodeURIComponent(id_Paciente_Diagnosticos)}&id_medico_diagnostico=${encodeURIComponent(id_medico_diagnostico)}`);
                return;
            }
            res.redirect(`/medicos/view/pruebas/diagnosticas?confirmacion=${encodeURIComponent("Prueba diagnostica creada correctamente")}&id_Paciente_Diagnosticos=${encodeURIComponent(id_Paciente_Diagnosticos)}&id_medico_diagnostico=${encodeURIComponent(id_medico_diagnostico)}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPruebaDiagnostica","MedicoController","964",error as string)
            res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent(error as string)}&id_Paciente_Diagnosticos=${encodeURIComponent(req.body.id_Paciente_Diagnosticos)}&id_medico_diagnostico=${encodeURIComponent(req.body.id_medico_diagnostico)}`)
            return;
        }
    }
    public actualizarPruebaDiagnostica = async(req:Request, res:Response) => {
        try {
            const {id_Paciente_Diagnosticos,id_medico_diagnostico,id_Prueba_Diagnostica, id_nombre_prueba_diagnostica, resultado} = req.body
            const [errorDto, dtoReady] = updatePruebaDiagnosticaDto.create({
                id_diagnostico: id_Paciente_Diagnosticos,
                id_Prueba_Diagnostica: id_Prueba_Diagnostica,
                id_nombre_prueba_diagnostica: id_nombre_prueba_diagnostica,
                resultado: resultado,
                id_paciente: req.session.paciente.id_Paciente,
            })
            if(errorDto){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent(errorDto)}&id_Paciente_Diagnosticos=${encodeURIComponent(id_Paciente_Diagnosticos)}&id_medico_diagnostico=${encodeURIComponent(id_medico_diagnostico)}`);
                return;
            }
            const [error, pruebaDiagnosticaActualizada] = await PacientePruebasDiagnosticasService.actualizarPruebaDiagnostica(dtoReady)
            if(error && !pruebaDiagnosticaActualizada){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent(error)}&id_Paciente_Diagnosticos=${encodeURIComponent(id_Paciente_Diagnosticos)}&id_medico_diagnostico=${encodeURIComponent(id_medico_diagnostico)}`);
                return;
            }
            res.redirect(`/medicos/view/pruebas/diagnosticas?confirmacion=${encodeURIComponent("Prueba diagnostica actualizada correctamente")}&id_Paciente_Diagnosticos=${encodeURIComponent(id_Paciente_Diagnosticos)}&id_medico_diagnostico=${encodeURIComponent(id_medico_diagnostico)}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarPruebaDiagnostica","MedicoController","1045",error as string)
            res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent(error as string)}&id_Paciente_Diagnosticos=${encodeURIComponent(req.body.id_Paciente_Diagnosticos)}&id_medico_diagnostico=${encodeURIComponent(req.body.id_medico_diagnostico)}`)
            return;
        }
    }
    public eliminarPruebaDiagnostica = async(req:Request, res:Response) => {
        try {
            const id_Prueba_Diagnostica = (req.query.id_Prueba_Diagnostica)? Number(req.query.id_Prueba_Diagnostica) : undefined;
            const id_Paciente_Diagnosticos = (req.query.id_Paciente_Diagnosticos)? Number(req.query.id_Paciente_Diagnosticos) : undefined;
            const id_medico_diagnostico = (req.query.id_medico_diagnostico)? Number(req.query.id_medico_diagnostico) : undefined;
            if(!id_Prueba_Diagnostica){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent("No se ha proporcionado un id de prueba diagnostica")}`);
                return;
            }
            if(!id_Paciente_Diagnosticos){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent("No se ha proporcionado un id de diagnostico")}`);
                return;
            }
            if(!id_medico_diagnostico){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent("No se ha proporcionado un id de medico diagnostico")}`);
                return;
            }
            const [error, pruebaDiagnosticaEliminada] = await PacientePruebasDiagnosticasService.eliminarPruebaDiagnostica(id_Prueba_Diagnostica)
            if(error && !pruebaDiagnosticaEliminada){
                res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent(error)}&id_Paciente_Diagnosticos=${encodeURIComponent(id_Paciente_Diagnosticos)}&id_medico_diagnostico=${encodeURIComponent(id_medico_diagnostico)}`);
                return;
            }
            res.redirect(`/medicos/view/pruebas/diagnosticas?confirmacion=${encodeURIComponent("Prueba diagnostica eliminada correctamente")}&id_Paciente_Diagnosticos=${encodeURIComponent(id_Paciente_Diagnosticos)}&id_medico_diagnostico=${encodeURIComponent(id_medico_diagnostico)}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarPruebaDiagnostica","MedicoController","1112",error as string)
            res.redirect(`/medicos/view/pruebas/diagnosticas?error=${encodeURIComponent(error as string)}&id_Paciente_Diagnosticos=${encodeURIComponent(req.query.id_Paciente_Diagnosticos as string)}&id_medico_diagnostico=${encodeURIComponent(req.query.id_medico_diagnostico as string)}`)
            return;
        }
    }
    public CrearTratamientoParaDiagnostico = async (req:Request, res:Response) => {
        try {

            const id_Paciente_Diagnosticos = (req.body.id_Paciente_Diagnosticos)? Number(req.body.id_Paciente_Diagnosticos) : undefined;
            const id_medico_diagnostico = (req.body.id_medico_diagnostico)? Number(req.body.id_medico_diagnostico) : undefined;
            if(!id_Paciente_Diagnosticos){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent("No se ha proporcionado un id de diagnostico")}`)
                return;
            }
            if(!id_medico_diagnostico){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent("No se ha proporcionado un id de medico diagnostico")}`)
                return;
            }

            const [errorDto, dtoReady] = createTratamientoDto.create({
                id_tipo_de_tratamiento: req.body.id_tipo_de_tratamiento,
                detalle: req.body.detalle,
                cantidad_suministrada: req.body.cantidad_suministrada,
                id_paciente: req.session.paciente.id_Paciente,
                id_medicamento: req.body.id_medicamento,
                id_medico: req.session.usuarioLogueado.id_Personal,
                id_Paciente_Diagnosticos: id_Paciente_Diagnosticos,
                id_admision: req.session.admision.id_Admision,
            })
            if(errorDto){
                res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&error=${encodeURIComponent(errorDto)}`)
                return;
            }
            const [error, tratamientoCreado] = await TratamientosService.registrarTratamiento(dtoReady)
            if(error && !tratamientoCreado){
                res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&error=${encodeURIComponent(error)}`)
                return;
            }
            res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&confirmacion=${encodeURIComponent("Tratamiento creado correctamente")}`)
            return;

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("CrearTratamientoParaDiagnostico","MedicoController","1316",error as string)
            res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${req.body.id_Paciente_Diagnosticos}&id_medico_diagnostico=${req.body.id_medico_diagnostico}&error=${encodeURIComponent(error as string)}`)       
            return  
        }
    }
    public ActualizarTratamientoParaDiagnostico = async (req:Request, res:Response) => {
        try {
            const id_Paciente_Diagnosticos = (req.body.id_Paciente_Diagnosticos)? Number(req.body.id_Paciente_Diagnosticos) : undefined;
            const id_medico_diagnostico = (req.body.id_medico_diagnostico)? Number(req.body.id_medico_diagnostico) : undefined;
            const id_tratamiento = (req.body.id_tratamiento)? Number(req.body.id_tratamiento) : undefined;
            if(!id_Paciente_Diagnosticos){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent("No se ha proporcionado un id de diagnostico")}`)
                return;
            }
            if(!id_medico_diagnostico){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent("No se ha proporcionado un id de medico diagnostico")}`)
                return;
            }
            if(!id_tratamiento){
                res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&error=${encodeURIComponent("No se ha proporcionado un id de tratamiento")}`)
                return;
            }
            const [errorDto, dtoReady] = updateTratamientoDto.create({
                id_tratamiento: id_tratamiento,
                id_tipo_de_tratamiento: req.body.id_tipo_de_tratamiento,
                detalle: req.body.detalle,
                cantidad_suministrada: req.body.cantidad_suministrada,
                id_paciente: req.session.paciente.id_Paciente,
                id_medicamento: req.body.id_medicamento,
                id_medico: req.session.usuarioLogueado.id_Personal,
                id_Paciente_Diagnosticos: id_Paciente_Diagnosticos,
                id_admision: req.session.admision.id_Admision,
            })
            if(errorDto){
                res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&error=${encodeURIComponent(errorDto)}`)
                return;
            }
            const [error, tratamientoActualizado] = await TratamientosService.actualizarTratamiento(dtoReady)
            if(error && !tratamientoActualizado){
                res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&error=${encodeURIComponent(error)}`)
                return;
            }
            res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&confirmacion=${encodeURIComponent("Tratamiento actualizado correctamente")}`)
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("ActualizarTratamientoParaDiagnostico","MedicoController","1358",error as string)
            res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${req.body.id_Paciente_Diagnosticos}&id_medico_diagnostico=${req.body.id_medico_diagnostico}&error=${encodeURIComponent(error as string)}`)       
            return  
        }
    }
    public EliminarTratamientoParaDiagnostico = async (req:Request, res:Response) => {
        try {
            const id_Paciente_Diagnosticos = (req.query.id_Paciente_Diagnosticos)? Number(req.query.id_Paciente_Diagnosticos) : undefined;
            const id_medico_diagnostico = (req.query.id_medico_diagnostico)? Number(req.query.id_medico_diagnostico) : undefined;
            const id_tratamiento = (req.query.id_tratamiento)? Number(req.query.id_tratamiento) : undefined;
            if(!id_Paciente_Diagnosticos){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent("No se ha proporcionado un id de diagnostico")}`)
                return;
            }
            if(!id_medico_diagnostico){
                res.redirect(`/medicos/view/diagnosticos?error=${encodeURIComponent("No se ha proporcionado un id de medico diagnostico")}`)
                return;
            }
            if(!id_tratamiento){
                res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&error=${encodeURIComponent("No se ha proporcionado un id de tratamiento")}`)
                return;
            }
            const tratamientoAEliminar = await TratamientosService.getTratamientoById(id_tratamiento);
            if(tratamientoAEliminar[1] === undefined){
                res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&error=${encodeURIComponent("El tratamiento no existe")}`)
                return;
            }
            tratamientoAEliminar[1].id_Paciente_Diagnosticos = null;
            await tratamientoAEliminar[1].save()
            const [error, tratamientoEliminado] = await TratamientosService.eliminarTratamiento(id_tratamiento)
            if(error && !tratamientoEliminado){
                res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&error=${encodeURIComponent(error as string)}`)       
                return  
            }
            res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${id_Paciente_Diagnosticos}&id_medico_diagnostico=${id_medico_diagnostico}&confirmacion=${encodeURIComponent("Tratamiento eliminado correctamente")}`)       
            return  
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EliminarTratamientoParaDiagnostico","MedicoController","1368",error as string)
            res.redirect(`/medicos/view/tratamientos/diagnostico?id_Paciente_Diagnosticos=${req.query.id_Paciente_Diagnosticos}&id_medico_diagnostico=${req.query.id_medico_diagnostico}&error=${encodeURIComponent(error as string)}`)       
            return  
        }
    }
    public crearMedicamentoDeReceta = async (req:Request, res:Response) => {
        try {
            const [errorDto, dtoReady] = createRecetaMedicamentoDto.create({
                id_Receta: req.body.id_Receta,
                id_Medicamento: req.body.id_Medicamento,
                indicacion: req.body.indicacion,
            })
            if(errorDto){
                res.redirect(`/medicos/view/alta/receta/medicamentos?error=${encodeURIComponent(errorDto)}&id_Receta=${req.body.id_Receta}`)
                return
            }
            const [error, recetaCreada] = await RecetasMedicamentosService.crearRecetaMedicamento(dtoReady)
            if(error && !recetaCreada){
                res.redirect(`/medicos/view/alta/receta/medicamentos?error=${encodeURIComponent(error as string)}&id_Receta=${req.body.id_Receta}`)
                return
            }
            res.redirect(`/medicos/view/alta/receta/medicamentos?confirmacion=${encodeURIComponent("Receta creada correctamente")}&id_Receta=${req.body.id_Receta}`)
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearReceta","MedicoController","1523",error as string)
            res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.body.id_Receta}&error=${encodeURIComponent(error as string)}`)
            return
        }
    }
    public actualizarMedicamentoDeReceta = async (req:Request, res:Response) => {
        try {
            const [errorDto, dtoReady] = updateRecetaMedicamentoDto.create({
                id_Recetas_Medicamentos: req.body.id_Recetas_Medicamentos,
                id_Receta: req.body.id_Receta,
                id_Medicamento: req.body.id_Medicamento,
                indicacion: req.body.indicacion,
            })
            if(errorDto){
                res.redirect(`/medicos/view/alta/receta/medicamentos?error=${encodeURIComponent(errorDto)}&id_Receta=${req.body.id_Receta}`)
                return
            }
            const [error, recetaActualizada] = await RecetasMedicamentosService.actualizarRecetaMedicamento(dtoReady)
            if(error && !recetaActualizada){
                res.redirect(`/medicos/view/alta/receta/medicamentos?error=${encodeURIComponent(error as string)}&id_Receta=${req.body.id_Receta}`)
                return
            }
            res.redirect(`/medicos/view/alta/receta/medicamentos?confirmacion=${encodeURIComponent("Receta actualizada correctamente")}&id_Receta=${req.body.id_Receta}`)
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarMedicamentoDeReceta","MedicoController","1681",error as string)
            res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.body.id_Receta}&error=${encodeURIComponent(error as string)}`)
            return       
        }
    }
    public eliminarMedicamentoDeReceta = async(req:Request, res:Response) => {
        try {
            const id_Recetas_Medicamentos = req.query.id_Recetas_Medicamentos ? Number(req.query.id_Recetas_Medicamentos) : undefined;
            const id_Receta = req.query.id_Receta ? Number(req.query.id_Receta) : undefined;
            if(!id_Recetas_Medicamentos){
                res.redirect(`/medicos/view/alta/receta/medicamentos?error=${encodeURIComponent("No se envio id_Recetas_Medicamentos")}`)
                return
            }
            if(!id_Receta){
                res.redirect(`/medicos/view/alta/receta/medicamentos?error=${encodeURIComponent("No se envio id_Receta")}`)
                return
            }
            const [error, medicamentoEliminado] = await RecetasMedicamentosService.eliminarRecetaMedicamento(id_Recetas_Medicamentos)
            if(error && !medicamentoEliminado){
                res.redirect(`/medicos/view/alta/receta/medicamentos?error=${encodeURIComponent(error as string)}&id_Receta=${id_Receta}`)
                return
            }
            res.redirect(`/medicos/view/alta/receta/medicamentos?confirmacion=${encodeURIComponent("Medicamento eliminado correctamente")}&id_Receta=${id_Receta}`)
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarMedicamentoDeReceta","MedicoController","1732",error as string)
            res.redirect(`/medicos/view/alta/receta/medicamentos?id_Receta=${req.query.id_Receta}&error=${encodeURIComponent(error as string)}`)
            return       
        }
    }
    public crearReceta = async (req:Request, res:Response) => {
        try {
            const [errorDto, dtoReady] = createRecetaDto.create({
                id_paciente: req.session.admision.id_Paciente,
                id_medico: req.session.usuarioLogueado.id_Personal,
                id_admision: req.session.admision.id_Admision
            })
            if(errorDto){
                res.redirect(`/medicos/view/lista/recetas/medicas?error=${encodeURIComponent(errorDto)}`)
                return
            }
            const [error, recetaCreada] = await RecetasService.crearReceta(dtoReady)
            if(error && !recetaCreada){
                res.redirect(`/medicos/view/lista/recetas/medicas?error=${encodeURIComponent(error as string)}`)
                return
            }
            res.redirect(`/medicos/view/lista/recetas/medicas?confirmacion=${encodeURIComponent("Receta creada correctamente")}`)
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearReceta","MedicoController","1757",error as string)
            res.redirect(`/medicos/view/lista/recetas/medicas?error=${encodeURIComponent(error as string)}`)
            return       
        }
    }
    public eliminarReceta = async (req:Request, res:Response) => {
        try {
            const id_Receta = req.query.id_Receta ? Number(req.query.id_Receta) : undefined;
            if(!id_Receta){
                res.redirect(`/medicos/view/lista/recetas/medicas?error=${encodeURIComponent("No se envio id_Receta")}`)
                return
            }
            const [error, recetaEliminada] = await RecetasService.eliminarReceta(id_Receta)
            if(error && !recetaEliminada){
                res.redirect(`/medicos/view/lista/recetas/medicas?error=${encodeURIComponent(error as string)}`)
                return
            }
            res.redirect(`/medicos/view/lista/recetas/medicas?confirmacion=${encodeURIComponent("Receta eliminada correctamente")}`)
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarReceta","MedicoController","1781",error as string)
            res.redirect(`/medicos/view/lista/recetas/medicas?error=${encodeURIComponent(error as string)}`)
            return       
        }
    }
}