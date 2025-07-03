import { Request, Response } from "express";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { AdmisionService } from "../services/AdmisionService";
import { PacienteServices } from "../services/PacientesService";
import { UpdatePacienteDto } from "../../domain/Dtos/pacientes/updatePacienteDto";
import { AlergiaService } from "../services/Paciente/AlergiasService";
import { createAlergiaDto } from "../../domain/Dtos/pacientes/Alergias/createAlergiaDto";
import { updateAlergiaDto } from "../../domain/Dtos/pacientes/Alergias/updateAlergiaDto";
import { MedicamentosServices } from "../services/MedicamentosServices";
import { TipoDeTratamientoService } from "../services/TipoDeTratamientoService";
import { createTratamientoDto } from "../../domain/Dtos/pacientes/Tratamientos/createTratamientoDto";
import { TratamientosService } from "../services/Paciente/TratamientosService";
import { updateTratamientoDto } from "../../domain/Dtos/pacientes/Tratamientos/updateTratamientoDto";
import { MedicacionActualService } from "../services/Paciente/MedicacionActualService";
import { createMedicacionActualDto } from "../../domain/Dtos/pacientes/Medicacion Actual/createMedicacionActualDto";
import { updateMedicacionActualDto } from "../../domain/Dtos/pacientes/Medicacion Actual/updateMedicacionActualDto";
import { AntecedentesFamiliaresService } from "../services/Paciente/AntecedentesFamiliaresService";
import { Lazo_Familiar } from "../../data/models/Lazo_familiar";
import { LazoFamiliarService } from "../services/Paciente/LazoFamiliarService";
import { createAntecedenteFamiliarDto } from "../../domain/Dtos/pacientes/AntecedentesFamiliares.ts/createAntecedenteFamiliarDto";
import { updateAntecedenteFamiliarDto } from "../../domain/Dtos/pacientes/AntecedentesFamiliares.ts/updateAntecedenteFamiliarDto";
import { CirugiasService } from "../services/Paciente/CirugiasService";
import { NombreCirugiasServices } from "../services/NombreCirugiasServices";
import { MedicoService } from "../services/MedicoService";
import { createCirugiaDto } from "../../domain/Dtos/pacientes/Cirugias/createCirugiaDto";
import { updateCirugiaDto } from "../../domain/Dtos/pacientes/Cirugias/updateCirugiaDto";
import { Paciente_Diagnosticos } from "../../data/models/Paciente_Diagnosticos";
import { DiagnosticoService } from "../services/Medico/DiagnosticosService";


export class EnfermerosController{

    
    public getEnfermeros = (req:Request,res:Response):void => {
        res.send("hola estas en el metodo get enfermeros");
    }
    //////////////////////////////////////////////////Todo
    //////////////////todo VISTAS ///////////
    //////////////////////////////////////////////////Todo

