import { Request, Response } from "express";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { AdmisionService } from "../services/AdmisionService";
import { PacienteServices } from "../services/PacientesService";
import { UpdatePacienteDto } from "../../domain/Dtos/pacientes/updatePacienteDto";
import { AlergiaService } from "../services/Paciente/AlergiasService";


export class EnfermerosController{

    
    public getEnfermeros = (req:Request,res:Response):void => {
        res.send("hola estas en el metodo get enfermeros");
    }
    //////////////////////////////////////////////////Todo
    //////////////////todo VISTAS ///////////
    //////////////////////////////////////////////////Todo

    public test = (req:Request,res:Response):void =>{
        try {
            
            

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
            if(alergias[0]){
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

}
