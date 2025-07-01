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
                console.log(admision);
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
            console.log(id_Admision);
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
           if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede actualizar la informacion de un paciente desconocido"))
                return;
            }
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
            console.log(req.session.paciente.fecha_nac);
            
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
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede ver el historial medico de un paciente desconocido"))
                return;
            }
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
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede ver la lista de alergias de un paciente desconocido"))
                return;
            }
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
            console.log(alergias[1]);
            
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
            
            
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede crear una alergia para un paciente desconocido"))
                return;
            }
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
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede crear una alergia para un paciente desconocido"))
                return;
            }
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
            console.log(alergiaActual[1]);
            
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
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede crear un tratamiento para un paciente desconocido"))
                return;
            }
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
            console.log(tiposDetratamiento[1]);
            
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
    //////////////////////////////////////////////////Todo
    //////////////////todo FUNCIONALIDADES ///////////
    //////////////////////////////////////////////////Todo
    public actualizarInformacionPaciente = async (req:Request, res:Response) => {
        try {
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede actualizar la informacion de un paciente desconocido"))
                return;
            }
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
            console.log(req.session.paciente);
            
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
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede crear una alergia para un paciente desconocido"))
                return;
            }
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
            
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede actualizar una alergia de un paciente desconocido"))
                return;
            }
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
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede eliminar una alergia de un paciente desconocido"))
                return;
            }
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
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede crear un tratamiento para un paciente desconocido"))
                return;
            }
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
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede actualizar un tratamiento para un paciente desconocido"))
                return;
            }
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
            if(!req.session.paciente){
                res.redirect("/enfermeria/?error=" + encodeURIComponent("No se ha seleccionado un paciente"));
                return;
            }
            if(!req.session.paciente.dni){
                res.redirect("/enfermeria/view/paciente?warning="+encodeURIComponent("No se puede eliminar un tratamiento para un paciente desconocido"))
                return;
            }
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
}