    public test = async(req:Request,res:Response)=>{
        try {
            const [error, sd] = await AlergiaService.buscarAlergiaPorPaciente(3,2);
            if(error){
                res.json({error:error})
                return 
            } 
            res.json({log:sd})
            return

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("test","EnfermeroController","",error as string)
            res.status(500).json({messageError: error})
            return
        }
    }
    public  vistaPrincipal = async (req:Request, res:Response) => {
        
        try {
            const error = req.query.error || undefined
            const warning = req.query.warning || undefined
            
            const admisiones = await AdmisionService.buscarTodasLasAdmisiones();
            if(admisiones[0]){
                res.render("EnfermeroViews/VistaSeleccionarPaciente.pug", {error: admisiones[0]});
                return;
            }
            type admisionesType = {
                id_Admision: number;
                Fecha: string;
                nombre: string;
                apellido: string;   
                dni: number;
                habitacion: number;
                ala: string;
                cama: number;
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
                    cama: admision.dataValues.camas.dataValues.id_Cama
                }
                admisionesFormateadas.push(admisionFormateada)
            }
            if(error){
                res.render("EnfermeroViews/VistaSeleccionarPaciente.pug", {
                    error: error,
                    admisiones: admisionesFormateadas
                })
                return
            }
            if(warning){
                res.render("EnfermeroViews/VistaSeleccionarPaciente.pug", {
                    warning: warning,
                    admisiones: admisionesFormateadas
                })
                return
            }
            res.render("EnfermeroViews/VistaSeleccionarPaciente.pug", {
                admisiones: admisionesFormateadas

            })
            return 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaPrincipal", "30", error as string);
            res.redirect(`/enfermeria/?error=${encodeURIComponent(error as string)}`);
            return;
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
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado una admisión"));
                return;
            }
            const admision = await AdmisionService.buscarAdmisionPorId(Number(id_AdmisionValida));
            if(admision[0]){
                res.redirect("/enfermeria/?error=" + encodeURIComponent(admision[0]));
                return;
            }
            const id_Paciente = admision[1].dataValues.id_Paciente
            const paciente = await PacienteServices.getPacienteById(id_Paciente);
            if(paciente[0]){
                res.redirect("/enfermeria/?error=" + encodeURIComponent(paciente[0]));
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
                res.render("EnfermeroViews/vistaPacienteSeleccionado.pug", {
                    error: error,
                    paciente: {
                        nombre: paciente[1].dataValues.nombre,
                        apellido: paciente[1].dataValues.apellido,
                    }
                })
                return;
            }
            if(warning){
                res.render("EnfermeroViews/vistaPacienteSeleccionado.pug", {
                    warning: warning,
                    paciente: {
                        nombre: paciente[1].dataValues.nombre,
                        apellido: paciente[1].dataValues.apellido,
                    }
                })
                return;
            }
            res.render("EnfermeroViews/vistaPacienteSeleccionado.pug", {
                paciente: {
                    nombre: paciente[1].dataValues.nombre,
                    apellido: paciente[1].dataValues.apellido,
                }
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaPacienteSeleccionado", "40", error as string);
            res.redirect(`/enfermeria/?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaActualizarInformacionPaciente = async (req:Request, res:Response) => {
        try {
            const confirmacion = req.query.confirmacion || undefined;
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;

            
            if(confirmacion){
                res.render("EnfermeroViews/vistaActualizarInformacionPaciente.pug", {
                    paciente: req.session.paciente,
                    telefono_De_Emergencia: req.session.paciente.telefono_emergencia,
                    success: confirmacion
                })
                return
            }
            if(error){
                res.render("EnfermeroViews/vistaActualizarInformacionPaciente.pug", {
                    paciente: req.session.paciente,
                    telefono_De_Emergencia: req.session.paciente.telefono_emergencia,
                    error: error
                })
                return;
            } 
            
            
            res.render("EnfermeroViews/vistaActualizarInformacionPaciente.pug", {
                paciente: req.session.paciente,
                telefono_De_Emergencia: req.session.paciente.telefono_emergencia,
            })
            return 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaActualizarInformacionPaciente", "50", error as string);
            res.redirect(`/enfermeria/?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }

    public vistaHistorialMedico = async (req:Request, res:Response) => {
        try {
            const confirmacion = req.query.confirmacion || undefined;
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            if(confirmacion) {
                res.render("EnfermeroViews/vistaHistorialMedico.pug",{
                    success: confirmacion,
                    paciente: req.session.paciente,
                })
                return
            }
            if(warning){
                res.render("EnfermeroViews/vistaHistorialMedico.pug",{
                    warning: warning,
                    paciente: req.session.paciente,
                })
                return
            }
            if(error){
                res.render("EnfermeroViews/vistaHistorialMedico.pug",{
                    error: error,
                    paciente: req.session.paciente,
                })
                return;
            }
            res.render("EnfermeroViews/vistaHistorialMedico.pug",{
                paciente: req.session.paciente,
            })
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaHistorialMedico", "55", error as string);
            res.redirect(`/enfermeria/?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaListaAlergias = async(req:Request, res:Response) => {
        try {
            const confirmacion = req.query.confirmacion || undefined;
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const alergias = await AlergiaService.buscarTodasLasAlergiasPorPaciente(req.session.paciente.id_Paciente);
            if(alergias[0] && alergias[1] &&alergias[1].length <=0){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(alergias[0])}`);
                return;
            }

            if(confirmacion){
                res.render("EnfermeroViews/Alergias/VistaListaAlergias.pug", {
                    success: confirmacion,
                    alergias: alergias[1]
                })
                return
            }
            if(warning){
                res.render("EnfermeroViews/Alergias/VistaListaAlergias.pug", {
                    warning: warning,
                    alergias: alergias[1]
                })
                return
            }
            if(error){
                res.render("EnfermeroViews/Alergias/VistaListaAlergias.pug", {
                    error: error,
                    alergias: alergias[1]
                })
                return
            }
   
        
            res.render("EnfermeroViews/Alergias/VistaListaAlergias.pug", {
                    alergias: alergias[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaListaAlergias", "58", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaCrearAlergia = async (req:Request, res:Response) => {
        try {
            const confirmacion = req.query.confirmacion || undefined;
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const nombresDeAlergia = await AlergiaService.buscarTodosLosNombresDeAlergia();
            if(nombresDeAlergia[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(nombresDeAlergia[0])}`);
                return;
            }
            if(confirmacion){
                res.render("EnfermeroViews/Alergias/VistaCrearAlergia.pug", {
                    success: confirmacion,
                    nombresDeAlergias: nombresDeAlergia[1]
                })
                return
            }
            if(warning){
                res.render("EnfermeroViews/Alergias/VistaCrearAlergia.pug", {
                    warning: warning,
                    nombresDeAlergias: nombresDeAlergia[1]
                })
                return
            }
            if(error){
                res.render("EnfermeroViews/Alergias/VistaCrearAlergia.pug", {
                    error: error,
                    nombresDeAlergias: nombresDeAlergia[1]
                })
                return
            }
            
            res.render("EnfermeroViews/Alergias/VistaCrearAlergia.pug", {
                nombresDeAlergias: nombresDeAlergia[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaCrearAlergia", "70", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaActualizarAlergia = async (req:Request, res:Response) => {
        try {
            const id_Alergia = req.query.id_Alergia || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const nombresDeAlergia = await AlergiaService.buscarTodosLosNombresDeAlergia();
            if(nombresDeAlergia[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(nombresDeAlergia[0])}`);
                return;
            }
            const alergiaActual = await AlergiaService.buscarAlergiaPorId(Number(id_Alergia));
            if(alergiaActual[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(alergiaActual[0])}`);
                return;
            }
            
            
            if(confirmacion){
                res.render("EnfermeroViews/Alergias/VistaActualizarAlergia.pug", {
                    success: confirmacion,
                    nombresDeAlergias: nombresDeAlergia[1],
                    alergiaActual: alergiaActual[1]
                })
                return
            }
            if(warning){
                res.render("EnfermeroViews/Alergias/VistaActualizarAlergia.pug", {
                    warning: warning,
                    nombresDeAlergias: nombresDeAlergia[1],
                    alergiaActual: alergiaActual[1]
                })
                return
            }
            if(error){
                res.render("EnfermeroViews/Alergias/VistaActualizarAlergia.pug", {
                    error: error,
                    nombresDeAlergias: nombresDeAlergia[1],
                    alergiaActual: alergiaActual[1]
                })
                return
            }

            res.render("EnfermeroViews/Alergias/VistaActualizarAlergia.pug", {
                nombresDeAlergias: nombresDeAlergia[1],
                alergiaActual: alergiaActual[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaActualizarAlergia", "75", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaCrearTratamientoAlergia = async (req:Request, res:Response) => {
        try {
            
            const confirmacion = req.query.confirmacion || undefined;
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const id_Alergia = req.query.id_Alergia || undefined;
            if(!id_Alergia){
                res.redirect("/enfermeria/view/crear/alergia?error=" + encodeURIComponent("No se ha seleccionado una alergia"));
                return;
            }
            const alergiaActual = await AlergiaService.buscarAlergiaPorId(Number(id_Alergia));
            if(alergiaActual[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(alergiaActual[0])}`);
                return;
            }
            if(alergiaActual[1].dataValues.id_tratamiento){
                res.redirect(`/enfermeria/view/actualizar/tratamiento/alergia?id_Alergia=${encodeURIComponent(Number(id_Alergia))}`)
                return
            }
            const medicamentos = await MedicamentosServices.getTodosLosMedicamentos();
            if(medicamentos[0] && medicamentos[1] && medicamentos[1].length <= 0){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(medicamentos[0])}`);
                return;
            }
            const tiposDetratamiento = await TipoDeTratamientoService.getAllTiposDeTratamiento();
            if(tiposDetratamiento[0] && tiposDetratamiento[1] && tiposDetratamiento[1].length <= 0){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(tiposDetratamiento[0])}`);
                return;
            }
            
            
            if(confirmacion){
                res.render("EnfermeroViews/Alergias/VistaCrearTratamientoAlergia.pug", {
                    success: confirmacion,
                    medicamentos: medicamentos[1],
                    id_Alergia: id_Alergia,
                    tiposDeTratamiento: tiposDetratamiento[1]
                })
                return
            }
            if(warning){
                res.render("EnfermeroViews/Alergias/VistaCrearTratamientoAlergia.pug", {
                    warning: warning,
                    medicamentos: medicamentos[1],
                    id_Alergia: id_Alergia,
                    tiposDeTratamiento: tiposDetratamiento[1]
                })
                return
            }
            if(error){
                res.render("EnfermeroViews/Alergias/VistaCrearTratamientoAlergia.pug", {
                    error: error,
                    medicamentos: medicamentos[1],
                   id_Alergia: id_Alergia,
                   tiposDeTratamiento: tiposDetratamiento[1]
                })
                return
            }

            res.render("EnfermeroViews/Alergias/VistaCrearTratamientoAlergia.pug", {
                medicamentos: medicamentos[1],
                id_Alergia: id_Alergia,
                tiposDeTratamiento: tiposDetratamiento[1]
            })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaCrearTratamientoAlergia", "80", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaActualizarTratamientoAlergia = async (req:Request, res:Response) => {
        try {
            const id_Alergia = Number(req.query.id_Alergia) || undefined;
            if(!id_Alergia){
                res.redirect("/enfermeria/view/alergias/paciente?error=" + encodeURIComponent("No se ha seleccionado una alergia"));
                return;
            }
            const alergia = await AlergiaService.buscarAlergiaPorId(id_Alergia)
            if(alergia[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(alergia[0])}`);
                return;
            }
            if(!alergia[1].dataValues.id_tratamiento || alergia[1].dataValues.id_tratamiento === null){
                res.redirect(`/enfermeria/view/alergias/paciente?error=${encodeURIComponent("La alergia no tiene un tratamiento asociado")}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
                return;
            }
            const tratamientoActual = await TratamientosService.getTratamientoById(alergia[1].dataValues.id_tratamiento)
            if(tratamientoActual[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(tratamientoActual[0])}`);
                return;
            }
            const tiposDeTratamiento = await TipoDeTratamientoService.getAllTiposDeTratamiento();
            if(tiposDeTratamiento[0] && tiposDeTratamiento[1] && tiposDeTratamiento[1].length <= 0){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(tiposDeTratamiento[0])}`);
                return;
            }
            const medicamentos = await MedicamentosServices.getTodosLosMedicamentos();
            if(medicamentos[0] && medicamentos[1] && medicamentos[1].length <= 0){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(medicamentos[0])}`);
                return;
            }
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            if(error){
                res.render("EnfermeroViews/Alergias/VistaActualizarTratamientoAlergia.pug", {
                    medicamentos: medicamentos[1],
                    id_Alergia: id_Alergia,
                    tiposDeTratamiento: tiposDeTratamiento[1],
                    tratamientoActual: tratamientoActual[1],
                    error: error 
                })
                return
            }
            if(warning){
                res.render("EnfermeroViews/Alergias/VistaActualizarTratamientoAlergia.pug", {
                    medicamentos: medicamentos[1],
                    id_Alergia: id_Alergia,
                    tiposDeTratamiento: tiposDeTratamiento[1],
                    tratamientoActual: tratamientoActual[1],
                    warning: warning 
                })
                return
            }
            if(confirmacion){
                res.render("EnfermeroViews/Alergias/VistaActualizarTratamientoAlergia.pug", {
                    medicamentos: medicamentos[1],
                    id_Alergia: id_Alergia,
                    tiposDeTratamiento: tiposDeTratamiento[1],
                    tratamientoActual: tratamientoActual[1],
                    success: confirmacion 
                })
                return
            }
            res.render("EnfermeroViews/Alergias/VistaActualizarTratamientoAlergia.pug", {
                medicamentos: medicamentos[1],
                id_Alergia: id_Alergia,
                tiposDeTratamiento: tiposDeTratamiento[1],
                tratamientoActual: tratamientoActual[1] 
                })
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaActualizarTramientoAlergia", "80", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }


    public vistaListaMedicacionActual = async (req:Request, res:Response) => {
        try {
            
            const error = req.query.error || undefined
            const confirmacion = req.query.confirmacion || undefined
            
            const medicacionesActualesDelPaciente = await MedicacionActualService.buscarLasMedicacionesActualesPorPacienteYAdmision(req.session.paciente.id_Paciente, req.session.admision.id_Admision);
            if(medicacionesActualesDelPaciente[0] && medicacionesActualesDelPaciente[1] && medicacionesActualesDelPaciente[1].length <= 0){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(medicacionesActualesDelPaciente[0])}`);
                return;
            }
            
            
            if(error){
                res.render("EnfermeroViews/MedicacionActual/vistaListarTodasLasMedicacionesActuales.pug", {
                    medicacionesActuales: medicacionesActualesDelPaciente[1],
                    error: error
                })
                return;
            }
            if(confirmacion){
                res.render("EnfermeroViews/MedicacionActual/vistaListarTodasLasMedicacionesActuales.pug", {
                    medicacionesActuales: medicacionesActualesDelPaciente[1],
                    success: confirmacion
                })
                return;
            }
            res.render("EnfermeroViews/MedicacionActual/vistaListarTodasLasMedicacionesActuales.pug", {
                medicacionesActuales: medicacionesActualesDelPaciente[1]
            })
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaListaMedicacionActual", "601", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaCrearMedicacionActual = async (req:Request, res:Response) => {
        try {
            
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            
            const medicamentos = await MedicamentosServices.getTodosLosMedicamentos();
            if(medicamentos[0] && medicamentos[1] && medicamentos[1].length <= 0){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(medicamentos[0])}`);
                return;
            }
            
            if(error){
                res.render("EnfermeroViews/MedicacionActual/vistaCrearMedicacionActual.pug", {
                    error: error,
                    medicamentos: medicamentos[1] 
                })
                return;
            }
            if(warning){
                res.render("EnfermeroViews/MedicacionActual/vistaCrearMedicacionActual.pug", {
                    warning: warning,
                    medicamentos: medicamentos[1]    
                })
                return;
            }
            if(confirmacion){
                res.render("EnfermeroViews/MedicacionActual/vistaCrearMedicacionActual.pug", {
                    success: confirmacion,
                    medicamentos: medicamentos[1]    
                })
                return;
            }
            res.render("EnfermeroViews/MedicacionActual/vistaCrearMedicacionActual.pug",{
                medicamentos: medicamentos[1]    
            })
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaCrearMedicacionActual", "646", error as string);
            res.redirect(`/enfermeria/view/medicacion/actual?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaEditarMedicacionActual = async (req:Request, res:Response) => {
        try {
            const id_MedicacionActual = (req.query.id_Paciente_Medicacion_Actual ) ? Number(req.query.id_Paciente_Medicacion_Actual) : undefined;
            if(!id_MedicacionActual || id_MedicacionActual <= 0){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede editar la medicacion actual de un paciente desconocido"))
                return;
            }
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            
            const medicamentos = await MedicamentosServices.getTodosLosMedicamentos();
            if(medicamentos[0] && medicamentos[1] && medicamentos[1].length <= 0){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(medicamentos[0])}`);
                return;
            }
            const medicacionActual = await MedicacionActualService.buscarMedicacionActualPorId(id_MedicacionActual);
            if(medicacionActual[0] && !medicacionActual[1] ){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(medicacionActual[0])}`);
                return;
            }
            console.log(medicacionActual[1]);
            
            if(error){
                res.render("EnfermeroViews/MedicacionActual/vistaActualizarMedicacionActual.pug", {
                    error: error,
                    medicamentos: medicamentos[1],
                    medicacionActual: medicacionActual[1] 
                })
                return;
            }
            if(warning){
                res.render("EnfermeroViews/MedicacionActual/vistaActualizarMedicacionActual.pug", {
                    warning: warning,
                    medicamentos: medicamentos[1],
                    medicacionActual: medicacionActual[1]    
                })
                return;
            }
            if(confirmacion){
                res.render("EnfermeroViews/MedicacionActual/vistaActualizarMedicacionActual.pug", {
                    success: confirmacion,
                    medicamentos: medicamentos[1],
                    medicacionActual: medicacionActual[1]       
                })
                return;
            }
            console.log(medicacionActual[1]);
            
            res.render("EnfermeroViews/MedicacionActual/vistaActualizarMedicacionActual.pug",{
                medicamentos: medicamentos[1],
                medicamentoActual: medicacionActual[1]    
            })
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaEditarMedicacionActual", "700", error as string);   
            res.redirect(`/enfermeria/view/medicacion/actual?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaAntecedentesFamiliares = async(req:Request, res:Response) => {
        try {
            
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;

            

            const antecedentesFamiliares = await AntecedentesFamiliaresService.buscarAntecedentesFamiliaresPorPaciente(req.session.paciente.id_Paciente);
            if(antecedentesFamiliares[0] && !antecedentesFamiliares[1] ){
                res.redirect(`/enfermeria/view/historial/paciente?warning=${encodeURIComponent(antecedentesFamiliares[0])}`);
                return;
            }
            if(error ){
                res.render("EnfermeroViews/AntecedentesFamiliares/vistaListaAntecedentesFamiliares.pug", {
                    error: error,
                    antecedentesFamiliares: antecedentesFamiliares[1] 
                })
                return;
            }
            if(warning){
                res.render("EnfermeroViews/AntecedentesFamiliares/vistaListaAntecedentesFamiliares.pug", {
                    warning: warning,
                    antecedentesFamiliares: antecedentesFamiliares[1]    
                })
                return;
            }
            if(confirmacion){
                res.render("EnfermeroViews/AntecedentesFamiliares/vistaListaAntecedentesFamiliares.pug", {
                    success: confirmacion,
                    antecedentesFamiliares: antecedentesFamiliares[1]       
                })
                return;
            }
            
            res.render("EnfermeroViews/AntecedentesFamiliares/vistaListaAntecedentesFamiliares.pug", {
                antecedentesFamiliares: antecedentesFamiliares[1] 
            })
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaAntecedentesFamiliares", "700", error as string);   
            res.redirect(`/enfermeria/view/antecedentes/familiares?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaCrearAntecedentesFamiliares = async(req:Request, res:Response) => {
        try {
            
            
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            
            const lazos = await LazoFamiliarService.buscarTodosLosLazosFamiliares();
            if(lazos[0]){
                res.redirect(`/enfermeria/view/antecedentes/familiares?error=${encodeURIComponent(lazos[0])}`);
                return;
            }

            if(error){
                res.render("EnfermeroViews/AntecedentesFamiliares/vistaCrearAntecedenteFamiliar.pug", {
                    error: error,
                    lazos: lazos[1] 
                })
                return;
            }
            if(warning){
                res.render("EnfermeroViews/AntecedentesFamiliares/vistaCrearAntecedenteFamiliar.pug", {
                    warning: warning,
                    lazos: lazos[1]    
                })
                return;
            }
            if(confirmacion){
                res.render("EnfermeroViews/AntecedentesFamiliares/vistaCrearAntecedenteFamiliar.pug", {
                    success: confirmacion,
                    lazos: lazos[1]       
                })
                return;
            }
            
            res.render("EnfermeroViews/AntecedentesFamiliares/vistaCrearAntecedenteFamiliar.pug", {
                lazos: lazos[1] 
            })
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaCrearAntecedentesFamiliares", "826", error as string);   
            res.redirect(`/enfermeria/view/antecedentes/familiares?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public vistaActualizarAntecedentesFamiliares = async(req:Request, res:Response) => {
        try {
            
            const id_Antecedente_Familiar = (req.query.id_Antecedente_Familiar)? Number(req.query.id_Antecedente_Familiar) : undefined;
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            
            const antecedentesFamiliares = await AntecedentesFamiliaresService.buscarAntecedenteFamiliarPorId(id_Antecedente_Familiar);
            if(antecedentesFamiliares[0] && !antecedentesFamiliares[1] ){
                res.redirect(`/enfermeria/view/historial/paciente?warning=${encodeURIComponent(antecedentesFamiliares[0])}`);
                return;
            }
            const lazos = await LazoFamiliarService.buscarTodosLosLazosFamiliares();
            if(lazos[0] && !lazos[1] ){
                res.redirect(`/enfermeria/view/historial/paciente?warning=${encodeURIComponent(lazos[0])}`);
                return;
            }
            console.log(antecedentesFamiliares[1]);
            
            if(error){
                res.render("EnfermeroViews/AntecedentesFamiliares/vistaActualizarAntecedenteFamiliar.pug", {
                    error: error,
                    antecedenteFamiliarActual: antecedentesFamiliares[1],
                    lazos: lazos[1] 
                })
                return;
            }
            if(warning){
                res.render("EnfermeroViews/AntecedentesFamiliares/vistaActualizarAntecedenteFamiliar.pug", {
                    warning: warning,
                    antecedenteFamiliarActual: antecedentesFamiliares[1],
                    lazos: lazos[1]    
                })
                return;
            }
            if(confirmacion){
                res.render("EnfermeroViews/AntecedentesFamiliares/vistaActualizarAntecedenteFamiliar.pug", {
                    success: confirmacion,
                    antecedenteFamiliarActual: antecedentesFamiliares[1],
                    lazos: lazos[1]       
                })
                return;
            }
            
            res.render("EnfermeroViews/AntecedentesFamiliares/vistaActualizarAntecedenteFamiliar.pug", {
                antecedenteFamiliarActual: antecedentesFamiliares[1],
                lazos: lazos[1] 
            })
            return; 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaEditarAntecedentesFamiliares", "835", error as string);   
            res.redirect(`/enfermeria/view/antecedentes/familiares?error=${encodeURIComponent(error as string)}`);
            return; 
        }
    }
    public  vistaListaCirugias = async (req:Request, res:Response) => {
        try {
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            const cirugias = await CirugiasService.buscarCirugiasPorPaciente(req.session.paciente.id_Paciente)
            
            if(cirugias[0] && cirugias[1] == undefined){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(cirugias[0])}`);
                return;
            }
            
            if(error){
                res.render("EnfermeroViews/Cirugias/VistaListaCirugias.pug", {
                    error: error,
                    cirugias: cirugias[1],
                })
                return;
            }
            if(warning){
                res.render("EnfermeroViews/Cirugias/VistaListaCirugias.pug", {
                    warning: warning,
                    cirugias: cirugias[1],
                })
                return;
            }
            if(confirmacion){
                res.render("EnfermeroViews/Cirugias/VistaListaCirugias.pug", {
                    success: confirmacion,
                    cirugias: cirugias[1],
                })
                return;
            }
            
            res.render("EnfermeroViews/Cirugias/VistaListaCirugias.pug", {
                cirugias: cirugias[1],
            })
            return; 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaEditarAntecedentesFamiliares", "835", error as string);   
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return; 
        }
    }
    public vistaCrearCirugia = async (req:Request, res:Response) => {
        try {
            const nombresCirugias = await NombreCirugiasServices.buscarTodosLosNombresDeCirugias();
            if(nombresCirugias[0] && nombresCirugias[1] == undefined){
                res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(nombresCirugias[0])}`);
                return;
            }
            const medicos = await MedicoService.getAllMedicos();
            if(medicos[0] && medicos[1] == undefined){
                res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(medicos[0])}`);
                return;
            }
            const error = req.query.error || undefined;
            if(error){
                res.render("EnfermeroViews/Cirugias/VistaCrearCirugia.pug", {
                    error: error,
                    nombresCirugias: nombresCirugias[1],
                    medicos: medicos[1],
                })
                return; 
            }
            res.render("EnfermeroViews/Cirugias/VistaCrearCirugia.pug", {
                nombresCirugias: nombresCirugias[1],
                medicos: medicos[1],
            })
            return; 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaCrearCirugia", "886", error as string);   
            res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(error as string)}`);
            return; 
        }
    }
    public vistaActualizarCirugia = async(req:Request, res:Response) => {
        try {
            const id_cirugia = (req.query.id_cirugia)? Number(req.query.id_cirugia) : undefined;
            if(!id_cirugia){
                res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent("No se ha proporcionado un id de cirugia")}`);
                return;
            }
            const [errorServicio, cirugia] = await CirugiasService.buscarCirugiaPorId(id_cirugia);
            if(errorServicio && !cirugia){
                res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(errorServicio)}`);
                return;
            }
            const [ErrorServicioMedicos, medicos] = await MedicoService.getAllMedicos();
            if(ErrorServicioMedicos && medicos == undefined){
                res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(ErrorServicioMedicos)}`);
                return;
            }
            const [ErrorServicioNombresCirugias, nombresCirugias] = await NombreCirugiasServices.buscarTodosLosNombresDeCirugias();
            if(ErrorServicioNombresCirugias && nombresCirugias == undefined){
                res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(ErrorServicioNombresCirugias)}`);
                return;
            }
            const error = req.query.error || undefined;
            if(error){
                res.render("EnfermeroViews/Cirugias/VistaActualizarCirugia.pug", {
                    error: error,
                    cirugiaActual: cirugia,
                    medicos: medicos,   
                    nombresCirugias: nombresCirugias,
                })
                return;
            }
            res.render("EnfermeroViews/Cirugias/VistaActualizarCirugia.pug", {
                cirugiaActual: cirugia,
                medicos: medicos,
                nombresCirugias: nombresCirugias,
            })
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaActualizarCirugia", "932", error as string);   
            res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(error as string)}`);
            return;     
        }
    }
    public vistaDiagnosticos = async (req:Request, res:Response) => {
        try {
            const warning = req.query.warning || undefined;
            const [error, diagnosticos] = await DiagnosticoService.buscarDiagnosticosPorPaciente(req.session.paciente.id_Paciente)
            if(error && diagnosticos == undefined){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error)}`);
                return;
            }
            console.log(diagnosticos);
            
            if(warning){
                res.render("EnfermeroViews/Diagnosticos/VistaListaDiagnosticos.pug", {
                    warning: warning,
                    diagnosticos: diagnosticos,
                })
                return;
            }
            res.render("EnfermeroViews/Diagnosticos/VistaListaDiagnosticos.pug", {
                diagnosticos: diagnosticos,
            })
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "vistaDiagnosticos", "980", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    
    //////////////////////////////////////////////////Todo
    //////////////////todo FUNCIONALIDADES ///////////
    //////////////////////////////////////////////////Todo
    public actualizarInformacionPaciente = async (req:Request, res:Response) => {
        try {
            

            if(!req.body){
                res.redirect("/enfermeria/view/actualizar/paciente?error=" + encodeURIComponent("No se han recibido datos para actualizar"));
                return;
            }
            const { nombre, apellido, fecha_nac, edad, direccion, telefono, telefono_De_Emergencia } =req.body
            const[ error, updatePacienteDto] = UpdatePacienteDto.create({
                id_Paciente: req.session.paciente.id_Paciente,
                nombre: nombre,
                apellido: apellido,
                dni:req.session.paciente.dni,
                fecha_nac: fecha_nac,
                genero:req.session.paciente.genero,
                direccion: direccion,
                edad: edad,
                peso: req.session.paciente.peso,
                telefono: telefono,
                telefono_De_Emergencia: telefono_De_Emergencia,
                id_tipo_sanguineo: req.session.paciente.id_tipo_sanguineo
            }, req.session.paciente);
            if(error){
                res.redirect(`/enfermeria/view/actualizar/paciente?error=${encodeURIComponent(error)}`);
                return;
            }
            const pacienteActualizado = await PacienteServices.actualizarPaciente(updatePacienteDto,1);
            if(pacienteActualizado[0]){
                res.redirect(`/enfermeria/view/actualizar/paciente?error=${encodeURIComponent(pacienteActualizado[0])}`);
                return;
            }
            const paciente = await PacienteServices.getPacienteById(req.session.paciente.id_Paciente)
            if(paciente[0]){
                res.redirect(`/enfermeria/view/actualizar/paciente?error=${encodeURIComponent(paciente[0])}`);
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
           
            
            res.redirect(`/enfermeria/view/actualizar/paciente?confirmacion=${encodeURIComponent("Paciente actualizado correctamente")}`);
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "actualizarInformacionPaciente", "60", error as string);
            res.redirect(`/enfermeria/view/actualizar/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public crearAlergia = async (req:Request, res:Response) => {
        try {
            
            if(!req.body){
                res.redirect("/enfermeria/view/crear/alergia?error=" + encodeURIComponent("No se han recibido datos para crear la alergia"));
                return;
            }
            const [errorDto, createAlergiaDtoReady] = createAlergiaDto.create({
                id_nombre_alergia: req.body.id_nombre_alergia,
                descripcion: req.body.descripcion,
                id_paciente: req.session.paciente.id_Paciente,
               
            })
            if(errorDto){
                res.redirect(`/enfermeria/view/crear/alergia?error=${encodeURIComponent(errorDto)}`);
                return;
            }
            const alergiaCreada = await AlergiaService.registrarAlergia(createAlergiaDtoReady);
            if(alergiaCreada[0]){
                res.redirect(`/enfermeria/view/crear/alergia?error=${encodeURIComponent(alergiaCreada[0])}`);
                return;
            }
            res.redirect(`/enfermeria/view/crear/alergia?confirmacion=${encodeURIComponent("Alergia creada correctamente")}`);
            return;
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "crearAlergia", "80", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public actualizarAlergia = async (req:Request, res:Response) => {
        try {
            
            
            if(!req.body){
                res.redirect("/enfermeria/view/actualizar/alergia?error=" + encodeURIComponent("No se han recibido datos para actualizar la alergia"));
                return;
            }
            const [errorDto, updateAlergiaDtoReady] = updateAlergiaDto.create({
                id_Alergia: req.body.id_Alergia,
                id_nombre_alergia: req.body.id_nombre_alergia,
                descripcion: req.body.descripcion,
                id_paciente: req.session.paciente.id_Paciente,
                
            })
            if(errorDto){
                res.redirect(`/enfermeria/view/actualizar/alergia?error=${encodeURIComponent(errorDto)}&id_Alergia=${encodeURIComponent(req.body.id_Alergia)}`);
                return;
            }
            const alergiaActualizada = await AlergiaService.actualizarAlergia(updateAlergiaDtoReady);
            if(alergiaActualizada[0]){
                res.redirect(`/enfermeria/view/actualizar/alergia?error=${encodeURIComponent(alergiaActualizada[0])}&id_Alergia=${encodeURIComponent(updateAlergiaDtoReady.id_Alergia)}`);
                return;
            }
            res.redirect(`/enfermeria/view/actualizar/alergia?confirmacion=${encodeURIComponent("Alergia actualizada correctamente")}&id_Alergia=${encodeURIComponent(updateAlergiaDtoReady.id_Alergia)}`);
            return;

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "actualizarAlergia", "85", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public eliminarAlergia = async(req:Request, res:Response) => {
        try {
            
            const id_nombre_alergia = req.query.id_nombre_alergia || undefined;
            
            if(!id_nombre_alergia){
                res.redirect("/enfermeria/view/historial/paciente?error=" + encodeURIComponent("No se ha seleccionado una alergia para eliminar"));
                return;
            }
            const alergiaEliminada = await AlergiaService.eliminarAlergia(Number(id_nombre_alergia), req.session.paciente.id_Paciente);
            if(alergiaEliminada[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(alergiaEliminada[0])}`);
                return;
            }
            res.redirect(`/enfermeria/view/alergias/paciente?confirmacion=${encodeURIComponent("Alergia eliminada correctamente")}`);
            return;

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "eliminarAlergia", "90", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public crearTratamientoAlergia = async (req:Request, res:Response) => {
        try {
            const id_Alergia = Number(req.body.id_Alergia) || undefined;
            
            if(!id_Alergia){
                res.redirect("/enfermeria/view/crear/tratamiento/alergia?error=" + encodeURIComponent("No se ha seleccionado una alergia"));
                return;
            }
            if(!req.body){
                res.redirect("/enfermeria/view/alergias/paciente?error=" + encodeURIComponent("No se han recibido datos para crear el tratamiento"));
                return;
            }
            
            const alergia = await AlergiaService.buscarAlergiaPorId(id_Alergia)
            if(alergia[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(alergia[0])}`);
                return;
            }
            if(alergia[1] && alergia[1].dataValues.id_tratamiento && alergia[1].dataValues.id_tratamiento !== null){
                //todo: Redireccionar a vista de actualizar tratamiento
                res.redirect(`/view/actualizar/tratamiento/alergia?id_Alergia=${encodeURIComponent(id_Alergia)}`);
                return;
            }
            const [errorDto, createTratamientoAlergiaDtoReady] = createTratamientoDto.create({
                    id_tipo_de_tratamiento: req.body.id_tipo_de_tratamiento,
                    detalle: req.body.detalle,
                    cantidad_suministrada: req.body.cantidad_suministrada,
                    fecha_de_inicio: null,
                    fecha_de_fin:  null,
                    id_paciente: req.session.paciente.id_Paciente,
                    id_medicamento: req.body.id_medicamento,
                    id_enfermero: req.session.usuarioLogueado.id_Personal,
                    id_medico: null
            })
            if(errorDto){
                res.redirect(`/enfermeria/view/crear/tratamiento/alergia?error=${encodeURIComponent(errorDto)}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
                return;
            }
            const tratamientoCreado = await TratamientosService.registrarTratamiento(createTratamientoAlergiaDtoReady);
            if(tratamientoCreado[0]){
                res.redirect(`/enfermeria/view/crear/tratamiento/alergia?error=${encodeURIComponent(tratamientoCreado[0])}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
                return;
            }
            
            
            alergia[1].id_tratamiento = tratamientoCreado[1].dataValues.id_tratamiento;
            const [updateAlergiaError, updateAlergiaDtoReady] = updateAlergiaDto.create({
                id_Alergia:alergia[1].dataValues.id_Alergia,
                id_nombre_alergia: alergia[1].dataValues.id_nombre_alergia,
                descripcion: alergia[1].dataValues.descripcion,
                id_paciente: alergia[1].dataValues.id_paciente,
                id_tratamiento: alergia[1].dataValues.id_tratamiento
            });
            if(updateAlergiaError){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(updateAlergiaError)}`);
                return;
            }
            const alergiaActualizada = await AlergiaService.actualizarAlergia(updateAlergiaDtoReady);
            if(alergiaActualizada[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(alergiaActualizada[0])}`);
                return;
            }
            res.redirect(`/enfermeria/view/crear/tratamiento/alergia?confirmacion=${encodeURIComponent("Tratamiento creado con éxito")}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "crearTratamientoAlergia", "95", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return;
        }
    }
    public actualizarTratamientoAlergia = async (req:Request, res:Response) => {
        try {
            const id_Alergia = Number(req.body.id_Alergia) || undefined;
            if(!id_Alergia){
                res.redirect("/enfermeria/view/actualizar/tratamiento/alergia?error=" + encodeURIComponent("No se ha seleccionado una alergia"));
                return;
            }
            if(!req.body){
                res.redirect("/enfermeria/view/alergias/paciente?error=" + encodeURIComponent("No se han recibido datos para actualizar el tratamiento"));
                return;
            }
            const alergia = await AlergiaService.buscarAlergiaPorId(id_Alergia)
            if(alergia[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(alergia[0])}`);
                return;
            }
            if(!alergia[1].dataValues.id_tratamiento || alergia[1].dataValues.id_tratamiento === null){
                res.redirect(`/enfermeria/view/alergias/paciente?error=${encodeURIComponent("La alergia no tiene un tratamiento asociado")}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
                return;
            }
            const tratamientoActual = await TratamientosService.getTratamientoById(alergia[1].dataValues.id_tratamiento)
            if(tratamientoActual[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(tratamientoActual[0])}`);
                return;
            }
            const [errorDto, updateTratamientoDtoReady] = updateTratamientoDto.create({
                id_tratamiento: tratamientoActual[1].dataValues.id_tratamiento,
                id_tipo_de_tratamiento: req.body.id_tipo_de_tratamiento,
                detalle: req.body.detalle,
                cantidad_suministrada: req.body.cantidad_suministrada,
                fecha_de_inicio: null,
                fecha_de_fin:  null,
                id_paciente: req.session.paciente.id_Paciente,
                id_medicamento: req.body.id_medicamento,
                id_enfermero: req.session.usuarioLogueado.id_Personal,
                id_medico: null
            })
            if(errorDto){
                res.redirect(`/enfermeria/view/actualizar/tratamiento/alergia?error=${encodeURIComponent(errorDto)}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
                return;
            }
            const tratamientoActualizado = await TratamientosService.actualizarTratamiento(updateTratamientoDtoReady);
            if(tratamientoActualizado[0]){
                res.redirect(`/enfermeria/view/actualizar/tratamiento/alergia?error=${encodeURIComponent(tratamientoActualizado[0])}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
                return;
            }
            res.redirect(`/enfermeria/view/actualizar/tratamiento/alergia?confirmacion=${encodeURIComponent("Tratamiento actualizado correctamente")}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
            return; 
            
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "actualizarTratamientoAlergia", "", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return; 
        }
    }
    public eliminarTratamientoAlergia = async (req:Request, res:Response) => {
        try {
            
            const id_Alergia = Number(req.query.id_Alergia) || undefined
            if(!id_Alergia){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent("No se ha seleccionado una alergia")}`);
                return;
            }  
            const alergia = await AlergiaService.buscarAlergiaPorId(id_Alergia)
            if(alergia[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(alergia[0])}`);
                return;
            }
            if(!alergia[1].dataValues.id_tratamiento || alergia[1].dataValues.id_tratamiento === null){
                res.redirect(`/enfermeria/view/alergias/paciente?error=${encodeURIComponent("La alergia no tiene un tratamiento asociado")}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
                return;
            }
            const [error, confirmacion] = await AlergiaService.eliminarTratamientoDeAlergia(id_Alergia)
            if(error){
                res.redirect(`/enfermeria/view/alergias/paciente?error=${encodeURIComponent(error)}`);
                return;
            }
            if(!confirmacion){
                res.redirect(`/enfermeria/view/alergias/paciente?error=${encodeURIComponent("No se pudo eliminar el tratamiento de la alergia")}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
                return;
            }   
            const tratamientoActual = await TratamientosService.getTratamientoById(alergia[1].dataValues.id_tratamiento)
            if(tratamientoActual[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(tratamientoActual[0])}`);
                return;
            }
            const tratamientoEliminado = await TratamientosService.eliminarTratamiento(tratamientoActual[1].dataValues.id_tratamiento)
            if(tratamientoEliminado[0]){
                res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(tratamientoEliminado[0])}`);
                return;
            }
            res.redirect(`/enfermeria/view/alergias/paciente?confirmacion=${encodeURIComponent("Tratamiento eliminado correctamente")}&id_Alergia=${encodeURIComponent(id_Alergia)}`);
            return;


        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "eliminarTratamientoAlergia", "", error as string);
            res.redirect(`/enfermeria/view/historial/paciente?error=${encodeURIComponent(error as string)}`);
            return; 
        }
    }
    public crearMedicacionActual = async (req:Request, res:Response) => {
        try {
            
            
            if(!req.body){
                res.redirect("/enfermeria/view/crear/medicacion/actual?error=" + encodeURIComponent("No se han recibido datos para crear el medicamento actual"));
                return;
            }
            const medicamento = await MedicamentosServices.buscarMedicamentoPorId(req.body.id_Medicamento)
            if(medicamento[0]){
                res.redirect(`/enfermeria/view/medicacion/actual?error=${encodeURIComponent(medicamento[0])}`);
                return;
            }
            const [errorDto, createMedicacionActualDtoReady] = createMedicacionActualDto.create({
                id_Admision: req.session.admision.id_Admision,
                id_Paciente: req.session.paciente.id_Paciente,
                id_Medicamento: req.body.id_Medicamento || undefined,
                motivo: req.body.motivo
            })
            if(errorDto){
                res.redirect(`/enfermeria/view/crear/medicacion/actual?error=${encodeURIComponent(errorDto)}`);
                return;
            }
            const medicamentoCreado = await MedicacionActualService.crearMedicacionActual(createMedicacionActualDtoReady)
            if(medicamentoCreado[0]){
                res.redirect(`/enfermeria/view/medicacion/actual?error=${encodeURIComponent(medicamentoCreado[0])}`);
                return;
            }
            res.redirect(`/enfermeria/view/medicacion/actual?confirmacion=${encodeURIComponent("Medicamento actual creado correctamente")}`);
            return; 

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "crearMedicacionActual", "", error as string);
            res.redirect(`/enfermeria/view/medicacion/actual?error=${encodeURIComponent(error as string)}`);
            return;     
        }
    }
    public actualizarMedicacionActual = async (req:Request, res:Response) => {
        try {
            
            const { id_Paciente_Medicacion_Actual, id_Medicamento, motivo } = req.body
            const [errorDto, updateMedicacionActualDtoReady] = updateMedicacionActualDto.create({
                id_Paciente_Medicacion_Actual: id_Paciente_Medicacion_Actual,
                id_Admision: req.session.admision.id_Admision,
                id_Paciente: req.session.paciente.id_Paciente,
                motivo: motivo,
                id_Medicamento: id_Medicamento
            })
            if(errorDto){
                res.redirect(`/enfermeria/view/actualizar/medicacion/actual?error=${encodeURIComponent(errorDto)}`);
                return;
            }
            const medicacionActualActualizada = await MedicacionActualService.actualizarMedicacionActual(updateMedicacionActualDtoReady)
            if(medicacionActualActualizada[0] && medicacionActualActualizada[1] == false){
                res.redirect(`/enfermeria/view/medicacion/actual?error=${encodeURIComponent(medicacionActualActualizada[0])}`);
                return;
            }
            res.redirect(`/enfermeria/view/medicacion/actual?confirmacion=${encodeURIComponent("Medicacion actual actualizada correctamente")}`);
            return; 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "actualizarMedicacionActual", "", error as string);
            res.redirect(`/enfermeria/view/medicacion/actual?error=${encodeURIComponent(error as string)}`);
            return;     
        }
    }
    public eliminarMedicacionActual = async (req:Request, res:Response) => {
        try {
            
            
            const id_Paciente_Medicacion_Actual = (req.query.id_Paciente_Medicacion_Actual) ?Number(req.query.id_Paciente_Medicacion_Actual) :undefined
            if(!id_Paciente_Medicacion_Actual){
                res.redirect("/enfermeria/view/medicacion/actual?error=" + encodeURIComponent("No se ha recibido el id de la medicacion actual"));
                return;
            }
            const medicacionActualEliminada = await MedicacionActualService.eliminarMedicacionActual(id_Paciente_Medicacion_Actual)
            if(medicacionActualEliminada[0] && medicacionActualEliminada[1] == false){
                res.redirect(`/enfermeria/view/medicacion/actual?error=${encodeURIComponent(medicacionActualEliminada[0])}`);
                return;
            }
            res.redirect(`/enfermeria/view/medicacion/actual?confirmacion=${encodeURIComponent("Medicacion actual eliminada correctamente")}`);
            return; 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "eliminarMedicacionActual", "", error as string);
            res.redirect(`/enfermeria/view/medicacion/actual?error=${encodeURIComponent(error as string)}`);
            return;     
        }
    }
    public crearAntecedentesFamiliares = async (req:Request, res:Response) => {
        try {
            
            
            if(!req.body){
                res.redirect("/enfermeria/view/crear/antecedentes/familiares?error=" + encodeURIComponent("No se han recibido datos para crear el antecedente familiar"));
                return;
            }
            const { id_Lazo_Familiar, nombre_Enfermedad, detalles  } = req.body

            const [errorDto, createAntecedentesFamiliaresDtoReady   ] = createAntecedenteFamiliarDto.create({
                id_Lazo_Familiar: id_Lazo_Familiar,
                id_Paciente: req.session.paciente.id_Paciente,
                nombre_Enfermedad: nombre_Enfermedad,
                detalles: detalles
            })
            if(errorDto){
                res.redirect(`/enfermeria/view/crear/antecedentes/familiares?error=${encodeURIComponent(errorDto)}`);
                return;
            }
            const antecedentesFamiliaresCreados = await AntecedentesFamiliaresService.createAntecedenteFamiliar(createAntecedentesFamiliaresDtoReady)
            if(antecedentesFamiliaresCreados[0] ){
                res.redirect(`/enfermeria/view/crear/antecedentes/familiares?error=${encodeURIComponent(antecedentesFamiliaresCreados[0])}`);
                return;
            }
            res.redirect(`/enfermeria/view/antecedentes/familiares?confirmacion=${encodeURIComponent("Antecedentes familiares creados correctamente")}`);
            return; 


        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "crearAntecedentesFamiliares", "", error as string);
            res.redirect(`/enfermeria/view/crear/antecedentes/familiares?error=${encodeURIComponent(error as string)}`);
            return;     
        }
    }
    public actualizarAntecedentesFamiliares = async(req:Request, res:Response) => {
        try {
            
            if(!req.body){
                res.redirect("/enfermeria/view/actualizar/antecedentes/familiares?warning="+encodeURIComponent("No se puede actualizar la informacion de un paciente desconocido"))
                return;
            }
            const { id_Antecedente_Familiar, id_Lazo_Familiar, nombre_Enfermedad, detalles  } = req.body
            
            const [errorDto, updateAntecedentesFamiliaresDtoReady   ] = updateAntecedenteFamiliarDto.create({
                id_Antecedente_Familiar: id_Antecedente_Familiar,
                id_Lazo_Familiar: id_Lazo_Familiar,
                nombre_Enfermedad: nombre_Enfermedad,
                detalles: detalles,
                id_Paciente: req.session.paciente.id_Paciente
            })
            if(errorDto){
                res.redirect(`/enfermeria/view/actualizar/antecedentes/familiares?error=${encodeURIComponent(errorDto)}`);
                return;
            }
            const antecedentesFamiliaresActualizados = await AntecedentesFamiliaresService.updateAntecedenteFamiliar(updateAntecedentesFamiliaresDtoReady)
            if(antecedentesFamiliaresActualizados[0] && antecedentesFamiliaresActualizados[1]== undefined){
                res.redirect(`/enfermeria/view/actualizar/antecedentes/familiares?error=${encodeURIComponent(antecedentesFamiliaresActualizados[0])}`);
                return;
            }
            res.redirect(`/enfermeria/view/antecedentes/familiares?confirmacion=${encodeURIComponent("Antecedentes familiares actualizados correctamente")}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "actualizarAntecedentesFamiliares", "", error as string);
            res.redirect(`/enfermeria/view/actualizar/antecedentes/familiares?error=${encodeURIComponent(error as string)}`);
            return;     
        }
    }
    public eliminarAntecedentesFamiliares = async(req:Request, res:Response) => {
        try {
            
            const id_Antecedente_Familiar = (req.query.id_Antecedente_Familiar)? Number(req.query.id_Antecedente_Familiar) : undefined;
            if(!id_Antecedente_Familiar){
                res.redirect(`/enfermeria/view/antecedentes/familiares?error=${encodeURIComponent("No se ha proporcionado un id de antecedente familiar")}`);
                return;
            }
            const [error, antecedenteFamiliarEliminado] = await AntecedentesFamiliaresService.deleteAntecedenteFamiliar(req.session.paciente.id_Paciente,id_Antecedente_Familiar);
            if(error && !antecedenteFamiliarEliminado){
                res.redirect(`/enfermeria/view/antecedentes/familiares?error=${encodeURIComponent(error)}`);
                return;
            }
            res.redirect(`/enfermeria/view/antecedentes/familiares?confirmacion=${encodeURIComponent("Antecedente familiar eliminado correctamente")}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "eliminarAntecedentesFamiliares", "844", error as string);   
            res.redirect(`/enfermeria/view/antecedentes/familiares?error=${encodeURIComponent(error as string)}`);
            return;     
        }
    }
    public crearCirugia = async(req:Request, res:Response) => {
        try {
            
            if(!req.body){
                res.redirect("/enfermeria/view/crear/cirugia?error=" + encodeURIComponent("No se han recibido datos para crear la cirugia"));
                return;
            }
            const { id_nombre_cirugia, descripcion, id_medico } = req.body
            const [errorDto, createCirugiaDtoReady   ] = createCirugiaDto.create({
                id_nombre_cirugia: id_nombre_cirugia,
                descripcion: descripcion,
                id_medico: id_medico,
                id_paciente: req.session.paciente.id_Paciente,
                id_Admision: req.session.admision.id_Admision
            })
            if(errorDto){
                res.redirect(`/enfermeria/view/crear/cirugia?error=${encodeURIComponent(errorDto)}`);
                return;
            }
            const cirugiaCreada = await CirugiasService.crearCirugia(createCirugiaDtoReady)
            if(cirugiaCreada[0] && cirugiaCreada[1] == undefined){
                res.redirect(`/enfermeria/view/crear/cirugia?error=${encodeURIComponent(cirugiaCreada[0])}`);
                return;
            }
            res.redirect(`/enfermeria/view/cirugias?confirmacion=${encodeURIComponent("Cirugia creada correctamente")}`);
            return;     

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "crearCirugia", "1427", error as string);   
            res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(error as string)}`);
            return;     
        }
    }
    public actualizarCirugia = async(req:Request, res:Response) => {
        try {
            
            if(!req.body){
                res.redirect("/enfermeria/view/actualizar/cirugia?warning="+encodeURIComponent("No se puede actualizar la informacion de un paciente desconocido"))
                return;
            }
            const { id_cirugia, id_nombre_cirugia, descripcion, id_medico } = req.body
            const [errorDto, updateCirugiaDtoReady   ] = updateCirugiaDto.create({
                id_cirugia: id_cirugia,
                id_nombre_cirugia: id_nombre_cirugia,
                descripcion: descripcion,
                id_medico: id_medico,
                id_paciente: req.session.paciente.id_Paciente,
                id_Admision: req.session.admision.id_Admision
            })
            if(errorDto){
                res.redirect(`/enfermeria/view/actualizar/cirugia?error=${encodeURIComponent(errorDto)}&id_cirugia=${id_cirugia}`);
                return;
            }
            const cirugiaActualizada = await CirugiasService.actualizarCirugia(updateCirugiaDtoReady)
            if(cirugiaActualizada[0] && cirugiaActualizada[1] == false){
                res.redirect(`/enfermeria/view/actualizar/cirugia?error=${encodeURIComponent(cirugiaActualizada[0])}&id_cirugia=${id_cirugia}`);
                return;
            }
            res.redirect(`/enfermeria/view/cirugias?confirmacion=${encodeURIComponent("Cirugia actualizada correctamente")}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "actualizarCirugia", "1457", error as string);   
            res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(error as string)}`);
            return;     
        }
    }   
    public eliminarCirugia = async(req:Request, res:Response) => {
        try {
            
            const id_cirugia = (req.query.id_cirugia)? Number(req.query.id_cirugia) : undefined;
            if(!id_cirugia){
                res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent("No se ha proporcionado un id de cirugia")}`);
                return;
            }
            const [error, cirugiaEliminada] = await CirugiasService.eliminarCirugia(id_cirugia, req.session.paciente.id_Paciente);
            if(error && !cirugiaEliminada){
                res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(error)}`);
                return;
            }
            res.redirect(`/enfermeria/view/cirugias?confirmacion=${encodeURIComponent("Cirugia eliminada correctamente")}`);
            return;     
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("EnfermerosController", "eliminarCirugia", "1457", error as string);   
            res.redirect(`/enfermeria/view/cirugias?error=${encodeURIComponent(error as string)}`);
            return;     
        }
    }   
}
