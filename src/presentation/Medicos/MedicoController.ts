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
                    diagnosticos: diagnosticos[1]
                })
                return;
            }
            if(warning){
                res.render("MedicoViews/Diagnosticos/VistaListaDiagnosticos.pug", {
                    warning: warning,
                    diagnosticos: diagnosticos[1]
                })
                return;
            }
            if(confirmacion){
                res.render("MedicoViews/Diagnosticos/VistaListaDiagnosticos.pug", {
                    success: confirmacion,
                    diagnosticos: diagnosticos[1]
                })
                return;
            }
            res.render("MedicoViews/Diagnosticos/VistaListaDiagnosticos.pug", {
                diagnosticos: diagnosticos[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("vistaListaDiagnosticos","MedicoController","178",error as string)
            res.redirect(`/medicos/view/paciente/seleccionado?error=${error}`)       
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
}